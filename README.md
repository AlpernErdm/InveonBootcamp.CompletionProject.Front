# InveonBootcamp Completion Project Frontend

Bu proje, Inveon FullStack Bootcamp Bitirme Projesi kapsamında geliştirilmiş bir frontend uygulamasıdır. Uygulama, ReactJS kullanılarak oluşturulmuş olup kullanıcı, kurs yönetimi, sipariş ve ödeme işlemlerini içermektedir.

## Gereksinimler

- Node.js (v14.x veya daha üstü)
- npm (Node Package Manager)

## Kurulum

Proje dosyalarını yerel makinenize klonlayın:

git clone https://github.com/AlpernErdm/InveonBootcamp.CompletionProject.Front.git
cd InveonBootcamp.CompletionProject.Front
Gerekli bağımlılıkları yükleyin:


bash
Copy Code
npm install
Çalıştırma

Uygulamayı geliştirme modunda çalıştırmak için:

npm start
Tarayıcınızı açın ve şu url'yi ziyaret edin: http://localhost:3000


Yapılandırma

Uygulamanın API ile iletişime geçmesi için bazı yapılandırmalar yapılmalıdır. Proje dizininde .env dosyası oluşturun ve aşağıdaki içeriği ekleyin:


env
Copy Code
REACT_APP_API_URL=http://localhost:5000/api
Dizin Yapısı

Projenin ana dizin yapısı aşağıdaki gibidir:

InveonBootcamp.CompletionProject.Front/
├── node_modules/
├── public/
│   ├── index.html
├── src/
│   ├── components/
│   │   ├── CategoryMenu.js
│   │   ├── CourseCard.js
│   │   ├── Footer.js
│   │   ├── Navbar.jsx
│   │   ├── Pagination.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   ├── CartContext.js
│   │   └── CourseContext.js
│   ├── pages/
│   │   ├── AdminDashboard.js
│   │   ├── CartPage.js
│   │   ├── CourseDetail.js
│   │   ├── HomePage.js
│   │   ├── LoginPage.jsx
│   │   ├── NotFoundPage.js
│   │   ├── PaymentPage.js
│   │   ├── ProfilePage.js
│   │   └── RegisterPage.jsx
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   └── 
│   ├── utils/
│   │   └── 
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md


Kullanılan Teknolojiler


React: JavaScript kütüphanesi

React Router: Uygulama yönlendirmesi

Axios: HTTP istekleri

Material-UI: UI bileşenleri

AlertifyJS: Bildirim mesajları

Context API: State yönetimi


Özellikler


Kullanıcı Yönetimi: Kayıt olma, giriş yapma, kullanıcı bilgilerini güncelleme ve kullanıcı silme

Kurs Yönetimi: Kursları listeleme, detaylarını görüntüleme

Sipariş Yönetimi: Sipariş geçmişi görüntüleme, sipariş detaylarını getirme

Ödeme İşlemleri: Ödeme bilgilerini girme ve ödeme yapma


Katkıda Bulunma

Katkıda bulunmak isterseniz lütfen aşağıdaki adımları izleyin:



Bu projeyi fork'layın

Yeni bir branch oluşturun (git checkout -b feature-branch)

Değişikliklerinizi commit edin (git commit -m 'Add some feature')

Branch'inizi push'layın (git push origin feature-branch)

Bir Pull Request açın


İletişim

Herhangi bir sorunuz veya geri bildiriminiz varsa lütfen benimle iletişime geçin:



GitHub: @AlpernErdm

Email: alperen@example.com
