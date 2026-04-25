# Atelier Ethos — Astro Göç Projesi — Karar Dosyası

> **Bu dosyanın amacı:** Chat dolduğunda yeni chat'e bağlam aktarmak.
> Bu dosyayı paylaşıp "kaldığım yerden devam et" demek yeterli olmalı.
> **Son güncelleme:** 25 Nisan 2026

---

## 🎯 Proje Özeti

Atelier Ethos web sitesini **düz HTML'den Astro framework'üne** geçiriyoruz.
Mevcut site: `atelier-ethos.vercel.app` (beta — domain henüz bağlı değil).
Hedef: Ölçeklenebilir, lead-magnet odaklı, tracking-hazır, içerik tarafı non-teknik kişi tarafından yönetilebilen bir site.

**Mevcut durum:** 11 HTML sayfası, hepsi kök dizinde, klasör yok, navbar/footer her dosyada tekrar.

---

## 📐 Teknik Kararlar ve Gerekçeleri

### Karar 1: Astro framework
**Neden:** Sık sayfa açılıyor (her atölye/webinar/lead magnet için), tracking gerekiyor (GA4, Pixel, LinkedIn Insight), UTM yakalama gerekiyor, ortak component'lar (navbar, footer, mail adresi) tek yerden yönetilmeli. Düz HTML'de bunların hepsi her sayfada tekrar yazılır → bakım kâbusu. Astro: yazarken parçalı, çıktı statik HTML, hız aynı, Vercel birinci sınıf destekliyor.
**Reddedilenler:** Saf HTML (ölçeklenmez), Next.js (overkill, statik içerik için ağır), 11ty (Astro daha aktif geliştiriliyor).

### Karar 2: Branch stratejisi → `astro-migration` branch
**Neden:** Yeni repo açmak Vercel/GitHub setup yükü. Mevcut `main` ve beta site bozulmasın. Hazır olunca `main`'e merge.

### Karar 3: Yükleme yöntemi → GitHub web arayüzü
**Neden:** Ece teknik araç (CLI, VS Code, GitHub Desktop) kullanmıyor. GitHub'da `https://github.com/atelierethosco/atelier-ethos/new/astro-migration` URL'i ile direkt yeni dosya oluşturuluyor. Claude her dosyayı tam yol + tam içerik şeklinde verecek.

### Karar 4: Tasarım dili → tasarım rehberi dosyası kanun
**Kaynak:** `atelier-ethos-astro-tasarim-referansi.html` (Ece tarafından yüklendi).
**Özet:** 9 renk token (`--ae-*`), tek font (Inter), `<em>` = kırmızı vurgu, hairline kenarlıklar, gölge yok, beyaz baskın zemin, "bir kelime kırmızı" imza, kişisel iletişim sayfada YOK.
**Kritik kural:** Tasarım kararları tartışmaya açık değildir. Kod yazarken bu rehbere uyulur.

### Karar 5: Component mimarisi → atomik (3 katman)
- `src/components/ui/` — Eyebrow, Button, Card, StatBlock, QuoteBlock, Input
- `src/components/sections/` — Hero, Approach, Stats, Services, WhyUs, Contact
- `src/components/layout/` — Navbar, Footer, BaseLayout, StickyCTA
**Neden:** Tasarım rehberinin önerisi. Marka token'ları component içinde çağrılır, prop ile renk geçilmez → yapısal tutarlılık.

### Karar 6: Klasör yapısı (sayfalar)
