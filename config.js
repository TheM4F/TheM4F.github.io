// config.js
const siteConfig = {
    phoneNumbers: [
      { number: "0532 230 24 44", owner: "Erdal Genç" },
      { number: "0506 700 38 59", owner: "Ercan Genç" },
      { number: "0544 292 03 26", owner: "Ersoy Genç" }
    ],
    address: "Ankara Elmadağ, Kurtuluş Mahallesi — Genç Çiftliği",
  
    // Yol tarifi için kısaltılmış mobil link
    mapsLink:    "https://maps.app.goo.gl/5suQiht4ob99pdxv5",
  
    // Embed iframe için src URL’si
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191.2846694357794!2d33.25429890256442!3d39.90660088890532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4081fd8000611ce7%3A0x3b59cdbac16637ae!2zR2Vuw6cgw4dpZnRsacSfaQ!5e0!3m2!1str!2str!4v1746204930947!5m2!1str!2str",
    discordWebhookUrl: "https://canary.discord.com/api/webhooks/1368181396555825222/Hw-DHdozBCTssFmhAOPrbvYP7aSc97dwBeyjTbRvp1eX8w1mlitXT80-oIjFDc-RQf3C", 
    categories: [
      { title: "Kurban Kesim Hizmeti", description: "İslami usullere uygun, hijyenik ve titiz kesim süreçleri.", bgImage: "assets/kurban-kesim.webp" },
      { title: "Tarla Ekim & Sürüm",     description: "Modern ekipmanlarla arazi hazırlığı, ekim ve sürüm işlemleri.",            bgImage: "assets/tarla-ekim.webp" },
      { title: "Adaklık Satış/Kesim",    description: "Adaklık kurbanlık seçimi, satış ve kesim hizmetleri.",                       bgImage: "assets/adaklık-kurban.webp" },
      { title: "Organik Gübreleme",      description: "Toprak yapısını güçlendiren, tamamen doğal gübreleme çözümleri.",            bgImage: "assets/organik-gübreleme.webp" },
      { title: "Fidan/Çukur İşlemleri",  description: "Profesyonel fidan dikimi ve çukur kazma hizmetleri.",                        bgImage: "assets/çukur-kazma.webp" },
      { title: "Tel Örgü Sistemleri",    description: "Dayanıklı ve estetik tel örgü sistemlerinin kurulumu.",                        bgImage: "assets/tel-örgü.webp" }
    ],
  
    testimonials: [
      { text: "Zamanında teslim ve harika hizmet!",            author: "Esra G.",   stars: 5,   date: "2025-04-25" },
      { text: "Ekip çok ilgiliydi, tam puan.",                 author: "Mustafa G.", stars: 4.5, date: "2025-04-20" },
      { text: "Çiftlik turu unutulmazdı.",                     author: "Elif S.",   stars: 4,   date: "2025-04-18" },
      { text: "Kesim sonrası temizlik mükemmeldi.",            author: "Ali V.",    stars: 5,   date: "2025-04-15" },
      { text: "Toprak verimimiz arttı, teşekkürler!",          author: "Zeynep T.", stars: 4.5, date: "2025-04-12" },
      { text: "Güler yüzlü hizmet, harika deneyim.",           author: "Cem A.",    stars: 4,   date: "2025-04-10" },
      { text: "Tel örgüsü çok hızlı kuruldu. Bahçem huzur dolu.",                    author: "Deniz K.", stars: 5,   date: "2018-04-05" },
      { text: "Adaklık teslimatı tam zamanında yapıldı. Çok memnun kaldık.",          author: "Seda Y.",  stars: 5,   date: "2018-04-15" },
      { text: "Kurbanlık seçimi kusursuzdu. Teşekkürler.",                           author: "Barış T.", stars: 5,   date: "2019-04-08" },
      { text: "Çukur kazma biraz gürültülüydü ama iş iyi yapıldı.",                  author: "Ece D.",   stars: 4,   date: "2019-04-22" },
      { text: "Tel örgü direkleri gerçekten sağlam. Güven veriyor.",                 author: "Murat S.", stars: 4.5, date: "2020-04-03" },
      { text: "Adaklık süreci tamamen stressizdi.",                                  author: "Aslı M.",  stars: 4.5, date: "2020-04-18" },
      { text: "Kurbanlık hayvanlar çok sağlıklıydı. Veteriner kontrolü harikaydı.",  author: "Fatih Ç.", stars: 5,   date: "2021-04-10" },
      { text: "Kazı işleri özenliydi.",                                              author: "Nil Ö.",   stars: 4,   date: "2021-04-25" },
      { text: "Tel örgü onarımında fiyat-performans iyi.",                           author: "Kerem U.", stars: 4.5, date: "2022-04-02" },
      { text: "Adaklık organizasyonu muhteşemdi.",                                   author: "Gülay Z.", stars: 5,   date: "2022-04-14" },
      { text: "Çukur kazma sonrası temizlik yapılmalıydı. Ufak tefek eksikler vardı.", author: "Ozan A.",  stars: 3.5, date: "2022-04-20" },
      { text: "Tel örgü boyandı; bahçe çok daha şık duruyor.",                        author: "Pelin B.", stars: 5,   date: "2023-04-06" },
      { text: "Adaklık teslimatı sorunsuzdu.",                                        author: "Emre L.",  stars: 4,   date: "2023-04-20" },
      { text: "Kurbanlığın fiyatı makuldu!",                                          author: "Leyla Ö.", stars: 4.5, date: "2023-04-30" },
      { text: "Çukur kazma tam istediğim ölçüdeydi.",                                 author: "Sinan G.", stars: 5,   date: "2024-04-01" },
      { text: "Tel örgü uzun ömürlü olacak gibi.",                                     author: "Elif C.",  stars: 4.5, date: "2024-04-13" },
      { text: "Adaklık paketi eksiksiz geldi.",                                       author: "Ali R.",   stars: 5,   date: "2024-04-28" },
      { text: "Kurbanlık seçimi bizi çok memnun etti.",                               author: "Merve K.", stars: 5,   date: "2025-04-04" },
      { text: "Kazı sırasında işaretlemeler çok faydalıydı.",                         author: "Serhat U.",stars: 4,   date: "2025-04-17" },
      { text: "Tel örgü montajı tertemizdi.",                                         author: "Büşra Ş.", stars: 5,   date: "2025-04-23" },
      { text: "Tel örgü tam istediğim gibi oldu, gözüm arkada kalmadı.",     author: "Hakan Y.",  stars: 5,   date: "2018-04-12" },
      { text: "Adaklık süreci biraz karışık oldu ama sonuç güzeldi.",       author: "Özge U.",   stars: 4,   date: "2018-04-24" },
      { text: "Kurbanlık hayvan çok canlıydı, tam mevsimindeydi!",          author: "Burak Ş.",   stars: 5,   date: "2019-04-10" },
      { text: "Kazma ekibinin işi titizdi, ufak tefek taşlar temizlendi.", author: "Derya Ö.",  stars: 4.5, date: "2019-04-28" },
      { text: "Tel örgü boyası solmaz gibi duruyor, ellerinize sağlık.",    author: "Cansu A.",  stars: 5,   date: "2020-04-07" },
      { text: "Adaklık teslimatı hızlıydı, tam bayrama yetişti.",           author: "Fuat K.",   stars: 4.5, date: "2020-04-19" },
      { text: "Kurbanlık seçiminde en iyi paketlendiler, veteriner iyiydi.",author: "İpek M.",   stars: 5,   date: "2021-04-02" },
      { text: "Kazı sırasında su hattı buldular, ekstra özen gösterdiler.", author: "Emine S.",  stars: 5,   date: "2021-04-14" },
      { text: "Tel örgü direkleri rüzgara dayanıklı, memnun kaldım.",       author: "Oğuz T.",   stars: 4.5, date: "2022-04-05" },
      { text: "Adaklık alanı temiz bırakıldı, bu beklemediğim bir incelikti.", author: "Selin B.", stars: 4.5, date: "2022-04-18" },
      { text: "Kurbanlık fiyatı piyasa üstündeydi ama kalite de ona göre.",  author: "Tolga D.",  stars: 4,   date: "2023-04-03" },
      { text: "Kazı ekibi profesyoneldi, hemen toparlandılar.",            author: "Zehra Ç.",  stars: 5,   date: "2023-04-17" },
      { text: "Tel örgü montajından sonra bahçe görüntüsü değişti.",       author: "Onur L.",   stars: 4.5, date: "2024-04-11" },
      { text: "Adaklık servisi daim olsun, çok yardımcı oldular.",         author: "Dilara P.", stars: 5,   date: "2024-04-23" },
      { text: "Kurbanlık kesim ve paketleme hızlıydı, memnunuz.",          author: "Kerem V.",  stars: 4.5, date: "2025-04-08" }
    ],
  };
  