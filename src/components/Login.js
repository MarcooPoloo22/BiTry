import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function handleDemoLogin(e) {
    e.preventDefault();
    // demo behaviour: after implement auth, replace with real login flow
    alert("Demo: logged in (placeholder).");
    navigate("/");
  }

  return (
    <section className="page-card" style={{ maxWidth: 480 }}>
      <h2 className="page-title">Login</h2>
      <p className="page-sub">Sign in to your BiTry account.</p>

      <form onSubmit={handleDemoLogin}>
        <label style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>Email</label>
        <input type="email" placeholder="you@email.com" required
          style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 12, background: "transparent", color: "inherit" }} />

        <label style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>Password</label>
        <input type="password" placeholder="••••••••" required
          style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16, background: "transparent", color: "inherit" }} />

        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit" className="signup-btn" style={{ flex: 1 }}>Login</button>
        </div>
      </form>
    </section>
  );
}
