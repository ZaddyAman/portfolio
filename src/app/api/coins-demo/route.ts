import { NextResponse } from "next/server";

export async function GET() {
  // Generate mock time-series data for crypto prices
  const generatePriceData = (
    basePrice: number,
    volatility: number,
    days: number = 30
  ) => {
    const data = [];
    let price = basePrice;
    const now = new Date();

    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Random walk with trend
      const change = (Math.random() - 0.48) * volatility;
      price = Math.max(price * (1 + change), basePrice * 0.5);
      
      data.push({
        timestamp: date.toISOString(),
        price: parseFloat(price.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000000),
      });
    }

    return data;
  };

  const coins = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      currentPrice: 43250.50,
      priceChange24h: 2.45,
      marketCap: 846000000000,
      volume24h: 28000000000,
      priceData: generatePriceData(43000, 0.03, 30),
      prediction: {
        nextDay: 44100,
        nextWeek: 45200,
        confidence: 0.87,
      },
      sentiment: {
        positive: 65,
        neutral: 25,
        negative: 10,
      },
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      currentPrice: 2280.75,
      priceChange24h: -1.23,
      marketCap: 274000000000,
      volume24h: 15000000000,
      priceData: generatePriceData(2300, 0.04, 30),
      prediction: {
        nextDay: 2310,
        nextWeek: 2450,
        confidence: 0.82,
      },
      sentiment: {
        positive: 58,
        neutral: 30,
        negative: 12,
      },
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
      currentPrice: 0.54,
      priceChange24h: 5.67,
      marketCap: 19000000000,
      volume24h: 450000000,
      priceData: generatePriceData(0.50, 0.05, 30),
      prediction: {
        nextDay: 0.56,
        nextWeek: 0.59,
        confidence: 0.75,
      },
      sentiment: {
        positive: 72,
        neutral: 18,
        negative: 10,
      },
    },
  ];

  return NextResponse.json({
    success: true,
    data: coins,
    timestamp: new Date().toISOString(),
  });
}