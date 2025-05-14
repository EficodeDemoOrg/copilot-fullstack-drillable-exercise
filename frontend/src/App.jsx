/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";

import { useState, useEffect } from "react";

/**
 * Main App component that handles state management for notes
 * Provides functionality to fetch, create, update, and delete notes
 */
function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  /**
   * Fetches all notes from the API
   */
  const fetchNotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/notes');
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError('Failed to load notes. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="app w-screen h-screen flex justify-center py-3 p-2 items-center bg-gray-700 ">
      <Router>
        {isLoading && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md">
            Loading...
          </div>
        )}
        {error && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md">
            {error}
          </div>
        )}
        <Routes>
          <Route path="/" element={<Notes notes={notes} />} />
          <Route
            path="/create-note"
            element={<CreateNote setNotes={setNotes} />}
          />
          <Route
            path="/edit-note/:id"
            element={<EditNote notes={notes} setNotes={setNotes} />}
          />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
