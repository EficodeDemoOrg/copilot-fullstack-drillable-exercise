# Notes App API Documentation

This document provides information about the Notes API endpoints.

## Base URL

```
http://localhost:5000
```

## Authentication

Currently, the API does not require authentication. All notes are associated with a placeholder user. In a future implementation, proper authentication will be added.

## Endpoints

### Get All Notes

Retrieves all notes.

- **URL**: `/notes`
- **Method**: `GET`
- **Success Response**: 
  - **Code**: 200
  - **Content**: Array of note objects
  ```json
  [
    {
      "id": 0,
      "title": "Grocery List",
      "content": "Milk, eggs, bread",
      "createdAt": "2025-05-01T12:00:00Z",
      "updatedAt": "2025-05-01T12:00:00Z",
      "userId": "user1"
    },
    ...
  ]
  ```
- **Error Response**:
  - **Code**: 500
  - **Content**: `{ "message": "Error retrieving notes", "error": "Error message" }`

### Get Single Note

Retrieves a single note by ID.

- **URL**: `/notes/:id`
- **Method**: `GET`
- **URL Parameters**: `id=[integer]` note ID
- **Success Response**: 
  - **Code**: 200
  - **Content**: Single note object
  ```json
  {
    "id": 1,
    "title": "Meeting Notes",
    "content": "Discussed project deadlines",
    "createdAt": "2025-05-02T14:30:00Z",
    "updatedAt": "2025-05-02T14:30:00Z",
    "userId": "user1"
  }
  ```
- **Error Response**:
  - **Code**: 404
  - **Content**: `{ "message": "Note not found" }`
  - **Code**: 500
  - **Content**: `{ "message": "Error retrieving note", "error": "Error message" }`

### Create Note

Creates a new note.

- **URL**: `/notes`
- **Method**: `POST`
- **Data Parameters**: 
  ```json
  {
    "title": "New Note Title",
    "content": "New note content"
  }
  ```
- **Success Response**: 
  - **Code**: 201
  - **Content**: Created note object with ID and timestamps
  ```json
  {
    "id": 3,
    "title": "New Note Title",
    "content": "New note content",
    "createdAt": "2025-05-14T10:30:00Z",
    "updatedAt": "2025-05-14T10:30:00Z",
    "userId": "user1"
  }
  ```
- **Error Response**:
  - **Code**: 400
  - **Content**: `{ "message": "Title and content are required" }`
  - **Code**: 500
  - **Content**: `{ "message": "Error creating note", "error": "Error message" }`

### Update Note

Updates an existing note.

- **URL**: `/notes/:id`
- **Method**: `PUT`
- **URL Parameters**: `id=[integer]` note ID
- **Data Parameters**: 
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content"
  }
  ```
  Note: Either title or content or both can be provided.
- **Success Response**: 
  - **Code**: 200
  - **Content**: Updated note object
  ```json
  {
    "id": 1,
    "title": "Updated Title",
    "content": "Updated content",
    "createdAt": "2025-05-02T14:30:00Z",
    "updatedAt": "2025-05-14T11:45:00Z",
    "userId": "user1"
  }
  ```
- **Error Response**:
  - **Code**: 400
  - **Content**: `{ "message": "Title or content must be provided" }`
  - **Code**: 404
  - **Content**: `{ "message": "Note not found" }`
  - **Code**: 500
  - **Content**: `{ "message": "Error updating note", "error": "Error message" }`

### Delete Note

Deletes a note.

- **URL**: `/notes/:id`
- **Method**: `DELETE`
- **URL Parameters**: `id=[integer]` note ID
- **Success Response**: 
  - **Code**: 200
  - **Content**: 
  ```json
  {
    "message": "Note deleted successfully",
    "deletedNote": {
      "id": 2,
      "title": "Ideas",
      "content": "New app features",
      "createdAt": "2025-05-03T09:15:00Z",
      "updatedAt": "2025-05-03T09:15:00Z",
      "userId": "user1"
    }
  }
  ```
- **Error Response**:
  - **Code**: 404
  - **Content**: `{ "message": "Note not found" }`
  - **Code**: 500
  - **Content**: `{ "message": "Error deleting note", "error": "Error message" }`
