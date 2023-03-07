import { Toaster, toast } from "react-hot-toast";

type AnswerPropsType = {
  generatedAnswer: string;
};

export default function Answer({ generatedAnswer }: AnswerPropsType) {
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
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
              <div
                        className="bg-purple-100  rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.parse(generatedAnswer.toString())['output']);
                          toast("Text copied!", {
                            icon: "✂️",
                          });
                        }}
                        key={JSON.parse(generatedAnswer.toString())['output']}>
                          <p className="text-left">{JSON.parse(generatedAnswer.toString())['output']}</p>
                      </div>
                
              </div>
              </>
  );
}
