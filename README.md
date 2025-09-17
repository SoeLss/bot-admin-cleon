# 🤖 Bot Auto-Reply WhatsApp (Edisi Akhir Pekan)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Sebuah bot WhatsApp sederhana yang berfungsi sebagai asisten virtual untuk memberikan balasan otomatis kepada pelanggan yang menghubungi di luar jam kerja, khususnya pada akhir pekan (Sabtu dan Minggu).

Bot ini dirancang untuk memastikan setiap pelanggan mendapatkan respons awal dan informasi mengenai jam operasional, sehingga meningkatkan pengalaman pelanggan meskipun admin sedang tidak aktif.



---

### ✨ Fitur Utama

-   ✅ **Balasan Otomatis**: Secara otomatis membalas pesan pribadi yang masuk selama akhir pekan (Sabtu dan Minggu).
-   🧠 **Cerdas & Efisien**: Bot hanya akan membalas **satu kali** untuk setiap pengguna selama periode akhir pekan. Pesan berikutnya dari pengguna yang sama akan diabaikan untuk menghindari spam.
-   🗓️ **Deteksi Hari Otomatis**: Bot secara otomatis mendeteksi hari untuk mengaktifkan atau menonaktifkan fitur balasan.
-   🔄 **Reset Otomatis**: Daftar pengguna yang telah dibalas akan otomatis dikosongkan saat memasuki hari kerja (Senin), memastikan bot siap untuk akhir pekan berikutnya.
-   🛡️ **Aman**: Bot mengabaikan pesan dari grup dan pesan yang dikirim oleh dirinya sendiri untuk mencegah *loop* atau balasan yang tidak diinginkan.

---

### 🛠️ Teknologi yang Digunakan

-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Koneksi WhatsApp**: [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys)
-   **QR Code Generator**: [qrcode-terminal](https://github.com/gtanner/qrcode-terminal)

---

### 🚀 Cara Menjalankan Bot

Ikuti langkah-langkah berikut untuk menginstalasi dan menjalankan bot ini di server atau komputer Anda.

#### 1. Prasyarat

-   Pastikan Anda sudah menginstal **Node.js** (direkomendasikan versi 18 atau lebih tinggi).

#### 2. Instalasi

1.  **Clone repositori ini:**
    ```sh
    git clone [https://github.com/USERNAME/REPO_NAME.git](https://github.com/USERNAME/REPO_NAME.git)
    ```
2.  **Masuk ke direktori proyek:**
    ```sh
    cd REPO_NAME
    ```
3.  **Install semua dependensi yang dibutuhkan:**
    ```sh
    npm install @whiskeysockets/baileys @hapi/boom qrcode-terminal
    ```

#### 3. Kustomisasi Pesan

Buka file kode utama (misalnya `index.js`) dan ubah isi dari konstanta `pesanLibur` sesuai dengan pesan yang ingin Anda kirimkan.

```javascript
const pesanLibur = `
Terima kasih telah menghubungi [Nama Bisnis Anda]. 🙏

Pesan Anda telah kami terima. Saat ini kami sedang tidak beroperasi di akhir pekan.

Jam operasional kami adalah [Jam Kerja Anda].

Kami akan segera merespons pesan Anda pada hari kerja berikutnya.
`;
