import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export interface Book {
    title: string;
    author: string;
    genre: 'fiction' | 'non-fiction' | 'mystery' | 'romance' | 'sci-fi' | 'biography';
    publicationYear: number;
    isAvailable: boolean;
    stock: number;
}
export declare class BooksService {
    private books;
    create(createBookDto: CreateBookDto): Book;
    findAll(): Book[];
    findOne(title: string): Book;
    update(title: string, updateBookDto: UpdateBookDto): Book;
    remove(title: string): Book;
    buy(title: string): any;
}
