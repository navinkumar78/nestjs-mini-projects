import { Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class BooksService {
  private books: Book[] = [];

  create(createBookDto: CreateBookDto): Book {
    const book: Book = {
      ...createBookDto,
      isAvailable: createBookDto.isAvailable ?? true,
    };
    this.books.push(book);
    return book;
  }

  findAll(): Book[] {
    return this.books;
  }

  findOne(title: string): Book {
    const book = this.books.find(b => b.title === title);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  update(title: string, updateBookDto: UpdateBookDto): Book {
    const book = this.findOne(title);
    Object.assign(book, updateBookDto);
    return book;
  }

  remove(title: string): Book {
    const index = this.books.findIndex(b => b.title === title);
    if (index === -1) {
      throw new NotFoundException('Book not found');
    }
    const deleted = this.books.splice(index, 1);
    return deleted[0];
  }
  buy(title: string): any {
    const book = this.findOne(title);
    if (!book.isAvailable) {
      return "Book is not available";
    }
    if (book.stock <= 0) {
      return "Book is out of stock";
    }
    book.stock--;
    return 'Book purchased successfully';

  }
  }
