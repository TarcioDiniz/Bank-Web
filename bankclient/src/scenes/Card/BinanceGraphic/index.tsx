import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Box} from "@mui/material";
import Chart from "react-apexcharts";
import useWebSocket from "react-use-websocket";
import {ApexOptions} from "apexcharts";

interface KlineMessage {
    // ...
}

interface CandlestickData {
    x: Date;
    y: number[];
}

const BinanceGraphic = () => {
    const [symbol, setSymbol] = useState("BTCBRL");
    const [interval, setInterval] = useState("1m");
    const [candlestickData, setCandlestickData] = useState<CandlestickData[]>([]);
    const accumulatedUpdates = useRef<CandlestickData[]>([]);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(
                `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`
            );
            const data = await response.json();

            const historicalData = data.map((kline: any) => ({
                x: new Date(kline[0]),
                y: [parseFloat(kline[1]), parseFloat(kline[2]), parseFloat(kline[3]), parseFloat(kline[4])],
            }));
            accumulatedUpdates.current = [...accumulatedUpdates.current, ...historicalData];
        } catch (error) {
            console.error("Error fetching historical data:", error);
        }
    }, [symbol, interval]);

    const throttledFetchData = useCallback(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            throttledFetchData();
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [throttledFetchData]);

    useWebSocket(
        `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`,
        {
            onOpen: () => console.log("Connected to Binance."),
            onError: (err) => console.log(err),
            shouldReconnect: () => true,
            reconnectInterval: 3000,
            onMessage: (message) => {
                const parsedData = JSON.parse(message.data);
                if (parsedData && parsedData.k) {
                    const newCandlestick: CandlestickData = {
                        x: new Date(parsedData.k.t),
                        y: [
                            parseFloat(parsedData.k.o),
                            parseFloat(parsedData.k.h),
                            parseFloat(parsedData.k.l),
                            parseFloat(parsedData.k.c),
                        ],
                    };
                    accumulatedUpdates.current.push(newCandlestick);
                }
            },
        }
    );

    // Limitando o histórico de dados a, por exemplo, 100 pontos
    const limitedData = useMemo(() => {
        const dataLength = accumulatedUpdates.current.length;
        return dataLength > 100 ? accumulatedUpdates.current.slice(dataLength - 100) : accumulatedUpdates.current;
    }, [accumulatedUpdates.current]);

    const options: ApexOptions = {
        chart: {
            type: "candlestick",
            zoom: {
                enabled: true,
                type: "x",
                autoScaleYaxis: false,
                zoomedArea: {
                    fill: {
                        color: "#90CAF9",
                        opacity: 0.4,
                    },
                    stroke: {
                        color: "#0D47A1",
                        opacity: 0.4,
                        width: 1,
                    },
                },
            },
        },
        xaxis: {
            type: "datetime",
        },
    };

    return (
        <Box>
            <Chart options={options} series={[{data: limitedData}]} type="candlestick" height={170}/>
        </Box>
    );
};

export default BinanceGraphic;
