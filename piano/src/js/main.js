// Declarations
const pianoKeys = document.querySelectorAll(".key");
const keyCommands = [];
let audio = new Audio("src/tunes/a.wav");
const volumeSlider = document.querySelector("#volume-slider input");
const keysCheck = document.querySelector("#keys-check input");

// Functions
const playTune = (key) => {
	audio.src = `src/tunes/${key}.wav`;
	audio.play();
	const activeKey = document.querySelector(`[data-key="${key}"]`);
	activeKey.classList.add("active");
	setTimeout(() => {
		activeKey.classList.remove("active");
	}, 150);
};

// Events
pianoKeys.forEach((key) => {
	keyCommands.push(key.dataset.key);
	key.addEventListener("click", () => playTune(key.dataset.key));
});

document.addEventListener("keydown", (e) => {
	if (keyCommands.includes(e.key)) {
		playTune(e.key);
	}
});

keysCheck.addEventListener("click", () => {
	pianoKeys.forEach((key) => key.classList.toggle("hidden"));
});

volumeSlider.addEventListener("input", (e) => {
	audio.volume = e.target.value;
});
