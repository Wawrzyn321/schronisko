import { PrismaClient } from '@prisma/client';

export async function seedPages(prisma: PrismaClient) {
  const pages = [
    { title: "O nas", id: "o-nas", content: 'to trza uzupełnić' },
    {
      title: "Najczęściej zadawane pytania",
      id: "faq",
      content: "kura czy jajko",
    },
    {
      id: "glowna-adopcje",
      title: "Główna: adopcje",
      content:
        '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quis debitis vel eius recusandae nam, odio aliquam placeat, dolorem deserunt aspernatur dolores accusamus. Illo ipsam nihil laboriosam mollitia dolore possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quis debitis vel eius recusandae nam, odio aliquam placeat, dolorem deserunt aspernatur dolores accusamus. Illo ipsam nihil laboriosam mollitia dolore possimus.</p><p><span style="color: var(--text-color);">Quas, quis debitis vel eius recusandae nam, odio aliquam placeat, dolorem deserunt aspernatur dolores accusamus. Illo ipsam nihil laboriosam mollitia dolore possimus.</span></p><p><br></p><p>ADOPCJEE</p>',
    },
    {
      title: "Psy",
      id: "psy-do-adopcji",
      content:
        "<p>To właśnie tutaj znajdziesz swojego pupila. Psy z tego działu są gotowe do adopcji i czekają na swojego człowieka. Wystarczy, że zadzwonisz pod podany numer telefonu, aby dograć szczegóły poznania zwierzaka i jego adopcji! Nie zapomnij, że nie wszystkie zwierzaki przebywają w naszym schronisku – informacje o ich miejscu pobytu znajdziesz tuż pod zdjęciem.</p><p><br></p><p>Pamiętaj, że nasi podopieczni posiadają książeczkę zdrowia, a także są odrobaczeni, odpchleni, zaszczepieni, wykastrowani oraz zachipowani; a opłata adopcyjna wynosi 50zł (należy ją uiścić na konto MZUK, a potwierdzenie wręczyć pracownikowi schroniska przy podpisywaniu umowy adopcyjnej. Aby adoptować kota należy mieć ze sobą transporter oraz dowód osobisty.</p>",
    },
    {
      id: "koty-do-adopcji",
      title: "Koty do adopcji",
      content:
        "<p>To właśnie tutaj znajdziesz swojego mruczącego pupila. Koty z tego działu są gotowe do adopcji i szczekają na swojego człowieka. Wystarczy, że zadzwonisz pod podany przy kocie numer telefonu, aby dograć szczegóły poznania zwierzaka i jego adopcji! Nie zapomnij, że nie wszystkie zwierzaki przebywają w naszym schronisku – informacje o ich miejscu pobytu znajdziesz tuż pod zdjęciem.</p><p><br></p><p>Pamiętaj, że nasi podopieczni posiadają książeczkę zdrowia, a także są odrobaczeni, odpchleni, zaszczepieni, wykastrowani oraz zachipowani; a opłata adopcyjna wynosi 50zł (należy ją uiścić na konto MZUK, a potwierdzenie wręczyć pracownikowi schroniska przy podpisywaniu umowy adopcyjnej. Aby adoptować kota należy mieć ze sobą transporter oraz dowód osobisty.</p>",
    },
    {
      id: "zwierzeta-znalezione",
      title: "Zwierzęta znalezione",
      content:
        "<p>Tu znajdziesz zwierzęta, które trafiły do schroniska w ciągu ostatnich 14 dni, po tym okresie zostaną wykastrowane, zaszczepione przeciwko wściekliźnie i przeniesione do działu “DO ADOPCJI”.</p><p><br></p><p>Oczywiście możesz zarezerwować zwierzaka z tego działu dzwoniąc pod nr 32 293 75 56 (pon.-pt. od 7.00 do 14.00), ale poznasz go dopiero na spacerze przedadopcyjnym po przejściu kwarantanny oraz wszystkich zabiegów weterynaryjnych, co potrwa minimum 3 tygodnie od daty trafienia do schroniska.</p><p><br></p><p>UWAGA! Wyjątkiem są kocięta i szczenięta, które mogą trafić do domów tymczasowych przed adopcją.</p>",
    },
    { title: "Znalazły dom", id: "odnalazly-dom", content: 'jeej!' },
    {
      id: "odeszly",
      title: "Odeszły",
      content:
        "<p>Niestety nie wszystkie historie kończą się happy endem. Tutaj znajdziesz galerie psów i kotów, które nie doczekały adopcji ani powrotu do domu.</p><p><br></p>",
    },
    {
      id: "odeszly-wiersz",
      title: "Odeszły (wiersz)",
      content:
        '<h5>"Święty Piotr u nieba wrót stoi, trzymaj listę cnót.</h5><h5>A wszystkie dusze w milczeniu przypatrują się jego skinieniu.</h5><h5>-Ten wejdzie pierwszy, kto byt lekiem no cale zło,</h5><h5>Oto do końca wierny był. Kochali służył ze wszystkich sił.</h5><h5>Brzydził się złością, dzielił radością. Na dobre i na złe.</h5><h5>Kto jednego tylko chce: kochać wiecznie jak szalony.&nbsp;</h5><h5><br></h5><h5>Piotrowa dłoń otwiera drzwi, lśnią oczy, merdają ogony.</h5><h5>Pierwsze do raju wchodzą psy."</h5><p class="ql-align-right">Milicent Bobleter&nbsp;</p><p><br></p>',
    },
    {
      id: "jak-adoptowac-wirtualnie",
      title: "Adopcja wirtualna",
      content:
        '<p><strong style="color: rgb(54, 54, 54);">Kto może zostać wirtualnym opiekunem? KAŻDY!</strong></p><p>Zapraszamy do współpracy zarówno osoby prywatne jak i szkoły czy zakłady pracy.</p><p><br></p><p><strong style="color: rgb(54, 54, 54);">Jaka jest minimalna kwota?</strong></p><p>To 20zł miesięcznie!</p><p><br></p><p><strong style="color: rgb(54, 54, 54);">Co zyskujesz jako wirtualny opiekun?</strong></p><p>Elektroniczny certyfikat wirtualnego opiekuna.</p><ul><li>Co miesiąc możesz otrzymywać drogą mailową informacje na temat Twojego podopiecznego.</li><li>W przypadku psów po wcześniejszym umówieniu się z opiekunem możesz zabrać zwierzaka na spacer.</li><li>W przypadku kotów przebywających w Kociej Chatce możesz umówić się na odwiedziny pod nr tel 600 809 399.</li><li>W przypadku kotów z Domów Tymczasowych oraz przebywających w Schronisku obecnie nie ma możliwości odwiedzenia.&nbsp;</li></ul><h3><strong style="color: rgb(54, 54, 54);">Jak zostać wirtualnym opiekunem?&nbsp;</strong></h3><ol><li>Przejdź do zakladki w menu głównym lub kliknij na: <strong style="color: rgb(54, 54, 54);">ADOPCJE WIRTUALNE</strong> &gt; <strong style="color: rgb(54, 54, 54);">SZUKAJĄ OPIEKUNÓW</strong></li><li>Wybierz psa lub kota, którego chcesz wesprzeć..</li><li>Wpłać dowolny datek na konto Stowarzyszenia Nadzieja Na Dom: 42 2030 00451110 0000 0265 1620 W tytule przelewu koniecznie podaj: adopcje wirtualne - imię i numer psa/kota&nbsp;</li><li>Wyślij maila na adres: adopcje.wirtualne@nadziejanadom.org z informacją kogo umieścić przy wy-branym zwierzaku jako wirtualnego opiekuna. (np.: moim wirtualnym opiekunem jest klasa 6b ze Szkoły Podstawowej nr 42; moim wirtualnym opiekunem jest Oskar z Bonowa.)&nbsp;</li><li>Umawiaj się na spacery i otrzymuj informacje o wirtualnym podopiecznym.&nbsp;</li></ol><p><br></p>',
    },
    {
      id: "szukaja-opiekunow",
      title: "Szukają opiekunów",
      content:
        "<p>Nie możesz realnie adoptować, ale chcesz wesprzeć podopiecznych Schroniska? Wirtualna adopcja jest dla Ciebie idealnym rozwiązaniem! Każdy ze zwierzaków może mieć więcej niż jednego wirtualnego opiekuna, dlatego jeżeli zwierzak, który Cię interesuje ma już opiekuna, nie zniechęcaj się!</p><p><br></p><p>Pamiętaj jednak, że pieniądze zbierane są na jedno, wspólne konto Stowarzyszenia Opieki nad Zwierzętami “Nadzieja Na Dom”, z których finansuje się ponadpodstawowe leczenie psów i kotów głównie z naszego Schroniska, a także pobyt w hotelach i domach tymczasowych, zakupuje specjalistyczną karmę dla zwierząt bardziej wymagających.</p>",
    },
    {
      id: "znalazly-opiekunow",
      title: "Znalazły opiekunów",
      content:
        "<p>Nie możesz realnie adoptować, ale chcesz wesprzeć podopiecznych Schroniska? Wirtualna adopcja jest dla Ciebie idealnym rozwiązaniem! Każdy ze zwierzaków może mieć więcej niż jednego wirtualnego opiekuna, dlatego jeżeli zwierzak, który Cię interesuje ma już opiekuna, nie zniechęcaj się!</p><p><br></p><p>Pamiętaj jednak, że pieniądze zbierane są na jedno, wspólne konto Stowarzyszenia Opieki nad Zwierzętami “Nadzieja Na Dom”, z których finansuje się ponadpodstawowe leczenie psów i kotów głównie z naszego Schroniska, a także pobyt w hotelach i domach tymczasowych, zakupuje specjalistyczną karmę dla zwierząt bardziej wymagających.</p>",
    },
    {
      id: "wolontariat-pies-off",
      title: "Wolontariat (pies)",
      content:
        "<p>Wolontariat w naszym Schronisku prowadzi Stowarzyszenie “Nadzieja Na Dom”. Obecnie nie prowadzimy naboru. (tu będzie więcej ale na razie zróbmy bez więcej)</p><p><br></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci. Nam congue, pede vitae dapibus aliquet, elit magna vulputate arcu, vel tempus metus leo non est. Etiam sit amet lectus quis est congue mollis. Phasellus congue lacus eget neque. Phasellus ornare, ante vitae consectetuer consequat, purus sapien ultricies dolor, et mollis pede metuseget nisi. Praesent sodales velit quis augue. Cras suscipit, urna at aliquam rhoncus, urna quam viverra nisi, in interdum massa nibh nec erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><p><br></p><p><br></p><p><br></p>",
    },
    {
      id: "wolontariat-kot",
      title: "Wolontariat (kot)",
      content:
        "<p>Wolontariat w naszym Schronisku prowadzi Stowarzyszenie “Nadzieja Na Dom”. <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci. Nam congue, pede vitae dapibus aliquet, elit magna vulputate arcu, vel tempus metus leo non est. Etiam sit amet lectus quis est congue mollis. Phasellus congue lacus eget neque. Phasellus ornare, ante vitae consectetuer consequat, purus sapien ultricies dolor, et mollis pede metuseget nisi. Praesent sodales velit quis augue. Cras suscipit, urna at aliquam rhoncus, urna quam viverra nisi, in interdum massa nibh nec erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><p><br></p><p><br></p><p><br></p>",
    },
    {
      id: "wolontariat-pies-on",
      title: "Wolontariat (pies) ",
      content:
        "<p>Wolontariat w naszym Schronisku prowadzi Stowarzyszenie “Nadzieja Na Dom”. Obecnie prowadzimy nabór i jest fajnie.",
    },
    { title: "Koci wolontariat", id: "wolontariat-kot", content: "miauuu" },
    { title: "Formlarz adopcji wirtualnej", id: "formularz-adopcji-wirtualnej", content: "Tu opiszemy o co chodzi, jak to działa, z czym się to je i z czym trawi" },
    { title: "Modal adopcji wirtualnej", id: "modal-adopcji-wirtualnej", content: "Podziękowania, info co dać w tytule przelewu itd" },
    {
      id: "jak-pomoc",
      title: "Jak pomóc",
      content:
        '<p>Chcesz wesprzeć naszych psich i kocich podopiecznych ale nie wiesz jak? Już spieszymy z radą! Największa pomoc jaką możesz zaoferować to przygarnięcie zwierzaka! Nie możesz sobie na to pozwolić?</p><p><br></p><p>Więc może chciałbyś zostać domem tymczasowym dla psa lub kota? Też nie? Czyżby <a href="/v-adoptions/how-to" rel="noopener noreferrer">wirtualna adopcja</a> była dla Ciebie rozwiązaniem? Nie?</p><p><br></p><p>W jaki jeszcze sposób możesz pomóc?</p><p><br></p><ul><li>Zbierając plastikowe nakrętki. Możesz je odwieźć bezpośrednio do naszego Schroniska, zostawić w gabinecie weterynaryjnym Lupus w Sosnowcu przy ul. Ostrogórskiej lub wrzucić do serduszka, które znajduje się pomiędzy Restauracją “Kolorowa” a przystankiem autobusowym “Urząd Miasta” w Sosnowcu.</li><li>Wpłacając darowiznę na konto Stowarzyszenia “Nadzieja Na Dom”, które opiekuje się naszym schroniskiem. Tytuł przelewu: <strong>darowizna na cele statutowe</strong>. Konto: <strong>%KONTO%</strong></li></ul><blockquote><br></blockquote><blockquote>Statut Stowarzyszenia w paragrafie 8 określa jako jeden z celów:</blockquote><blockquote>“1. Niesienie pomocy zwierzętom szczególnie potrzebującym:</blockquote><blockquote>A) przebywającym w schroniskach dla bezdomnych zwierząt, w szczególności</blockquote><blockquote>w Schronisku dla Bezdomnych Zwierząt w Sosnowcu”</blockquote><p><br></p><p><br></p><ul><li>Przekazując dary:</li><li class="ql-indent-1">mokrą i suchą karmę dla psów i kotów, dla kociąt i szczeniąt (pamiętajcie, że nie ilość a jakość się liczy);</li><li class="ql-indent-1">specjalistyczną karmę weterynaryjną (np.: gastro intestinal, hepatic, karmy typu light - Odchudzające, sport – energetyczne);</li><li class="ql-indent-1">mleko w proszku dla kociąt i szczeniąt;</li><li class="ql-indent-1">gerberki delikatny indyk i delikatny kurczak;</li><li class="ql-indent-1">podkłady higieniczne;</li><li class="ql-indent-1">żwirek dla kotów (każdy rodzaj);</li><li class="ql-indent-1">zabawki i przysmaki dla psów i kotów;</li><li class="ql-indent-1">smycze (tradycyjne) oraz obroże;</li><li class="ql-indent-1">preparaty na pchły i kleszcze;</li><li class="ql-indent-1">ręczniki, prześcieradła, poszewki, dywany, wykładziny, koce i inne materiały, którymi można wyścielić legowiska dla psów i kotów;</li></ul><p><br></p><p>Nie możesz pomóc w żaden z wymienionych sposobów? Wejdź na <a href="https://www.facebook.com/schroniskowsosnowcu/" rel="noopener noreferrer" target="_blank">FACEBOOK SCHRONISKA DLA BEZDOMNYCH ZWIERZĄT W SOSNOWCU</a> i udostępniaj ogłoszenia naszych psich i kocich podopiecznych.</p>',
    },
    { "id": "kontakt", "title": "Kontakt", "content": "<p>Schronisko mieści się w Sosnowcu, w dzielnicy Milowice, przy ulicy Baczyńskiego 2B. Idąc od centrum miasta należy na wysokości Zakładów Mięsnych Silesia (dawniej Duda) skręcić w lewo i zejść asfaltową uliczką na sam dół.Do schroniska bezpośrednio można dojechać (przystanek Milowice Zakłady Mięsne) :</p><ul><li>tramwajami linii 21 lub 26 </li><li>autobusami linii 91 (przystanek na żądanie) oraz 805.Dojechać można również autobusami linii:</li><li>40, 800, 817 wysiadając na przystanku Milowice Centrum Handlowe, a następnie przesiąść się na tramwaj linii 21 lub 26 w kierunku Milowice Pętla i wysiąść na przystanku Milowice Zakłady Mięsne</li><li>154, 815, 835 wysiadając na przystanku Sosnowiec Egzotarium, a następnie należy przesiąść się na którąś z wyżej wymienionych linii tramwajowych w kierunku Milowice Pętla</li><li>808, 811, 813, 835 wysiadając na przystanku Sosnowiec Osiedle Piastów, następnie przesiadając się nw w\\/w linie tramwajowe w kierounku Milowic.</li></ul><p><br></p><p>Schronisko przyjmuje <strong>bezdomne</strong> psy i koty wyłącznie z terenu gminy Sosnowiec oraz gminy Czeladź i od 1 grudnia 2019 roku z terenu gminy Będzin. Przyjęcia zwierząt odbywają się całą dobę. Po godzinie 22:00 schronisko wyjeżdża na interwencję WYŁĄCZNIE do zwierząt chorych, po wypadkach.</p><p><br></p><p>UWAGA! Zwierzęta z terenu Będzina i Czeladzi należy zgłaszać WYŁĄCZNIE przez Straż Miejską. Zwierzęta dowiezione przez osoby prywatne - nie zostaną przyjęte.</p><p><br></p><p>Aby adoptować zwierzę należy być osobą pełnoletnią, posiadać przy sobie dokument ze zdjęciem - DOWÓD OSOBISTY, smycz, obrożę i kaganiec (w razie transportu psa komunikacją miejską) a dla kota i szczenięcia transporter.</p><p><br></p><p>Kontakt:Tel. 32 293 75 56 (7.00 - 14.00)</p><p>Tel. kom. 669 096872 (telefon WYŁĄCZNIE do zgłaszania interwencji - bezdomnych zwierząt z terenu Sosnowca)</p><ul><li>z terenu Czeladzi - 32 763 36 97 (straż miejska)</li><li>z terenu Będzina - 32 710 46 90 (straż miejska)</li></ul><p><br></p><p>adres email: schronisko@mzuk.sosnowiec.pl</p><p>Zwierzęta wydawane do adopcji są:</p><p>Poniedziałek - Piątek 8 - 17 (na okres zimowy)</p><p>Sobota, Niedziela 8 - 14W dni świąteczne (wolne od pracy) nie ma adopcji.Informujemy, że w naszym Schronisku zwierzęta do adopcji wydawane są odpłatnie, zgodnie z obowiązującym cennikiem:</p><p><br></p><p>Kot - 50 zł </p><p>Pies - 80 zł </p><p><br></p><p>Od 1 stycznia 2012 roku każde DOROSŁE zwierzę schroniskowe podlega obowiązkowej kastracji\\/sterylizacji. Jeżeli stan zdrowia lub inne względy nie pozwolą na wykonanie zabiegu w schronisku właściciel otrzyma bezpłatny talon na wykonanie zabiegu we wskazanej lecznicy. Warunkiem adopcji jest pisemna zgoda na zabieg. <strong>DARMOWE ZABIEGI KASTRACJI I STERYLIZACJI NIE DOTYCZĄ SZCZENIĄT I KOCIĄT</strong>. </p><p>UWAGA - wszystkie adoptowane zwierzęta opuszczające schronisko są zaczipowane - posiadają wszczepiony pod skórę mikroczip. Oznacza to, że w przypadku zagubienia lub porzucenia - identyfikacja zwierzęcia i odnalezienie właściciela będą bardzo ułatwione.  </p><p>Opiekę weterynaryjną i gabinet na terenie schroniska prowadzi Stowarzyszenie Opieki nad Zwierzętami \"Nadzieja na Dom\". Kierownik gabinetu - lekarz weterynarii Monika Czerwińska.</p><p><br></p>" },
    { "id": "dotacje", "title": 'Podaruj 1%', 'content': '<p>Tu będzie info o przelewie itp, to że nr konta to %KONTO%</p><p><br></p>' }
  ];
  for (const page of pages) {
    await prisma.page.upsert({
      where: { id: page.id },
      update: page,
      create: page,
    });
    console.log('page' + page.id)
  }
}
