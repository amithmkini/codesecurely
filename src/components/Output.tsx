import React, { useState, useEffect } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type OutputProps = {
  output: string;
};

const Output: React.FC<OutputProps> = ({ output }) => {
  const [pulseClassName, setPulseClassName] = useState<string>("");

  useEffect(() => {
    if (output === "Asking...") {
      setPulseClassName("animate-pulse");
    } else {
      setPulseClassName("");
    }
  }, [output]);

  return (
    <div className="mt-4">
      <p className="font-medium text-gray-700">Output:</p>
      <div
        className={`min-h-40 h-96 max-h-full w-full overflow-y-scroll rounded-md border border-gray-300 p-3 ${pulseClassName}`}
      >
        <ReactMarkdown>{output}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Output;
