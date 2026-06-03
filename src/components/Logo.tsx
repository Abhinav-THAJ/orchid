"use client";

import React from "react";

interface LogoProps {
  className?: string;
  /** Scale factor relative to base size (base = 120px wide). Default 1. */
  scale?: number;
}

export default function Logo({ className = "", scale = 1 }: LogoProps) {
  const w = Math.round(120 * scale);
  const h = Math.round(140 * scale);

  return (
    <div className={`inline-block select-none ${className}`} style={{ width: w, height: h }}>
      <svg
        viewBox="0 0 120 140"
        width={w}
        height={h}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        aria-label="Orchid Designs"
      >
        <defs>
          {/* Orchid petal gradients */}
          <radialGradient id="lg-p1" cx="40%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#fce4f0" />
            <stop offset="30%" stopColor="#f06faa" />
            <stop offset="70%" stopColor="#c0306a" />
            <stop offset="100%" stopColor="#8b1a42" />
          </radialGradient>
          <radialGradient id="lg-p2" cx="55%" cy="25%" r="65%">
            <stop offset="0%" stopColor="#fde8f4" />
            <stop offset="35%" stopColor="#e8609a" />
            <stop offset="75%" stopColor="#b52b60" />
            <stop offset="100%" stopColor="#7d1638" />
          </radialGradient>
          <radialGradient id="lg-p3" cx="50%" cy="20%" r="70%">
            <stop offset="0%" stopColor="#fdeef7" />
            <stop offset="40%" stopColor="#ee78b2" />
            <stop offset="80%" stopColor="#c03870" />
            <stop offset="100%" stopColor="#861d45" />
          </radialGradient>
          <radialGradient id="lg-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff0f8" />
            <stop offset="60%" stopColor="#f9a8d4" />
            <stop offset="100%" stopColor="#be185d" />
          </radialGradient>
          <filter id="lg-drop" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0.5" dy="1.5" stdDeviation="1.5" floodColor="#5a0a22" floodOpacity="0.35" />
          </filter>
          <filter id="lg-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── White open circle (the O) ── */}
        {/* Right three-quarter arc, open on the upper-left where flowers overlap */}
        <circle cx="65" cy="42" r="22" fill="none" stroke="white" strokeWidth="6"
          strokeDasharray="115 25" strokeDashoffset="-8" strokeLinecap="round" />

        {/* ── Orchid cluster (left + top of O) ── */}
        <g filter="url(#lg-drop)">
          {/* --- Flower 1: bottom-left large --- */}
          <g transform="translate(22, 52) rotate(-20)">
            <Petal grad="lg-p1" />
          </g>

          {/* --- Flower 2: middle large --- */}
          <g transform="translate(28, 36) rotate(15)">
            <Petal grad="lg-p2" />
          </g>

          {/* --- Flower 3: top-center --- */}
          <g transform="translate(44, 18) rotate(5)">
            <Petal grad="lg-p3" />
          </g>

          {/* --- Flower 4: small bud top-right --- */}
          <g transform="translate(60, 8) rotate(30) scale(0.55)">
            <Petal grad="lg-p1" />
          </g>

          {/* --- Flower 5: small bud far-left --- */}
          <g transform="translate(12, 46) rotate(-35) scale(0.6)">
            <Petal grad="lg-p2" />
          </g>
        </g>

        {/* ── Stem / branch line ── */}
        <path
          d="M 18 68 Q 32 52, 52 30 Q 62 18, 68 10"
          fill="none" stroke="#c9608a" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"
        />

        {/* ── ORCHID text ── */}
        {/* Large O with serif feel */}
        <text
          x="6" y="103"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="28"
          fontWeight="700"
          fill="white"
          letterSpacing="-0.5"
        >
          O
        </text>
        {/* RCHID in sans-serif caps */}
        <text
          x="28" y="103"
          fontFamily="'Arial', 'Helvetica Neue', sans-serif"
          fontSize="22"
          fontWeight="800"
          fill="white"
          letterSpacing="1"
        >
          RCHI
        </text>
        {/* D */}
        <text
          x="93" y="103"
          fontFamily="'Arial', 'Helvetica Neue', sans-serif"
          fontSize="22"
          fontWeight="800"
          fill="white"
        >
          D
        </text>

        {/* Cart icon inside the D */}
        <g transform="translate(99, 90)">
          {/* Cart body */}
          <path d="M0,2 L1,2 L3,7 L8,7 L9,3 L2,3" fill="none" stroke="white" strokeWidth="1" strokeLinejoin="round" />
          {/* Wheels */}
          <circle cx="3.5" cy="8.5" r="0.9" fill="white" />
          <circle cx="7.5" cy="8.5" r="0.9" fill="white" />
          {/* Handle */}
          <path d="M0,2 L-1,0" stroke="white" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* ── DESIGNS text ── */}
        <text
          x="60" y="120"
          fontFamily="'Arial', 'Helvetica Neue', sans-serif"
          fontSize="8.5"
          fontWeight="600"
          fill="white"
          letterSpacing="4"
          textAnchor="middle"
          opacity="0.92"
        >
          DESIGNS
        </text>
      </svg>
    </div>
  );
}

/** Single 5-petal orchid flower rendered in SVG */
function Petal({ grad }: { grad: string }) {
  // Each petal is a teardrop shape radiating from center
  const petals = [0, 72, 144, 216, 288];
  return (
    <g>
      {petals.map((angle, i) => (
        <path
          key={i}
          d="M 0 0 C -3 -4, -3 -11, 0 -14 C 3 -11, 3 -4, 0 0"
          fill={`url(#${grad})`}
          transform={`rotate(${angle})`}
          opacity={i === 0 ? 1 : 0.92}
        />
      ))}
      {/* Center */}
      <circle cx="0" cy="-3" r="2.5" fill="url(#lg-center)" />
      <circle cx="0" cy="-3" r="1" fill="#fce4f0" opacity="0.9" />
      {/* Stamen dots */}
      {[0, 120, 240].map((a, i) => (
        <circle
          key={i}
          cx={Math.cos((a * Math.PI) / 180) * 1.4}
          cy={-3 + Math.sin((a * Math.PI) / 180) * 1.4}
          r="0.5"
          fill="#f9d8ea"
        />
      ))}
    </g>
  );
}
