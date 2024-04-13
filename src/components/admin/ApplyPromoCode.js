// PromoTimer.js
import React, { useState, useEffect } from "react";
import moment from "moment";

const PromoTimer = () => {
  const [countdownTimeInSeconds, setCountdownTimeInSeconds] = useState(60);
  const [remainingTime, setRemainingTime] = useState(countdownTimeInSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const formattedTime = moment
    .utc(moment.duration(remainingTime, "seconds").asMilliseconds())
    .format("HH:mm:ss");

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setRemainingTime(countdownTimeInSeconds);
  };

  return (
    <div>
      <div>
        <label>Countdown Time (seconds):</label>
        <input
          type="number"
          value={countdownTimeInSeconds}
          onChange={(e) => setCountdownTimeInSeconds(parseInt(e.target.value))}
          disabled={isRunning}
        />
      </div>
      <div>Countdown: {formattedTime}</div>
      <button onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      <button onClick={stopTimer} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={resetTimer} disabled={isRunning}>
        Reset
      </button>
    </div>
  );
};

export default PromoTimer;


// import React, { useEffect, useState } from "react";
// import moment from "moment";

// const PromoTimer = ({ expirationDate }) => {
//   const calculateTimeRemaining = () => {
//     const now = moment();
//     const expirationDateObj = moment(expirationDate);

//     if (expirationDateObj > now) {
//       const duration = moment.duration(expirationDateObj.diff(now));
//       const days = duration.days();
//       const hours = duration.hours();
//       const minutes = duration.minutes();
//       const seconds = duration.seconds();

//       return `${days}d ${hours}h ${minutes}m ${seconds}s`;
//     }

//     return "00:00:00";
//     // return "Expired";
//   };

//   const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeRemaining(calculateTimeRemaining());
//     }, 1000);

//     return () => clearInterval(timer);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [expirationDate]);

//   return <span>{timeRemaining}</span>;
// };

// export default PromoTimer;


// import React, { useEffect, useState } from "react";

// const PromoTimer = ({ expirationDate }) => {
//   const calculateTimeRemaining = () => {
//     const now = new Date();
//     const expirationDateObj = new Date(expirationDate);

//     if (expirationDateObj > now) {
//       const timeDiff = expirationDateObj - now;
//       const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

//       return `${days}d ${hours}h ${minutes}m ${seconds}s`;
//     }

//     return "Expired";
//   };

//   const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeRemaining(calculateTimeRemaining());
//     }, 1000);

//     return () => clearInterval(timer);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [expirationDate]);

//   return <span>{timeRemaining}</span>;
// };

// export default PromoTimer;
