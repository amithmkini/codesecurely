import React, { useState } from 'react';

type InstructionsProps = {
  label: string;
  content: string;
  onInstructionsChange: (instructions: string) => void;
  onSubmit?: () => void;
};

const Instructions: React.FC<InstructionsProps> = ({ label, content, onInstructionsChange, onSubmit }) => {
  const [instructions, setInstructions] = useState(content);

  const handleInstructionsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInstructions = event.target.value;
    setInstructions(newInstructions);
    onInstructionsChange(newInstructions);
  };

  return (
    <div className="mt-4 flex flex-col relative">
      <label htmlFor="instructions" className="block font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id="instructions"
        name="instructions"
        rows={4}
        className="resize-none form-textarea mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
        value={instructions}
        onChange={handleInstructionsChange}
      />
      {onSubmit && (
        <button
          className="m-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={onSubmit}
        >
          Ask
        </button>
      )}
    </div>
  );
};

export default Instructions;
