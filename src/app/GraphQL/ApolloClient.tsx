import { ApolloClient, InMemoryCache } from "@apollo/client/";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});
