import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(createBookDto: CreateBookDto): import("./books.service").Book;
    findAll(): import("./books.service").Book[];
    findOne(title: string): import("./books.service").Book;
    update(title: string, updateBookDto: UpdateBookDto): import("./books.service").Book;
    remove(title: string): import("./books.service").Book;
    buy(title: string): any;
}
