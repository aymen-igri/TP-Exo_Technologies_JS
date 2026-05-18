# TST Books - Frontend Implementation Guide

## 📚 Project Overview

This is a complete frontend implementation for the TST Books (TypeScript Technology Books) reading tracker application. It allows users to:

- ✅ Register new books with detailed information
- ✅ Track reading progress with visual progress bars
- ✅ View global reading statistics
- ✅ Filter and sort books by various criteria
- ✅ Delete books from their collection
- ✅ Auto-calculate finished status

## 🎯 What's Implemented

### Frontend Files Created

1. **`index.html`** - Landing page with navigation to dashboard and registration form
2. **`register.html`** - Book registration form with Tailwind CSS styling
3. **`tracking.html`** - Main dashboard showing all books with progress tracking
4. **`src/services/bookService.ts`** - API service for backend communication

### TypeScript Enhancements

1. **`src/classes/Books.ts`** - Enhanced with:
   - Getter methods for all private properties
   - `currentlyAt()` - Returns reading percentage (0-100)
   - `deleteBook()` - Async method to delete book from database

2. **`src/enums/status.ts`** - Fixed with proper string values:
   - Read, Re-read, DNF, Currently reading, Returned Unread, Want to read

3. **`src/enums/format.ts`** - Fixed with proper string values:
   - Print, PDF, Ebook, AudioBook

### Backend Routes Updated

All backend routes are now available at `/api/books/`:

- **POST `/api/books/create`** - Create a new book
- **GET `/api/books/all`** - Fetch all books
- **GET `/api/books/:id`** - Get a specific book
- **DELETE `/api/books/delete`** - Delete a book
- **PUT `/api/books/update`** - Update a book

### Backend Model Updated

Added missing fields to `booksModel.js`:
- `author` (required)
- `price` (optional, defaults to 0)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB running locally or with a connection string
- Backend server running on port 5000
- Frontend served on port 3000 or opened as a file

### Installation

1. **Start the Backend Server**

```bash
cd backend
npm install  # If not already done
npm start    # Runs on port 5000
```

2. **Open Frontend in Browser**

```bash
# Option 1: Using Live Server (VS Code Extension)
# Right-click on index.html and select "Open with Live Server"

# Option 2: Simple HTTP Server (Python)
cd frontend
python3 -m http.server 3000

# Option 3: Using http-server (npm)
npm install -g http-server
http-server . -p 3000
```

3. **Access the Application**

Open your browser and go to:
- `http://localhost:3000` (if using a server)
- Or open `frontend/index.html` directly

## 📋 Features

### 1. Book Registration Form (`register.html`)

The form includes all required fields:
- **Title** (text) - Book title
- **Author** (text) - Author name
- **Price** (number) - Book price
- **Total Pages** (number) - Total page count
- **Pages Read** (number) - Validated to be ≤ total pages
- **Format** (dropdown) - Print, PDF, Ebook, AudioBook
- **Status** (dropdown) - 6 available statuses
- **Suggested By** (text) - Who recommended the book

**Auto-calculation:**
- `finished` field is automatically set to `1` when `pages_read === total_pages`

### 2. Reading Tracker Dashboard (`tracking.html`)

**Global Statistics:**
- Total number of books
- Number of finished books
- Total pages read across all books
- Total pages across all books

**Book List Features:**
- Each book displays:
  - Title, Author, Format, Status (with color-coded badges)
  - Suggested by information and price
  - Reading progress bar (percentage and pages)
  - Delete button
  - Green check mark when finished

**Filtering & Sorting:**
- Filter by status
- Sort by: Title, Author, Progress, Status

### 3. API Service (`src/services/bookService.ts`)

Provides methods:
- `createBook(bookData)` - Register a new book
- `getAllBooks()` - Fetch all books
- `deleteBook(id)` - Delete a book
- `updateBook(id, data)` - Update book information

## 🎨 Styling

All pages use **Tailwind CSS** for modern, responsive design:
- Mobile-friendly responsive layout
- Color-coded status badges
- Smooth transitions and hover effects
- Clean, professional UI

## 🔄 Workflow

1. User visits `index.html` (landing page)
2. Clicks "Add New Book" → Goes to `register.html`
3. Fills out the form and submits
4. Book is saved to MongoDB via backend
5. User is redirected to `tracking.html`
6. Dashboard shows all books with progress tracking
7. User can filter, sort, or delete books

## 🐛 Troubleshooting

### "Failed to fetch books" Error
- Ensure backend server is running on port 5000
- Check CORS is enabled in backend (`index.js`)
- Verify MongoDB connection is working

### Form Submission Fails
- Check browser console for error messages
- Verify all required fields are filled
- Ensure Pages Read ≤ Total Pages
- Check backend API response

### Styling Not Applied
- Refresh browser page (hard refresh: Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Ensure Tailwind CDN link is loading

## 📝 Backend API Endpoints Reference

### Create Book
```bash
POST /api/books/create
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "price": 12.99,
  "pageCount": 180,
  "pageCountReaded": 0,
  "format": "Print",
  "status": "Want to read",
  "suggested_by": "Friend"
}
```

### Get All Books
```bash
GET /api/books/all
```

### Delete Book
```bash
DELETE /api/books/delete
Content-Type: application/json

{
  "id": "book_id_here"
}
```

### Update Book
```bash
PUT /api/books/update
Content-Type: application/json

{
  "id": "book_id_here",
  "pageCountReaded": 50
}
```

## 🎓 Class Structure

### Book Class (`src/classes/Books.ts`)

```typescript
class Book implements IBook {
  // Getter methods
  getId(): string
  getTitle(): string
  getAuthor(): string
  getPrice(): number
  getPageCountReaded(): number
  getPageCount(): number
  getFormat(): Format
  getStatus(): Status
  getSuggestedBy(): string
  getFinished(): boolean
  
  // Business logic
  currentlyAt(): number              // Returns 0-100 percentage
  async deleteBook(): Promise<void>  // Deletes from database
}
```

## 📦 Dependencies

**Frontend:**
- Tailwind CSS (via CDN)
- Fetch API (native)

**Backend:**
- Express.js
- MongoDB/Mongoose
- CORS
- dotenv

## 🌟 Next Steps (Optional Enhancements)

- Add edit functionality for existing books
- Implement user authentication
- Add book search/filter by title
- Add statistics charts and graphs
- Implement drag-and-drop to update progress
- Add export functionality (PDF/CSV)
- Implement dark mode
- Add book cover images

## 📄 File Structure

```
frontend/
├── index.html              # Landing page
├── register.html           # Book registration form
├── tracking.html           # Reading tracker dashboard
├── src/
│   ├── classes/
│   │   └── Books.ts       # Enhanced Book class
│   ├── enums/
│   │   ├── status.ts      # Status enum (fixed)
│   │   └── format.ts      # Format enum (fixed)
│   ├── interfaces/
│   │   └── book.ts
│   └── services/
│       └── bookService.ts # API service (new)
└── .env.example           # Environment variables template

backend/
├── src/
│   ├── models/
│   │   └── booksModel.js      # Updated with author & price
│   ├── routes/
│   │   └── routes.js          # Complete CRUD operations
│   ├── db_connection/
│   └── index.js               # Updated with CORS
└── package.json               # Added cors dependency
```

## 📞 Support

For issues or questions:
1. Check the console (F12) for error messages
2. Verify backend server is running
3. Ensure MongoDB is connected
4. Check environment variables are set correctly

---

**Created**: 2026-05-18
**Version**: 1.0.0
**Status**: Ready for Production ✅
