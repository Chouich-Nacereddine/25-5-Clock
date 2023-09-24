import React, { useState, useEffect, useRef } from "react";

const initialBreakLength = 5;
const initialSessionLength = 25;
const audioElement = new Audio("sound.mp3");

const App = () => {
  const [breakLength, setBreakLength] = useState(initialBreakLength);
  const [sessionLength, setSessionLength] = useState(initialSessionLength);
  const [timeLeft, setTimeLeft] = useState(initialSessionLength * 60);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [isRunning, setIsRunning] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (timeLeft === 0) {
      switchTimer();
      audioElement.play();
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  const startPauseTimer = () => {
    if (isRunning) {
      clearInterval(timer.current);
      setIsRunning(false);
    } else {
      timer.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    clearInterval(timer.current);
    setBreakLength(initialBreakLength);
    setSessionLength(initialSessionLength);
    setTimeLeft(initialSessionLength * 60);
    setTimerLabel("Session");
    setIsRunning(false);
    audioElement.pause();
    audioElement.currentTime = 0;
  };

  const incrementBreak = () => {
    if (!isRunning && breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const decrementBreak = () => {
    if (!isRunning && breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const incrementSession = () => {
    if (!isRunning && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const decrementSession = () => {
    if (!isRunning && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const tick = () => {
    setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
  };

  const switchTimer = () => {
    if (timerLabel === "Session") {
      setTimerLabel("Break");
      setTimeLeft(breakLength * 60);
    } else {
      setTimerLabel("Session");
      setTimeLeft(sessionLength * 60);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="text-[bisque] flex flex-col justify-center items-center h-screen w-full gap-6 overflow-hidden relative">
            <div className="flex w-[50%] justify-between text-4xl">
        <div>
          <div id="break-label" className=" font-bold">
            Break Length
          </div>
          <div className=" mt-6 flex w-full  justify-between">
            <button
              className="text-bold border-2 border-red-600 rounded-full w-16"
              id="break-decrement"
              onClick={decrementBreak}
            >
              -
            </button>
            <div className="" id="break-length">
              {breakLength}
            </div>
            <button
              className="text-bold border-2 border-blue-600 rounded-full w-16"
              id="break-increment"
              onClick={incrementBreak}
            >
              +
            </button>
          </div>
        </div>
        <div>
          <div id="break-label" className=" font-bold">
            Session Length
          </div>
          <div className="mt-6 flex w-full justify-between">
            <button
              className="text-bold border-2 border-red-600 rounded-full w-16"
              id="session-decrement"
              onClick={decrementSession}
            >
              -
            </button>
            <div id="session-length">{sessionLength}</div>
            <button
              className="text-bold border-2 border-blue-600 rounded-full w-16"
              id="session-increment"
              onClick={incrementSession}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="text-4xl font-bold flex flex-col justify-center items-center">
        <div id="timer-label" className="mb-6">
          {timerLabel}
        </div>
        <div id="time-left" className="mb-6">
          {formatTime(timeLeft)}
        </div>
        <div className="flex text-6xl">
          <button
            id="start_stop"
            onClick={startPauseTimer}
            className="flex w-40 justify-between"
          >
            <i className="bx bx-play text-blue-600 active:scale-75"></i>
            <i className="bx bx-stop text-red-600 active:scale-75"></i>
          </button>
          <button id="reset" className=" pl-10" onClick={resetTimer}>
            <i className="bx bx-reset text-green-600 active:scale-75"></i>
          </button>
        </div>
        <audio id="beep" src={audioElement}></audio>
      </div>
    </div>
  );
};

export default App;
