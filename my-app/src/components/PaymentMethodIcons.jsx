// Styled Payment Icons matching the design in the attachment
export const PaymentMethodIcons = {
  easypaisa: (
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Easypaisa - Green with white eye icon */}
      <circle cx="50" cy="50" r="50" fill="#1DB954" />
      <circle cx="50" cy="45" r="12" fill="white" opacity="0.3" />
      <path
        d="M38 45C38 36.7 43.6 30 50 30C56.4 30 62 36.7 62 45"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="50" cy="45" r="6" fill="white" />
      <path
        d="M36 68C42 72 58 72 64 68"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),

  jazzcash: (
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Jazzcash - Red/Yellow with white zig-zag */}
      <defs>
        <linearGradient id="jzGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E60000" />
          <stop offset="100%" stopColor="#FFB81C" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#jzGradient)" />
      <path
        d="M30 60L40 35L50 50L60 25L70 40"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),

  crypto: (
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Crypto - Orange with Bitcoin symbol */}
      <circle cx="50" cy="50" r="50" fill="#F7931A" />
      <path
        d="M50 25C36.2 25 25 36.2 25 50C25 63.8 36.2 75 50 75C63.8 75 75 63.8 75 50C75 36.2 63.8 25 50 25Z"
        fill="white"
        opacity="0.15"
      />
      <g transform="translate(50, 50)">
        {/* Bitcoin B symbol */}
        <path
          d="M-2 -15V15M-8 -8H-2C1 -8 2 -6 2 -4C2 -2 1 0 -2 0H-8M-8 0H0C3 0 4 2 4 5C4 8 3 10 0 10H-8"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  ),

  bank: (
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bank - Blue with bank building */}
      <circle cx="50" cy="50" r="50" fill="#0066CC" />
      {/* Building top */}
      <path
        d="M50 20L30 35V75H70V35L50 20Z"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      {/* Columns */}
      <line x1="40" y1="35" x2="40" y2="75" stroke="white" strokeWidth="2" />
      <line x1="50" y1="35" x2="50" y2="75" stroke="white" strokeWidth="2" />
      <line x1="60" y1="35" x2="60" y2="75" stroke="white" strokeWidth="2" />
      {/* Door */}
      <rect
        x="46"
        y="55"
        width="8"
        height="20"
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
      <line x1="50" y1="55" x2="50" y2="75" stroke="white" strokeWidth="1.5" />
    </svg>
  ),

  card: (
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Credit Card - Blue gradient */}
      <defs>
        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
      <rect
        x="20"
        y="30"
        width="60"
        height="40"
        rx="4"
        fill="url(#cardGradient)"
      />
      <line
        x1="20"
        y1="45"
        x2="80"
        y2="45"
        stroke="white"
        strokeWidth="2"
        opacity="0.5"
      />
      <circle cx="32" cy="62" r="2" fill="white" opacity="0.7" />
      <circle cx="40" cy="62" r="2" fill="white" opacity="0.7" />
      <circle cx="48" cy="62" r="2" fill="white" opacity="0.7" />
      <circle cx="56" cy="62" r="2" fill="white" opacity="0.7" />
    </svg>
  ),
};
