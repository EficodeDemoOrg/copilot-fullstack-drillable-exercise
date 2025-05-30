/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
import NoteItem from "../components/NoteItem.jsx";

/**
 * Notes component that displays a list of notes with search functionality
 * Allows users to search notes by title and add new notes
 * @param {Array} notes - Array of note objects containing title and content
 */
const Notes = ({ notes }) => {  const [searchText, setSearchText] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  
  // Filter notes based on search text
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(
        note => 
          note.title.toLowerCase().includes(searchText.toLowerCase()) ||
          note.content.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [searchText, notes]);
  
  // Clear search
  const handleClearSearch = () => {
    setSearchText('');
  };

  return (
    <section className="lg:w-[80%] lg:p-10 h-[screen-4%] lg:gap-4 md:w-[90%] md:h-[90%] md:p-4 md:gap-3 flex justify-between items-center flex-col bg-[#171616] rounded-[12px] sm:w-[90%] sm:h-[90%] sm:p-3 sm:gap-3 w-full h-full p-2 gap-3">
      <header
        style={{ borderRadius: "7px 30px 30px 7px" }}
        className="notes_header lg:mb-3 h-[60px] w-full bg-[#1e1c1c] flex justify-between items-center pl-2 border-[1px] border-[#ffffff0a] border-solid"
      >
          <h2 className="text-[28px] text-white ml-5 font-['Poppu']">
            My Notes
          </h2>
        <div className="flex items-center gap-2 pr-4">
          <div className="search flex items-center bg-[#282828] rounded-md px-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-transparent border-none text-white p-2 focus:outline-none w-[150px]"
            />
            {searchText && (
              <button onClick={handleClearSearch} className="text-gray-400 hover:text-white">
                <MdClose />
              </button>
            )}
            <CiSearch className="text-gray-400 text-xl" />
          </div>
        </div>
      </header>      <div className="notes_container grid lg:grid-cols-4 md:grid-cols-3 md:mt-4 sm:grid-cols-2 xs:grid-col-1 flex-1 overflow-auto w-full gap-4 sm:mt-3 p-2 grid-cols-2">
        {filteredNotes.length === 0 && (
          <p className="text-white col-span-full text-center mt-6">
            {notes.length === 0 ? "No notes yet! Click 'ADD' to create your first note." : "No matching notes found."}
          </p>
        )}
        {filteredNotes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
      <Link
        to={"/create-note"}
        className="flex justify-center align-middle lg:w-[120px] md:w-[220px] sm:w-[320px] w-full gap-2 lg:mt-3 md:mt-3 sm:mt-3 mt-4 bg-gradient-to-br from-[#43CBFF] to-[#9708CC] text-green-50 p-2 rounded-md"
      >
        ADD
        <BsPlusLg className="self-center text-white text-lg font-extrabold" />
      </Link>
    </section>
  );
};

export default Notes;
