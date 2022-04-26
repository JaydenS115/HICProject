
function switchScreen(newScreen)
{
	// Hide all screens
	(document.querySelectorAll(".screen")).forEach((screen) => {
		screen.style.display = "none";
	});

	// Reveal the screen we want to look at
	document.querySelector("#" + newScreen).style.display = "flex";
}
