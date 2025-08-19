function History({ history, onClick, onDelete }) {
  return (
    <>
      <div className="box"></div>
      <ul id="historyList">
        {history.map((city, index) => (
          <li key={index} onClick={() => onClick(city)}>
            <span>{city}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(index);
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </li>
        ))}
      </ul>
      <div className="box"></div>
    </>
  );
}

export default History;
