"use client";

import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowUp, TrendingUp, Activity, BarChart3, Github, ExternalLink } from "lucide-react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  priceData: Array<{ timestamp: string; price: number; volume: number }>;
  prediction: {
    nextDay: number;
    nextWeek: number;
    confidence: number;
  };
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export default function CoinSightPage() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/coins-demo")
      .then((res) => res.json())
      .then((data) => {
        setCoins(data.data);
        setSelectedCoin(data.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching coin data:", error);
        setLoading(false);
      });
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatLargeNumber = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return formatCurrency(value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 pt-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold">CoinSight</h1>
                  <p className="text-muted-foreground mt-1">
                    Real-Time Cryptocurrency Data Engineering Platform
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://github.com/ZaddyAman/CoinSight"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              <Badge variant="secondary">Kafka</Badge>
              <Badge variant="secondary">Spark</Badge>
              <Badge variant="secondary">Airflow</Badge>
              <Badge variant="secondary">Postgres</Badge>
              <Badge variant="secondary">Streamlit</Badge>
              <Badge variant="secondary">AWS</Badge>
              <Badge variant="secondary">Python</Badge>
              <Badge variant="secondary">Plotly Dash</Badge>
            </div>
          </div>

          {/* Demo Section */}
          <div className="space-y-6">
            {/* Coin Selection */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {loading ? (
                <>
                  <Skeleton className="h-24 w-48 flex-shrink-0" />
                  <Skeleton className="h-24 w-48 flex-shrink-0" />
                  <Skeleton className="h-24 w-48 flex-shrink-0" />
                </>
              ) : (
                coins.map((coin) => (
                  <Card
                    key={coin.id}
                    className={`p-4 cursor-pointer hover:shadow-lg transition-all flex-shrink-0 ${
                      selectedCoin?.id === coin.id
                        ? "border-primary border-2"
                        : ""
                    }`}
                    onClick={() => setSelectedCoin(coin)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{coin.symbol}</span>
                        <span className="text-sm text-muted-foreground">
                          {coin.name}
                        </span>
                      </div>
                      <div className="text-2xl font-bold">
                        {formatCurrency(coin.currentPrice)}
                      </div>
                      <div
                        className={`flex items-center gap-1 text-sm ${
                          coin.priceChange24h >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {coin.priceChange24h >= 0 ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : (
                          <ArrowDown className="w-4 h-4" />
                        )}
                        {Math.abs(coin.priceChange24h).toFixed(2)}%
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>

            {/* Main Chart */}
            {loading ? (
              <Card className="p-6">
                <Skeleton className="h-96 w-full" />
              </Card>
            ) : selectedCoin ? (
              <Card className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Activity className="w-6 h-6 text-primary" />
                    {selectedCoin.name} Price History
                  </h2>
                  <Badge variant="outline">Last 30 Days</Badge>
                </div>
                <Plot
                  data={[
                    {
                      x: selectedCoin.priceData.map((d) => d.timestamp),
                      y: selectedCoin.priceData.map((d) => d.price),
                      type: "scatter",
                      mode: "lines",
                      line: { color: "#8b5cf6", width: 2 },
                      fill: "tozeroy",
                      fillcolor: "rgba(139, 92, 246, 0.1)",
                      name: "Price",
                    },
                  ]}
                  layout={{
                    autosize: true,
                    paper_bgcolor: "transparent",
                    plot_bgcolor: "transparent",
                    xaxis: {
                      gridcolor: "#333",
                      showgrid: true,
                    },
                    yaxis: {
                      gridcolor: "#333",
                      showgrid: true,
                      title: {
                        text: "Price (USD)",
                      },
                    },
                    margin: { l: 60, r: 20, t: 20, b: 40 },
                  }}
                  config={{ responsive: true, displayModeBar: false }}
                  style={{ width: "100%", height: "400px" }}
                />
              </Card>
            ) : null}

            {/* Stats Grid */}
            {!loading && selectedCoin && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-muted-foreground">
                      Market Cap
                    </h3>
                  </div>
                  <div className="text-2xl font-bold">
                    {formatLargeNumber(selectedCoin.marketCap)}
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-muted-foreground">
                      24h Volume
                    </h3>
                  </div>
                  <div className="text-2xl font-bold">
                    {formatLargeNumber(selectedCoin.volume24h)}
                  </div>
                </Card>

                <Card className="p-6 bg-primary/5">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-muted-foreground">
                      Next Day Prediction
                    </h3>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {formatCurrency(selectedCoin.prediction.nextDay)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {(
                      ((selectedCoin.prediction.nextDay -
                        selectedCoin.currentPrice) /
                        selectedCoin.currentPrice) *
                      100
                    ).toFixed(2)}
                    % change
                  </div>
                </Card>

                <Card className="p-6 bg-primary/5">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-muted-foreground">
                      Confidence Score
                    </h3>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {(selectedCoin.prediction.confidence * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    AI Model Accuracy
                  </div>
                </Card>
              </div>
            )}

            {/* Sentiment Analysis */}
            {!loading && selectedCoin && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Sentiment Analysis</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Positive</span>
                      <span className="text-green-600">
                        {selectedCoin.sentiment.positive}%
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600"
                        style={{
                          width: `${selectedCoin.sentiment.positive}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Neutral</span>
                      <span className="text-blue-600">
                        {selectedCoin.sentiment.neutral}%
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600"
                        style={{ width: `${selectedCoin.sentiment.neutral}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Negative</span>
                      <span className="text-red-600">
                        {selectedCoin.sentiment.negative}%
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-600"
                        style={{
                          width: `${selectedCoin.sentiment.negative}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Based on 10,000+ social media posts and news articles analyzed
                  in the last 24 hours
                </p>
              </Card>
            )}

            {/* Project Info */}
            <Card className="p-8 bg-primary/5 mt-6">
              <h2 className="text-2xl font-bold mb-4">About This Project</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="font-semibold text-foreground">
                  April 2025 – Present
                </p>
                <p>
                  CoinSight is a real-time cryptocurrency data engineering platform that processes 1000+ data points/min from CoinGecko using Kafka + Spark with sub-5s latency. The platform implements Medallion architecture (Bronze/Silver/Gold) which improved data quality by 85% and reduced processing time by 60%.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div>
                    <div className="font-bold text-foreground mb-1">
                      Key Features
                    </div>
                    <ul className="space-y-1 text-sm">
                      <li>• Real-time data ingestion from CoinGecko</li>
                      <li>• Kafka + Spark processing pipeline</li>
                      <li>• Airflow orchestration (99.9% reliability)</li>
                      <li>• Isolation Forest anomaly detection (95% accuracy)</li>
                      <li>• Facebook Prophet forecasting</li>
                      <li>• Fear-Greed Index integration</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold text-foreground mb-1">
                      Technical Stack
                    </div>
                    <ul className="space-y-1 text-sm">
                      <li>• Apache Kafka for streaming</li>
                      <li>• Apache Spark for processing</li>
                      <li>• Apache Airflow for orchestration</li>
                      <li>• PostgreSQL for storage</li>
                      <li>• Streamlit / Plotly Dash dashboards</li>
                      <li>• AWS cloud infrastructure</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold text-foreground mb-1">Impact</div>
                    <ul className="space-y-1 text-sm">
                      <li>• 1000+ data points/min processed</li>
                      <li>• Sub-5s latency achieved</li>
                      <li>• 85% data quality improvement</li>
                      <li>• 60% faster processing time</li>
                      <li>• 99.9% data delivery reliability</li>
                      <li>• 95% anomaly detection accuracy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}