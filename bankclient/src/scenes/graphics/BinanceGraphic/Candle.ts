class Candle {
    startTime: number;
    openPrice: string; // Assuming prices are represented as strings for precision
    highPrice: string;
    lowPrice: string;
    closePrice: string;

    constructor(startTime: number, openPrice: string, highPrice: string, lowPrice: string, closePrice: string) {
        this.startTime = startTime;
        this.openPrice = openPrice;
        this.highPrice = highPrice;
        this.lowPrice = lowPrice;
        this.closePrice = closePrice;
    }

    // You can add more methods or properties as needed
}





export default Candle;