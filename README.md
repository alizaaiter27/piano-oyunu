# Piano Tiles Oyunu

Modern bir Piano Tiles oyunu implementasyonu. Leaderboard sistemi ve çoklu şarkı desteği ile geliştirilmiş bir web uygulaması.

## Özellikler

- Çoklu şarkı desteği
- Leaderboard sistemi
- Responsive tasarım
- Dokunmatik ve klavye desteği
- MySQL veritabanı entegrasyonu

## Teknolojiler

- HTML5
- CSS3
- JavaScript
- PHP
- MySQL

## Kurulum

1. Hostinger hesabınızda MySQL veritabanı oluşturun
2. Veritabanı tablolarını oluşturun:
```sql
CREATE TABLE scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
3. Dosyaları Hostinger sunucunuza yükleyin
4. `api/config.php` dosyasındaki veritabanı bilgilerini güncelleyin

## Proje Yapısı

```
piano-tiles/
├── index.html
├── leaderboard.html
├── api/
│   ├── config.php
│   ├── save_score.php
│   └── get_leaderboard.php
├── css/
│   ├── style.css
│   └── leaderboard.css
├── js/
│   ├── src.js
│   └── leaderboard.js
└── assets/
    ├── images/
    └── sounds/
```

## Geliştirme Roadmap

### 1. Gün (Pazartesi) - Veritabanı ve Backend Kurulumu
- [x] Veritabanı tasarımı
- [x] PHP API dosyaları oluşturma
  - config.php
  - save_score.php
  - get_leaderboard.php

### 2. Gün (Salı) - Leaderboard Arayüzü
- [x] Leaderboard sayfası oluşturma
- [x] Tablo tasarımı
- [x] Responsive tasarım

### 3. Gün (Çarşamba) - Oyun Entegrasyonu
- [x] Skor kaydetme sistemi
- [x] Oyun sonu modalı
- [x] İsim girişi
- [x] API entegrasyonu

### 4. Gün (Perşembe) - UI/UX İyileştirmeleri
- [x] Ana oyun arayüzü
- [x] Modern tasarım
- [x] Animasyonlar
- [x] Responsive düzenlemeler

### 5. Gün (Cuma) - Test ve Hata Düzeltme
- [x] Backend testleri
- [x] Frontend testleri
- [x] Hata yakalama
- [x] Performans testleri

### 6. Gün (Cumartesi) - Deployment
- [x] Hostinger kurulumu
- [x] Veritabanı oluşturma
- [x] Dosya yükleme
- [x] Bağlantı testleri

### 7. Gün (Pazar) - Dokümantasyon ve Son Düzenlemeler
- [x] README hazırlama
- [x] Kod yorumları
- [x] Son testler
- [x] Canlıya alma

## Görev Dağılımı

### 1. Backend Geliştirici
- PHP API geliştirme
- Veritabanı yönetimi
- Güvenlik önlemleri
- Hostinger kurulumu

### 2. Frontend Geliştirici
- HTML/CSS geliştirmeleri
- Responsive tasarım
- UI/UX iyileştirmeleri
- Cross-browser uyumluluk

### 3. JavaScript Geliştirici
- Oyun mantığı
- API entegrasyonu
- Veri yönetimi
- Performans optimizasyonu

### 4. Test ve Kalite Kontrol
- Test senaryoları
- Hata raporlama
- Kullanıcı deneyimi
- Dokümantasyon

## Önemli Notlar

### Güvenlik
- SQL injection koruması
- XSS koruması
- CORS ayarları
- Input validasyonu

### Performans
- Veritabanı indeksleme
- Önbellek kullanımı
- Kod optimizasyonu
- Asset optimizasyonu

### Kullanıcı Deneyimi
- Hata mesajları
- Yükleme göstergeleri
- Responsive tasarım
- Kolay navigasyon

### Test
- API testleri
- Cross-browser test
- Mobil test
- Performans testi

## Katkıda Bulunma

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik: X'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request oluşturun

