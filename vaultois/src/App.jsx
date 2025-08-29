import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";
import HeightProvider from "./components/HeightProvider";

function App() {
  return (
    <>
      <HeightProvider>
        <Navbar />
        <div className="bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <Manager />
        </div>{" "}
        <Footer />
      </HeightProvider>
    </>
  );
}

export default App;
