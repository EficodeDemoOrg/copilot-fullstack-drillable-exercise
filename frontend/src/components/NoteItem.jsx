/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const NoteItem = ({ note }) => {
  // Format the date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Link
      to={`edit-note/${note.id}`}
      className="note bg-gradient-to-r from-[#222] to-[#1e1e1e1a] lg:p-4 md:p-4 sm:p-2 p-1 rounded-md flex flex-col justify-between items-start border-[1px] border-[#ffffff0a] border-solid h-[150px]"
    >
      <div>
        <h4 className="text-[#FFF] lg:text-xl md:text-lg sm:text-sm text-xs mb-2">
          {note.title.length > 20 ? note.title.substr(0, 20) + "..." : note.title}
        </h4>
        <p className="text-[rgba(255,255,255,0.70)] lg:text-[14px] md:text-[12px] sm:text-[11px] text-[10px]">
          {note.content.length > 50 ? note.content.substr(0, 50) + "..." : note.content}
        </p>
      </div>
      <div className="w-full mt-2">
        <p className="text-[rgba(255,255,255,0.50)] lg:text-[12px] md:text-[11px] sm:text-[10px] text-[9px]">
          Created: {formatDate(note.createdAt)}
        </p>
        {note.updatedAt !== note.createdAt && (
          <p className="text-[rgba(255,255,255,0.50)] lg:text-[12px] md:text-[11px] sm:text-[10px] text-[9px]">
            Updated: {formatDate(note.updatedAt)}
          </p>
        )}
      </div>
    </Link>
  );
};

export default NoteItem;
