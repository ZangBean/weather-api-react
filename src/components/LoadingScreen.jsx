function Loading() {
  return (
    <div id="loading-screen">
      <svg
        id="loading-icon"
        viewBox="0 0 64 64"
        fill="orange"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="32" cy="32" r="12" />
        <g stroke="orange" strokeWidth="4" strokeLinecap="round">
          <line x1="32" y1="6" x2="32" y2="16" />
          <line x1="32" y1="48" x2="32" y2="58" />
          <line x1="6" y1="32" x2="16" y2="32" />
          <line x1="48" y1="32" x2="58" y2="32" />
          <line x1="14" y1="14" x2="22" y2="22" />
          <line x1="42" y1="42" x2="50" y2="50" />
          <line x1="14" y1="50" x2="22" y2="42" />
          <line x1="42" y1="22" x2="50" y2="14" />
        </g>
      </svg>
      <div id="loading-text">Tra cứu thời tiết</div>
    </div>
  );
}

export default Loading;
