/**
 * Dto book request
 */
export interface BookRegisterRequest {
    
    bookId?: number;

    authorId?: number; // string
    
    categoryId?: number;
    
    title: string;
    description: string;
    imagePath: string;
    yearOfPublication: number;
    active: number;

}