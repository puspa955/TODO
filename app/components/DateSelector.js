import { useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, isToday, isTomorrow } from 'date-fns';

const DateSelector = ({ deadline, onDateSelection, onClearDate }) => {
  const datePickerRef = useRef(null);

  const defaultDate = deadline || new Date();

  const getFormattedDate = () => {
    if (!deadline) return 'Due date';
    if (isToday(deadline)) return 'Today';
    if (isTomorrow(deadline)) return 'Tomorrow';
    return format(deadline, 'dd MMM yyyy');
  };

  const showCalendar = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={showCalendar}
          className="flex items-center px-3 py-1 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-700 hover:bg-gray-100"
        >
          {/* Calendar Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-gray-500 mr-2 mt-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10m-13 5h16a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z"
            />
          </svg>
          {/* Date Text */}
          {getFormattedDate()}
          {deadline && (
            <span className="ml-2 cursor-pointer text-red-500" onClick={onClearDate}>
              ✕
            </span>
          )}
        </button>

        <DatePicker
          ref={datePickerRef}
          selected={defaultDate} 
          onChange={onDateSelection}
          minDate={new Date()} 
          dateFormat="dd MMM yyyy"
          onClickOutside={() => datePickerRef.current.setOpen(false)}
          withPortal
          className="hidden"
        />
      </div>
    </div>
  );
};

export default DateSelector;
