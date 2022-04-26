
function switchScreen(newScreen)
{
	// Hide all screens
	(document.querySelectorAll(".screen")).forEach((screen) => {
		screen.style.display = "none";
	});

	// Reveal the screen we want to look at
	document.querySelector("#" + newScreen).style.display = "flex";
}

//
// Do init stuff
//

// Click sound effect
const clickSound = new Audio("../static/sounds/tap.mp3");
document.querySelectorAll(".clickable").forEach((e) => {
	e.addEventListener("click", () => {
		clickSound.play();
	});
});

// Sound adjustor
const soundLocatorBox = document.querySelector("#soundLocatorBox");
const carImage = document.querySelector("#carImage");
let soundMover = document.querySelector("#soundMover");
carImage.addEventListener("click", (e) => {
	const x = parseInt(e.clientX - soundLocatorBox.getBoundingClientRect().left - 15);
	const y = parseInt(e.clientY - soundLocatorBox.getBoundingClientRect().top - 15);
	soundMover.style.position = "absolute";
	soundMover.style.left = x.toString() + "px";
	soundMover.style.top = y.toString() + "px";
	console.log(x, y);
});