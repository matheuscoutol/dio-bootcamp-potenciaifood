const emojis = [
	"🐱",
	"🐱",
	"🐶",
	"🐶",
	"🐵",
	"🐵",
	"🐮",
	"🐮",
	"🐷",
	"🐷",
	"🐻",
	"🐻",
	"🦝",
	"🦝",
	"🦊",
	"🦊",
];

let openCards = [];

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < emojis.length; i++) {
	let item = document.createElement("div");
	item.classList.add("item");
	item.innerHTML = shuffleEmojis[i];
	document.querySelector(".game").appendChild(item);
	item.onclick = handleCLick;
}

function handleCLick() {
	if (openCards.length < 2) {
		this.classList.add("open");
		openCards.push(this);
	}
	if (openCards.length == 2) {
		setTimeout(checkMatch, 500);
	}
}

function checkMatch() {
	if (openCards[0].innerHTML === openCards[1].innerHTML) {
		openCards[0].classList.add("match");
		openCards[1].classList.add("match");
	} else {
		openCards[0].classList.remove("open");
		openCards[1].classList.remove("open");
	}
	openCards = [];

	if (document.querySelectorAll(".match").length === emojis.length) {
		alert("Você venceu!");
	}
}
