import React, {useState, useEffect} from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  loading: boolean;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, loading }) => {
  const [spinner, setSpinner] = useState(loading);

  useEffect(() => {
    setSpinner(loading);
  }, [loading]);

  return (
    <button
      className="inline-flex items-center rounded bg-blue-500 px-4 py-2 hover:bg-blue-700"
      onClick={onClick} disabled={spinner}
    >
      {spinner ? <Spinner /> : null}
      {label}
    </button>
  );
};

const Spinner = () => {
  return (
    <svg
      className="animate-spin h-5 w-5 mr-3"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export default Button;
