document.addEventListener('DOMContentLoaded', function () {

    /* =======================================================
       1. NAVİGASYON VE MENÜ OTOMASYONU (REFACTORING)
    ======================================================= */
    
    // A) Sol Menü Aktiflik Ayarı (Otomatik)
    const currentPath = window.location.pathname;
    const activePath = currentPath.includes('cari_detay.html')
        ? 'cariler.html'
        : currentPath.includes('islem_detay.html')
            ? 'gelirgider.html'
            : currentPath;
    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach(link => {
        // Linkin href değerini al (örn: cariler.html)
        const linkPath = link.getAttribute('href');
        
        // Eğer şu anki URL bu linki içeriyorsa 'active' yap
        if (activePath.includes(linkPath) && linkPath !== '#') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // B) Akıllı Yönlendirme (Tablo Satırları İçin)
    // Tüm .table-row elemanlarını bul
    const tableRows = document.querySelectorAll('.table-row');
    
    tableRows.forEach(row => {
        row.addEventListener('click', (e) => {
            // Eğer tıklanan yer bir buton veya input ise yönlendirme yapma (aksiyon al)
            if (e.target.closest('button') || e.target.closest('input') || e.target.closest('a')) return;

            // Sayfaya göre nereye gideceğini belirle
            if (currentPath.includes('cariler.html')) {
                window.location.href = 'cari_detay.html';
            } else {
                // Dashboard veya GelirGider sayfasındaysa işlem detayına git
                window.location.href = 'islem_detay.html';
            }
        });
    });

    /* =======================================================
       2. GRAFİK ÇİZİMLERİ (SAYFA KONTROLLÜ)
    ======================================================= */

    // Dashboard: Nakit Akışı
    const cashCanvas = document.getElementById('cashFlowChart');
    if (cashCanvas) {
        const ctxCash = cashCanvas.getContext('2d');
        let gradientGreen = ctxCash.createLinearGradient(0, 0, 0, 400);
        gradientGreen.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
        gradientGreen.addColorStop(1, 'rgba(16, 185, 129, 0)');

        new Chart(ctxCash, {
            type: 'line',
            data: {
                labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu'],
                datasets: [
                    { label: 'Nakit Akışı', data: [50, 60, 55, 70, 85, 80, null, null], borderColor: '#10B981', backgroundColor: gradientGreen, fill: true, tension: 0.4 },
                    { label: 'AI Tahmini', data: [null, null, null, null, null, 80, 85, 95], borderColor: '#8B5CF6', borderDash: [5, 5], tension: 0.4 }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { grid: { color: '#2d3246' } }, x: { grid: { display: false } } }, plugins: { legend: { display: false } } }
        });
    }

    // Gelir/Gider Sayfası Grafikleri
    const barCanvas = document.getElementById('barChart');
    if (barCanvas) {
        new Chart(barCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'],
                datasets: [
                    { label: 'Gelir', data: [45, 52, 48, 60, 75, 80], backgroundColor: '#10B981', borderRadius: 4 },
                    { label: 'Gider', data: [35, 40, 38, 45, 50, 55], backgroundColor: '#EF4444', borderRadius: 4 }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { grid: { color: '#2d3246', drawBorder: false }, beginAtZero: true }, x: { grid: { display: false } } }, plugins: { legend: { display: false } } }
        });
    }

    const donutCanvas = document.getElementById('categoryChart');
    if (donutCanvas) {
        new Chart(donutCanvas.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Personel', 'Pazarlama', 'Altyapı'],
                datasets: [{ data: [45, 20, 15], backgroundColor: ['#EF4444', '#F59E0B', '#3B82F6'], borderWidth: 0, hoverOffset: 4 }]
            },
            options: { responsive: true, maintainAspectRatio: false, cutout: '75%', plugins: { legend: { display: false } } }
        });
    }

    // AI Sayfası Gelişmiş Grafik
    const forecastEl = document.getElementById('forecastChart');
    if (forecastEl) {
        const ctxFore = forecastEl.getContext('2d');
        let gradPast = ctxFore.createLinearGradient(0, 0, 0, 400);
        gradPast.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        gradPast.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        let gradTunnel = ctxFore.createLinearGradient(0, 0, 0, 400);
        gradTunnel.addColorStop(0, 'rgba(139, 92, 246, 0.2)');
        gradTunnel.addColorStop(1, 'rgba(139, 92, 246, 0.05)');

        new Chart(ctxFore, {
            type: 'line',
            data: {
                labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki'],
                datasets: [
                    { label: 'Gerçekleşen', data: [80, 85, 82, 90, 95, 100, null, null, null, null], borderColor: '#3B82F6', backgroundColor: gradPast, borderWidth: 3, fill: true, tension: 0.4, order: 1 },
                    { label: 'Tahmin', data: [null, null, null, null, null, 100, 110, 115, 125, 130], borderColor: '#8B5CF6', borderWidth: 3, borderDash: [6, 6], tension: 0.4, fill: false, order: 0 },
                    { label: 'Üst Sınır', data: [null, null, null, null, null, 100, 125, 135, 150, 160], borderColor: 'transparent', fill: '+1', backgroundColor: gradTunnel, tension: 0.4, order: 2 },
                    { label: 'Alt Sınır', data: [null, null, null, null, null, 100, 95, 90, 95, 90], borderColor: 'transparent', fill: false, tension: 0.4, order: 3 }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } } }
        });
    }

    /* =======================================================
       3. MODAL İŞLEMLERİ (ORTAK)
    ======================================================= */
    
    // Modal Aç/Kapa Helper Fonksiyonu
    const setupModal = (modalId, btnId, closeId, cancelId) => {
        const modal = document.getElementById(modalId);
        const btn = document.getElementById(btnId);
        const close = document.getElementById(closeId);
        const cancel = document.getElementById(cancelId);
        
        if(btn && modal) {
            btn.addEventListener('click', () => modal.classList.add('active'));
            const closeModal = () => modal.classList.remove('active');
            if(close) close.addEventListener('click', closeModal);
            if(cancel) cancel.addEventListener('click', (e) => { e.preventDefault(); closeModal(); });
            window.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
        }
    };

    // Tüm modalları başlat
    setupModal('addCariModal', 'addCariBtn', 'closeModal', 'cancelModal');
    setupModal('addTransModal', 'addTransBtn', 'closeTransModal', 'cancelTransModal');
    setupModal('collectionModal', 'addCollectionBtn', 'closeCollectionModal', 'cancelCollectionModal');

    // Cari Ekleme Formu Submit (Demo)
    const cariForm = document.getElementById('addCariForm');
    if(cariForm) {
        cariForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Burada tabloya ekleme kodu olabilir (önceki örnekteki gibi)
            document.getElementById('addCariModal').classList.remove('active');
            cariForm.reset();
        });
    }
});
