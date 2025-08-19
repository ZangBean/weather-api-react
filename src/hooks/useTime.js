import { useState, useEffect } from "react";

export function useTime() {
  const [localTime, setLocalTime] = useState(() => {
    const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    return new Date(utc + 25200 * 1000);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setLocalTime((prev) => {
        const newTime = new Date(prev);
        newTime.setSeconds(newTime.getSeconds() + 1);
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const updateTime = (newLocalTime) => {
    setLocalTime(new Date(newLocalTime));
  };

  return { localTime, updateTime };
}
