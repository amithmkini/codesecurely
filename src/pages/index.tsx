import type { NextPage } from "next";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Instructions from "@/components/Instructions";
import Output from "@/components/Output";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [askChatGPT, setAskChatGPT] = useState("Is the code vulnerable?");

  async function readStarterCode() {
    const response = await fetch("/api/starterCode");
    const data = await response.json();
    console.log(data);
    setText(data.code);
    console.log("Set text");
  }

  useEffect(() => {
    readStarterCode();
  }, []);

  function handleOnSubmit() {
    setOutput("Asking...");
    if (!askChatGPT) {
      console.error("Please enter a question");
      return;
    }
    if (!text) {
      console.error("Please enter some code");
      return;
    }
    fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: text,
        question: askChatGPT,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // If the status is not 200, show a toast with the error message
        if (data.status !== 200) {
          console.error(data.answer.content);
          toast.error(data.answer.code);
          return;
        }
        setOutput(data.answer.content);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-grow flex-row p-10">
        <CodeEditor text={text} setText={setText} />
        <div className="w-1/2 flex-grow p-3">
          <Instructions
            label="Ask ChatGPT"
            content={askChatGPT}
            onInstructionsChange={setAskChatGPT}
            onSubmit={handleOnSubmit}
          />
          <Output output={output} />
          <ToastContainer theme="dark" />
        </div>
      </div>
    </div>
  );
};

export default Home;
