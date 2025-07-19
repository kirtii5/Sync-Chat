import React from "react";

export const Checkbox = ({ checked, onCheckedChange }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={() => onCheckedChange(!checked)}
      className="w-4 h-4 text-violet-600 rounded border-gray-300 focus:ring-violet-500 cursor-pointer"
    />
  );
};
