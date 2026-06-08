import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { LoginSchmea } from "./lib/validations/auth";
import { compareSync } from "bcrypt-ts";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validationsFields = LoginSchmea.safeParse(credentials);
        if (!validationsFields.success) {
          return null;
        }

        const { email, password } = validationsFields.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        // cek user apakah login pakai password, jika tidak throw error
        if (!user.password) {
          throw new Error("User not found");
        }

        const passwordMatch = compareSync(password, user.password as string);

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;

      const protectedRoute = ["/dashboard"];

      if (!isLoggedIn && protectedRoute.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      if (isLoggedIn && nextUrl.pathname.startsWith("/login")) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      const hasOrg = auth?.user.organizationId;

      // Udah login tapi belum punya org & akses selain /onboarding
      // if (!hasOrg && protectedRoute.includes(nextUrl.pathname)) {
      //   return Response.redirect(new URL("/onboarding", nextUrl));
      // }

      // Udah punya org tapi masih di /onboarding
      if (hasOrg && nextUrl.pathname.startsWith("/onboarding")) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    // pakai jika user ada role
    // jwt({ user, token }) {
    //     if (user) {
    //         token.role = user.role
    //     }
    //     return token;
    // },
    async session({ session, token }) {
      const org = await prisma.organization.findFirst({
        where: { userId: token.sub },
      });

      session.user.organizationId = org?.id ?? null;
      return session;
    },
  },
});
