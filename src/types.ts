export interface Post {
    _id: string;
    guid: string;
    dateAdded: string;
    title: string;
    synopsis?: string;
    content: string;
}