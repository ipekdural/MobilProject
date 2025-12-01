# Odaklanma Mobil Uygulaması (Focus Tracker)

Bu proje, kullanıcının odaklanma seanslarını takip etmesini sağlayan ve dikkat dağınıklığını ölçen bir mobil uygulamadır.

## Özellikler

- **Zamanlayıcı (Pomodoro):** 25 dakikalık geri sayım (ayarlanabilir).
- **Dikkat Dağılması Takibi:** Uygulama arka plana atıldığında (örn. başka uygulamaya geçildiğinde) sayaç durur ve dikkat dağılması olarak kaydedilir.
- **Raporlar ve İstatistikler:**
  - Günlük ve Toplam Odaklanma Süreleri
  - Grafiksel Gösterim (Son 7 gün, Kategori Dağılımı)
- **Kategori Yönetimi:** Çalışma, Kodlama, Kitap gibi kategoriler seçilebilir.

## Kurulum ve Çalıştırma

Bu projeyi çalıştırmak için bilgisayarınızda Node.js ve npm yüklü olmalıdır.

1. **Bağımlılıkları Yükleyin:**
   Proje dizininde terminali açın ve aşağıdaki komutu çalıştırın:
   ```bash
   npm install
   ```

2. **Uygulamayı Başlatın:**
   ```bash
   npx expo start
   ```

3. **Telefonda Çalıştırma:**
   - **Expo Go** uygulamasını telefonunuza indirin (App Store veya Google Play).
   - Terminalde çıkan QR kodunu Expo Go uygulaması ile taratın.
   - iOS Simülatör için 'i', Android Emülatör için 'a' tuşuna basabilirsiniz.

## Kullanılan Teknolojiler

- React Native (Expo)
- React Navigation (Bottom Tabs)
- AsyncStorage (Veri Saklama)
- react-native-chart-kit (Grafikler)
- Lucide React Native (İkonlar)

## Proje Yapısı

- `App.js`: Ana navigasyon yapısı.
- `src/screens/`: Ekranlar (HomeScreen, ReportsScreen).
- `src/hooks/`: Mantıksal kancalar (Timer, Storage).
