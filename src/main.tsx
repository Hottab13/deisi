import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { Provider as ChakraProvider } from "./components/ui/provider";
import App from "./App.tsx";
import "./styles/fonts.css";
import store from "./components/redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ChakraProvider>
  </StrictMode>
);
