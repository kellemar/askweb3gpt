import { NextApiRequest, NextApiResponse } from 'next'
import { Client, auth } from "twitter-api-sdk";



export default async function (req: NextApiRequest, res: NextApiResponse) {
  
  const { query } = req;
  const STATE = "my-state";
const authClient = new auth.OAuth2User({
    client_id: "QzV1QUFGSlEwU3BETTZUeUl3aUM6MTpjaQ",
      client_secret: "lcCDGOfRYWaemjweGGhTFqhKvCKemZOq58DNPlin5NBXWLufHx",
      callback: "http://127.0.0.1:3000/api/twitter",
      scopes: ["follows.read","tweet.read", "users.read", "offline.access"],
  });
  authClient.generateAuthURL({
    state: STATE,
    code_challenge_method: 'plain',
    code_challenge: "01cc82f71eea4d5ba61fc70aebe262874c59e786028af1de45ee3f9e",
  });
  const response = await authClient.requestAccessToken(query.code as string);
  console.log(response["token"]["access_token"]);
  const client = new Client(authClient);
  const { data } = await client.users.findUserByUsername("decruz");
  console.log(data);
  if (!data) throw new Error("Couldn't find user");
  //client.users.usersIdFollow(data.id, {target_user_id: "11348282"});
  const result = client.users.tweetsIdRetweetingUsers("1676400249718337537");
  console.log(result);
  
  for(const r in result){
    console.log(r);
  }
  res.status(200).json({ result: "pass" });
}



