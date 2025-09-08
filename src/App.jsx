import React, { useState } from "react";

export default function App() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({ label: "", color: "" });

  const checkStrength = (pwd) => {
    let score = 0;

    // Length scoring
    if (pwd.length >= 6) score++;
    if (pwd.length >= 9) score++;
    if (pwd.length >= 12) score++;

    // Character type scoring
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score++;

    // Determine strength label + color
    if (score <= 3) return { label: "Good", color: "bg-yellow-400" };
    if (score <= 5) return { label: "Very Good", color: "bg-blue-400" };
    if (score <= 7) return { label: "Strong", color: "bg-green-400" };
    return { label: "Excellent", color: "bg-purple-500" };
  };

  const handleChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setStrength(checkStrength(pwd));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Password Validator
        </h1>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {password && (
          <div>
            <div className="flex justify-between mb-2">
              <span>Password Strength:</span>
              <span className="font-bold">{strength.label}</span>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded">
              <div
                className={`${strength.color} h-3 rounded`}
                style={{
                  width:
                    strength.label === "Good"
                      ? "25%"
                      : strength.label === "Very Good"
                      ? "50%"
                      : strength.label === "Strong"
                      ? "100%" // ✅ Strong now full line
                      : "100%",
                  transition: "width 0.3s ease",
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
