export interface BookResponse {
    
    bookId?: number;

    authorName?: string; // string
    
    categoryName?: string;
    
    title: string;
    description: string;
    imagePath: string;
    yearOfPublication: number;    
    active: number;
}