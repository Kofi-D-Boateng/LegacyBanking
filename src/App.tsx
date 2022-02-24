import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/UI/Layout";
import Home from "./pages/Home";

const App: React.FC = (): JSX.Element => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  );
};

export default App;
