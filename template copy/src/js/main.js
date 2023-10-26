//* declarations

const state = {
	scoreScreen: {
		playerScore: document.querySelector("#win"),
		aiScore: document.querySelector("#lose"),
	},
	score: {
		player: 0,
		ai: 0,
	},
	spriteCard: {
		image: document.querySelector("#card-image"),
		name: document.querySelector("#card-name"),
		type: document.querySelector("#card-type"),
	},
	fieldSide: {
		player: document.querySelector("#player-cards"),
		ai: document.querySelector("#ai-cards"),
	},
	fieldCards: {
		player: document.querySelector("#player-field-card"),
		ai: document.querySelector("#ai-field-card"),
	},
	actions: {
		button: document.querySelector("#next-duel"),
	},
};
import { cardsData } from "./cardsData.js";

//* functions

async function battle(playerCardId, aiCardId) {
	let duelResult = "DRAW!";
	let aiCardType = cardsData[aiCardId].type;

	if (cardsData[playerCardId].winOf === aiCardType) {
		duelResult = "WIN!";
		state.score.player++;
		await playAudio("win");
	}
	if (cardsData[playerCardId].LoseOf === aiCardType) {
		duelResult = "LOSE!";
		state.score.ai++;
		await playAudio("lose");
	}
	return duelResult;
}

async function getRandomCardId() {
	const random = Math.floor(Math.random() * cardsData.length);
	return cardsData[random].id;
}

async function setCardsField(playerCardId) {
	await removeAllCards();

	state.fieldCards.player.src = cardsData[playerCardId].img;
	let aiCardId = await getRandomCardId();
	state.fieldCards.ai.src = cardsData[aiCardId].img;

	let duelResult = await battle(playerCardId, aiCardId);
	await drawbutton(duelResult);
	await updateScore();
}

async function removeAllCards() {
	let aiCards = document.querySelector("#ai-cards").querySelectorAll("img");
	let playerCards = document.querySelector("#player-cards").querySelectorAll("img");
	aiCards.forEach((img) => img.remove());
	playerCards.forEach((img) => img.remove());
}

async function createCardImage(cardId, fieldSide) {
	const cardImage = document.createElement("img");
	cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
	cardImage.setAttribute("data-id", cardId);
	cardImage.classList.add("card");

	if (fieldSide === state.fieldSide.player) {
		cardImage.addEventListener("click", () => {
			setCardsField(cardImage.getAttribute("data-id"));
		});
		cardImage.addEventListener("mouseover", () => {
			previewCard(cardId);
		});
	}
	return cardImage;
}

async function previewCard(id) {
	state.spriteCard.image.src = cardsData[id].img;
	state.spriteCard.name.innerHTML = cardsData[id].name;
	state.spriteCard.type.innerHTML = `Attribute:${cardsData[id].type}`;
}

async function drawbutton(text) {
	state.actions.button.innerHTML = text;
	state.actions.button.classList.toggle("hidden");
}

async function drawCards(quantity, fieldSide) {
	for (let i = 0; i < quantity; i++) {
		const randomCardId = await getRandomCardId();
		const cardImage = await createCardImage(randomCardId, fieldSide);
		fieldSide.appendChild(cardImage);
	}
}

async function updateScore() {
	state.scoreScreen.playerScore.innerHTML = state.score.player;
	state.scoreScreen.aiScore.innerHTML = state.score.ai;
}

async function resetDuel() {
	state.actions.button.classList.toggle("hidden");
	state.fieldCards.player.src = "";
	state.fieldCards.ai.src = "";
	state.spriteCard.image.src = "./src/assets/icons/card-back.png";
	state.spriteCard.name.innerHTML = "Card name";
	state.spriteCard.type.innerHTML = "Type";

	init();
}

async function playAudio(status) {
	const audio = new Audio(`./src/assets/audios/${status}.wav`);
	audio.play();
	audio.volume = 0.2;
}

//* Initialize

function init() {
	drawCards(5, state.fieldSide.player);
	drawCards(5, state.fieldSide.ai);
}
init();

//* Events

state.actions.button.addEventListener("click", resetDuel);
