"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
let BooksService = class BooksService {
    books = [];
    create(createBookDto) {
        const book = {
            ...createBookDto,
            isAvailable: createBookDto.isAvailable ?? true,
        };
        this.books.push(book);
        return book;
    }
    findAll() {
        return this.books;
    }
    findOne(title) {
        const book = this.books.find(b => b.title === title);
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        return book;
    }
    update(title, updateBookDto) {
        const book = this.findOne(title);
        Object.assign(book, updateBookDto);
        return book;
    }
    remove(title) {
        const index = this.books.findIndex(b => b.title === title);
        if (index === -1) {
            throw new common_1.NotFoundException('Book not found');
        }
        const deleted = this.books.splice(index, 1);
        return deleted[0];
    }
    buy(title) {
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
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)()
], BooksService);
//# sourceMappingURL=books.service.js.map