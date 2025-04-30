import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useAuth } from '../../../contextApi/AuthProvider';

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
const adminData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Products',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue('--blue-500')
        },
        {
            label: 'Orders',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderDash: [5, 5],
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue('--teal-500')
        },
        {
            label: 'Customers',
            data: [12, 51, 62, 33, 21, 62, 45],
            fill: true,
            borderColor: documentStyle.getPropertyValue('--orange-500'),
            tension: 0.4,
            backgroundColor: 'rgba(255,167,38,0.2)'
        }
    ]
};
        
const userData = {
    labels: ['2019', '2020', '2021', '2022', '2023', '1024', '2025'],
    datasets: [
        {
            label: 'Products',
            data: [45, 79, 60, 81, 56, 55, 40],
            fill: false, 
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue('--blue-500')
        },
        
        {
            label: 'Orders',
            data: [58, 48, 70, 39, 86, 27, 90],
            fill: true,
            borderColor: documentStyle.getPropertyValue('--orange-500'),
            tension: 0.4,
            backgroundColor: 'rgba(255,167,38,0.2)'
        }
    ]
};



const options = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
        legend: {
            labels: {
                color: textColor
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: textColorSecondary
            },
            grid: {
                color: surfaceBorder
            }
        },
        y: {
            ticks: {
                color: textColorSecondary
            },
            grid: {
                color: surfaceBorder
            }
        }
    }
};


export default function BarChart() {
    const {authUser} = useAuth();
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const data = authUser?.user?.role === "admin" ? {...adminData} : {...userData};
    useEffect(() => {
        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    )
}
        