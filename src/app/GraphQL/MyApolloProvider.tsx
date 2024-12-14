"use client";
import React, { ReactNode } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const MyApolloProvider = ({ children }: { children: ReactNode }) => {
  const client = new ApolloClient({
    uri: "http://localhost:5000",
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default MyApolloProvider;
