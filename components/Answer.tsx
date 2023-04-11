import { Toaster, toast } from "react-hot-toast";
import ReactMarkdown from 'react-markdown'
import {FaRegCopy} from 'react-icons/fa';
import Image from 'next/image';

type Answer = {
  id: number,
  question: string,
  output: string,
  articleLink?: Array<string>,
  video?: string,
  image_generated?: string
};

type AnswerPropsType = {
  outputAnswer: Array<Answer>,
};



export default function Answer({ outputAnswer }: AnswerPropsType) {

  const video = "";
  
  const listItems = outputAnswer.map(({ id, question, output, articleLink, video, image_generated }) =>
    <>
      <div>
      </div>
      <div className="space-y-2 flex flex-col items-center justify-center min-w-m max-w-xl mx-auto w-full">
      <div
            className="mt-5 ml-auto p-10 bg-purple-200 rounded-xl text-black text-s px-2 mb-2 py-2">
            {question}
          </div>
        <div className="bg-purple-100 rounded-xl shadow-md p-4 hover:bg-purple-200 transition border w-full" key={id}>
        
          <ReactMarkdown className="text-left m-5">{output}</ReactMarkdown>
          {articleLink && (
           
             <div className="text-left ml-5">Sources:{" "}</div>
          )}
          {articleLink && articleLink.map((link, index) => (
             <div className="text-left ml-5">
              <a key={index} 
                href={link}
                target="_blank"
                rel="noreferrer"
                className="font-bold hover:underline transition underline-offset-2"
              >
                {link}
              </a>
              </div>
          ))}
          

          {image_generated && (
              <div className="p-5 items-center justify-center">
              <Image src={"data:image/png;base64,"+image_generated} alt={output} width={500} height={480} />
            </div>  
          
          )}
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
            <FaRegCopy/>
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
