import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Answer from "../components/Answer";
import LoadingDots from "../components/LoadingDots";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [generatedAnswer, setGeneratedAnswer] = useState<String>("");
  const [timeTaken, setTimeTaken] = useState(0);
  const auth_key = process.env.NEXT_PUBLIC_AUTH_KEY || "NA";
  const api_url = process.env.NEXT_PUBLIC_SERVER_API_URL || "NA";

  const answerRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (answerRef.current !== null) {
      answerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const input = answer;

  const generateAnswer = async (e: any) => {
    const startTime = Date.now();
    e.preventDefault();
    setGeneratedAnswer("");
    setLoading(true);
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+auth_key
      },
      body: JSON.stringify({
        input,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }
    
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if(done == true){
        setTimeTaken((((Date.now() - startTime) % 60000) / 1000));
        
      }
      const chunkValue = decoder.decode(value);
      setGeneratedAnswer((prev) => prev + chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };

  return (
    <div className="flex mx-auto flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Ask Web3Gaming</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center text-center px-4 mt-5">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Ask about Web3 Gaming!
        </h1>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center justify-center space-x-3">
            
            <p className="text-center font-medium">
              Write your question or any request related to Web3 gaming here.
            </p>
            
          </div>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "e.g. What is Phantom Galaxies? \nWhat is the token price of Phantom Galaxies?\nWho is the team behind Phantom Galaxies?"
            }
          />
          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateAnswer(e)}>
              Ask!
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-5 my-5">
          {generatedAnswer && (
            <>
              <Answer generatedAnswer={generatedAnswer.toString()}  />
            </>
          )}
        </div>
        {timeTaken && (
        <div className="text-sm">
           <p>This answer took {timeTaken} seconds</p>
        </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
