import React from "react";
import ReactDOM from "react-dom/client";
import NiceModal from "@ebay/nice-modal-react";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <NiceModal.Provider>
                <App />
            </NiceModal.Provider>
        </QueryClientProvider>
    </React.StrictMode>
);
