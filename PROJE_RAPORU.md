# Mobil Odaklanma Projesi - Proje Raporu

## 1. Giriş
Bu proje, kullanıcıların belirli süreler boyunca odaklanmalarına yardımcı olmak, çalışma verimliliğini artırmak ve dikkat dağıtıcı unsurları takip etmek amacıyla geliştirilmiş bir mobil uygulamadır.

## 2. Sistem Mimarisi
Uygulama, **React Native** kütüphanesi ve **Expo** framework'ü kullanılarak geliştirilmiştir. Bileşen tabanlı bir mimari izlenmiş olup, durum yönetimi (state management) için React hook'ları kullanılmıştır.

### Kullanılan Teknolojiler ve Kütüphaneler:
- **Core:** React Native, React
- **Navigation:** @react-navigation/native, @react-navigation/bottom-tabs
- **Depolama:** @react-native-async-storage/async-storage
- **İkonlar:** lucide-react-native
- **Grafikler:** react-native-chart-kit

## 3. Proje Bileşenleri ve Modüller

### 3.1. Ekranlar (Screens)
Proje temel olarak iki ana ekrandan oluşmaktadır:

1.  **HomeScreen (Ana Ekran):**
    *   Kullanıcının odaklanma süresini ayarladığı ve geri sayımı başlattığı ekrandır.
    *   Kullanıcıyı motive etmek için rastgele motivasyon sözleri gösterir.
    *   "Dikkatin mi dağıldı?" butonu ile kullanıcının dikkat dağınıklığı sebeplerini kaydetmesine olanak tanır.
    *   Sayaç başlatma, duraklatma ve sıfırlama işlevlerini barındırır.

2.  **ReportsScreen (Raporlar Ekranı):**
    *   Kullanıcının geçmiş odaklanma oturumlarını listeler.
    *   Dikkat dağınıklığı istatistiklerini grafiksel (Pasta Grafik) olarak sunar.
    *   Toplam odaklanma süresi gibi özet bilgileri gösterir.

### 3.2. Bileşenler (Components)
*   **TimerDisplay:** Seçilen veya kalan süreyi kullanıcıya görsel olarak (dakika:saniye formatında) sunan bileşendir.
*   **MotivationalQuote:** Kullanıcıya motive edici rastgele sözler gösteren bileşendir.

### 3.3. Özel Kancalar (Custom Hooks)
*   **useFocusTimer:** Sayacın mantığını yönetir (başlatma, durdurma, sıfırlama, süre takibi).
*   **useStorage:** Verilerin kalıcı olarak cihaz hafızasında saklanmasını (AsyncStorage) ve okunmasını sağlar.

## 4. İş Akış Şeması (Workflow)

1.  **Uygulama Başlatma:** Kullanıcı uygulamayı açar ve Ana Ekran ile karşılaşır.
2.  **Süre Seçimi:** Kullanıcı predefined butonlarla (15dk, 30dk, 45dk vb.) bir odaklanma süresi belirler.
3.  **Başlatma:** "Başlat" butonuna basarak sayacı aktifleştirir.
4.  **Süreç Yönetimi:**
    *   Gerekirse "Duraklat" ile sayaç durdurulabilir.
    *   "Sıfırla" ile işlem iptal edilebilir.
    *   Eğer kullanıcının dikkati dağılırsa, ilgili butona basarak nedeni seçer.
5.  **Tamamlama:** Süre bittiğinde kullanıcı bilgilendirilir ve oturum verileri kaydedilir.
6.  **Raporlama:** Kullanıcı Raporlar sekmesine geçerek geçmiş performansını ve dikkat dağıtıcı unsurların analizini görüntüler.

## 5. Sonuç
Bu proje, modern mobil uygulama geliştirme pratiklerine uygun olarak, kullanıcı dostu bir arayüz ve kararlı bir altyapı ile geliştirilmiştir. Kod yapısı modüler tutularak geliştirilebilir ve bakımı kolay bir hale getirilmiştir.
