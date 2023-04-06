import React from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
