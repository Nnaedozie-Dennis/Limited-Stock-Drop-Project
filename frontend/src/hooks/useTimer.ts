import { useEffect, useState } from "react";

const useTimer = (expiresAt: string) => {
  const calculateTimeLeft = () => {
    const difference = new Date(expiresAt).getTime() - new Date().getTime();

    if (difference <= 0) {
      return {
        expired: true,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      expired: false,
      minutes: Math.floor(difference / 1000 / 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return timeLeft;
};

export default useTimer;
