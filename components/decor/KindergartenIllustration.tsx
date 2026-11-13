/**
 * Иллюстрация здания детского сада — показывается на главном экране,
 * пока в public/images нет файла main-page.png / main-page.jpg.
 */
export function KindergartenIllustration({ title, className = "" }: { title: string; className?: string }) {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label={title} className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="kg-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfeee8" />
          <stop offset="70%" stopColor="#e9fbf8" />
          <stop offset="100%" stopColor="#fff8ec" />
        </linearGradient>
        <radialGradient id="kg-sun" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#fff3c4" />
          <stop offset="60%" stopColor="#ffc93c" />
          <stop offset="100%" stopColor="#f2a61b" />
        </radialGradient>
        <linearGradient id="kg-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffdf8" />
          <stop offset="100%" stopColor="#fbe9cf" />
        </linearGradient>
        <linearGradient id="kg-roof" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff9a88" />
          <stop offset="100%" stopColor="#e85a45" />
        </linearGradient>
        <linearGradient id="kg-hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fd6cb" />
          <stop offset="100%" stopColor="#4fc4b8" />
        </linearGradient>
      </defs>

      <rect width="400" height="400" fill="url(#kg-sky)" />

      {/* Солнце с лучами */}
      <g className="origin-[318px_88px] animate-spin-slow">
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x="315" y="34" width="6" height="16" rx="3" fill="#ffc93c" opacity=".7" transform={`rotate(${i * 30} 318 88)`} />
        ))}
      </g>
      <circle cx="318" cy="88" r="32" fill="url(#kg-sun)" />
      <circle cx="308" cy="84" r="3" fill="#2a2c33" />
      <circle cx="328" cy="84" r="3" fill="#2a2c33" />
      <path d="M309 96q9 8 18 0" stroke="#2a2c33" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Облака */}
      <g className="animate-float-slow">
        <path d="M60 96c-12 0-20-7-20-16s7-15 16-15c3-10 12-16 22-16 9 0 16 5 19 12 2-1 4-1 6-1 10 0 17 7 17 16 6 1 10 5 10 10 0 6-5 10-11 10Z" fill="#fff" />
      </g>
      <g className="animate-float" style={{ animationDelay: "1.5s" }}>
        <path d="M196 60c-8 0-13-5-13-11s5-10 11-10c2-7 8-11 15-11 6 0 11 3 13 8h4c7 0 12 5 12 11 4 1 7 4 7 7 0 4-3 6-8 6Z" fill="#fff" opacity=".9" />
      </g>

      {/* Холмы */}
      <path d="M0 300c60-40 130-46 200-20s140 24 200-10v130H0Z" fill="url(#kg-hill)" />
      <path d="M0 330c70-22 150-20 220 0s120 14 180 0v70H0Z" fill="#3fb3a7" />

      {/* Здание */}
      <g>
        <rect x="104" y="176" width="192" height="134" rx="14" fill="url(#kg-wall)" stroke="#2a2c33" strokeWidth="4" />
        <path d="M88 186 200 112l112 74Z" fill="url(#kg-roof)" stroke="#2a2c33" strokeWidth="4" strokeLinejoin="round" />
        {/* Звезда на крыше */}
        <g className="origin-[200px_150px] animate-wiggle">
          <path d="M200 134l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1Z" fill="#ffc93c" stroke="#2a2c33" strokeWidth="2.5" strokeLinejoin="round" />
        </g>
        {/* Окна */}
        <rect x="124" y="200" width="44" height="40" rx="10" fill="#4fc4b8" stroke="#2a2c33" strokeWidth="3.5" />
        <path d="M146 200v40M124 220h44" stroke="#2a2c33" strokeWidth="3" />
        <rect x="232" y="200" width="44" height="40" rx="10" fill="#c7b8f2" stroke="#2a2c33" strokeWidth="3.5" />
        <path d="M254 200v40M232 220h44" stroke="#2a2c33" strokeWidth="3" />
        {/* Дверь-арка */}
        <path d="M178 310v-46a22 22 0 0 1 44 0v46" fill="#ffc93c" stroke="#2a2c33" strokeWidth="4" />
        <circle cx="212" cy="288" r="3.5" fill="#2a2c33" />
        {/* Флажки */}
        <path d="M112 176q44 18 88 0t88 0" fill="none" stroke="#2a2c33" strokeWidth="2" />
        {[128, 152, 176, 224, 248, 272].map((x, i) => (
          <path key={x} d={`M${x - 7} ${181 + (i % 3 === 1 ? 3 : 0)}l7 13 7-13Z`} fill={["#ff7a66", "#ffc93c", "#4fc4b8"][i % 3]} />
        ))}
      </g>

      {/* Деревья */}
      <g>
        <rect x="52" y="262" width="8" height="40" rx="4" fill="#9a6b3c" />
        <circle cx="56" cy="252" r="26" fill="#52c08a" stroke="#2a2c33" strokeWidth="3.5" />
        <circle cx="48" cy="244" r="6" fill="#fff" opacity=".35" />
        <rect x="340" y="268" width="8" height="34" rx="4" fill="#9a6b3c" />
        <circle cx="344" cy="258" r="22" fill="#ffb347" stroke="#2a2c33" strokeWidth="3.5" />
      </g>

      {/* Цветы на лужайке */}
      {[
        [84, 336, "#ff7a66"],
        [128, 352, "#ffc93c"],
        [282, 344, "#c7b8f2"],
        [326, 360, "#ff7a66"],
      ].map(([x, y, c]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x as number} cy={y as number} r="7" fill={c as string} />
          <circle cx={x as number} cy={y as number} r="2.5" fill="#fff8ec" />
        </g>
      ))}
    </svg>
  );
}
