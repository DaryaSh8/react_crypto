import React from "react";
import { CryptoContextProvider } from "./context/CryptoContext";
import AppLayout from "./components/layout/AppLayout";

export default function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  );
}
