import React from 'react';

const Logo = ({ size = 40, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield outer border (dark grey) */}
      <path 
        d="M100 20 L165 42 C168 43 170 46 170 49 L170 105 C170 142 142 172 100 188 C58 172 30 142 30 105 L30 49 C30 46 32 43 35 42 Z" 
        fill="#4A4A4A"
      />
      
      {/* Shield middle border (light grey) */}
      <path 
        d="M100 26 L162 46 C164 47 166 49 166 52 L166 105 C166 139 140 167 100 182 C60 167 34 139 34 105 L34 52 C34 49 36 47 38 46 Z" 
        fill="#B8B8B8"
      />
      
      {/* Shield inner white border */}
      <path 
        d="M100 32 L158 50 C160 51 161 53 161 55 L161 105 C161 136 137 162 100 176 C63 162 39 136 39 105 L39 55 C39 53 40 51 42 50 Z" 
        fill="#E8E8E8"
      />
      
      {/* Shield main body - top half (navy blue with gradient) */}
      <path 
        d="M100 38 L154 54 C155 55 156 56 156 58 L156 105 L44 105 L44 58 C44 56 45 55 46 54 Z" 
        fill="url(#blueGradient)"
      />
      
      {/* Shield main body - bottom half (green with gradient) */}
      <path 
        d="M44 105 L156 105 C156 133 133 157 100 170 C67 157 44 133 44 105 Z" 
        fill="url(#greenGradient)"
      />
      
      {/* Center vertical highlight on shield */}
      <path 
        d="M100 38 L100 170" 
        stroke="url(#centerHighlight)" 
        strokeWidth="20"
        opacity="0.15"
      />
      
      {/* Globe - outer circle */}
      <circle cx="80" cy="75" r="20" fill="none" stroke="white" strokeWidth="2.5" opacity="0.95"/>
      
      {/* Globe - horizontal lines */}
      <ellipse cx="80" cy="75" rx="20" ry="8" fill="none" stroke="white" strokeWidth="2" opacity="0.95"/>
      <ellipse cx="80" cy="75" rx="20" ry="14" fill="none" stroke="white" strokeWidth="1.5" opacity="0.85"/>
      
      {/* Globe - vertical line */}
      <ellipse cx="80" cy="75" rx="9" ry="20" fill="none" stroke="white" strokeWidth="2" opacity="0.95"/>
      
      {/* Swoosh/orbit path (curved line) */}
      <path 
        d="M 58 92 Q 100 58 142 88" 
        fill="none" 
        stroke="white" 
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.95"
      />
      
      {/* Airplane */}
      <g transform="translate(135, 80) rotate(-30)">
        <path 
          d="M 0 -2 L -2 -3 L -10 -8 L -8 -8 L -3 -4 L -3 -12 L -5 -14 L -4 -14 L -2 -11 L 2 -11 L 4 -14 L 5 -14 L 3 -12 L 3 -4 L 8 -8 L 10 -8 L 2 -3 L 0 -2 Z"
          fill="white"
          opacity="0.95"
        />
      </g>
      
      <defs>
        {/* Blue gradient for top half */}
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2C4A6B" />
          <stop offset="50%" stopColor="#3D5F7F" />
          <stop offset="100%" stopColor="#2C4A6B" />
        </linearGradient>
        
        {/* Green gradient for bottom half */}
        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5A8F4F" />
          <stop offset="50%" stopColor="#6BA55E" />
          <stop offset="100%" stopColor="#5A8F4F" />
        </linearGradient>
        
        {/* Center highlight */}
        <linearGradient id="centerHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="white" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
