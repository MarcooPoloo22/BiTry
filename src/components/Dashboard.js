import React, { useState } from "react";
import PieStat from "../components/DashboardPieStat";
import "../css/Dashboard.css";
import { IoBarChart } from "react-icons/io5";
import { FaUser, FaUserCircle, FaEdit } from "react-icons/fa";

const ongoingTradesData = [
  { id: 1, currency: "Coin 1", position: "Short", amount: "0.0002", priceBought: "110,000 USD", pnl: 1000 },
  { id: 2, currency: "Coin 2", position: "Long",  amount: "0.0002", priceBought: "110,000 USD", pnl: 300  },
  { id: 3, currency: "Coin 3", position: "Long",  amount: "0.0002", priceBought: "110,000 USD", pnl: -251 },
  { id: 4, currency: "Coin 4", position: "Short", amount: "0.0002", priceBought: "110,000 USD", pnl: 68   },
  { id: 5, currency: "Coin 5", position: "Short", amount: "0.0002", priceBought: "110,000 USD", pnl: 70   },
];

const closedPositionsData = [
  { id: 1, currency: "Coin 1", position: "Long",  amount: "0.0002", priceBought: "110,000 USD", pnl: 1000 },
  { id: 2, currency: "Coin 2", position: "Long",  amount: "0.0002", priceBought: "110,000 USD", pnl: 300  },
  { id: 3, currency: "Coin 3", position: "Long",  amount: "0.0002", priceBought: "110,000 USD", pnl: -251 },
  { id: 4, currency: "Coin 4", position: "Short", amount: "0.0002", priceBought: "110,000 USD", pnl: 68   },
  { id: 5, currency: "Coin 5", position: "Short", amount: "0.0002", priceBought: "110,000 USD", pnl: 70   },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Demo stats for the pie charts
  const totalPositions = { wins: 3, losses: 2 };
  const winRate = { wins: 4, losses: 1 };

  const totalPositionsData = [
    { name: "Wins", value: totalPositions.wins },
    { name: "Losses", value: totalPositions.losses },
  ];

  const winRateData = [
    { name: "Wins", value: winRate.wins },
    { name: "Losses", value: winRate.losses },
  ];

  const totalCount = totalPositions.wins + totalPositions.losses;
  const winPercent = Math.round((winRate.wins / (winRate.wins + winRate.losses)) * 100);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar" aria-label="Sidebar">
        <nav>
          <div
            className={`sidebar-item ${activeTab === "overview" ? "active" : ""}`}
            role="button"
            tabIndex={0}
            onClick={() => setActiveTab("overview")}
          >
            <span className="icon" aria-hidden>
              <IoBarChart />
            </span>
            <span className="sidebar-label">
              Overview
            </span>
          </div>

          <div
            className={`sidebar-item ${activeTab === "profile" ? "active" : ""}`}
            role="button"
            tabIndex={0}
            onClick={() => setActiveTab("profile")}
          >
            <span className="icon" aria-hidden>
              <FaUser />
            </span>
            <span className="sidebar-label">
              Profile
            </span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content" role="main">
        {activeTab === "overview" && (
          <>
            {/* Assets Overview */}
            <section className="page-card assets-overview" aria-labelledby="assets-heading">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div>
                  <h3 id="assets-heading" style={{ margin: 0 }}>Assets Overview</h3>
                  <div style={{ marginTop: 12, color: "rgba(0,0,0,0.85)", fontWeight: 700 }}>
                    ₱10,000 barya
                  </div>
                  <div style={{ marginTop: 6, color: "rgba(0,0,0,0.7)" }}>= 0.0016 BTC</div>
                </div>
              </div>
            </section>

            {/* Ongoing Trades */}
            <h3 id="ongoing-heading">Ongoing Trades</h3>
            <section className="page-card ongoing-trades" aria-labelledby="ongoing-heading">
              <div className="table-wrap">
                <table className="trades-table" aria-describedby="ongoing-heading">
                  <thead>
                    <tr>
                      <th>Currency</th>
                      <th>Position</th>
                      <th>Amount</th>
                      <th>Price Bought</th>
                      <th style={{ textAlign: "right" }}>P&amp;L (₱barya)</th>
                    </tr>
                  </thead>

                  <tbody>
                    {ongoingTradesData.map((t) => (
                      <tr key={t.id}>
                        <td>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                            <span style={{
                              display: "inline-flex",
                              width: 18, height: 18, borderRadius: 999,
                              alignItems: "center", justifyContent: "center",
                              background: "#ff8f00", color: "#fff", fontSize: 12
                            }}>฿</span>
                            <span>{t.currency}</span>
                          </span>
                        </td>
                        <td>{t.position}</td>
                        <td>{t.amount}</td>
                        <td>{t.priceBought}</td>
                        <td style={{ textAlign: "right" }}>{t.pnl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Closed Positions */}
            <h3 id="closed-heading">Closed Positions</h3>
            <section className="page-card closed-positions" aria-labelledby="closed-heading">
              <div className="stats-row">
                <div className="stat-box">
                  <p style={{ margin: 0, fontWeight: 700 }}>Total Positions</p>
                  <div className="stat-content">
                    <PieStat
                      data={totalPositionsData}
                      colors={["#2ecc71", "#e74c3c"]}
                      size={86}
                      centerLabel={`${totalCount}`}
                      subLabel={`${totalPositions.wins} Long / ${totalPositions.losses} Short`}
                    />
                    <div className="stat-text">
                      <div className="stat-value">{totalCount}</div>
                      <div className="stat-description">
                        {totalPositions.wins} Long / {totalPositions.losses} Short
                      </div>
                    </div>
                  </div>
                </div>

                <div className="stat-box">
                  <p style={{ margin: 0, fontWeight: 700 }}>Win Rate</p>
                  <div className="stat-content">
                    <PieStat
                      data={winRateData}
                      colors={["#2ecc71", "#e74c3c"]}
                      size={86}
                      centerLabel={`${winPercent}%`}
                      subLabel={`${winRate.wins} wins / ${winRate.losses} loss`}
                    />
                    <div className="stat-text">
                      <div className="stat-value">{winPercent}%</div>
                      <div className="stat-description">
                        {winRate.wins} wins / {winRate.losses} loss
                      </div>
                    </div>
                  </div>
                </div>

                <div className="stat-box">
                  <p style={{ margin: 0, fontWeight: 700 }}>Average Return Per Trade</p>
                  <div className="stat-single-value">
                    ₱465 barya
                  </div>
                </div>
              </div>

              {/* closed positions table */}
              <div className="table-wrap" style={{ marginTop: 12 }}>
                <table className="trades-table">
                  <thead>
                    <tr>
                      <th>Currency</th>
                      <th>Position</th>
                      <th>Amount</th>
                      <th>Price Bought</th>
                      <th style={{ textAlign: "right" }}>P&amp;L (₱barya)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {closedPositionsData.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                            <span style={{
                              display: "inline-flex",
                              width: 18, height: 18, borderRadius: 999,
                              alignItems: "center", justifyContent: "center",
                              background: "#ff8f00", color: "#fff", fontSize: 12
                            }}>฿</span>
                            <span>{p.currency}</span>
                          </span>
                        </td>
                        <td>{p.position}</td>
                        <td>{p.amount}</td>
                        <td>{p.priceBought}</td>
                        <td style={{ textAlign: "right" }}>{p.pnl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {activeTab === "profile" && (
          <section className="page-card profile-card">
            <h2>User Profile</h2>
            <div className="profile-content" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <FaUserCircle style={{ fontSize: "80px", color: "#555" }} />
              <div className="profile-info" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div className="profile-name" style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "bold" }}>
                  <span>Mang Tomas</span>
                  <FaEdit className="edit-icon" style={{ fontSize: "14px", cursor: "pointer" }} />
                </div>
                <div className="profile-email" style={{ display: "flex", alignItems: "center", gap: "6px", color: "#444" }}>
                  <span>TMang@gmail.com</span>
                  <FaEdit className="edit-icon" style={{ fontSize: "14px", cursor: "pointer" }} />
                </div>
                <button
                  style={{
                    background: "#e74c3c",
                    color: "#fff",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "4px",
                    marginTop: "6px",
                    cursor: "pointer"
                  }}
                >
                  Reset Password
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}