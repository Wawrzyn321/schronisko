import { PrismaClient } from '@prisma/client';
import fs from 'fs';
// @ts-ignore
import _news from './news.json';

export async function seedNews(prisma: PrismaClient) {
    const news = _news.find((e: any) => e.type === 'table')!.data!;

    for (const n of news) {
        // if (fs.existsSync('./news/' + n.picture)) {
        //     fs.renameSync('./news/' + n.picture, './news-img/' + n.picture)
        // }

        if (n.id === '101') {
            console.log(n.picture)
            console.log(fs.existsSync('../main/src/client/public/img/news/' + n.picture))
            if (fs.existsSync('../main/src/client/public/img/news/' + n.picture)) {
                fs.copyFileSync('./db-import/news-img/' + n.picture, '../main/src/client/public/img/news/' + n.picture)
            }
        }


        if (n.id === '78') {
            n.descr = "<p style=\"position: relative; width: 300px; float: right; margin-left: 20px; margin-bottom: 30px\">\n<img style=\"display: block\" src=\"https://www.pitax.pl/assets/banners/banner_opp_rozlicz_300x250_pom_off.gif\" border=\"0\" alt=\"Darmowy Program PIT\" width=\"300\" height=\"250\" uukx43gfp=\"\">\n<a style=\"display: block; position: absolute; bottom: 0px; left: 0px; width: 150px; height: 40px\" href=\"https://www.pitax.pl/rozlicz?krs=0000365274&amp;utm_source=opp_0000365274&amp;utm_medium=banner_opp_rozlicz_300x250_pom_off.gif&amp;utmcampaign=OPPSitePrzekaz1procent\">\n<span style=\"display: none\">Pobierz program</span>\n</a>\n<a style=\"display: block; position: absolute; bottom: 0px; right: 0px; width: 150px; height: 40px\" href=\"https://www.pitax.pl/pobierz?krs=0000365274&amp;utm_source=opp_0000365274&amp;utm_medium=banner_opp_rozlicz_300x250_pom_off.gif&amp;utmcampaign=OPPSitePrzekaz1procent\">\n<span style=\"display: none\">Rozlicz online</span>\n</a>\n</p><p>\n</p><p>\nTo już kolejny rok, kiedy zbieramy 1% podatku na rzecz naszych podopiecznych, tych ze schroniska oraz pozostałych bezdomnych, skrzywdzonych psów i kotów.&nbsp;\n</p><p>\n</p><p>\nBez tych pieniędzy nie jesteśmy w stanie leczyć zwierząt, które trafiają do nas często w bardzo złym stanie, z wieloma przewlekłymi schorzeniami, czasami &nbsp;wymagającymi interwencji chirurgicznej. To dzięki Państwa pomocy udaje się uratować wiele psich i kocich istnień. To dzięki Państwa pomocy możemy działać.&nbsp;\n</p><p>\n</p><p>\nPozyskane pieniądze z 1% przeznaczamy na remonty w schronisku, w Kociej Chatce, w gabinecie weterynaryjnym. Z tych środków finansujemy &nbsp;leczenie zwierząt&nbsp;\n</p><p>\n</p><p>\nzapraszamy do zapoznania się z filmami&nbsp;</p><p><br></p><iframe class=\"ql-video\" frameborder=\"0\" allowfullscreen=\"true\" src=\"https://www.youtube.com/embed/zxomljgbGQA?showinfo=0\"></iframe><p>\n</p><p>\n&nbsp;\n</p><p>\n</p><iframe class=\"ql-video\" frameborder=\"0\" allowfullscreen=\"true\" src=\"https://www.youtube.com/embed/fIhrGXyWuOM?showinfo=0\"></iframe><p>\n</p><p>\n</p><p>\n&nbsp;\n</p><p>\n</p><p>\n\n</p><iframe class=\"ql-video\" frameborder=\"0\" allowfullscreen=\"true\" src=\"https://www.youtube.com/embed/CW9zUKcsjhI?showinfo=0\"></iframe><p><br></p><p>\n</p><p>\n&nbsp;\n</p><p>\n</p><p>\n&nbsp;\n</p><p>\n</p>";
        } else if (n.id === '101') {
            n.descr = "<p style=\"margin: 0px 0px 6px; font-family: helvetica, arial, sans-serif; color: #1d2129; font-size: 14px; line-height: 19.32px\">\nZwierzaki adoptowane ze schroniska w nowych domach przechodzą często wręcz nieprawdopodobne metamorfozy. Z zaniedbanych, przerażonych, zrezygnowanych zmieniają się w piękne, wesołe i wierne czworonogi.\nRzadko jednak mówi się o tym, że za tymi pięknymi obrazkami najczęściej kryje się ogromna praca nowych właścicieli. Zwierzaki ze schroniska to czworonogi po przejściach, których przeszłości zazwyczaj nie znamy. Adopcja zwierzaka ze schroniska to niejednokrotnie duże pokłady cierpliwości i wyrozumiałości, wiele wyrzeczeń, niemałe sumy wydane na leczenie czy pomoc szkoleniowca.&nbsp;\nZatem czy warto adoptować...? Zapraszamy do obejrzenia nowego filmiku o psach i kotach adoptowanych z naszego schroniska. Znajdziecie w nim odpowiedź na to pytanie, zawartą w historiach kilku zwierzaków i kilku ludzi o wielkich sercach :)&nbsp;<em class=\"_lew\" style=\"font-family: inherit; line-height: 19.32px\"><span class=\"_4mcd\" style=\"font-size: 0px; font-family: inherit\">:)</span></em>&nbsp;\n</p><iframe class=\"ql-video\" frameborder=\"0\" allowfullscreen=\"true\" src=\"https://www.youtube.com/embed/i5droHFpBbI?showinfo=0\"></iframe><p>\n</p><p><br></p><p>\n</p>";
        }
        const news = {
            title: n.title!,
            description: n.short_descr!,
            content: n.descr!,
            imageName: n.picture!,
            // @ts-ignore
            createdAt: new Date(Date.parse(n.addDate!)),
            isPublished: true, //publish jest jakieś losowe - niech zawsze będą publiczne
            id: n.id!.toString()
        }

        await prisma.news.upsert({
            where: { id: n.id!.toString() },
            update: news,
            create: news,
        });
        console.log('news', n.title)
    }
}
