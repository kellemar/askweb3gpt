import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex sm:flex-row flex-col justify-between items-center px-3 space-y-3 sm:mb-0 mb-3">
      <div>
        Powered by{" "}
        <a
          href="https://openai.com/blog/chatgpt"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          ChatGPT{" "}
        </a>
        
      </div>
      <div className="flex space-x-4 pb-4 sm:pb-0">
        <Link
          href="https://twitter.com/Avocadoguild"
          className="group"
          aria-label="Avocadoguild on Twitter"
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
          >
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84" />
          </svg>
        </Link>
        <Link
          href="https://twitter.com/Avocadoguild"
          className="group"
          aria-label="Avocadoguild on Discord"
        >
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
            className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M247.3,169.8l-34-113.2a15.6,15.6,0,0,0-9.2-10.2h-.6l.6-.2A192.4,192.4,0,0,0,169.6,36a8,8,0,0,0-9.4,6.3,7.9,7.9,0,0,0,6.2,9.4c4.5.9,8.9,2,13.2,3.2A8,8,0,0,1,176,70h-.8A185.4,185.4,0,0,0,128,64a181.8,181.8,0,0,0-46.1,5.8,8,8,0,0,1-5.6-14.9h.1c4.3-1.2,8.7-2.3,13.2-3.2a8,8,0,0,0,6.3-9.4A8.1,8.1,0,0,0,86.5,36,191.2,191.2,0,0,0,51.9,46.4a15.6,15.6,0,0,0-9.2,10.2L8.7,169.8a16,16,0,0,0,4.9,16.7,34.7,34.7,0,0,0,2.9,2.5h.1c16.2,13.2,37.5,23.3,61.5,29.1a6.3,6.3,0,0,0,1.9.3,8,8,0,0,0,1.9-15.8,160.3,160.3,0,0,1-31.3-11.1h0a8,8,0,0,1,8.6-13.2c19,8.4,42.9,13.7,68.8,13.7s49.8-5.3,68.8-13.7a8,8,0,0,1,8.6,13.2h0a160.3,160.3,0,0,1-31.3,11.1,8,8,0,0,0,1.9,15.8,6.3,6.3,0,0,0,1.9-.3c24-5.8,45.3-15.9,61.5-29.1h.1a34.7,34.7,0,0,0,2.9-2.5A16,16,0,0,0,247.3,169.8ZM96,156a12,12,0,1,1,12-12A12,12,0,0,1,96,156Zm64,0a12,12,0,1,1,12-12A12,12,0,0,1,160,156Z"></path></svg>
        </Link>
        
      </div>
    </footer>
  );
}
