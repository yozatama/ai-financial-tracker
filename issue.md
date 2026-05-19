# Perencanaan Implementasi Lanjutan (Frontend & Fitur Lanjutan)

## 1. Ringkasan Tugas
Dokumen ini berisi perencanaan untuk penyempurnaan UI/UX (*User Interface / User Experience*) pada *frontend* dan penambahan fitur lanjutan bagi pengguna. Implementasi ini berfokus pada pengalaman pengguna yang mulus, keamanan otentikasi, dan visualisasi data yang interaktif.

## 2. Detail Pekerjaan (Berdasarkan Modul)

### A. Landing Page (Single Page Application)
Saat ini *Landing Page* terpisah menjadi beberapa rute. Tugasnya adalah menggabungkannya menjadi satu halaman panjang yang interaktif.

1.  **Penggabungan Halaman:**
    *   Pindahkan konten dari halaman `About`, `Pricing`, dan `FAQs` menjadi *section* di dalam halaman `Home` (`src/app/(public)/page.tsx`).
    *   Hapus rute individual untuk `/about`, `/pricing`, dan `/faq`.
2.  **Smooth Scrolling:**
    *   Ubah tautan (Link) pada `Header` (Navbar) agar mengarah ke ID *section* di halaman yang sama (contoh: `href="#about"`, `href="#pricing"`).
    *   Gunakan CSS atau library (seperti `framer-motion` atau fitur native browser `scroll-behavior: smooth`) untuk memberikan efek animasi *scrolling*/*dragging* yang mulus saat menu diklik.
3.  **Lightweight Animations:**
    *   Tambahkan animasi *fade-in* atau *slide-up* pada elemen saat di-*scroll* (bisa menggunakan `framer-motion` atau Tailwind CSS plugins).
    *   Pastikan animasi tidak memberatkan performa (*bundle size* kecil dan tidak menyebabkan *layout shift* yang parah).

### B. Otentikasi (Login & Register)
Membangun halaman dan logika otentikasi yang aman dan lengkap.

1.  **Halaman UI:**
    *   Buat halaman `/login` dan `/register` dengan desain yang konsisten dengan estetika utama (gelap, aksen neon).
    *   Pastikan tombol Login & Sign Up di Header mengarah ke halaman ini agar tidak terjadi *error 404*.
2.  **Keamanan & Anti-Spam:**
    *   **Register:** Terapkan pembatasan (*rate limiting*) atau sistem anti-spam (contoh: Google reCAPTCHA v3 atau Cloudflare Turnstile) untuk mencegah registrasi bot otomatis. *(Perlu penyesuaian di sisi backend juga).*
    *   **Login:** Terapkan mekanisme *Maximum Wrong Password* (misal: blokir akun sementara selama 15 menit setelah 5 kali gagal login).
3.  **Social Login (OAuth):**
    *   Siapkan tombol "Login with Google" dan "Login with Apple" di halaman otentikasi.
    *   Gunakan library seperti `next-auth` (Auth.js) atau layanan eksternal (seperti Supabase Auth / Clerk / Firebase) untuk mempermudah integrasi jika diizinkan, atau buat integrasi OAuth manual ke backend Elysia.

### C. Aktivitas Pengguna (User Activity Area)
Membangun antarmuka utama setelah pengguna berhasil *login*. Buat *layout* khusus pengguna (misal di `/dashboard`).

1.  **Manajemen Dompet (Wallet CRUD):**
    *   Antarmuka untuk melihat daftar dompet.
    *   Fungsi untuk Menambah (*Add*), Mengubah (*Edit*), dan Menghapus (*Delete*) dompet.
2.  **Manajemen Transaksi (Transaction CRUD):**
    *   Tabel atau daftar riwayat transaksi.
    *   Formulir manual untuk *Add/Edit/Delete* transaksi.
3.  **Chat Form (AI Input):**
    *   Buat komponen interaktif berbentuk seperti "Chat" untuk menginput transaksi secara otomatis via AI.
    *   Dukung 3 jenis input:
        *   **Teks:** Ketik kalimat (contoh: "Beli bensin 20rb").
        *   **Voice (Suara):** Integrasikan Web Speech API untuk merekam suara dan mengubahnya menjadi teks sebelum dikirim ke AI.
        *   **Gambar/Struk (Image):** Fitur *upload* gambar struk (integrasikan dengan Gemini Vision API di backend untuk membaca struk).

### D. Berlangganan & Pembayaran (Subscription & Checkout)
1.  **Halaman Pemilihan Paket:**
    *   Buat halaman di dalam area pengguna (contoh: `/dashboard/upgrade`) yang menampilkan pilihan paket berlangganan.
2.  **Checkout & Billing Information:**
    *   Buat formulir (dengan validasi Zod) untuk mengumpulkan *Billing Information* (Nama, Alamat, No. Telepon, dll) sebelum pembayaran.
3.  **Integrasi Xendit:**
    *   Hubungkan proses *checkout* dengan API Backend untuk menghasilkan tautan tagihan (*Invoice URL*) dari Xendit.
    *   Arahkan pengguna ke halaman pembayaran Xendit.

### E. Dashboard Analytics (Visualisasi Data)
1.  **Visualisasi Pemasukan/Pengeluaran:**
    *   Gunakan library grafik interaktif seperti `recharts` atau `chart.js` (yang sering dipasangkan dengan shadcn/ui).
    *   Buat *Bar Chart* atau *Line Chart* yang memiliki animasi saat dimuat.
    *   Sediakan filter waktu: Per Hari, Per Bulan, Per Tahun.
2.  **Kategori Pengeluaran (Top Spending):**
    *   Buat *Donut Chart* atau *Pie Chart* untuk menampilkan kategori mana yang paling banyak menghabiskan uang.
3.  **Highlight Ringkasan:**
    *   Tampilkan kartu ringkasan untuk Total Pemasukan (*Income*) dan Total Pengeluaran (*Expense*) bulan ini.

### F. Highlight Saldo Total (Total Balance)
*   Kalkulasi total saldo dari seluruh *wallets* yang dimiliki pengguna.
*   Tampilkan informasi "Total Balance" ini di lokasi yang sangat terlihat (rekomendasi: di **Sidebar navigasi** bagian atas, atau di **Header Dasbor** pengguna) agar pengguna selalu tahu posisi keuangannya secara instan.

---

## Instruksi untuk Implementator (Junior Dev / AI)
1.  **Kerjakan secara bertahap (Incremental):** Mulailah dari perombakan *Landing Page*, kemudian berlanjut ke sistem *Auth*, lalu UI *Dashboard* pengguna, dan terakhir integrasi pembayaran/analitik.
2.  **Gunakan Komponen yang Ada:** Manfaatkan komponen dari `shadcn/ui` sebanyak mungkin untuk menjaga konsistensi desain (terutama gaya *minimalist dark mode* dengan aksen neon).
3.  **Fokus pada UI/UX terlebih dahulu:** Jika integrasi backend (misal: anti-spam atau Xendit) terasa rumit, bangun UI-nya (*mockup*) terlebih dahulu agar secara visual sudah sempurna, baru kemudian sambungkan dengan API (Axios/React Query).
4.  Gunakan `framer-motion` jika diperlukan animasi yang kompleks, tetapi pastikan animasi terasa responsif ("sat-set").