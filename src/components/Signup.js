import React from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  function handleDemoSignup(e) {
    e.preventDefault();
    alert("Demo: account created (placeholder).");
    navigate("/");
  }

  return (
    <section className="page-card" style={{ maxWidth: 520 }}>
      <h2 className="page-title">Sign Up</h2>
      <p className="page-sub">Create a BiTry account to save progress and simulate trades.</p>

      <form onSubmit={handleDemoSignup}>
        <label style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>Name</label>
        <input required placeholder="Your name" style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 12, background: "transparent", color: "inherit" }} />

        <label style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>Email</label>
        <input type="email" required placeholder="you@email.com"
          style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 12, background: "transparent", color: "inherit" }} />

        <label style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>Password</label>
        <input type="password" required placeholder="Choose a strong password"
          style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16, background: "transparent", color: "inherit" }} />

        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit" className="signup-btn" style={{ flex: 1 }}>Create Account</button>
        </div>
      </form>
    </section>
  );
}
