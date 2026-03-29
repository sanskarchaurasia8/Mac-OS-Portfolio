import React, { useState, useEffect } from "react";

const DateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" }).toLowerCase();
    const month = date.toLocaleDateString("en-US", { month: "short" }).toLowerCase();
    const day = date.getDate();
    
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight
    const strHours = hours < 10 ? '0' + hours : hours;
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${weekday} ${month} ${day} ${strHours}:${minutes} ${ampm}`;
  };

  return (
    <div className="datetime">
      <p>{formatDate(currentTime)}</p>
    </div>
  );
};

export default DateTime;