const API_BASE_URL = 'http://localhost:5000/api/books';

export interface CreateBookDTO {
  title: string;
  author: string;
  price: number;
  pageCount: number;
  pageCountReaded: number;
  format: string;
  status: string;
  suggested_by: string;
  finished: boolean;
}

export interface BookData {
  _id: string;
  title: string;
  author: string;
  price: number;
  pageCount: number;
  pageCountReaded: number;
  format: string;
  status: string;
  suggested_by: string;
  finished: boolean;
}

export class BookService {
  static async createBook(bookData: CreateBookDTO): Promise<BookData> {
    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create book');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  }

  static async getAllBooks(): Promise<BookData[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }

  static async deleteBook(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  }

  static async updateBook(id: string, data: Partial<BookData>): Promise<BookData> {
    try {
      const response = await fetch(`${API_BASE_URL}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...data }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update book');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  }
}
