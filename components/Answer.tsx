import { Toaster, toast } from "react-hot-toast";
import YouTube from "react-youtube";
import { useRef } from 'react';
import { link } from "fs";
import ReactMarkdown from 'react-markdown'

type AnswerPropsType = {
  generatedAnswer: string,
};

export default function Answer(this: any, { generatedAnswer }: AnswerPropsType) {

  const baseURL = "https://core.avocadodao.io/games/";
  const answer = JSON.parse(generatedAnswer)['output'];
  const video = JSON.parse(generatedAnswer)['video'];
  const articleLink = JSON.parse(generatedAnswer)['article'];
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  // Check for possible lists being presented
  if (answer.includes(". -")){

  }

  const opts = {
  
   playerVars: {
      autoplay: 0,
    },
  };
  return (
    <>
    <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
    <div>
                <h2
                  className="sm:text-2xl text-2xl font-bold text-slate-900 mx-auto"
                  >
                  Here's what we have
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center min-w-m max-w-xl mx-auto max-w-xl w-full">
              
              <div className="bg-purple-100 rounded-xl shadow-md p-4 hover:bg-purple-200 transition border "
                        
                        key={answer}>
            
              <button
              className="ml-auto p-10 bg-purple-400 rounded-xl text-white text-xs px-2 mb-2 py-2 hover:bg-purple-500"
              onClick={() => {
                navigator.clipboard.writeText(answer);
                toast("Text copied!", {
                  icon: "✂️",
                });
              }}>
              Copy Text
            </button>
                          <ReactMarkdown className="text-left m-5">{answer}</ReactMarkdown>
                          {articleLink && (
          <div className="text-left m-5">
        Read more at: {" "}
        <a
          href={baseURL+articleLink}
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          {baseURL+articleLink}
        </a>
        
      </div>)}
                      {video && (
                        
                          <div className="flex mt-10 justify-center">
                            <iframe src={"https://www.youtube.com/embed/"+video} className="w-full aspect-video" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                          </div>

                      )}
                      </div>
                
              </div>
              </>
  );
}
