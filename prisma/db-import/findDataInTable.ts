type ImportedData<T> = { type: string, data: T[] }[];

// "any" is needed, because TS tries to infer the type of json data
export function findDataInTable<T>(importedData: unknown): T[] {
    const typedImportedData = importedData as ImportedData<T>;

    const table = typedImportedData.find(entry => entry.type === 'table');
    if (!table) {
        throw Error("Cannot find table in imported data");
    }

    const { data } = table;
    if (!table) {
        throw Error("Cannot find data in imported table data");
    }

    return data;
}