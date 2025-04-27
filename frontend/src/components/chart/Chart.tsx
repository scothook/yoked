import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Workout } from "../../types/workout"; // Import the interface
//import styles from "./Chart.module.css";

interface ChartProps {
    data : Workout[] | { date: string; weight: number }[]; // Define a valid type for the data array
    xAxisKey: string;
    yAxisKey: string;
}

export default function Chart({ data, xAxisKey, yAxisKey}: ChartProps) {
    return (
    <LineChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={yAxisKey} stroke="#8884d8" />
    </LineChart>
    )
}