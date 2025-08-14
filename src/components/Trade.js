// src/pages/TradePage.jsx
import React, { useEffect, useRef, useState } from "react";
import "../css/Trade.css";

const DEFAULT_SYMBOL = "BTCUSDT";
const DEFAULT_INTERVAL = "1m";
const INTERVAL_OPTIONS = ["1m", "5m", "15m", "1h", "4h", "1d"];

// TradingView chart component
const TradingViewChart = ({ symbol, interval }) => {
  const containerRef = useRef();
  const widgetRef = useRef();
  
  // Map our intervals to TradingView intervals
  const intervalMap = {
    "1m": "1",
    "5m": "5",
    "15m": "15",
    "1h": "60",
    "4h": "240",
    "1d": "1D"
  };

  useEffect(() => {
    // Load TradingView script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView && containerRef.current) {
        widgetRef.current = new window.TradingView.widget({
          symbol: `BINANCE:${symbol}`,
          interval: intervalMap[interval],
          container_id: containerRef.current.id,
          autosize: true,
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          hide_top_toolbar: true,
          hide_legend: true,
          save_image: false,
          studies: [],
          locale: "en"
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      // Clean up
      document.head.removeChild(script);
      if (widgetRef.current) {
        widgetRef.current.remove();
        widgetRef.current = null;
      }
    };
  }, [symbol, interval]);

  return <div id="tradingview-chart" ref={containerRef} style={{ height: "100%", width: "100%" }} />;
};

export default function TradePage({
  initialSymbol = DEFAULT_SYMBOL,
  initialInterval = DEFAULT_INTERVAL,
}) {
  const [symbol, setSymbol] = useState(initialSymbol);
  const [interval, setInterval] = useState(initialInterval);
  const [cryptoList, setCryptoList] = useState([]);
  const [filteredCrypto, setFilteredCrypto] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastPrice, setLastPrice] = useState("--");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [leverage, setLeverage] = useState(1);
  const [isFutures, setIsFutures] = useState(true);

  // Fetch top cryptocurrencies
  useEffect(() => {
    const fetchTopCryptos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=false"
        );
        const data = await response.json();
        
        // Filter for Binance pairs and format
        const binanceSymbols = data
          .filter(coin => coin.symbol.length <= 5) // Filter out long symbols
          .map(coin => ({
            value: `${coin.symbol.toUpperCase()}USDT`,
            label: `${coin.name} (${coin.symbol.toUpperCase()}/USDT)`
          }));
        
        setCryptoList(binanceSymbols);
        setFilteredCrypto(binanceSymbols);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch cryptocurrencies:", error);
        setLoading(false);
      }
    };

    fetchTopCryptos();
  }, []);

  // Filter cryptocurrencies based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCrypto(cryptoList);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = cryptoList.filter(crypto => 
        crypto.label.toLowerCase().includes(term) || 
        crypto.value.toLowerCase().includes(term)
      );
      setFilteredCrypto(filtered);
    }
  }, [searchTerm, cryptoList]);

  // Fetch current price
  useEffect(() => {
    if (!symbol) return;
    
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const currentPrice = parseFloat(data.c).toFixed(4);
      setLastPrice(currentPrice);
      if (!selectedPrice) setSelectedPrice(currentPrice);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) ws.close();
    };
  }, [symbol]);

  function submitOrder(side) {
    const order = {
      symbol,
      side,
      price: selectedPrice,
      quantity,
      leverage,
      timestamp: Date.now(),
    };
    console.log("DEMO ORDER:", order);
    alert(`Demo order submitted:\n${side}\n${quantity} @ ${selectedPrice}\n(leverage ${leverage}x)`);
  }

  return (
    <div className="trade-page">
      <header className="trade-header">
        <div className="left-top">
          <div className="brand-inline">
            <div className="coin-icon small">฿</div>
            <div className="symbol-title">
              <div className="symbol-name">{symbol.replace("USDT", "")}</div>
              <div className="symbol-sub">Perpetual / {interval}</div>
            </div>
          </div>

          <div className="controls-inline">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search cryptocurrency..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button className="search-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </button>
            </div>

            <select
              className="symbol-select"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            >
              {filteredCrypto.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            <div className="intervals">
              {INTERVAL_OPTIONS.map((i) => (
                <button
                  key={i}
                  className={`interval-btn ${interval === i ? "active" : ""}`}
                  onClick={() => setInterval(i)}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="right-top">
          <div className="price-box">
            <div className="last-price">{lastPrice}</div>
            <div className="price-change">-1,500 (-1.5%)</div>
          </div>
          <div className="futures-toggle">
            <label className={`f-toggle ${isFutures ? "active" : ""}`} onClick={() => setIsFutures(true)}>Futures</label>
            <label className={`f-toggle ${!isFutures ? "active" : ""}`} onClick={() => setIsFutures(false)}>Spot</label>
          </div>
        </div>
      </header>

      <div className="trade-grid">
        <div className="chart-panel">
          <div className="chart-container">
            {loading ? (
              <div className="chart-loading">Loading chart...</div>
            ) : (
              <TradingViewChart symbol={symbol} interval={interval} />
            )}
          </div>
        </div>

        <aside className="order-panel">
          <div className="order-card">
            <div className="order-title">Create Order</div>

            <label>Price</label>
            <input
              type="text"
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="input-pill"
            />

            <label>Quantity</label>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="input-pill"
            />

            <label>Leverage: {leverage}x</label>
            <input
              className="range"
              type="range"
              min="1"
              max="50"
              value={leverage}
              onChange={(e) => setLeverage(Number(e.target.value))}
            />

            <div className="order-actions">
              <button className="btn btn-sell" onClick={() => submitOrder("SELL")}>Sell / Short</button>
              <button className="btn btn-buy" onClick={() => submitOrder("BUY")}>Buy / Long</button>
            </div>
          </div>
        </aside>
      </div>

      <div className="positions-panel">
        <div className="positions-tabs">
          <div className="tab active">Positions (0)</div>
          <div className="tab">Order History</div>
        </div>

        <div className="positions-body">
          <div className="empty-placeholder">No positions yet</div>
        </div>
      </div>
    </div>
  );
}