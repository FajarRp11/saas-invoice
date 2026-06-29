# 🧾 SaaS Invoice

Aplikasi invoicing modern berbasis SaaS menggunakan Next.js 16, NextAuth.js v5, Prisma ORM, PostgreSQL, dan ShadCN UI.

Project ini menyediakan sistem manajemen invoice lengkap dengan fitur:

- ✅ Manajemen Invoice (CRUD, Status Tracking, Numbering Otomatis)
- ✅ Manajemen Client
- ✅ Manajemen Product / Service
- ✅ Generate Invoice PDF menggunakan React PDF
- ✅ Kirim Invoice via Email menggunakan Resend
- ✅ Dashboard Analytics (Revenue, Outstanding, Status Chart)
- ✅ Partial Payment Support
- ✅ Multi-Organization (Workspace per User)
- ✅ Onboarding Flow untuk Setup Organisasi
- ✅ Upload Logo ke Cloudflare R2
- ✅ Cron Job Auto-Detect Overdue Invoice
- ✅ Login menggunakan Email & Password (Credentials)
- ✅ Login menggunakan Google OAuth
- ✅ Registrasi Akun
- ✅ Dark Mode Support
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
- Recharts (Dashboard Charts)
- Sonner (Toast Notifications)
- Next Themes (Dark Mode)
- @dnd-kit (Drag & Drop)

### Backend & API

- Next.js Server Actions
- Next.js API Routes (Cron)
- @react-pdf/renderer (PDF Generation)
- Resend (Transactional Email)
- Cloudflare R2 / AWS S3 SDK (File Storage)

### Authentication

- NextAuth.js v5
- Google OAuth Provider
- Credentials Provider
- bcrypt-ts
- Prisma Adapter

### Database

- PostgreSQL (Neon)
- Prisma ORM v7

### Validation

- Zod

### Deployment

- Vercel (Hosting + Cron Jobs)
- Cloudflare R2 (Object Storage)

---

## 📁 Project Structure

```bash
├── app/
│   ├── (app)/                  # Protected app routes
│   │   ├── dashboard/          # Dashboard + Analytics
│   │   ├── invoices/           # Invoice list, detail, create, edit
│   │   ├── clients/            # Client management
│   │   ├── products/           # Product management
│   │   └── settings/           # Organization settings
│   │
│   ├── (auth)/                 # Auth layout group
│   │   ├── login/
│   │   └── signup/
│   │
│   ├── api/
│   │   ├── auth/               # NextAuth.js handlers
│   │   └── cron/               # Cron jobs (check-overdue)
│   │
│   ├── actions/                # Server Actions
│   │   ├── auth.ts
│   │   ├── client.ts
│   │   ├── dashboard.ts
│   │   ├── invoice.ts          # CRUD, PDF, Email
│   │   ├── organization.ts
│   │   ├── product.ts
│   │   └── user.ts
│   │
│   ├── onboarding/             # Organization setup flow
│   └── generated/              # Prisma generated client
│
├── components/
│   ├── ui/                     # ShadCN UI components
│   ├── create-invoice-form.tsx
│   ├── edit-invoice-form.tsx
│   ├── invoice-pdf.tsx         # PDF template
│   ├── invoice-email.tsx       # Email template
│   ├── generate-pdf-button.tsx
│   ├── send-invoice-button.tsx
│   ├── record-payment-dialog.tsx
│   ├── create-client-dialog.tsx
│   ├── create-product-dialog.tsx
│   ├── dashboard-chart.tsx
│   ├── section-cards.tsx
│   ├── status-stats-card.tsx
│   ├── settings-form.tsx
│   ├── app-sidebar.tsx
│   └── ...
│
├── lib/
│   ├── prisma.ts               # Prisma client
│   ├── r2.ts                   # Cloudflare R2 helpers
│   ├── resend.ts               # Resend client
│   ├── format.ts               # Currency & date formatters
│   ├── utils.ts                # Utility functions
│   └── validations/            # Zod schemas
│
├── prisma/
│   └── schema.prisma           # Database schema
│
├── auth.ts                     # NextAuth.js config
├── types/                      # TypeScript type definitions
└── vercel.json                 # Cron job configuration
```

---

## 🗃️ Database Schema

### Models

| Model | Deskripsi |
|-------|-----------|
| User | Akun pengguna (email/Google OAuth) |
| Account | OAuth account data (NextAuth) |
| Session | Session management (NextAuth) |
| Organization | Workspace bisnis per user |
| Client | Data pelanggan/client |
| Product | Master item produk/jasa |
| Invoice | Invoice dengan status tracking |
| InvoiceItem | Line items di invoice |
| Payment | Pembayaran (support partial) |
| ActivityLog | Log aktivitas sistem |

### Invoice Status Flow

```text
DRAFT → SENT → PAID
              → OVERDUE (auto via cron)
       → CANCELLED
```

### Payment Methods

- Bank Transfer
- Cash
- Credit Card
- Midtrans
- Other

---

## 🔑 Authentication Features

### Credentials Authentication

- Registrasi akun menggunakan email dan password
- Login menggunakan email dan password
- Password disimpan dalam bentuk hash menggunakan bcrypt-ts

### Google Authentication

- Login menggunakan akun Google
- Akun otomatis dibuat jika belum terdaftar
- Session dikelola oleh NextAuth.js (JWT Strategy)

### Onboarding Flow

- User baru diarahkan ke halaman onboarding
- Setup organisasi (nama, email, alamat, logo, currency, tax)
- Setelah onboarding, redirect ke dashboard

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/FajarRp11/saas-invoice.git

cd saas-invoice
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
# Database
DATABASE_URL="postgresql://username:password@host:5432/dbname?sslmode=require"

# NextAuth
AUTH_SECRET="your-secret-key"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# Resend (Email)
APP_URL=http://localhost:3000/
RESEND_API_KEY="your-resend-api-key"
RESEND_DOMAIN="your-sender@domain.com"

# Cloudflare R2 (File Storage)
CLOUDFLARE_R2_ACCOUNT_ID="your-account-id"
CLOUDFLARE_R2_ACCESS_KEY_ID="your-access-key"
CLOUDFLARE_R2_SECRET_ACCESS_KEY="your-secret-key"
CLOUDFLARE_R2_BUCKET_NAME="your-bucket-name"
CLOUDFLARE_R2_PUBLIC_URL="https://your-r2-public-url"

# Cron Job
CRON_SECRET="your-cron-secret"
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

```
http://localhost:3000
```

### Email Preview (React Email)

```bash
npm run email:dev
```

---

## 🏗️ Build Production

```bash
npm run build
npm run start
```

---

## 📦 Main Dependencies

| Package | Deskripsi |
|---------|-----------|
| Next.js 16 | React Framework |
| NextAuth.js v5 | Authentication |
| Prisma v7 | ORM |
| PostgreSQL | Database |
| bcrypt-ts | Password Hashing |
| Zod | Validation |
| ShadCN UI | UI Components |
| Tailwind CSS v4 | Styling |
| Radix UI | Accessible Components |
| @react-pdf/renderer | PDF Generation |
| Resend | Transactional Email |
| Recharts | Dashboard Charts |
| @dnd-kit | Drag & Drop |
| @aws-sdk/client-s3 | Cloudflare R2 Storage |
| Sonner | Toast Notifications |
| TanStack Table | Data Table |
| Vaul | Drawer Component |

---

## 📸 Application Flow

### Onboarding

```text
Register / Login
 ↓
Check Organization
 ↓ (belum punya)
Onboarding Page
 ↓
Setup Organization (nama, email, logo, currency, tax)
 ↓
Dashboard
```

### Invoice Flow

```text
Create Invoice
 ↓
Add Client + Line Items
 ↓
Save as DRAFT
 ↓
Generate PDF (React PDF → Cloudflare R2)
 ↓
Send to Client (Resend Email)
 ↓
Status: SENT
 ↓
Record Payment (partial/full)
 ↓
Status: PAID
```

### Auto Overdue Detection

```text
Vercel Cron (daily at 01:00 UTC)
 ↓
Check SENT invoices where dueDate < now
 ↓
Update status → OVERDUE
```

---

## 🎨 UI Features

- Responsive Design
- Dark Mode
- Interactive Dashboard dengan Charts
- Data Table dengan Sorting & Filtering
- Drag & Drop Invoice Items
- Dialog-based CRUD untuk Client & Product
- Invoice PDF Preview & Download
- Status Badge (Draft, Sent, Paid, Overdue, Cancelled)
- Toast Notifications
- Form Validation Feedback
- Sidebar Navigation

---

## 🔒 Security Features

- Password hashing menggunakan bcrypt-ts
- JWT Session management menggunakan NextAuth.js
- OAuth Authentication menggunakan Google
- Server-side authentication checks
- Protected routes via middleware
- Input validation menggunakan Zod
- Cron job protection dengan Bearer token
- Organization-scoped data isolation

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

Developed by **Fajar Rahyudi**

- GitHub: https://github.com/FajarRp11
