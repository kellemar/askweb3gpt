import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="The directory for all your Web3 and GameFi needs. Ask anything about the exciting games that are being played right now on the blockchain!"
          />
          <meta property="og:site_name" content="twitterbio.com" />
          <meta
            property="og:description"
            content="The directory for all your Web3 and GameFi needs. Ask anything about the exciting games that are being played right now on the blockchain!"
          />
          <meta property="og:title" content="Ask Web3GPT" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Ask Web3GPT" />
          <meta
            name="twitter:description"
            content="The directory for all your Web3 and GameFi needs. Ask anything about the exciting games that are being played right now on the blockchain!"
          />
          <meta
            property="og:image"
            content="https://web3gpt.app/og-logo.jpeg"
          />
          <meta
            name="twitter:image"
            content="https://web3gpt.app/og-logo.jpeg"
          />
        </Head>
        <body >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
