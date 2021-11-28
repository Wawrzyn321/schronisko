export type PageListElement = {
    id: string;
    title: string;
}

export interface Page extends PageListElement {
    content: string;
}
