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
**Neden:** Ece teknik araç (CLI, VS Code, GitHub Desktop) kullanmıyor. GitHub'da `Add file → Create new file → yol yaz → içerik yapıştır → Commit` akışı yeterli. Claude her dosyayı tam yol + tam içerik şeklinde verecek.

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
```
/                                  → ana sayfa
/etkinlikler                       → hub (yaklaşan + geçmiş + YouTube embed)
  /yetkinlik-performans/           → mevcut webinar serisi
/araclar                           → hub (interaktif değerlendirmeler)
  stres-olcegi
  ik-pusulasi
/kaynaklar                         → hub (kategorize doküman deposu)
  /performans/
  /stres-iyilik-hali/
  /liderlik-kultur/
/yonetim                           → admin (gizli)
```
**Neden:** Doğal işlevsel gruplama. Ölçeklenebilir.

### Karar 7: URL kırılma riski → YOK (henüz)
**Neden:** Custom domain (atelierethos.com) hâlâ Carrd'a bağlı, Vercel'e değil. Beta URL'leri (`atelier-ethos.vercel.app/*`) kimse aktif kullanmıyor. Yeni yapıyı temizce kurarız, en sonda domain yönlendirmesi yapılır. **Yine de** bazı temel redirect'ler `vercel.json`'a konacak (eski Vercel beta URL'lerini kullanan biri varsa diye).

### Karar 8: Tracking → boş slot stratejisi
**Neden:** GA4/Pixel/LinkedIn henüz kurulmamış. Astro yapısında bu tracking için **boş yerler** hazır olacak (`Analytics.astro` componenti). Ece hesapları açtığında ID'leri verir, tek dosyada doldururuz, **tüm site otomatik kapsanır**.

### Karar 9: Lead magnet şablonları (3 tip)
**Neden:** Sık sayfa açılıyor, hepsi lead magnet. Sıfırdan kod yazmak yerine şablon:
- **A) WebinarLanding** — kayıt formu + UTM + Sheets + mail
- **B) LeadMagnetDownload** — "PDF/Excel indir, mail bırak" akışı
- **C) Assessment** — interaktif test (stres ölçeği gibi), sonuç + PDF

Yeni sayfa = şablonu kopyala, içerik değiştir, deploy. Hedef: 10-15 dakikada yeni sayfa.

### Karar 10: Standart event sistemi
**Neden:** Conversion ölçümü tutarlı olsun. Tüm sayfalar şu standart event'leri atar:
- `lead_form_submit` (kaynak sayfa, UTM dahil)
- `pdf_download` (hangi doküman)
- `cta_click` (hangi buton, hangi sayfa)
- `assessment_complete` (hangi ölçek, sonuç)

GA4 + Meta Pixel'de conversion olarak görünür → reklam optimizasyonu yapılabilir.

### Karar 11: Admin bölümü → content layer + dashboard
**Sorun:** Ece her küçük metin/tarih değişikliği için Claude'a gelmek istemez.
**Çözüm 2 katmanlı:**
- **Content layer:** Sayfa kodu sabit, içerik markdown dosyalarında (`src/content/etkinlikler/yetkinlik-performans.md` gibi). Webinar tarihi değiştirmek = tek satır.
- **Admin dashboard:** Şifreli giriş, lead görüntüleme, etkinlik ekle/düzenle, UTM kampanya yönetimi.
**Yapım sırası:** Content layer 4. turda, dashboard 5-6. turda.

### Karar 12: Form backend
**Mevcut durum:** Stres ölçeği = Apps Script + Sheets + mail. Webinar form = ayrı Apps Script. Contact form = Formspree.
**Hedef:** Tek standart akış. Tüm formlar Apps Script'e POST eder, **standart payload formatı**:
```json
{
  "form_type": "webinar_signup | lead_magnet | assessment | contact",
  "page_url": "...",
  "utm_source": "...", "utm_medium": "...", "utm_campaign": "...",
  "data": { ... form alanları ... },
  "timestamp": "..."
}
```
Apps Script bu payload'u alır, doğru Sheets'e yazar, doğru maili atar.
**Bu hafta sonu audit'inde finalize edilecek.**

---

## 🗂️ Repo Yapısı (planlanan)

```
atelier-ethos/
├── astro.config.mjs
├── package.json
├── vercel.json
├── public/
│   ├── LogoSS.png
│   ├── gptw.png
│   ├── stevie.png
│   └── webinar-yetkinlik-banner.png
├── src/
│   ├── styles/
│   │   └── global.css                  ← 9 token + tipografi + <em> kuralı
│   ├── layouts/
│   │   └── BaseLayout.astro            ← <head>, font, navbar, footer, slot
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.astro
│   │   │   ├── Footer.astro
│   │   │   ├── StickyCTA.astro
│   │   │   └── Container.astro
│   │   ├── ui/
│   │   │   ├── Eyebrow.astro
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── StatBlock.astro
│   │   │   ├── QuoteBlock.astro
│   │   │   ├── ServiceCard.astro
│   │   │   ├── ReferenceCard.astro
│   │   │   └── Input.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── Approach.astro
│   │   │   ├── Stats.astro
│   │   │   ├── Services.astro
│   │   │   ├── WhyUs.astro
│   │   │   └── Contact.astro
│   │   └── tracking/
│   │       └── Analytics.astro         ← GA4 + Pixel + LinkedIn + UTM
│   ├── templates/
│   │   ├── WebinarLanding.astro
│   │   ├── LeadMagnetDownload.astro
│   │   └── Assessment.astro
│   ├── content/
│   │   ├── etkinlikler/                ← markdown dosyaları
│   │   ├── kaynaklar/
│   │   └── site-config.json            ← mail, sosyal medya, SEO meta
│   └── pages/
│       ├── index.astro
│       ├── etkinlikler/
│       │   ├── index.astro             ← hub
│       │   └── yetkinlik-performans/
│       │       ├── index.astro
│       │       ├── on-soru.astro
│       │       └── materyaller.astro
│       ├── araclar/
│       │   ├── index.astro             ← hub
│       │   ├── stres-olcegi.astro
│       │   └── ik-pusulasi.astro
│       ├── kaynaklar/
│       │   ├── index.astro             ← hub
│       │   └── performans/
│       │       ├── yetkinlik-bazli-kilavuz.astro
│       │       └── yetkinlik-bazli-sorular.astro
│       └── yonetim/
│           └── dashboard.astro         ← şifreli, lead görüntüleme
└── docs/
    └── proje-kararlari.md              ← BU DOSYA
```

---

## 🔢 Yapım Sırası (Tur Tur)

- **Tur 1:** Astro iskelet + global.css + BaseLayout + Navbar + Footer + Vercel/GitHub talimatları
- **Tur 2:** Atomik UI ve section componentleri
- **Tur 3:** index.astro (mevcut ana sayfa Astro'ya çevrilmiş hali)
- **Tur 4:** Tracking katmanı + 3 lead magnet şablonu + content layer
- **Tur 5:** Mevcut sayfaları (stres-olcegi, ik-pusulasi, webinar serisi) yeni şablonlara taşı
- **Tur 6:** Yeni sayfalar (etkinlikler hub, kaynaklar hub) + admin dashboard

Her tur sonunda Ece "tamam, deployed" dedikten sonra bir sonraki tura geçilir.

---

## 📞 İletişim Standardı (Sayfa İçeriği)

**Sayfalarda görünür:**
- Genel mail: `info@atelierethos.com` (veya `iletisim@`)
- Adres: Kızılırmak Mah. Dumlupınar Blv. No:3 C-1 İç Kapı No:160, Çankaya/Ankara
- Telefon: +90 530 474 69 48
- Sosyal: LinkedIn (`/company/atelier-ethos`), Instagram (`@atelierethos`)

**Sayfalarda görünmez:**
- Ece Demir adı (sadece form yönlendirmesinin arkasında)
- `ece.demir@atelierethos.com` (sadece form alıcısı olarak, public değil)

---

## 🚨 Açık Sorular / Bekleyenler

- [ ] Genel mail (`info@` veya `iletisim@`) açıldı mı? — Footer'a koymadan önce karar lazım
- [ ] GA4 hesabı açıldığında Measurement ID alınacak (`G-XXXXXXXXXX`)
- [ ] Meta Pixel ID — reklam başlamadan önce kurulacak
- [ ] LinkedIn Insight Tag Partner ID
- [ ] Custom domain (`atelierethos.com`) → en sonda Vercel'e yönlendirilecek
- [ ] Hafta sonu audit: tüm Sheets/Apps Script konsolidasyonu (ayrı dokümanda)
- [ ] Webinar kayıtları için YouTube kanalı kurulu mu? (Embed için kanal lazım)

---

## 💡 Notlar

- Marka rengi: `#C12033` (Pantone 200 C). Hover: `#A81C2B`. Bu değişmez.
- Section ritmi: 120px boşluk. Bu değişmez.
- "When unsure, use whitespace." — Tasarım rehberinin altın kuralı.
- Mevcut HTML sayfalarındaki Türkçe karakter sorunu yok (Vercel'de UTF-8 sorunsuz).
- jsPDF Helvetica → ASCII dönüşümü yapıyor, Türkçe karakterler PDF'te sadeleşiyor (bu kabul edilmiş bir trade-off).

---

**Yeni chat'e başlarken bu dosyayı paylaş + son tur numarasını söyle. Devam ederiz.**
