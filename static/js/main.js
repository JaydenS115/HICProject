
function switchScreen(newScreen)
{
	// Hide all screens
	(document.querySelectorAll(".screen")).forEach((screen) => {
		screen.style.display = "none";
	});

	// Reveal the screen we want to look at
	document.querySelector("#" + newScreen).style.display = "flex";
}

// Do init stuff
const clickSound = new Audio("../static/sounds/tap.mp3");

document.querySelectorAll(".clickable").forEach((e) => {
	e.addEventListener("click", () => {
		clickSound.play();
	});
});