import { useState } from "react";
import { Question } from "./components/Question";
import perguntas from './assets/perguntas.json'

import "./App.css";

function App() {
    return (
        <>
            <Question questions={perguntas}/>
        </>
    );
}

export default App;
