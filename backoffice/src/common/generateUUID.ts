export function generateUUID() {
    // crypto may be undefined locally or over http
    if ('crypto' in window) {
        return crypto.randomUUID().substring(0, 13);
    } else {
        return Math.random().toString().substring(2, 15);
    }
}
