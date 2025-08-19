import { useState, useEffect } from "react";

export function useHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("weatherHistory")) || []);
  }, []);

  const saveHistory = (city) => {
    let newHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    const normalizeString = (str) =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    newHistory = newHistory.filter(
      (item) => normalizeString(item) !== normalizeString(city)
    );
    newHistory.unshift(city);
    if (newHistory.length > 10) newHistory.pop();
    localStorage.setItem("weatherHistory", JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const deleteHistory = (index) => {
    let newHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    newHistory.splice(index, 1);
    localStorage.setItem("weatherHistory", JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  return { history, saveHistory, deleteHistory };
}
