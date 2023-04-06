import React, { useState } from "react";

type InstructionsProps = {
  label: string;
  content: string;
  onInstructionsChange: (instructions: string) => void;
  onSubmit?: () => void;
};

const Instructions: React.FC<InstructionsProps> = ({
  label,
  content,
  onInstructionsChange,
  onSubmit,
}) => {
  const [instructions, setInstructions] = useState(content);

  const handleInstructionsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newInstructions = event.target.value;
    setInstructions(newInstructions);
    onInstructionsChange(newInstructions);
  };

  return (
    <div className="relative mt-4 flex flex-col">
      <label htmlFor="instructions" className="block font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id="instructions"
        name="instructions"
        rows={4}
        className="form-textarea mt-1 block w-full resize-none rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        value={instructions}
        onChange={handleInstructionsChange}
      />
      {onSubmit && (
        <button
          className="my-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          onClick={onSubmit}
        >
          Ask
        </button>
      )}
    </div>
  );
};

export default Instructions;
