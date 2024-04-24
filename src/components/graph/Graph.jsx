import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

const Graph = ({ graphData, setGraphData, time, Price }) => {
    Chart.register(CategoryScale);
    const [activeGraphIndex, setActiveGraphIndex] = useState(false);

    const x = (index) => {
        setActiveGraphIndex(index);
    };

    const deleteGraph = (index) => {
        const updatedGraphData = graphData.filter((data, idx) => idx !== index);
        setGraphData(updatedGraphData);
    };

    // Prepare the data for the charts
    const charts = graphData.map((data, index) => {
        const allTimes = data.range.map((range) => range.time);
        const allPrice = data.range.map((range) => range.price);
        console.log(data);
        const chartData = {
            labels: allTimes,
            datasets: [
                {
                    label: `Graph ${index + 1}`,
                    data: allPrice,
                    backgroundColor: "rgba(6, 79, 240, 0.5)",
                    borderColor: "rgba(6, 79, 240, 1)",
                },
            ],
        };

        const chartOptions = {
            elements: {
                line: {
                    tension: 0.5,
                },
            },
            plugins: {
                title: {
                    text: `Price Chart ${index + 1}`,
                    display: true,
                    align: "start",
                    font: {
                        size: 20,
                        color: "black",
                    },
                },
            },
        };

        return (
            <div
                className={`w-[35rem] ${
                    activeGraphIndex === index ? "w-[75rem]" : " w-[35rem]"
                }`}
                key={index}
            >
                <button onClick={() => x(index)}>click</button>
                <button onClick={() => deleteGraph(index)}>Delete</button>
                <Line data={chartData} options={chartOptions} />
            </div>
        );
    });

    return <div>{charts} </div>;
};

export default Graph;
