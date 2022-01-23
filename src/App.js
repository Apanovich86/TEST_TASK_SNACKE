import React, {Component} from "react";
import Game from "./Game";
import InputName from "./InputName";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<InputName/>}/>
                    <Route path="/game" element={<Game/>}/>
                </Routes>
            </Router>
        );
    }
}

export default App;