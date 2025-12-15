# Mobil Odaklanma Projesi 🎯

Bu proje, React Native ve Expo kullanılarak geliştirilmiş, kullanıcıların odaklanma sürelerini yönetmelerini, dikkat dağınıklıklarını takip etmelerini ve verimliliklerini analiz etmelerini sağlayan kapsamlı bir mobil uygulamadır.

## 🚀 Özellikler

### ⏱ Odaklanma Zamanlayıcısı
- Özelleştirilebilir çalışma süreleri belirleyin.
- Oturum sırasında kalan süreyi görsel olarak takip edin (`TimerDisplay` bileşeni).
- Zamanlayıcıyı başlatın, duraklatın ve sıfırlayın.

### 📊 Detaylı Raporlama
- **Grafikler:** `react-native-chart-kit` kullanılarak oluşturulan görsel grafiklerle performansınızı analiz edin.
- **İstatistikler:** Tamamlanan oturum sayıları, toplam odaklanma süresi ve başarı oranları.
- Geçmiş oturumların detaylı listesi.

### 🧩 Dikkat Dağınıklığı Takibi
- Çalışma seansı sırasında dikkatinizi dağıtan unsurları anlık olarak kaydedin.
- Hangi faktörlerin verimliliğinizi etkilediğini raporlar ekranında görün.

### 💡 Motivasyon Desteği
- Her oturumda sizi motive edecek rastgele sözler (`MotivationalQuote` bileşeni).
- Çalışma azminizi artıracak kullanıcı dostu arayüz.

### 💾 Veri Saklama
- Tüm çalışma verileriniz ve ayarlarınız `AsyncStorage` kullanılarak cihazınızda güvenle saklanır.
- Uygulamayı kapatıp açsanız bile verileriniz kaybolmaz.

## 🛠 Kullanılan Teknolojiler

Bu proje aşağıdaki modern teknolojiler ve kütüphaneler kullanılarak geliştirilmiştir:

- **React Native & Expo:** Çapraz platform mobil uygulama geliştirme.
- **React Navigation:** Uygulama içi akıcı gezinme (Bottom Tabs).
- **Async Storage:** Yerel veri depolama çözümü.
- **React Native Chart Kit:** Veri görselleştirme ve grafikler.
- **Lucide React Native:** Modern ve şık ikon setleri.
- **React Hooks:** Özelleştirilmiş hook'lar (`useFocusTimer`, `useStorage`) ile temiz kod yapısı.

## 📂 Proje Yapısı

Proje, sürdürülebilirlik ve genişletilebilirlik gözetilerek modüler bir yapıda düzenlenmiştir:

```
mobil_proje/
├── App.js                  # Ana uygulama giriş noktası ve navigasyon yapılandırması
├── src/
│   ├── screens/            # Uygulama ekranları
│   │   ├── HomeScreen.js     # Ana odaklanma ekranı
│   │   └── ReportsScreen.js  # İstatistik ve rapor ekranı
│   ├── components/         # Yeniden kullanılabilir UI bileşenleri
│   │   ├── TimerDisplay.js   # Sayaç göstergesi
│   │   └── MotivationalQuote.js # Motivasyon sözleri kartı
│   └── hooks/              # Mantıksal işlemler için özel hook'lar
│       ├── useFocusTimer.js  # Zamanlayıcı mantığı
│       └── useStorage.js     # Veri okuma/yazma işlemleri
└── package.json            # Proje bağımlılıkları ve script'ler
```

## 🏁 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1. **Repoyu Klonlayın:**
   ```bash
   git clone https://github.com/ipekdural/MobilProject
   cd mobil_proje
   ```

2. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

3. **Uygulamayı Başlatın:**
   ```bash
   npx expo start
   ```
   Bu komut Expo geliştirici araçlarını başlatacaktır.

4. **Cihazda Çalıştırın:**
   - **Android:** `a` tuşuna basın veya Expo Go uygulaması ile QR kodu taratın.
   - **iOS:** `i` tuşuna basın veya Expo Go uygulaması ile QR kodu taratın.



