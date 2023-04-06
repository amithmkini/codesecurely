import type { NextPage } from 'next';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Instructions from '@/components/Instructions';

const CodeEditor = dynamic(() => import('@/components/CodeEditor'), {
  ssr: false,
})



const Home: NextPage = () => {

  const [askChatGPT, setAskChatGPT] = useState("Is the code vulnerable?");
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-row flex-grow p-10">
        <CodeEditor text={text} setText={setText}/>
        <div className='flex-grow w-1/2 p-3'>
          <Instructions label='Ask ChatGPT' content={askChatGPT} onInstructionsChange={setAskChatGPT} />
        </div>
      </div>
    </div>
  );
};

export default Home;
