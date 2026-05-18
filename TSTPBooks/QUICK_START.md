# 🚀 Quick Start Guide - TST Books

## Prerequisites
- Node.js installed
- MongoDB running (local or cloud)
- A text editor or IDE

## Step 1: Start Backend Server

```bash
cd backend
npm install  # If needed
npm start
```

**Expected Output:**
```
Running Express server on port 5000
```

## Step 2: Start Frontend

### Option A: Open in Browser
Simply open `frontend/index.html` in your browser

### Option B: Use HTTP Server
```bash
cd frontend
python3 -m http.server 3000
# Then visit: http://localhost:3000
```

### Option C: Use Live Server (VS Code)
Right-click on `index.html` → "Open with Live Server"

## Step 3: Use the Application

### Add a Book:
1. Click "Add New Book" button
2. Fill in the form:
   - Title: "The Great Gatsby"
   - Author: "F. Scott Fitzgerald"
   - Price: 12.99
   - Total Pages: 180
   - Pages Read: 45
   - Format: Select "Print"
   - Status: Select "Currently reading"
   - Suggested By: "Friend"
3. Click "Register Book"
4. Auto-redirect to dashboard

### View Dashboard:
- See all your books
- Check reading progress
- View global statistics
- Filter by status
- Sort by different criteria
- Delete books

## 🎨 Pages Overview

| Page | URL | Purpose |
|------|-----|---------|
| Home | index.html | Landing page with navigation |
| Register | register.html | Add new books |
| Dashboard | tracking.html | Track reading progress |

## 📊 Statistics Shown

- **Total Books**: Count of all books
- **Books Finished**: Count of completed books
- **Total Pages Read**: Sum of all pages read
- **Total Pages**: Sum of all pages in library

## ⚙️ Troubleshooting

### "Cannot connect to backend"
1. Check backend is running: `npm start` in backend folder
2. Verify port 5000 is not blocked
3. Check MongoDB connection

### "Pages read error"
- Ensure Pages Read ≤ Total Pages

### Styling looks broken
- Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R)
- Ensure Tailwind CDN is loading

## 📝 Example Book Data

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "price": 45.99,
  "pageCount": 464,
  "pageCountReaded": 232,
  "format": "Print",
  "status": "Currently reading",
  "suggested_by": "Colleague"
}
```

## ✨ Features Checklist

- ✅ Register books with all required fields
- ✅ Track reading progress (0-100%)
- ✅ Auto-mark as finished when complete
- ✅ View global statistics
- ✅ Filter books by status
- ✅ Sort books by multiple criteria
- ✅ Delete books
- ✅ Responsive design
- ✅ Professional UI styling

## 🔄 Workflow

```
1. User opens index.html
   ↓
2. Clicks "Add New Book"
   ↓
3. Fills register.html form
   ↓
4. Submits → Saved to MongoDB
   ↓
5. Redirected to tracking.html
   ↓
6. Can view, filter, sort, delete books
```

## 📞 Need Help?

Check the README.md in the frontend folder for detailed documentation.

---

**Ready to go!** 🎉
