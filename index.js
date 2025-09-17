const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');

// --- PESAN OTOMATIS ANDA ---
const pesanLibur = `Terima kasih telah menghubungi Admin Wifi Coin Cleon. 🙏

Pesan Anda telah kami terima. Saat ini kami sedang tidak beroperasi di akhir pekan (Sabtu dan Minggu).

Jam operasional kami adalah Senin - Jumat, pukul 08:00 - 17:00 WIB.

Kami akan segera merespons pesan Anda pada hari kerja berikutnya. Terima kasih atas pengertian Anda.`;
// ---------------------------------------------

// --- PENAMBAHAN KODE ---
// Variabel untuk menyimpan daftar user yang sudah dibalas di akhir pekan.
// Menggunakan Set agar setiap nomor unik dan pencarian lebih cepat.
const repliedUsers = new Set();
// -----------------------

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    const sock = makeWASocket({
        auth: state,
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
            console.log("QR Code diterima, silakan scan:");
            qrcode.generate(qr, { small: true });
        }
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error instanceof Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Koneksi terputus karena ', lastDisconnect.error, ', mencoba menghubungkan kembali... ', shouldReconnect);
            if (shouldReconnect) {
                connectToWhatsApp();
            }
        } else if (connection === 'open') {
            console.log('Koneksi WhatsApp berhasil dibuka!');
        }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        
        if (!msg.message || msg.key.fromMe || msg.key.remoteJid.endsWith('@g.us')) {
            return;
        }

        const tanggalSekarang = new Date();
        const hari = tanggalSekarang.getDay(); // 0 = Minggu, 6 = Sabtu

        // Cek apakah hari ini Sabtu (6) atau Minggu (0)
        if (hari === 0 || hari === 6) {
            // --- LOGIKA UTAMA ---
            // Cek apakah user sudah pernah dibalas. Jika sudah, abaikan pesan ini.
            if (repliedUsers.has(msg.key.remoteJid)) {
                return;
            }

            console.log(`Pesan pertama di akhir pekan dari ${msg.key.remoteJid}. Membalas otomatis...`);
            try {
                await sock.sendMessage(msg.key.remoteJid, { text: pesanLibur });
                // Tambahkan user ke daftar agar tidak dibalas lagi
                repliedUsers.add(msg.key.remoteJid);
                console.log(`Pesan libur berhasil dikirim ke ${msg.key.remoteJid}. Nomor ditambahkan ke daftar.`);
            } catch (error) {
                console.error("Gagal mengirim pesan:", error);
            }
        } else {
            // Jika sudah masuk hari kerja, kosongkan daftar repliedUsers
            if (repliedUsers.size > 0) {
                console.log("Memasuki hari kerja, membersihkan daftar pengguna yang telah dibalas.");
                repliedUsers.clear();
            }
        }
    });
}

connectToWhatsApp();
