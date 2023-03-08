import { Toaster, toast } from "react-hot-toast";
import YouTube from "react-youtube";
import { useRef } from 'react';

type AnswerPropsType = {
  generatedAnswer: string;
};

export default function Answer(this: any, { generatedAnswer }: AnswerPropsType) {
  const answer = JSON.parse(generatedAnswer)['output'];
  const video = JSON.parse(generatedAnswer)['video'];
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  console.log(answer);
  const opts = {
  width: 320,
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
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  >
                  Answer
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center min-w-m max-w-xl mx-auto">
              <div className="bg-purple-100 rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(answer);
                          toast("Text copied!", {
                            icon: "✂️",
                          });
                        }}
                        key={answer}>
                          <p className="text-left">{answer}</p>

                      {video && (
                          <div className="flex mt-10 justify-center">
                            <YouTube videoId={video} 
                                opts={opts}/>
                          </div>

                      )}

                      </div>
                
              </div>
              </>
  );
}
