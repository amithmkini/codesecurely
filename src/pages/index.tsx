import type { NextPage } from 'next';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Instructions from '@/components/Instructions';
import Output from '@/components/Output';

const CodeEditor = dynamic(() => import('@/components/CodeEditor'), {
  ssr: false,
});


const Home: NextPage = () => {

  const [askChatGPT, setAskChatGPT] = useState("Is the code vulnerable?");
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");


  function handleOnSubmit() {
    setOutput("Asking...");
    if (!askChatGPT) {
      console.error('Please enter a question');
      return;
    }
    if (!text) {
      console.error('Please enter some code');
      return;
    }
    fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
          // toast.error(data.code);
          return;
        }
        // console.log(data.answer.content);
        setOutput(data.answer.content);
        }
      )
      .catch((error) => console.error(error));
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-row flex-grow p-10">
        <CodeEditor text={text} setText={setText}/>
        <div className='flex-grow w-1/2 p-3'>
          <Instructions 
            label='Ask ChatGPT'
            content={askChatGPT}
            onInstructionsChange={setAskChatGPT}
            onSubmit={handleOnSubmit}
          />
          <Output output={output} />
        </div>
      </div>
    </div>
  );
};

export default Home;
