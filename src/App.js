import React, { useState } from "react";
import Login from "./pages/userAuthentication/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GraphForm from "./components/graphForm/GraphForm";
import Graph from "./components/graph/Graph";

function App() {
    const [graphData, setGraphData] = useState();
    const [time, setTime] = useState([]);

    const [Price, setPrice] = useState([]);

    return (
        <div className="h-screen w-full">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/graph-from"
                        element={
                            <GraphForm
                                setGraphData={setGraphData}
                                setTime={setTime}
                                time={time}
                                setPrice={setPrice}
                                Price={Price}
                            />
                        }
                    />
                    <Route
                        path="/graph"
                        element={
                            <Graph
                                graphData={graphData}
                                setGraphData={setGraphData}
                                time={time}
                                Price={Price}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
