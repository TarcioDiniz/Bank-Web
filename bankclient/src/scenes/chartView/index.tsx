// ChartView.tsx

import React from "react";
import { Chart } from "react-google-charts";

interface ChartViewProps {
    backgroundColor: string;
    columnColor: string;
    columnWidth: number;
    chartData: Array<Array<string | number>>;
}

interface CustomColumnChartOptions extends google.visualization.ColumnChartOptions {
    backgroundColor: string;
}

const ChartView: React.FC<ChartViewProps> = ({
                                                 backgroundColor,
                                                 columnColor,
                                                 columnWidth,
                                                 chartData,
                                             }) => {
    const chartOptions: CustomColumnChartOptions = {
        title: "Receitas x Despesas",
        legend: { position: "bottom" },
        hAxis: { format: "currency" },
        animation: { duration: 500, easing: "linear", startup: true },
        backgroundColor,
        series: {
            0: { color: columnColor, lineWidth: columnWidth },
        },
    };



    return (
        <>
            <Chart
                chartType="ColumnChart"
                width="90%"
                height="200px"
                data={chartData}
                options={chartOptions}
            />
        </>
    );
};

export default ChartView;
