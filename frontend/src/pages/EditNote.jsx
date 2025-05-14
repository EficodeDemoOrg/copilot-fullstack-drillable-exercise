
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

/**
 * EditNote component allows users to modify existing notes.
 * It provides functionality to edit the title and details of a note,
 * save the changes, and delete the note if needed.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.notes - Array of note objects
 * @param {Function} props.setNotes - Function to update notes state in parent component
 */
const EditNote = ({ notes, setNotes }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  
  // Format the date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Load note data
  useEffect(() => {
    const noteId = parseInt(id);
    const note = notes.find(note => note.id === noteId);
    
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCreatedAt(note.createdAt);
      setUpdatedAt(note.updatedAt);
    } else {
      // If note not found, fetch it from the API
      const fetchNote = async () => {
        try {
          const response = await fetch(`http://localhost:5000/notes/${noteId}`);
          
          if (!response.ok) {
            navigate("/"); // Redirect to home if note doesn't exist
            return;
          }
          
          const noteData = await response.json();
          setTitle(noteData.title);
          setContent(noteData.content);
          setCreatedAt(noteData.createdAt);
          setUpdatedAt(noteData.updatedAt);
        } catch (err) {
          console.error("Failed to fetch note:", err);
          navigate("/");
        }
      };
      
      fetchNote();
    }
  }, [id, notes, navigate]);
  
  // Handle note update
  const handleUpdateNote = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    try {
      const noteId = parseInt(id);
      const response = await fetch(`http://localhost:5000/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update note");
      }
      
      const updatedNote = await response.json();
      
      // Update the notes list with the updated note
      setNotes(prevNotes => 
        prevNotes.map(note => note.id === updatedNote.id ? updatedNote : note)
      );
      
      // Redirect to the home page
      navigate("/");
    } catch (err) {
      setError(err.message || "An error occurred while updating the note");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle note deletion
  const handleDeleteNote = async () => {
    try {
      const noteId = parseInt(id);
      const response = await fetch(`http://localhost:5000/notes/${noteId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete note");
      }
      
      // Remove the note from the notes list
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
      
      // Redirect to the home page
      navigate("/");
    } catch (err) {
      setError(err.message || "An error occurred while deleting the note");
    }
  };

  return (
    <section className="lg:w-[80%] lg:p-10 h-[screen-4%] lg:gap-4 md:w-[90%] md:h-[90%] md:p-4 md:gap-3 flex justify-between items-center flex-col bg-[#171616] rounded-[12px] sm:w-[90%] sm:h-[90%] sm:p-3 sm:gap-3 w-full h-full p-2 gap-3">
      <header className="flex w-full items-center justify-between p-2">
        <Link to="/" className="bg-[#282828] p-2 text-white rounded-md cursor-pointer">
          <IoIosArrowBack />
        </Link>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowDeleteConfirm(true)} 
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
          >
            <RiDeleteBin6Line />
          </button>
          <button 
            onClick={handleUpdateNote} 
            disabled={isSubmitting}
            className={`bg-gradient-to-br from-[#43CBFF] to-[#9708CC] text-white p-2 rounded-md px-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </header>
      
      {error && (
        <div className="bg-red-500 bg-opacity-20 text-red-300 p-2 rounded-md w-full mt-2">
          {error}
        </div>
      )}
      
      <div className="flex flex-col gap-4 w-full flex-1 pt-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-[#282828] text-white p-3 rounded-md focus:outline-none border-[1px] border-[#ffffff0a] border-solid"
        />
        
        <textarea
          placeholder="Note content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-[#282828] text-white p-3 rounded-md focus:outline-none border-[1px] border-[#ffffff0a] border-solid flex-1 resize-none"
        />
        
        <div className="text-[rgba(255,255,255,0.50)] text-sm mt-2">
          <p>Created: {formatDate(createdAt)}</p>
          {updatedAt !== createdAt && <p>Last modified: {formatDate(updatedAt)}</p>}
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#282828] p-6 rounded-md max-w-md w-full">
            <h3 className="text-white text-lg font-bold mb-4">Delete Note?</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this note? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteNote}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditNote;
