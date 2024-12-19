import React, { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { Helmet } from "react-helmet";

export const InfoPage = () => {
  const faqData = [
    {
      question: "NASIL SİPARİŞ VEREBİLİRİM?",
      answer: "Profil kısmından bakiye yükleyerek istediğiniz ürünleri sepete ekleyebilirsiniz. Daha sonra şehir ve mahalle bilgilerinizi girerek siparişini tamamlayabilirsiniz.",
      active: false,
    },
    {
      question: "NASIL BAKİYE YÜKLEYEBİLİRİM?",
      answer: `Güvenlik ve anonimlik sebebiyle yalnızca kripto para ile ödeme yapabilirsiniz. Profilinize girip "PARA YÜKLE" kısmından USDT, TRON ve LİTECOIN seçeneklerinden birini seçerek size özel tanımlanan kripto para adreslerinden birine para gönderebilirsiniz. Yatırımınız 0-30 dakika içerisinde otomatik hesabınıza eklenir. Minimum yatırım 1800.00TL'dir.

Kripto paralar takip edilemez ve güvenilir olduğu için tercih edilmektedir. Binance, BtcTurk gibi kripto para borsalarından para gönderip çekim yapabilirsiniz. Ancak daha fazla anonimlik isteyenler, "Trust Wallet" gibi kişisel bilgi gerektirmeyen kripto para cüzdanı kullanabilir. Kullanımı basit ve tamamen güvenlidir.`,
      active: false,
    },
    {
      question: "BAKİYEMİ NASIL ÇEKEBİLİRİM?",
      answer: `Satıcılar için sunulan panelde detaylı bilgi verilmektedir.
Tüketiciler kalan bakiyeyi çekebilir. "PARA ÇEK" kısmından USDT, TRON ve LİTECOIN seçeneklerinden istediğinizi seçerek, kendi cüzdan adresinizi yazıp para çekimi yapabilirisiniz. Yatırım ve çekimler otomatik soğuk cüzdanlardan yapılmaktadır. Para çekme emri verdiğinizde 0-30 dakika içerisinde para transferi gerçekleşmektedir.`,
      active: false,
    },
    {
      question: "SİPARİŞ ve TESLİMAT SÜRECİ?",
      answer: `
Ürün veya ürünlerinizi sepete ekledikten sonra, Teslimat adresi İL, İLÇE, MAHALLE olarak girilmelidir. Siparişi tamamladıktan sonra aracılık sistemimiz en uygun satıcıyla sizi eşleştirir. Satıcı sizinle MESAJLAR kısmından iletişime geçer. Yukarıda belirttiğimiz 27 şehirde 0-3 saat arası teslimat süresi vardır. Diğer şehirlere 1-4 gün arası teslimat yapılmaktadır.

Satıcınız ile konuşup teslimatı yüz yüze veya DROP usülü alabilirsiniz. Satıcıların, ilk sipariş veren kullanıcılara DROP usülü teslimat yapma zorunluluğu vardır. Güvenlik sebebiyle.. Süreç, moderatörlerimiz tarafından kontrol edilmektedir.

DROP usülü: Satıcı teslimatınızı mahallenizde size yakın bir yere saklar. Sakladığı yerin görüntüsünü size iletir. Oradan teslim alırsınız.`,
      active: false,
    },
    {
      question: "ARACILIK SİSTEMİMİZ?",
      answer: `Aracılık sistemimiz, Satıcının ve Tüketicinin güvenliği ve anonimliğini amaçlar. Tüketiciyi en uygun satıcıyla eşleştirir ve site üzerinden iletişim kurulur. Tüm süreç moderatörlerimiz tarafından kontrol edilir ve sipariş teslim alınana kadar olası her problem başarıyla yönetilir. Hiç kimsenin mağdur edilmemesi adına bu önemlidir. Aracılık sistemimiz her sipariş için 150.00TL komisyon alır.`,
      active: false,
    },
    {
      question: "NASIL SATICI OLABİLİRİM?",
      answer: `
Satıcı olmak için en az 5000.00TL teminatınız olması gerekir. Şu an sadece aktif faaliyet gösterdiğimiz şehirlerde satıcı olabilirsiniz. Profilde "SATICI OL" butonuna tıklayarak satıcı paneline yönlendirilirsiniz. Faaliyet gösterebileceğiniz İL, İLÇE ve MAHALLE ve satacağınız ürünlerin seçimini yaparak SATICI PANELİNE giriş yapabilirsiniz. Elinizde bulunmayan ürünlerin temini için satıcı panelinden moderatörle görüşebilirsiniz. Her ürünü elinizde bulundurmak zorunda değilsiniz istediğiniz ürün ile satış yapabilirsiniz.

Aktif olduğunuz zaman satıcı panelinden "TEZGAHI AÇ" butonuna bastığınızda sistemimiz sizi yeni siparişlerle eşleştirir. "TEZGAHI KAPAT" butonuna basıldığında eşleştirmez.

Tek seferde en fazla teminatınız kadar sipariş alabilirsiniz. Sistemimiz satıcılar için, tezgahı açık olması halinde haftalık en az teminatınız kadar yeni sipariş garantisi verir. Satıcılar için detaylı kural ve bilgilendirmeler satıcı panelinde yazmaktadır.`,
      active: false,
    },
    {
      question: "BİZ KİMİZ?",
      answer: `
0x22, online forum ve platformlarda satış yapan ekibimiz ile 2022'de piyasadan çekildik. Yalnızca elit kesim ile trafik halinde olup ticaretimizi ona göre şekillendirdik. Dünyada örnekleri olan online satış devrimini Türkiye'de faaliyete geçirmeye karar verdik. Sokak serserileri ile muhatap olmak zorunda kalmadan güvenli ve anonim alışveriş yapmayı mümkün kıldık. Günden güne büyüyen trafiğimizi tüm halka arz ettik. Satıcılara toptan ürün temini, müşteri trafiği ve Tüketiciler için her siparişte 150.00TL gibi bir ücret karşılığında güvenli ticaret vaat ediyoruz. Önceliğimiz GÜVENLİK ve ANONİMLİK. Yoğun talebinizi sevgiyle karşılıyor ve memnuniyetinizi amaç bilip tüm imkanlarımızı size sunuyoruz. Bilinçli sipariş vermenizi temenni ediyor iyi uçuşlar diliyoruz!`,
      active: false,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-purple-900 pt-20 pl-20 pb-10 text-white">
      <Helmet>
        <title>Info - harmanım</title>
        <meta name="description" content="Welcome to Techie Blog, where you'll find a variety of articles and tutorials on many topics." />
        <meta name="keywords" content="blog, tech, tutorials, articles, programming" />
      </Helmet>
      <h2 className="text-2xl font-bold mb-8 text-center text-yellow-400">Bilgilendirme</h2>
      <p className="text-sm text-gray-400 leading-relaxed mb-8">
        Merhaba, Satıcı ve tüketicileri buluşturduğumuz Türkiye'nin tek harman sitesine hoş geldiniz. Anonim ve güvenli alışverişe önem verdiğimiz aracılık sistemimiz ile, hiçbir satıcı ile yüz yüze gelmek zorunda kalmadan güvenilir satıcılarımızdan alışveriş yapabilirsiniz. Siparişlerinizi en uygun satıcıyla eşleştiren algoritmamız, 27 şehirde 0-3 saat arası teslimat süremiz ile aktif satıcılarımızla faaliyet göstermekteyiz. LÜTFEN BİLİNÇLİ SİPARİŞ VERİNİZ.
        <br />
        <br />
        <p className="pt-[20px]">AKTİF ŞEHİRLER: İstanbul, Ankara, İzmir, Bursa, Antalya, Adana, Şanlıurfa, Gaziantep, Mersin, Kocaeli, Diyarbakır, Hatay, Manisa, Kayseri, Samsun, Kahramanmaraş, Balıkesir, Van, Aydın, Eskişehir, Mardin, Çanakkale, Muğla, Isparta, Denizli, Edirne, Uşak</p>
        <br />
        DİĞER ŞEHİRLERE TESLİMAT SÜRESİ 1-4 GÜN ARASIDIR!
      </p>

      <div className="container mx-auto">
        <div className="faq-container space-y-6 pr-5">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="faq-item border border-gray-200 rounded-lg p-6 bg-gradient-to-r from-purple-800 to-purple-600 hover:shadow-lg transform transition-all duration-300"
            >
              <h3
                className="text-lg font-semibold cursor-pointer flex justify-between items-center text-white"
                onClick={() => handleToggle(index)}
              >
                {faq.question}
                <BiChevronRight
                  className={`transform transition-all duration-200 ${activeIndex === index ? "rotate-90" : ""}`}
                />
              </h3>
              <div
                className={`faq-content pt-4 text-sm text-gray-300 ${activeIndex === index ? "block" : "hidden"}`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
