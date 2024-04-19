import React, { useReducer, useEffect, useRef } from "react";
import soundStart from "./sound/start.wav";
import soundStop from "./sound/stop.mp3";
import soundReset from "./sound/reset.wav";

function reducer(state, action) {
	switch (action.type) {
		case "start":
			return {
				...state,
				isRunning: true,
				StartTime: Date.now() - state.elapsedTime,
			};
			break;
		case "stop":
			return {
				...state,
				isRunning: false,
				elapsedTime: Date.now() - state.StartTime,
			};
			break;
		case "reset":
			return { isRunning: false, StartTime: 0, elapsedTime: 0 };
			break;
		case "tick":
			return {
				...state,
				elapsedTime: Date.now() - state.StartTime,
			};
			break;
	}
}

export default function Stopwatch() {
	const [state, dispatch] = useReducer(reducer, {
		isRunning: false,
		StartTime: 0,
		elapsedTime: 0,
	});

	const idRef = useRef(null);

	useEffect(() => {
		if (state.isRunning) {
			idRef.current = setInterval(() => {
				dispatch({ type: "tick" });
			}, 10);
		}

		return () => {
			clearInterval(idRef.current);
		};
	}, [state.isRunning]);

	function formatTime() {
		let hours = Math.floor((state.elapsedTime / (1000 * 60 * 60)) % 60);
		let minutes = Math.floor((state.elapsedTime / (1000 * 60)) % 60);
		let seconds = Math.floor((state.elapsedTime / 1000) % 60);
		let millisecs = Math.floor((state.elapsedTime % 1000) / 10);
		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
			2,
			"0"
		)}:${String(millisecs).padStart(2, "0")}`;
	}

	function handlerStart() {
		if (!state.isRunning) {
			dispatch({ type: "start" });
			new Audio(soundStart).play();
		}
	}

	function handlerStop() {
		if (state.isRunning) {
			dispatch({ type: "stop" });
			new Audio(soundStop).play();
		}
	}

	function handlerReset() {
		if (state.StartTime) {
			dispatch({ type: "reset" });
			new Audio(soundReset).play();
		}
	}

	return (
		<>
			<div className="wrapper">
				<div className="clock">{formatTime()}</div>
				<div className="controls">
					<button className="Button-start" onClick={handlerStart}>
						Start
					</button>
					<button className="Button-stop" onClick={handlerStop}>
						Stop
					</button>
					<button className="Button-reset" onClick={handlerReset}>
						Reset
					</button>
				</div>
			</div>
		</>
	);
}
