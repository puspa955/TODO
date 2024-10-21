const TaskButton = ({ type, onClick, label, disabled, isCancel }) => {
    const baseClasses = "px-4 py-2 rounded-md text-sm";
    const cancelClasses = "bg-gray-200 hover:bg-gray-300 mr-2";
    const submitClasses = "text-white bg-red-500 hover:bg-red-600";
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseClasses} ${isCancel ? cancelClasses : submitClasses} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={disabled}
      >
        {label}
      </button>
    );
  };
  
  export default TaskButton;
  