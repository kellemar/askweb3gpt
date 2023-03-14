import { Toaster, toast } from "react-hot-toast";
import YouTube from "react-youtube";
import { useRef } from 'react';
import { link } from "fs";
import ReactMarkdown from 'react-markdown'

const games = ["Phantom Galaxies", "Illuvium", "League of Kingdoms", "Decentraland", "Apeiron", "Star Atlas"]

type Answer = {
  id: number,
  question: string,
  output: string
};

type AnswerPropsType = {
  outputAnswer: Array<Answer>,
};



export default function Answer({ outputAnswer }: AnswerPropsType) {

  //const baseURL = "https://core.avocadodao.io/games/";
  //const answer = JSON.parse(generatedAnswer)['output'];
  //const video = JSON.parse(generatedAnswer)['video'];
  //const articleLink = JSON.parse(generatedAnswer)['article'];

  const baseURL = "https://core.avocadodao.io/games/";
  const video = "";
  const articleLink = "";

  const listItems = outputAnswer.map(({ id, question, output }) =>
    <>
      <div>
      </div>
      <div className="space-y-2 flex flex-col items-center justify-center min-w-m max-w-xl mx-auto max-w-xl w-full">
      <div
            className="mt-5 ml-auto p-10 bg-purple-200 rounded-xl text-black text-s px-2 mb-2 py-2">
            {question}
          </div>
        <div className="bg-purple-100 rounded-xl shadow-md p-4 hover:bg-purple-200 transition border " key={id}>
        
          <ReactMarkdown className="text-left m-5">{output}</ReactMarkdown>
          {articleLink && (
            <div className="text-left m-5">
              Read more at: {" "}
              <a
                href={baseURL + articleLink}
                target="_blank"
                rel="noreferrer"
                className="font-bold hover:underline transition underline-offset-2"
              >
                {baseURL + articleLink}
              </a>

            </div>)}
          {video && (

            <div className="flex mt-10 justify-center">
              <iframe src={"https://www.youtube.com/embed/" + video} className="w-full aspect-video" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </div>

          )}
          <button
            className="mt-5 ml-auto p-10 bg-purple-400 rounded-xl text-white text-xs px-2 mb-2 py-2 hover:bg-purple-500"
            onClick={() => {
              navigator.clipboard.writeText(output);
              toast("Text copied!", {
                icon: "✂️",
              });
            }}>
            Copy Text
          </button>
        </div>


      </div>
    </>

  );
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      {listItems}
    </>
  );
}
