/** Небольшие тематические иллюстрации для четырёх приёмов пищи (без конкретных блюд). */
const s = { stroke: "#2a2c33", strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** Таңғы ас — восходящее солнце над тарелкой */
export function MorningMeal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true" focusable="false">
      <circle cx="40" cy="34" r="14" fill="#ffc93c" {...s} />
      {[0, 45, 90, 135, 180].map((r) => (
        <path key={r} d="M40 12v-6" {...s} transform={`rotate(${r - 90} 40 34)`} />
      ))}
      <ellipse cx="40" cy="56" rx="30" ry="9" fill="#fffdf8" {...s} />
      <ellipse cx="40" cy="55" rx="18" ry="4.5" fill="#ffe9a8" />
    </svg>
  );
}

/** Екінші таңғы ас — чашка и яблоко */
export function SecondBreakfast({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true" focusable="false">
      <path d="M14 34h32v14a14 14 0 0 1-14 14h-4a14 14 0 0 1-14-14Z" fill="#4fc4b8" {...s} />
      <path d="M46 38h4a7 7 0 0 1 0 14h-5" fill="none" {...s} />
      <path d="M24 26c-3-4 3-6 0-10M34 26c-3-4 3-6 0-10" fill="none" stroke="#2a2c33" strokeWidth="2.5" strokeLinecap="round" opacity=".5" />
      <circle cx="62" cy="58" r="11" fill="#ff7a66" {...s} />
      <path d="M62 47c0-4 2-6 5-7" fill="none" {...s} />
    </svg>
  );
}

/** Түскі ас — тарелка с ложкой и вилкой */
export function Lunch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true" focusable="false">
      <circle cx="40" cy="42" r="24" fill="#fffdf8" {...s} />
      <circle cx="40" cy="42" r="15" fill="#ffd9cf" stroke="#2a2c33" strokeWidth="2" />
      <path d="M8 22v14M5 22v8a3 3 0 0 0 6 0v-8M8 36v26" fill="none" {...s} />
      <ellipse cx="72" cy="28" rx="4.5" ry="7" fill="#ffc93c" {...s} />
      <path d="M72 35v27" {...s} />
    </svg>
  );
}

/** Бесін ас — стакан и печенье-звёздочка */
export function Snack({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true" focusable="false">
      <path d="M18 18h24l-3 46H21Z" fill="#fffdf8" {...s} />
      <path d="M19.5 34h21l-1.6 30H21Z" fill="#c7b8f2" />
      <path d="M18 18h24l-3 46H21Z" fill="none" {...s} />
      <path
        d="M60 38l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1Z"
        fill="#ffc93c"
        {...s}
      />
    </svg>
  );
}

export const mealIcons = [MorningMeal, SecondBreakfast, Lunch, Snack];
