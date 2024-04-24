import React, { useEffect, useState } from "react";
import InputField from "../inputField/InputField";
import { useNavigate } from "react-router";

const GraphForm = ({ setGraphData, setTime, setPrice }) => {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(0);
    const [state, setState] = useState([
        {
            id: counter,
            name: "",
            decription: "",
            range: [
                {
                    time: "",
                    price: "",
                },
            ],
        },
    ]);

    const addNewGraph = () => {
        setState((prevState) => [
            ...prevState,
            {
                id: counter + 1,
                name: "",
                decription: "",
                range: [{ time: "", price: "" }],
            },
        ]);
        setCounter(counter + 1);
    };

    const handleAddDetails = (index) => {
        const newState = [...state];
        newState[index].range.push({ time: "", price: "" });
        setState(newState);
    };

    const handleChange = (formIndex, rangeIndex, event) => {
        const { name, value } = event.target;
        const newState = [...state];
        if (name === "name" || name === "decription") {
            newState[formIndex][name] = value;
        } else {
            newState[formIndex].range[rangeIndex][name] = value;
        }
        setState(newState);

        // Collect all time values from the state
        const allTimes = newState.flatMap((graph) =>
            graph.range.map((range) => range.time)
        );
        // Update the time state with all the collected time values
        setTime(allTimes);
        // Collect all time values from the state
        const allPrices = newState.flatMap((graph) =>
            graph.range.map((range) => range.price)
        );
        // Update the time state with all the collected time values
        setPrice(allPrices);
    };

    const handleDeleteDetails = (formIndex, rangeIndex) => {
        const newState = state.map((graph, idx) => {
            if (idx === formIndex) {
                return {
                    ...graph,
                    range: graph.range.filter(
                        (_, index) => index !== rangeIndex
                    ),
                };
            }
            return graph;
        });

        setState(newState);

        // Collect all time values from the updated state
        const allTimes = newState.flatMap((graph) =>
            graph.range.map((range) => range.time)
        );
        // Update the time state with the updated time values
        setTime(allTimes);
        // Collect all price values from the updated state
        const allPrices = newState.flatMap((graph) =>
            graph.range.map((range) => range.price)
        );
        // Update the price state with the updated price values
        setPrice(allPrices);
    };

    const submitForm = (e) => {
        setGraphData(state);
        navigate("/graph");

        e.preventDefault();
        console.log(state);
    };
    useEffect(() => {}, [setTime, setPrice]);

    return (
        <div className="flex items-start ">
            <div className="">
                <div className=" flex m-4 gap-5">
                    <button
                        type="submit"
                        className="text-white font-bold rounded-lg bg-cyan-950 w-[8rem] md:px-md:6 py-2 "
                        onClick={addNewGraph}
                    >
                        Add Graph
                    </button>
                    <button
                        type="submit"
                        className="text-white font-bold rounded-lg bg-cyan-950 w-[8rem] md:px-md:6 py-2"
                        onClick={submitForm}
                    >
                        Submit
                    </button>
                </div>

                <div>
                    <div className="flex flex-wrap items-center">
                        {state.map((graph, formIndex) => (
                            <div
                                className="flex items-center p-6 gap-2 flex-col flex-wrap border-2 mx-2 my-4"
                                key={formIndex}
                            >
                                <div className="flex items-center gap-4">
                                    <InputField
                                        type="text"
                                        placeholder="name"
                                        name="name"
                                        value={graph.name}
                                        onChange={(e) =>
                                            handleChange(formIndex, 0, e)
                                        }
                                    />
                                    <InputField
                                        type="text"
                                        placeholder="description"
                                        name="decription"
                                        value={graph.description}
                                        onChange={(e) =>
                                            handleChange(formIndex, 0, e)
                                        }
                                    />
                                </div>
                                {graph.range.map((range, rangeIndex) => (
                                    <div
                                        key={rangeIndex}
                                        className="flex items-center gap-4"
                                    >
                                        <div>
                                            <InputField
                                                type="date"
                                                placeholder="date"
                                                name="time"
                                                value={range.time}
                                                onChange={(e) =>
                                                    handleChange(
                                                        formIndex,
                                                        rangeIndex,
                                                        e
                                                    )
                                                }
                                            />
                                            <InputField
                                                type="number"
                                                placeholder="price"
                                                name="price"
                                                value={range.price}
                                                onChange={(e) =>
                                                    handleChange(
                                                        formIndex,
                                                        rangeIndex,
                                                        e
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <button
                                                className="text-white text-lg font-bold rounded-full bg-red-500 w-10 h-10"
                                                onClick={() =>
                                                    handleDeleteDetails(
                                                        formIndex,
                                                        rangeIndex
                                                    )
                                                }
                                            >
                                                -
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex justify-end">
                                    <button
                                        className="text-white text-lg font-bold rounded-full bg-green-300 w-10 h-10"
                                        onClick={() =>
                                            handleAddDetails(formIndex)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraphForm;
