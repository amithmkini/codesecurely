import React, { useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

type OutputProps = {
  output: string;
};

const Output: React.FC<OutputProps> = ({ output }) => {
  return (
    <div className="mt-4">
      <p className="font-medium text-gray-700">Output:</p>
      <div className="w-full h-60 border border-gray-300 rounded-md p-3 overflow-y-scroll min-h-40 max-h-100">
        <ReactMarkdown>{output}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Output;