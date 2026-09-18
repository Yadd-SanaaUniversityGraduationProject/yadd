// Single coherent inline-SVG icon set (no emoji). 20-24px family.
import React from 'react';

const P = {
  home: <path d="M4 11.5 12 4l8 7.5M6 10.5V20h12v-9.5" />,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  user: <><circle cx="12" cy="8" r="3.6" /><path d="M5 20c1.2-3.4 3.9-5 7-5s5.8 1.6 7 5" /></>,
  grid: <><rect x="4" y="4" width="7" height="7" rx="2" /><rect x="13" y="4" width="7" height="7" rx="2" /><rect x="4" y="13" width="7" height="7" rx="2" /><rect x="13" y="13" width="7" height="7" rx="2" /></>,
  file: <><path d="M6 3.5h8L19 8.5V20.5H6z" /><path d="M14 3.5V8.5h5" /></>,
  chat: <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H9l-5 4z" />,
  back: <path d="M14.5 5.5 8 12l6.5 6.5" />, // RTL "back" = pointing right
  fwd: <path d="M9.5 5.5 16 12l-6.5 6.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  star: <path d="m12 4 2.3 4.9 5.2.6-3.9 3.6 1 5.2-4.6-2.6-4.6 2.6 1-5.2L4.5 9.5l5.2-.6z" />,
  pin: <><path d="M12 21s6.5-5.6 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 15.4 12 21 12 21Z" /><circle cx="12" cy="10.5" r="2.3" /></>,
  shield: <path d="M12 3.5 5 6v6c0 4.5 3 7.8 7 8.5 4-.7 7-4 7-8.5V6z" />,
  bell: <><path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10" /><path d="M10 19.5a2.2 2.2 0 0 0 4 0" /></>,
  image: <><rect x="4" y="5" width="16" height="14" rx="2.5" /><circle cx="9" cy="10" r="1.6" /><path d="m5.5 17 4.5-4 3 3 2.5-2.5 3 3.5" /></>,
  clock: <><circle cx="12" cy="12" r="8" /><path d="M12 7.5V12l3 2" /></>,
  card: <><rect x="3.5" y="6" width="17" height="12.5" rx="2.5" /><path d="M3.5 10h17" /></>,
  swap: <path d="M7 4.5h11l-2.5-2.5M17 19.5H6l2.5 2.5M17 4.5v3M7 16.5v3" />,
  x: <path d="m6 6 12 12M18 6 6 18" />,
  info: <><circle cx="12" cy="12" r="8" /><path d="M12 11v5" /><circle cx="12" cy="8" r=".5" /></>,
  box: <><path d="m12 3.5 8 4v9l-8 4-8-4v-9z" /><path d="m4 7.5 8 4 8-4M12 11.5v9" /></>,
  bolt: <path d="M13 3.5 5.5 13.5H11L10.5 20.5 18 10.5h-5.5z" />,
  snow: <><path d="M12 3.5v17M5 7.5l14 9M19 7.5l-14 9" /></>,
  wrench: <path d="M14.5 6.5a4 4 0 0 0-5.6 4.8L4 16.2V20h3.8l4.9-4.9a4 4 0 0 0 4.8-5.6l-2.7 2.7-2.5-.7-.7-2.5z" />,
  cake: <><path d="M5 12.5h14V20H5zM5 12.5c0-2 1.8-3 3.5-3 1.4 0 2.3.8 3.5.8s2.1-.8 3.5-.8c1.7 0 3.5 1 3.5 3" /><path d="M12 9.5V7M12 4.5v.5" /></>,
  bread: <path d="M4 13a4 4 0 0 1 4-4h8a4 4 0 0 1 0 8H8a4 4 0 0 1-4-4Z" />,
  gift: <><rect x="4.5" y="9" width="15" height="11" rx="1.5" /><path d="M12 9v11M4.5 12.5h15M12 9S7 9 6 7a1.8 1.8 0 0 1 3-1.5C10.5 7 12 9 12 9Zm0 0s5 0 6-2a1.8 1.8 0 0 0-3-1.5C13.5 7 12 9 12 9Z" /></>,
  drop: <path d="M12 3.5s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z" />,
  tag: <><path d="m4 4.5h7l9 9-7 7-9-9z" /><circle cx="9" cy="9.5" r="1.4" /></>,
};

export default function Icon({ name, size = 22, strokeWidth = 1.8 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {P[name] || P.info}
    </svg>
  );
}

export const CATEGORY_ICON = {
  electric: 'bolt',
  ac: 'snow',
  'home-repair': 'wrench',
  plumbing: 'drop',
  paint: 'tag',
  carpentry: 'box',
  sweets: 'cake',
  bakery: 'bread',
  handmade: 'gift',
  honey: 'drop',
  clothes: 'tag',
};
