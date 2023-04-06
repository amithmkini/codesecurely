import React, { useState, useEffect, useRef } from "react";
import AceEditor from "react-ace";

// Import the required language and theme for the editor
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import ace from "ace-builds/src-noconflict/ace";
import Button from "./Button";
import Instructions from "./Instructions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type CodeEditorProps = {
  text: string;
  setText: (text: string) => void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ text, setText }) => {
  // const [text, setText] = useState("");
  const [instructions, setInstructions] = useState("Complete the code");

  const editorRef = useRef<AceEditor>(null);

  const handleInstructionsChange = (instructions: string) => {
    setInstructions(instructions);
  };

  function handleCompleteMe() {
    fetch("/api/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: text,
        instruction: instructions,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // If the status is not 200, show a toast with the error message
        if (data.status !== 200) {
          console.error(data.code);
          toast.error(data.code);
          return;
        }
        setText(data.code);
        if (editorRef.current) {
          editorRef.current.editor.setValue(data.code);
        }
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    ace.config.set("workerPath", "/workers");
  }, []);

  return (
    <div className="w-1/2 flex-grow">
      <div className="flex justify-between pb-4">
        <Button label="Complete me!" onClick={handleCompleteMe} />
      </div>
      <AceEditor
        mode="c_cpp"
        theme="monokai"
        value={text}
        fontSize={14}
        height="75%"
        width="100%"
        onChange={(newValue) => setText(newValue)}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
        ref={editorRef}
      />
      <Instructions
        label="Instructions"
        content={instructions}
        onInstructionsChange={handleInstructionsChange}
      />
      <ToastContainer theme="dark" />
    </div>
  );
};

export default CodeEditor;
