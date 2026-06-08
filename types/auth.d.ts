import { DefaultSession } from "next-auth";
// import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: { organizationId: string | null } & DefaultSession["user"]
    }
}

// declare module "next-auth/jwt" {
//     interface JWT {
//         sub: string;
//         role: string
//     }
// }