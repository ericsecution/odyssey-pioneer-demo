import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://anilist.co/graphiql",
  cache: new InMemoryCache(),
});

export default client;
