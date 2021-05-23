const fs = require('fs');

export async function saveFile(name: string, base64Data: string) {
    base64Data = base64Data.replace(/^data:image\/png;base64,/, "");
    const buf = Buffer.from(base64Data, 'base64');
    return new Promise<void>((resolve, reject) => {
        fs.writeFile('static/' + name, buf, (e: any) => {
            if (e) {
                reject(e);
            } else {
                resolve();
            }
        });
    });
}
