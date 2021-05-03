export interface PageListElement {
    id: string;
    title: string;
}

export interface Page extends PageListElement {
    content: string;
}
