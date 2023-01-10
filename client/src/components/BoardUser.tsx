import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Legend,
  Tooltip,
  CartesianGrid,
} from 'recharts';

import { getUserBoard } from '../services/user.service';
import EventBus from '../common/EventBus';

const BoardUser: React.FC = () => {
  const [csvData, setCSVData] = useState<any[]>([]);

  useEffect(() => {
    getUserBoard().then(
      (response) => {
        console.log('--response data-', response.data);
        setCSVData(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout');
        }
      },
    );
  }, []);

  return (
    <div className='container'>
      <LineChart width={1000} height={340} data={csvData}>
        <XAxis dataKey='ymd' stroke='#8884d8' height={70}></XAxis>
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke='#ddd' strokeDasharray='5 5' />
        <Line dataKey='cpu_hours' isAnimationActive={false} />
      </LineChart>

      <BarChart width={1000} height={340} data={csvData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='ymd' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='cpu_hours' fill='#82ca9d' />
      </BarChart>
    </div>
  );
};

export default BoardUser;
