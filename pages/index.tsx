import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Answer from "../components/Answer";
import LoadingDots from "../components/LoadingDots";



const games = ["Phantom Galaxies", "Illuvium", "League of Kingdoms", "Decentraland", "Apeiron", "Star Atlas", "Big Time", "King of Fighters", "Axie Infinity"];
const questionTypes = ["What is ", "What is the token price of ", "What is the market cap of ", "What can you do in ", "Who is the team behind "];

const Home: NextPage = () => {

  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [answerList, updateAnswerList] = useState<any[]>([]);
  const [timeTaken, setTimeTaken] = useState("");
  const auth_key = process.env.NEXT_PUBLIC_AUTH_KEY || "NA";
  const api_url = process.env.NEXT_PUBLIC_SERVER_API_URL || "NA";

  const [button1Text, setButton1Text] = useState("");
  const [button2Text, setButton2Text] = useState("");
  const [button3Text, setButton3Text] = useState("");
  const [textCount, setTextCount] = useState(0);
  const answerRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (answerRef.current !== null) {
      answerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const input = question;
  const regenerateButtons = () =>{
    const randomNumber1 = Math.floor(Math.random() * games.length);
    const randomNumber2 = Math.floor(Math.random() * games.length);
    const randomNumber3 = Math.floor(Math.random() * games.length);

    const randomNumber4 = Math.floor(Math.random() * questionTypes.length);
    const randomNumber5 = Math.floor(Math.random() * questionTypes.length);
    const randomNumber6 = Math.floor(Math.random() * questionTypes.length);

    setButton1Text(questionTypes[randomNumber4] + games[randomNumber1]+"?");
    setButton2Text(questionTypes[randomNumber5] + games[randomNumber2]+"?");
    setButton3Text(questionTypes[randomNumber6] + games[randomNumber3]+"?");
  };

  useEffect(() => {
    regenerateButtons();
  
  }, [answerList]);

  const generateAnswer = async (e: any) => {
    setTimeTaken("");
    const startTime = Date.now();
    e.preventDefault();
    setLoading(true);
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + auth_key
      },
      body: JSON.stringify({
        input,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const result = await response.json();
    
    setLoading(false);
    setTimeTaken((((Date.now() - startTime) % 60000) / 1000) + "");
    regenerateButtons();

    const outputOnly = result['output'];
    const article = result['article'];
    setTextCount(textCount + 1);
    updateAnswerList([...answerList, { "id": textCount, "question": input, "output": outputOnly, "articleLink": article }]);
    setTextCount(textCount + 1);
    setQuestion("");
    scrollToBios();    
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
          
          <div className="space-y-5 my-2">
            {answerList && (
              <>
                <Answer outputAnswer={answerList} />
              </>
            )}
          </div>
          {timeTaken && (
            <div className="text-sm">
              <p>This answer took {timeTaken} seconds.</p>
            </div>
          )}
          <div className="flex items-center justify-center space-x-3">
            <button onClick={(e) => setQuestion(e.currentTarget.innerHTML)}
              className="bg-purple-400 rounded-xl text-white text-xs px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full h-20 sm:h-12">
              {button1Text}
            </button>
            <button onClick={(e) => setQuestion(e.currentTarget.innerHTML)}
              className="bg-purple-400 rounded-xl text-white text-xs px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full h-20 sm:h-12">
              {button2Text}
            </button>
            <button onClick={(e) => setQuestion(e.currentTarget.innerHTML)}
              className="bg-purple-400 rounded-xl text-white text-xs px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full h-20 sm:h-12">
              {button3Text}
            </button>
          </div>
          <div ref={answerRef}>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "What's your question?"
            }
          /></div>
          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 mt-2 hover:bg-black/80 w-full"
              onClick={(e) => generateAnswer(e)}>
              Ask!
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 mt-2 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>


      </main>
      <Footer />
    </div>
  );
};

export default Home;
