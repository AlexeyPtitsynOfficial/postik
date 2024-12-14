import ReactDOM from "react-dom/client";
import React from "react";
import { App } from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { api } from "./app/api";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { Provider } from "react-redux";
import { setupStore } from "./lib/store";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./app/GraphQL/ApolloClient";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const store = setupStore();
//store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());
//store.dispatch(fetchUsers());
const persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ApiProvider api={api}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApolloProvider client={apolloClient}>
            <BrowserRouter>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </BrowserRouter>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    </ApiProvider>
  </React.StrictMode>,
);
