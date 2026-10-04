"use client";

import React from "react";

/**
 * AI Pipeline Flow Line
 * Connected horizontal flow lines behind the 4 steps in "How DevLeveler Works"
 */
export function PipelineFlowLine({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block ${className}`}
    >
      <svg className="w-full h-12" preserveAspectRatio="none" viewBox="0 0 1000 48">
        <defs>
          <linearGradient id="pipelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.1" />
            <stop offset="25%" stopColor="#2563eb" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.45" />
            <stop offset="75%" stopColor="#0891b2" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Main pipeline connection rail */}
        <line
          x1="60"
          y1="24"
          x2="940"
          y2="24"
          stroke="url(#pipelineGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        {/* Pulse dots at step anchor coordinates */}
        <circle cx="160" cy="24" r="3.5" fill="#2563eb" />
        <circle cx="390" cy="24" r="3.5" fill="#4f46e5" />
        <circle cx="610" cy="24" r="3.5" fill="#0891b2" />
        <circle cx="840" cy="24" r="3.5" fill="#059669" />
      </svg>
    </div>
  );
}
