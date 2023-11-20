import React, { useState } from "react";
import { Box } from "@mui/material";
import Chart from "react-apexcharts";
import useWebSocket from "react-use-websocket";
import { ApexOptions } from "apexcharts";

interface KlineMessage {
    e: string;
    E: number;
    s: string;
    k: {
        t: number;
        T: number;
        s: string;
        i: string;
        f: number;
        L: number;
        o: string;
        c: string;
        h: string;
        l: string;
        v: string;
        n: number;
        x: boolean;
        q: string;
        V: string;
        Q: string;
        B: string;
    };
}

interface CandlestickData {
    x: Date;
    y: number[];
}

const BinanceGraphic = () => {
    const [symbol, setSymbol] = useState("USDTBRL");
    const [interval, setInterval] = useState("1m");
    const [candlestickData, setCandlestickData] = useState<CandlestickData[]>([]);

    const { lastJsonMessage }: { lastJsonMessage?: KlineMessage } = useWebSocket(
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
                    setCandlestickData((prevData) => [...prevData, newCandlestick]);
                }
            },
        }
    );

    const options: ApexOptions = {
        chart: {
            type: "candlestick",
        },
        xaxis: {
            type: "datetime",
        },
    };

    return (
        <Box>
            <Chart options={options} series={[{ data: candlestickData }]} type="candlestick" height={170} />
        </Box>
    );
};

export default BinanceGraphic;
