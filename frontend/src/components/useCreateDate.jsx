/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-vars */

/**
 * Custom hook for formatting dates in the Notes application
 * Provides functions to format dates for display and comparison
 * 
 * @returns {Object} Object containing date formatting functions
 */
const useCreateDate = () => {
  /**
   * Creates a formatted date string from the current date
   * @returns {string} Formatted date string
   */
  const formatCurrentDate = () => {
    const dateObj = new Date();
    return formatDateObject(dateObj);
  };
  
  /**
   * Formats a date object or date string into a readable format
   * @param {Date|string} date - Date object or ISO date string
   * @returns {string} Formatted date string
   */
  const formatDateObject = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const month = dateObj.getMonth();
    let monthName;
  switch (month) {
    case 0:
      monthName = "Jan";
      break;
    case 1:
      monthName = "Feb";
      break;
    case 2:
      monthName = "Mar";
      break;
    case 3:
      monthName = "Apr";
      break;
    case 4:
      monthName = "May";
      break;
    case 5:
      monthName = "Jun";
      break;
    case 6:
      monthName = "Jul";
      break;
    case 7:
      monthName = "Aug";
      break;
    case 8:
      monthName = "Sep";
      break;
    case 9:
      monthName = "Oct";
      break;
    case 10:
      monthName = "Nov";
      break;
    case 11:
      monthName = "Dec";
      break;
  }
  // Format hours and minutes with leading zeros
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  // Use getDate() instead of getDay() to get the day of month (not day of week)
  const date = `${monthName} ${dateObj.getDate()}, ${dateObj.getFullYear()} [${hours}:${minutes}]`;
  return date;
};

  /**
   * Compares two dates to check if they are the same
   * @param {string} date1 - First date string in ISO format
   * @param {string} date2 - Second date string in ISO format
   * @returns {boolean} True if dates are the same, false otherwise
   */
  const areDatesEqual = (date1, date2) => {
    if (!date1 || !date2) return false;
    
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    return d1.getTime() === d2.getTime();
  };
  
  /**
   * Returns a formatted time elapsed string
   * @param {string} dateString - Date string in ISO format
   * @returns {string} Time elapsed in a human readable format
   */
  const getTimeElapsed = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 30) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return formatDateObject(date);
    }
  };
  
  return { formatCurrentDate, formatDateObject, areDatesEqual, getTimeElapsed };
};

export default useCreateDate;
