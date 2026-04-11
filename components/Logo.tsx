type LogoProps = {
  inverse?: boolean;
};

export function Logo({ inverse = false }: LogoProps) {
  const textColor = inverse ? "text-white" : "text-brand-green";

  return (
    <div className="flex items-center gap-2" aria-label="INECOBANK">
      {/* InecoBank mark: green square with white "i" */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        role="img"
        aria-hidden="true"
      >
        <rect
          width="32"
          height="32"
          rx="6"
          fill={inverse ? "rgba(255,255,255,0.2)" : "#0A7C3E"}
        />
        {/* dot */}
        <circle cx="16" cy="9" r="2.5" fill="white" />
        {/* stem */}
        <rect x="13.5" y="13.5" width="5" height="10" rx="1.5" fill="white" />
      </svg>
      <span className={`text-lg font-extrabold tracking-wide ${textColor}`}>
        INECOBANK
      </span>
    </div>
  );
}
