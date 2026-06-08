# 🔐 Auth Starter Kit

Starter kit autentikasi modern menggunakan Next.js 16, NextAuth.js v5, Prisma ORM, PostgreSQL, dan ShadCN UI.

Project ini menyediakan sistem autentikasi siap pakai dengan fitur:

- ✅ Login menggunakan Email & Password (Credentials)
- ✅ Login menggunakan Google OAuth
- ✅ Registrasi akun
- ✅ Session Management menggunakan NextAuth.js v5
- ✅ Prisma ORM + PostgreSQL
- ✅ Validasi menggunakan Zod
- ✅ Password Hashing menggunakan bcrypt-ts
- ✅ Dark Mode Support
- ✅ Dashboard Ready
- ✅ Modern UI menggunakan ShadCN UI + Tailwind CSS v4
- ✅ TypeScript Support

---

## 🚀 Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- ShadCN UI
- Radix UI
- Lucide React
- Sonner
- Next Themes

### Authentication

- NextAuth.js v5
- Google OAuth Provider
- Credentials Provider
- bcrypt-ts

### Database

- PostgreSQL
- Prisma ORM
- Prisma Accelerate

### Validation

- Zod

---

## 📁 Project Structure

```bash
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── dashboard/
│   └── api/
│
├── components/
│   ├── ui/
│   └── shared/
│
├── actions/
├── lib/
├── auth/
└── prisma/
```

---

## 🔑 Authentication Features

### Credentials Authentication

Pengguna dapat:

- Registrasi akun menggunakan email dan password
- Login menggunakan email dan password
- Password disimpan dalam bentuk hash menggunakan bcrypt-ts

### Google Authentication

Pengguna dapat:

- Login menggunakan akun Google
- Akun otomatis dibuat jika belum terdaftar
- Session dikelola oleh NextAuth.js

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/username/auth-starter-kit.git

cd auth-starter-kit
```

### Install Dependencies

```bash
npm install
```

atau

```bash
pnpm install
```

---

## 🗄️ Environment Variables

Buat file `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/auth_db"

AUTH_SECRET="your-secret-key"

AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
```

---

## 🏃 Database Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Jalankan Migration:

```bash
npx prisma migrate dev
```

Buka Prisma Studio:

```bash
npx prisma studio
```

---

## ▶️ Running Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di:

```bash
http://localhost:3000
```

---

## 🏗️ Build Production

```bash
npm run build
npm run start
```

---

## 📦 Main Dependencies

| Package | Description |
|----------|------------|
| Next.js | React Framework |
| NextAuth.js | Authentication |
| Prisma | ORM |
| PostgreSQL | Database |
| bcrypt-ts | Password Hashing |
| Zod | Validation |
| ShadCN UI | UI Components |
| Tailwind CSS | Styling |
| Radix UI | Accessible Components |
| Sonner | Toast Notification |

---

## 🔒 Security Features

- Password hashing menggunakan bcrypt-ts
- Session management menggunakan NextAuth.js
- OAuth Authentication menggunakan Google
- Server-side authentication checks
- Input validation menggunakan Zod

---

## 📸 Authentication Flow

### Credentials Login

```text
User
 ↓
Sign In Form
 ↓
Validation (Zod)
 ↓
Check User (Database)
 ↓
Verify Password (bcrypt)
 ↓
Create Session (NextAuth)
 ↓
Dashboard
```

### Google Login

```text
User
 ↓
Google OAuth
 ↓
Google Consent Screen
 ↓
NextAuth
 ↓
Database Sync
 ↓
Dashboard
```

---

## 🎨 UI Features

- Responsive Design
- Dark Mode
- Reusable Components
- Modern Dashboard Layout
- Toast Notifications
- Form Validation Feedback

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

Developed by **Fajar Rahyudi**

- GitHub: https://github.com/fajarrahyu1103
- LinkedIn: https://linkedin.com/in/fajarrahyudi
