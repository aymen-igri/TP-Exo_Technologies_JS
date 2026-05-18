import { IBook } from "../interfaces/book";
import { Format } from "../enums/format";
import { Status } from "../enums/status";

export class Book implements IBook{
  private id: string;
  private title: string;
  private author: string;
  private price: number;
  private pageCountReaded: number;
  private pageCount: number;
  private format: Format;
  private status: Status;
  private suggestedBy: string;
  private finished: boolean;

  constructor(
    id: string,
    title: string,
    author: string,
    price: number,
    pageCountReaded: number,
    pageCount: number,
    format: Format,
    status: Status,
    suggestedBy: string,
    finished: boolean,
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.price = price;
    this.pageCountReaded = pageCountReaded;
    this.pageCount = pageCount;
    this.format = format;
    this.status = status;
    this.suggestedBy = suggestedBy;
    this.finished = finished;
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getAuthor(): string {
    return this.author;
  }

  getPrice(): number {
    return this.price;
  }

  getPageCountReaded(): number {
    return this.pageCountReaded;
  }

  getPageCount(): number {
    return this.pageCount;
  }

  getFormat(): Format {
    return this.format;
  }

  getStatus(): Status {
    return this.status;
  }

  getSuggestedBy(): string {
    return this.suggestedBy;
  }

  getFinished(): boolean {
    return this.finished;
  }

  currentlyAt(): number {
    if (this.pageCount === 0) return 0;
    return Math.round((this.pageCountReaded / this.pageCount) * 100);
  }

  async deleteBook(): Promise<void> {
    try {
      const response = await fetch('http://localhost:5000/api/books/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: this.id }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  }

}