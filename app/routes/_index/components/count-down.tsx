import { useState, useEffect } from "react";

const countDate = new Date("Sep 16, 2024 08:00:00").getTime();

export const CountDown = () => {
  const [dates, setDates] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const gap = countDate - now;

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const d = Math.floor(gap / day);
      const h = Math.floor((gap % day) / hour);
      const m = Math.floor((gap % hour) / minute);
      const s = Math.floor((gap % minute) / second);

      setDates(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(intervalId);
  });

  if (countDate < new Date().getTime()) {
    return <div className="h-10 md:h-32"></div>;
  }

  return (
    <div className="relative inline-block">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-white/10 blur opacity-60"></div>
      <div className="relative bg-black inline-flex gap-4 px-4 py-3 rounded-lg">
        <div className="flex flex-col gap-1.5 items-center text-indigo-700 font-medium">
          <span id="day" className="font-bold text-2xl leading-none">
            {dates}
          </span>
          <span className="text-xs leading-none text-neutral-400">DAYS</span>
        </div>
        <div className="flex flex-col gap-1.5 items-center text-indigo-700 font-medium">
          <span id="hour" className="font-bold text-2xl leading-none">
            {hours}
          </span>
          <span className="text-xs leading-none text-neutral-400">HRS</span>
        </div>
        <div className="flex flex-col gap-1.5 items-center text-indigo-700 font-medium">
          <span id="minute" className="font-bold text-2xl leading-none">
            {minutes}
          </span>
          <span className="text-xs leading-none text-neutral-400">MINS</span>
        </div>
        <div className="flex flex-col gap-1.5 items-center text-indigo-700 font-medium">
          <span id="second" className="font-bold text-2xl leading-none">
            {seconds}
          </span>
          <span className="text-xs leading-none text-neutral-400">SECS</span>
        </div>
      </div>
    </div>
  );
};
