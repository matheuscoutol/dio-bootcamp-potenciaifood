const pathImg = "./src/assets/icons/";
//* Cards Array
export const cardsData = [
	{
		name: "Blue Eyes White Dragon",
		type: "Paper",
		img: `${pathImg}dragon.png`,
	},
	{
		name: "Dark Magician",
		type: "Rock",
		img: `${pathImg}magician.png`,
	},
	{
		name: "Exodia",
		type: "Scissors",
		img: `${pathImg}exodia.png`,
	},
];

//* id adding
for (let i = 0; i < cardsData.length; i++) {
	cardsData[i].id = i;
}
//* WinOf + LoseOf adding
cardsData.forEach((card) => {
	switch (card.type) {
		case "Paper":
			card.winOf = "Rock";
			card.LoseOf = "Scissors";
			break;
		case "Rock":
			card.winOf = "Scissors";
			card.LoseOf = "Paper";
			break;
		case "Scissors":
			card.winOf = "Paper";
			card.LoseOf = "Rock";
			break;
	}
});
