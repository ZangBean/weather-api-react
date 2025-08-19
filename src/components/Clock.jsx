function Clock({ localTime }) {
  if (!localTime) return null;

  const dateStr = localTime.toLocaleDateString("vi-VN");
  const timeStr = localTime.toLocaleTimeString("vi-VN", { hour12: false });

  return (
    <div id="clock">
      <span id="date">Ngày: {dateStr} - </span>
      <span id="time">{timeStr}</span>
    </div>
  );
}

export default Clock;
