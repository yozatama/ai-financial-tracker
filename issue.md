# Perencanaan Implementasi Frontend & Admin Panel AI Financial Tracker

## 1. Ringkasan Tugas
Tugas ini bertujuan untuk membangun antarmuka pengguna (Frontend) untuk aplikasi **AI Financial Tracker** yang *production-ready*. Pekerjaan ini mencakup pembuatan halaman publik (Landing Page), struktur navigasi utama, serta pembuatan Admin Panel (CMS) untuk mengelola data operasional dan konten website.

## 2. Spesifikasi Tech Stack
Pengembangan *frontend* wajib menggunakan tumpukan teknologi berikut:
*   **Framework:** Next.js (App Router) dengan TypeScript.
*   **Styling & UI:** Tailwind CSS dan shadcn/ui (untuk komponen UI interaktif).
*   **Data Fetching & State:** TanStack Query (React Query) dipadukan dengan Axios atau native `fetch`.
*   **Form Management:** React Hook Form dipadukan dengan Zod untuk validasi skema.
*   **Icons:** Lucide React.

## 3. Kebutuhan Fitur & Halaman

### A. Tata Letak (Layout) & Navigasi Publik
*   **Header (Navbar):** Berisi logo aplikasi, menu navigasi (Home, About, Pricing, FAQs), dan tombol otentikasi (Login / Sign Up).
*   **Footer:** Berisi tautan cepat, hak cipta, dan informasi kontak/sosial media.

### B. Halaman Publik (Landing Pages)
Konten pada halaman-halaman ini harus relevan dengan produk "AI Financial Tracker":
1.  **Home (`/`):** Halaman utama yang menonjolkan fitur pencatatan otomatis via AI (teks, suara, struk), dukungan multi-dompet, dan ajakan (*Call to Action*) untuk mencoba secara gratis.
2.  **About (`/about`):** Halaman yang menjelaskan visi misi aplikasi, bagaimana AI mempermudah pencatatan keuangan, dan informasi tim/produk.
3.  **Pricing (`/pricing`):** Halaman perbandingan paket langganan (Free, Pro, Pro Max) yang menampilkan batas kuota dan fitur masing-masing paket.
4.  **FAQs (`/faq`):** Halaman tanya jawab seputar cara kerja AI *parsing*, keamanan data, dan mekanisme berlangganan.

### C. Admin Panel (Dashboard)
Halaman khusus dengan *layout* terpisah (misalnya di *path* `/admin`) yang digunakan pengelola aplikasi untuk mengatur data dan konten. Halaman ini meliputi:
1.  **Content Management:**
    *   **Manage Pricing:** Antarmuka untuk mengubah harga dan deskripsi fitur dari tiap paket (Free, Pro, Pro Max).
    *   **Manage FAQs:** Antarmuka untuk Menambah, Mengubah, dan Menghapus daftar pertanyaan dan jawaban.
    *   **Manage About:** Antarmuka untuk mengubah teks konten pada halaman About.
    *(Catatan: Jika API backend untuk pengaturan konten ini belum tersedia, siapkan UI-nya terlebih dahulu dengan data statis / mock yang siap dihubungkan ke API nantinya).*
2.  **Master Data & Operational CRUD:**
    *   **Users:** Tabel untuk melihat daftar pengguna, mengubah data pengguna, atau menghapus pengguna.
    *   **Transactions:** Tabel untuk melihat seluruh riwayat transaksi (global/per user), dan fungsi hapus/edit (jika diperlukan untuk admin).
    *   **Categories:** CRUD untuk Master Data kategori transaksi (Income/Expense).
    *   **Wallets:** CRUD untuk Master Data ketersediaan dompet/bank.

## 4. Tahapan Implementasi (Panduan Pengerjaan)

Instruksi ini dirancang agar dapat dikerjakan secara bertahap oleh *junior programmer* atau *AI model*:

**Tahap 1: Inisialisasi Proyek**
1. Lakukan inisialisasi proyek Next.js baru dengan perintah `npx create-next-app@latest frontend-app`.
2. Lakukan instalasi dependensi utama: Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, dan Zod.
3. Setup struktur direktori yang rapi (misalnya memisahkan folder `components`, `app`, `lib`, dan `hooks`).

**Tahap 2: Pembuatan Layout Publik & Halaman Statis**
1. Buat komponen `Header` dan `Footer`. Pastikan responsif di perangkat *mobile* maupun *desktop*.
2. Buat halaman **Home**, **About**, **Pricing**, dan **FAQs**. Gunakan komponen shadcn/ui (seperti *Cards*, *Accordions* untuk FAQ, dan *Buttons*) agar desain terlihat profesional.

**Tahap 3: Persiapan Layout Admin Panel**
1. Buat *layout* khusus untuk admin (contoh: `app/admin/layout.tsx`) yang memiliki *Sidebar* navigasi di sisi kiri dan area konten di sisi kanan.
2. Buat menu navigasi di *Sidebar* yang mengarah ke bagian Content Management dan Operational CRUD.

**Tahap 4: Implementasi Halaman Admin Panel**
1. **Content Management UI:** Bangun antarmuka formulir (menggunakan React Hook Form + Zod) untuk pengaturan Pricing, FAQs, dan About.
2. **Master Data CRUD:** 
    * Gunakan komponen *Data Table* (bisa memanfaatkan library tambahan seperti `@tanstack/react-table` yang terintegrasi dengan shadcn/ui) untuk menampilkan Users, Transactions, Categories, dan Wallets.
    * Integrasikan tabel-tabel ini dengan endpoint API Backend yang sudah tersedia di tahap sebelumnya menggunakan React Query untuk proses *fetching*, *caching*, dan *mutations*.

**Tahap 5: Finalisasi & Integrasi API**
1. Hubungkan form otentikasi (Login/Register) di frontend dengan API backend untuk mendapatkan JWT.
2. Simpan token JWT (bisa menggunakan *cookies* atau *local storage*) dan gunakan sebagai *header* `Authorization` saat mengakses API yang diproteksi.
3. Pastikan fitur *logout* berfungsi dengan menghapus token dari sisi *client* dan memanggil API *logout* di *backend*.
