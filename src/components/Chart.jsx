import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList, // Importing LabelList
} from "recharts";
import { chartData } from "../assets/data";

export const Chart = () => {
  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <BarChart width={150} height={400} data={chartData}>
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray='3 3' />
        <Bar dataKey='total' fill='url(#colorTotal)' animationDuration={500}>
          <LabelList dataKey='total' position='top' />
        </Bar>

        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
};
