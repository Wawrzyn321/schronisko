export function insertInOrder<T>(items: Array<T>, newItem: T, selector: (t: T) => string): Array<T> {
    let position = 0;
    while (position < items.length && selector(items[position]).localeCompare(selector(newItem)) < 0) {
        position++;
    }
    items.splice(position, 0, newItem);
    return items;
}
