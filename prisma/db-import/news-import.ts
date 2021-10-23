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
        if (fs.existsSync('../main/src/client/public/img/news/' + n.picture)) {
            fs.copyFileSync('./db-import/news-img/' + n.picture, '../main/src/client/public/img/news/' + n.picture)
        }

        if (n.descr.includes('youtube')) {
            console.log(n.id)
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
