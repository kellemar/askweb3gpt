import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Answer from "../components/Answer";
import LoadingDots from "../components/LoadingDots";

// Input initial list of games
const games = ["Bitcoin", "Ethereum", "Matic", "Avalanche", "Arbitrum", "Solana","Phantom Galaxies", "Illuvium", "League of Kingdoms", "Decentraland", "Apeiron", "Star Atlas", "Big Time", "King of Fighters", "Axie Infinity"];

// Create enum of questions users can select
enum QuestionType {
  Name = 'What is ',
  TokenPrice = 'What is the token price of ',
  MarketCap = 'What is the market cap of ',
  Actions = 'What can you do in ',
  Team = 'Who is the team behind ',
  Discord = 'What is the Discord for ',
  Twitter = 'What is the Twitter of ',
  Facebook = 'What is the Facebook of ',
}

// Create groups of questions to mimic randomness
const questionTypes1 = [
  QuestionType.Name,
  QuestionType.TokenPrice,
  QuestionType.MarketCap,
];

const questionTypes2 = [
  QuestionType.Actions,
  QuestionType.Team,
  
];

const questionTypes3 = [
  QuestionType.Twitter,
  QuestionType.Discord,
  QuestionType.Facebook,
];


function getRandomIndex(array: any[]) {
  return Math.floor(Math.random() * array.length);
}

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

  const answerRef = useRef<null | HTMLDivElement>(null);
  const gameName = useRef("");

  const scrollToBios = () => {
    if (answerRef.current !== null) {
      answerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const input = question;
  const regenerateButtons = (gameName?: string) =>{
    const questionTypes = [questionTypes1, questionTypes2, questionTypes3];
    const setButtonTexts = [setButton1Text, setButton2Text, setButton3Text];

    for (let i = 0; i < questionTypes.length; i++) {
      const randomGameIdx = getRandomIndex(games);
      const randomQuestionIdx = getRandomIndex(questionTypes[i]);

      setButtonTexts[i](`${questionTypes[i][randomQuestionIdx]}${gameName || games[randomGameIdx]}?`);
    }
    
  };

  useEffect(() => {
    regenerateButtons(gameName.current);
  
  }, [answerList]);
  

  const generateAnswer = async (e: any) => {
    setTimeTaken("");
    const startTime = Date.now();
    e.preventDefault();
    setLoading(true);
    /*const chat_history = answerList
    .map(
      (item) => `Human: ${item.input}\nAI: ${item.output}\n`
    )
    .join("");
      */
    let chat_history = answerList.map(item => {
      let outputValue = Array.isArray(item.output) ? 'No answer found.' : item.output;
      return {input: item.input, output: outputValue};
    });
    // Only send in the last 4 conversations between user and AI
    if(chat_history.length > 4){
      chat_history = chat_history.slice(-4);
    }
    console.log(chat_history);
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + auth_key
      },
      body: JSON.stringify({
        chat_history,input,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const result = await response.json();
   
    setLoading(false);
    setTimeTaken((((Date.now() - startTime) % 60000) / 1000) + "");
    const outputOnly = result.output ?? "No answer found.";
    const article = result.sources;
    const video = result.video;
    const image_generated = result?.image_generated;
    const outputID = Buffer.from(Date.now()+"").toString('base64');
    gameName.current = result?.games_listed?.[0];
    console.log(result);
    
    updateAnswerList([...answerList, { "id": outputID, "input": input, "output": outputOnly, "articleLink": article, "video": video, "image_generated": image_generated }]);
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
