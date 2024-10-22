import { useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, isToday, isTomorrow } from 'date-fns';
import { FaTimes } from 'react-icons/fa';

const DateSelector = ({ selectedDate, onDateChange, clearDate }) => {
  const datePickerRef = useRef(null);

  const handleDateSelection = (date) => {
    onDateChange(date); // Call the parent handler with the selected date
  };

  const getFormattedDate = () => {
    if (!selectedDate) return 'Due date';
    if (isToday(selectedDate)) return 'Today';
    if (isTomorrow(selectedDate)) return 'Tomorrow';
    return format(selectedDate, 'dd MMM yyyy');
  };

  const showCalendar = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={showCalendar}
        className="flex items-center px-3 py-1 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-700 hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 text-gray-500 mr-2 mt-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10m-13 5h16a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z"
          />
        </svg>
        {getFormattedDate()}
        {selectedDate && (
          <FaTimes className="ml-2 cursor-pointer text-red-500" onClick={clearDate} />
        )}
      </button>

      <DatePicker
        ref={datePickerRef}
        selected={selectedDate}
        onChange={handleDateSelection}
        minDate={new Date()}
        dateFormat="dd MMM yyyy"
        onClickOutside={() => datePickerRef.current.setOpen(false)}
        withPortal
        className="hidden"
      />
    </div>
  );
};

export default DateSelector;
