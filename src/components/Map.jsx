function Map({ lat, lon }) {
  if (!lat || !lon) return null;

  return (
    <div className="map">
      <iframe
        src={`https://www.google.com/maps?q=${lat},${lon}&z=5&output=embed`}
        width="800"
        height="600"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default Map;
