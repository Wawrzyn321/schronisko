import { PrismaClient } from '@prisma/client';
// @ts-ignore
import _news from './news.json';

export async function seedNews(prisma: PrismaClient) {
    const news = _news.find((e: any) => e.type === 'table')!.data!;

    for (const n of news) {
        console.log(n.picture)
        // await prisma.news.upsert({
        //     where: { id: n.id!.toString() },
        //     update: {
        //         title: n.title!,
        //         description: n.short_descr!,
        //         content: n.descr!,
        //         imageName: n.picture!,
        //         // @ts-ignore
        //         createdAt: new Date(Date.parse(n.addDate!)),
        //         isPublished: true, //publish jest jakieś losowe - niech zawsze będą publiczne
        //     },
        //     create: {
        //         title: n.title!,
        //         description: n.short_descr!,
        //         content: n.descr!,
        //         imageName: n.picture!,
        //         // @ts-ignore
        //         createdAt: new Date(Date.parse(n.addDate!)),
        //         isPublished: true, //publish jest jakieś losowe - niech zawsze będą publiczne
        //         id: n.id!.toString()
        //     },
        // });
    }
}
