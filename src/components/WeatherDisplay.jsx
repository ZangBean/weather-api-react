function WeatherDisplay({ data, error }) {
  if (error || !data) {
    return (
      <div id="result">
        <p className="err">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const { main, weather, name, wind, visibility } = data;
  let km =
    visibility % 1000 === 0 ? `${visibility / 1000} km` : `${visibility} m`;

  return (
    <div id="result">
      <h3>Thời tiết tại {name}</h3>
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt="icon thời tiết"
        />
      </div>
      <table className="weather-table" border="1">
        <thead>
          <tr>
            <th>Thông tin</th>
            <th>Giá trị</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <i className="fa-solid fa-book"></i>
              <strong>Mô tả</strong>
            </td>
            <td>{weather[0].description}</td>
          </tr>
          <tr>
            <td>
              <i className="fa-solid fa-temperature-high"></i>
              <strong>Nhiệt độ</strong>
            </td>
            <td>{main.temp}°C</td>
          </tr>
          <tr>
            <td>
              <i className="fa-solid fa-droplet"></i>
              <strong>Độ ẩm</strong>
            </td>
            <td>{main.humidity}%</td>
          </tr>
          <tr>
            <td>
              <i className="fa-solid fa-wind"></i>
              <strong>Tốc độ gió</strong>
            </td>
            <td>{wind.speed} m/s</td>
          </tr>
          <tr>
            <td>
              <i className="fa-regular fa-eye"></i>
              <strong>Tầm nhìn xa</strong>
            </td>
            <td>{km}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WeatherDisplay;
