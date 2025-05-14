# Notes App

This is a full-stack notes application with React frontend and Express backend that allows users to create, edit, view, and delete notes. The application provides a clean interface for managing personal notes with automatic timestamp tracking for creation and updates.

## Features

### Notes Management
- **Create Notes**: Add new notes with title and content, with automatic timestamp tracking
- **View Notes**: Browse all notes with title and content preview in a responsive grid layout
- **View Note Details**: Click on a note to view and edit its full content
- **Update Notes**: Edit note title and content, with automatic update timestamp tracking
- **Delete Notes**: Remove unwanted notes with a confirmation dialog to prevent accidental deletion
- **Search**: Filter notes by title or content using the search bar

## Technology Stack

### Frontend
- React.js with React Router for navigation
- Tailwind CSS for styling
- Jest for testing
- Vite as the build tool

### Backend
- Node.js
- Express.js
- REST API

## Prerequisites

- Node.js v14.0 or higher
- npm or yarn
- Web browser (Chrome, Firefox, Safari, or Edge recommended)
- Internet connection for initial setup


## Setup Instructions

### Downloading and installing Node.js and npm

[Installation instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
4. The server will start running on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
4. Open your browser and navigate to http://localhost:5173 (or the URL shown in your terminal)

## Running the Application

1. Make sure both the backend and frontend servers are running in separate terminal windows.
2. Access the application through your web browser at http://localhost:5173
3. Create, view, edit, and delete notes using the intuitive user interface.

## Running Tests

### Frontend Tests

To run tests for the frontend:

```bash
cd frontend
npm test
```

This will launch Jest in watch mode, allowing you to see test results and automatically re-run tests when files change.

## Project Structure

```
fullstack-notes-app/
├── backend/                 # Express backend
│   ├── app.js               # Main server application
│   ├── app.test.js          # API endpoint tests
│   └── package.json         # Backend dependencies
│
├── frontend/                # React frontend
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── assets/          # Images and other assets
│   │   ├── components/      # Reusable UI components
│   │   │   ├── NoteItem.jsx # Single note display component
│   │   │   └── useCreateDate.jsx # Date formatting hook
│   │   ├── pages/           # Route components
│   │   │   ├── CreateNote.jsx # New note creation page
│   │   │   ├── EditNote.jsx # Note editing page
│   │   │   └── Notes.jsx    # Main notes listing page
│   │   ├── App.jsx          # Main React component
│   │   └── main.jsx         # React entry point
│   └── package.json         # Frontend dependencies
│
└── README.md                # Project documentation
```


## API Endpoints

The backend provides the following REST API endpoints:

### GET /notes
- Returns an array of all notes
- Example response:
  ```json
  [
    {
      "id": 0,
      "title": "Grocery List",
      "content": "Milk, eggs, bread",
      "createdAt": "2025-05-01T12:00:00Z",
      "updatedAt": "2025-05-01T12:00:00Z"
    },
  ]
  ```

### GET /notes/:id
- Returns a single note by ID
- Example response:
  ```json
  {
    "id": 1,
    "title": "Meeting Notes",
    "content": "Discussed project deadlines",
    "createdAt": "2025-05-02T14:30:00Z",
    "updatedAt": "2025-05-02T14:30:00Z"
  }
  ```

### POST /notes
- Creates a new note
- Request body:
  ```json
  {
    "title": "New Note",
    "content": "Note content"
  }
  ```
- Returns the created note with ID and timestamps

### PUT /notes/:id
- Updates an existing note
- Request body (all fields optional):
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content"
  }
  ```
- Returns the updated note with new timestamps

### DELETE /notes/:id
- Deletes a note by ID
- Returns a success message and the deleted note

For more detailed API documentation, see the backend [README](./backend/README.md).