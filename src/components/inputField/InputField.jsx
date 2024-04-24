import React from "react";

const InputField = ({ type, onChange, name, value, placeholder }) => {
    return (
        <input
            type={type}
            onChange={onChange}
            name={name}
            value={value}
            placeholder={placeholder}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-[8rem] md:w-full"
        />
    );
};

export default InputField;
