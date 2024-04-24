import React from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

const Graph = ({ graphData, setGraphData, time, Price }) => {
    Chart.register(CategoryScale);

    const deleteGraph = (data) => {
        const updatedGraphData = graphData.filter((ele) => ele.id !== data.id);
        setGraphData(updatedGraphData);
    };

    // Prepare the data for the charts
    const charts = graphData.map((data, index) => {
        // Check if data.range exists before mapping over it
        if (!data.range) {
            return null; // Or handle the case where data.range is undefined
        }

        const allTimes = data.range.map((range) => range.time);
        const allPrice = data.range.map((range) => range.price);

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
            <div className=" flex items-center gap-6 w-[30rem]" key={index}>
                <button
                    className="text-white  text-sm font-medium rounded-md  bg-red-500 px-3 py-2 "
                    onClick={() => deleteGraph(data)}
                >
                    Delete
                </button>
                <Line data={chartData} options={chartOptions} />
            </div>
        );
    });

    return <div>{charts} </div>;
};

export default Graph;
