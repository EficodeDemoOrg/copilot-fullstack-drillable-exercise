import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

/**
 * CreateNote component allows users to create a new note with a title and details.
 * It submits the note to the backend API, and redirects to home upon successful creation.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.setNotes - Function to update notes state in parent component
 */
const CreateNote = ({ setNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    try {
      const response = await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create note");
      }
      
      const newNote = await response.json();
      
      // Update the notes list with the new note
      setNotes(prevNotes => [...prevNotes, newNote]);
      
      // Redirect to the home page
      navigate("/");
    } catch (err) {
      setError(err.message || "An error occurred while creating the note");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="lg:w-[80%] lg:p-10 h-[screen-4%] lg:gap-4 md:w-[90%] md:h-[90%] md:p-4 md:gap-3 flex justify-between items-center flex-col bg-[#171616] rounded-[12px] sm:w-[90%] sm:h-[90%] sm:p-3 sm:gap-3 w-full h-full p-2 gap-3">
      <header className="flex w-full items-center justify-between p-2">
        <Link to="/" className="bg-[#282828] p-2 text-white rounded-md cursor-pointer">
          <IoIosArrowBack />
        </Link>
        <button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className={`bg-gradient-to-br from-[#43CBFF] to-[#9708CC] text-white p-2 rounded-md px-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </header>
      
      {error && (
        <div className="bg-red-500 bg-opacity-20 text-red-300 p-2 rounded-md w-full mt-2">
          {error}
        </div>
      )}
      
      <form className="flex flex-col gap-4 w-full flex-1 pt-4" onSubmit={handleSubmit}>
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
      </form>
    </section>
  );
};

export default CreateNote;
