export declare class CreateBookDto {
    title: string;
    author: string;
    genre: 'fiction' | 'non-fiction' | 'mystery' | 'romance' | 'sci-fi' | 'biography';
    publicationYear: number;
    isAvailable?: boolean;
    stock: number;
}
