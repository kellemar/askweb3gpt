# askWeb3GPT

The design and code structure of this project was borrowed and inspired by Vercel's templates.

askWeb3GPT allows users to make queries about the latest Web3 games available on the [AvocadoDAO](https://avocadodao.io) platform. 

## How it works

This project uses the [ChatGPT API](https://openai.com/api/) to understand questions that the users asks. In turn, the questions are matched with the knowledge base created by [AvocadoDAO](https://avocadodao.io). These includes game information, team details and the kind of tokens being used.

This project was modified from the original to use a backend API, instead of using OpenAI's directly. This is due to some of the formatting and additional parsing being done on the server, which is easier than doing it on the frontend. 

Edit the .env.local file with your own credentials and server URLs.

## Running Locally

After cloning the repo, go to [OpenAI](https://beta.openai.com/account/api-keys) to make an account and put your API key in a file called `.env`.

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
npm run dev
```