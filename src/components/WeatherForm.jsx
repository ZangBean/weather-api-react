function WeatherForm({ city, setCity, getWeather, isFetching }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      getWeather(city.trim());
    }
  };

  return (
    <>
      <input
        type="text"
        id="cityInput"
        autoComplete="off"
        placeholder="Nhập tên địa điểm"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="box"></div>
      <button onClick={() => getWeather(city.trim())} disabled={isFetching}>
        {isFetching ? "Đang tải..." : "Xem thời tiết"}
      </button>
    </>
  );
}

export default WeatherForm;
