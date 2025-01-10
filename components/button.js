"use client";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`border-b border-red-500 text-white px-4 py-2 rounded hover:bg-red-500/20 transition duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;