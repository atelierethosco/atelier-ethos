# Tur 1 — TOPLU YÜKLEME (ZIP Yöntemi)

> **Bu talimat eskisinin yerine geçer.** Önceki tek tek yükleme bitti.
> Şimdi tüm dosyaları **bir kerede drag & drop ile** yükleyeceksin.
> **Süre:** Yaklaşık 5 dakika.

---

## Adım 1: ZIP'i indir ve çıkar

1. Sana verdiğim **`atelier-ethos-tur1.zip`** dosyasını indir
2. Bilgisayarında bir yere çıkar (örn. Masaüstü)
3. Çıkan klasörün içine gir: **`atelier-ethos-tur1/`**
4. İçinde şunları görmelisin:
   - `package.json`, `astro.config.mjs`, `vercel.json`, `.gitignore`, `tsconfig.json` (kökte)
   - `src/` klasörü
   - `docs/` klasörü

---

## Adım 2: GitHub'a drag & drop

1. Şu URL'e git: **`https://github.com/atelierethosco/atelier-ethos/upload/astro-migration`**
2. Sayfa "Drag files here..." yazan büyük bir alan gösterir
3. Bilgisayarında **`atelier-ethos-tur1` klasörünün İÇİNDEKİ** her şeyi seç:
   - `Cmd+A` (Mac) veya `Ctrl+A` (Windows) ile hepsini seç
   - **Klasörü değil, içindekileri** sürükle (yani `package.json`, `src/`, `docs/`, `.gitignore`, `tsconfig.json` vs.)
4. GitHub sayfasının drop alanına bırak
5. GitHub klasör yapısını otomatik koruyarak hepsini yükler

> Eğer GitHub bazı dosyaları "tanınmadı" derse, bir sorun yok — sadece tanıdığı dosyaları yükler. Eksik kalanları el ile yüklersin.

---

## Adım 3: Commit

1. Aşağıda commit message: `Tur 1 — Astro iskelet (ZIP upload)`
2. **"Commit directly to astro-migration branch"** seçili olsun
3. **"Commit changes"** tıkla

---

## Adım 4: Vercel'i bekle

1. https://vercel.com/dashboard → atelier-ethos → Deployments
2. En üstte yeni bir deploy başlamış olur (`astro-migration` branch)
3. ~30-40 saniye bekle
4. **Yeşil "Ready"** olmalı
5. "Visit" butonuna tıkla → preview URL açılır
6. Site stillerle birlikte düzgün görünmeli

---

## Görmen gerekenler

Site açıldığında:

- Üst menü: Logo solda, "Etkinlikler / Araçlar / Kaynaklar" ortada, kırmızı "Görüşme talep et" sağda — yan yana
- Eyebrow: kırmızı, küçük: `EST. 2022 · İK DANIŞMANLIK ATÖLYESİ`
- Büyük başlık: "İnsanı merkeze alan **sistemler** kuruyoruz." — sistemler kırmızı
- Alt yazı: "Süreç anlatmıyoruz, **birlikte** kuruyoruz..."
- Gri kutu: "Not: Bu geçici bir placeholder..."
- Footer: 4 kolonlu (Marka / Site / İletişim / Sosyal), beyazımsı zemin
- Sayfayı 400px aşağı kaydır → sağ altta kırmızı pill buton belirir

Logo görünmüyorsa: `LogoSS.png` `astro-migration` branch'inde de var (main'den miras alınmış olmalı). Eğer yoksa, `main` branch'inden indirip yükleyebilirsin.

---

## Sorun olursa

- Vercel kırmızı (Error) → "Build Logs" → kırmızı "Error" satırının screenshot'ını yolla
- Yeşil ama site bozuk → tarayıcı sağ tık → Inspect → Console sekmesi → kırmızı hata satırlarının screenshot'ı

---

**Bu yöntem güvenli — kopyala-yapıştır yok, dosyalar bilgisayardan direkt geçer.**
