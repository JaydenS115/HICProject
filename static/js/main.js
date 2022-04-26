
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
});

// Toggleable buttons
const toggleButtons = {
	"hollowBookmark": "clickable fa-solid fa-bookmark solidBookmark toggleable",
	"solidBookmark": "clickable fa-regular fa-bookmark hollowBookmark toggleable",
	"pauseButton": "clickable fa-solid fa-play playButton toggleable",
	"playButton": "clickable fa-solid fa-pause pauseButton toggleable"
};
document.querySelectorAll(".toggleable").forEach((e) => {
	e.addEventListener("click", () => {
		e.classList.forEach((className) => {
			const classes = toggleButtons[className];
			if (classes != undefined)
			{
				e.className = classes;
			}
		});
	});
});

//
// Media player
//

const songs = {
	"amount": 3,
	"songList": [
		{"title": "Hey Jude", "artist": "The Beatles", "filename": "beatles.jpg"},
		{"title": "Gangnam Style", "artist": "Psy", "filename": "gangnamstyle.webp"},
		{"title": "Baby", "artist": "Justin Bieber", "filename": "justinbieber.jfif"}
	]
}

const pathToFiles = "../static/images/";

// Set the new song to play
// Takes a songlist entry from songs as an argument
function setNewSong(newSong)
{
	document.querySelectorAll(".stream").forEach((stream) => {
		stream.querySelector(".songTitle").innerHTML = newSong.title;
		stream.querySelector(".songArtist").innerHTML = newSong.artist;
		stream.querySelector(".songFile").src = pathToFiles + newSong.filename;
	});
}

let songIndex = 0;
// Find a new song to play
// Takes -1 if backwards, 1 if forwards
// Returns the songList entry of songs corresponding to the new index
function switchSong(whichWay)
{
	songIndex = (songIndex + whichWay) % songs.amount;
	// js modulo is lame and doesn't work for negative numbers
	if (songIndex == -1)
	{
		songIndex = songs.amount - 1;
	}
	return songs.songList[songIndex];
}

// Register song navigation events
document.querySelectorAll(".songBackward").forEach((e) => {
	e.addEventListener("click", () => {
		setNewSong(switchSong(-1));
	});
});
document.querySelectorAll(".songForward").forEach((e) => {
	e.addEventListener("click", () => {
		setNewSong(switchSong(1));
	});
});