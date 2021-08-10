export function paginate<T>(items: T[], pageSize: number, currentPage: number) {
    const res: T[] = [];
    for (
        let i = pageSize * currentPage;
        i < pageSize * (currentPage + 1) && i < items.length;
        i++
    ) {
        res.push(items[i]);
    }
    return res;
}
