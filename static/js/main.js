//
// SCREEN NAVIGATION
//

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
// MEDIA PLAYER
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

//
// BLUETOOTH
//

let bluetoothConnected = true;
// Simulate Bluetooth connecting/disconnecting
function toggleBluetooth()
{
	const bluetoothFeedback = document.querySelector("#bluetoothFeedback");
	let toggleButton = document.querySelector("#btToggle");
	if (bluetoothConnected)
	{
		bluetoothFeedback.innerHTML = "No device connected";
		toggleButton.innerHTML = "Connect";
		bluetoothConnected = false;
	}
	else
	{
		bluetoothFeedback.innerHTML = "Connecting . . .";
		setTimeout(() => {
			bluetoothFeedback.innerHTML = "Connected - Jon's Iphone";
			toggleButton.innerHTML = "Disconnect";
			bluetoothConnected = true;
		}, 3000);
	}
}
function turnoffBluetooth()
{
	bluetoothConnected = true;
	toggleBluetooth();
}
function turnonBluetooth()
{
	bluetoothConnected = false;
	toggleBluetooth();
}

//
// PROFILES
//

const newUsername = "<input type='text' id='newName' class='goodInput clickable'>" +
"<button type='button' class='settingsButton goodWhite mainFont clickable'" +
" onclick='submitProfileEdit(this)'>Submit</button>";

// Delete a profile from the list
function deleteProfile(profileButton)
{
	profileButton.parentNode.remove();
}

// Edit the name of a profile
function editProfile(profileButton)
{
	let user = profileButton.parentNode.querySelector(".user");
	const name = user.innerHTML;
	user.innerHTML = newUsername;
	profileButton.parentNode.querySelector("#newName").value = name;
	updateClicking(profileButton.parentNode);
}

// Utility function used for submitting profile name changes
function submitProfileEdit(profileName)
{
	const newName = profileName.parentNode.querySelector("#newName").value;
	profileName.parentNode.innerHTML = newName;
}

// Create a new profile
function newProfile()
{
	let newProfile = document.createElement("div");
	newProfile.classList.add("settingRow");
	newProfile.innerHTML = '<div class="brightBlue settingName user">' + newUsername + '</div>' +
	'<button type="button" class="settingsButton goodWhite mainFont clickable" onclick="deleteProfile(this)">Delete</button>' +
	'<button type="button" class="settingsButton goodWhite mainFont clickable" onclick="editProfile(this)">Edit</button>';
	let profileList = document.querySelector("#profileList");
	profileList.appendChild(newProfile);
	updateClicking(profileList);
}

//
// UTILITY FUNCTIONS
//

// Update new elements to have the clickable class
// Provide the lowest necessary parent as an argument
function updateClicking(node)
{
	console.log(node);
	node.querySelectorAll(".clickable").forEach((e) => {
		e.addEventListener("click", () => {
			clickSound.play();
		});
	});
}

//
// Do init stuff
//

// Click sound effect
const clickSound = new Audio("../static/sounds/tap.mp3");
updateClicking(document);

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
	"playButton": "clickable fa-solid fa-pause pauseButton toggleable",
	"volumeOnButton": "clickable fa fa-volume-off volumeOffButton toggleable",
	"volumeOffButton": "clickable fa fa-volume-up volumeOnButton toggleable"
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

var modal = document.getElementById("myModal");

var btns = document.getElementsByClassName("myBtn");

var span = document.getElementsByClassName("close")[0];


for(var i = 0; i < btns.length; ++i){
	btns[i].onclick = function() {
		modal.style.display = "block";
	}
}

span.onclick = function() {
modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
	modal.style.display = "none";
}
}