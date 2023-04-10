import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Answer from "../components/Answer";
import LoadingDots from "../components/LoadingDots";



const Home: NextPage = () => {

  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [answerList, updateAnswerList] = useState<any[]>([]);
  const [timeTaken, setTimeTaken] = useState("");
  const auth_key = process.env.NEXT_PUBLIC_AUTH_KEY || "NA";
  const api_url = process.env.NEXT_PUBLIC_SERVER_API_URL || "NA";
  
  const answerRef = useRef<null | HTMLDivElement>(null);
  const gameName = useRef("");

  const scrollToBios = () => {
    if (answerRef.current !== null) {
      answerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const input = question;
  

  const generateAnswer = async (e: any) => {
    setTimeTaken("");
    const startTime = Date.now();
    e.preventDefault();
    setLoading(true);

    const chatHistory = answerList
    .map(
      (item) => `Human: ${item.question}\nAI: ${item.output}\n`
    )
    .join("");

    //console.log(chatHistory);
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + auth_key
      },
      body: JSON.stringify({
        chatHistory,input,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const result = await response.json();
   
    setLoading(false);
    setTimeTaken((((Date.now() - startTime) % 60000) / 1000) + "");
    const outputOnly = result.output;
    const article = result.article;
    const video = result.video;
    const image_generated = result?.image_generated;
    const outputID = Buffer.from(Date.now()+"").toString('base64');
    gameName.current = result?.games_listed?.[0];
    
    updateAnswerList([...answerList, { "id": outputID, "question": input, "output": outputOnly, "articleLink": article, "video": video, "image_generated": image_generated }]);
    setQuestion("");
    scrollToBios();    
  };

  return (
    <div className="flex mx-auto flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Ask AvodDudeAI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center text-center px-4 mt-5">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Ask AvoDudeAI Anything!
        </h1>
        <div className="max-w-xl w-full">
          
          <div className="space-y-5 my-2">
            {answerList && (
              <>
                <Answer outputAnswer={answerList} />
              </>
            )}
          </div>
          
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={2}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "What's your question?"
            }
          />
          <div className="text-sm">
              <p>You have 100 questions left.</p>
            </div>

          {!loading && (
            <div  ref={answerRef}>
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 mt-2 hover:bg-black/80 w-full"
              onClick={(e) => generateAnswer(e)}>
              Ask!
            </button></div>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 mt-2 hover:bg-black/80 w-full"
              disabled
            >
              Thinking <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>


      </main>
      <Footer />
    </div>
  );
};

export default Home;
