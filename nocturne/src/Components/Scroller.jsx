
import React from "react";

const Scroller = ({ loading, data, error }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
        <p className="text-[#faebd7]/60 text-sm animate-pulse">
          Finding your sound...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-[#faebd7]/60">
        <p>Something went wrong. Please try again.</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16 text-[#faebd7]/60">
        <p>No results found. Try something else!</p>
      </div>
    );
  }

  return null;
};

export default Scroller;

