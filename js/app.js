/* Treehouse FSJS Techdegree
 * Project 5 - OOP Game App
 * app.js 
 * Programmed By Brian Kidd*/
/*This object is used for setting state abbreviations*/
const states = {
	alabama: 'AL',
	alaska: 'AK',
	arizona: 'AZ',
	arkansas: 'AR',
	california: 'CA',
	colorado: 'CO',
	connecticut: 'CT',
	delaware: 'DE',
	florida: 'FL',
	georgia: 'GA',
	hawaii: 'HI',
	idaho: 'ID',
	illinois: 'IL',
	indiana: 'IN',
	iowa: 'IA',
	kansas: 'KS',
	kentucky: 'KY',
	louisiana: 'LA',
	maine: 'ME',
	maryland: 'MD',
	massachusetts: 'MA',
	michigan: 'MI',
	minnesota: 'MN',
	mississippi: 'MS',
	missouri: 'MO',
	montana: 'MT',
	nebraska: 'NE',
	nevada: 'NV',
	'new hampshire': 'NH',
	"new jersey": 'NJ',
	"new mexico": 'NM',
	"new york": 'NY',
	"north carolina": ' NC',
	"north dakota": 'ND',
	ohio: 'OH',
	oklahoma: 'OK',
	oregon: 'OR',
	pennsylvania: 'PA',
	"rhode island": 'RI',
	"south carolina": 'SC',
	"south dakota": 'SD',
	tennessee: 'TN',
	texas: 'TX',
	utah: 'UT',
	vermont: 'VT',
	virginia: 'VA',
	washington: 'WA',
	"west virginia": 'WV',
	wisconsin: 'WI',
	wyoming: 'WY'
}
//The api url
const url = 'https://randomuser.me/api/?results=12&nat=us';
/************Add Search Field*******************/
const searchContainer = document.querySelector(".search-container");
searchContainer.innerHTML = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
</form>`;
const searchField = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
const profileCards = gallery.children;
const cards = document.querySelectorAll(".card");
console.log(cards.length);
/*These DOM elements will be used int he to display a no results indication if no profiles are found in search field */
const headerTextContainer = document.querySelector(".header-text-container");
const noResultsHeader = document.createElement("h3");
noResultsHeader.setAttribute("id", "noResults");
headerTextContainer.appendChild(noResultsHeader);
const noResults = document.querySelector("#noResults");
//Fetch functions
function fetchData(url) {
	return fetch(url).then(res => res.json())
}
fetchData(url).then(data => {
	createProfileCards(data.results);
	displayModal(data.results);
});
/*function places the 12 random profile cards to the DOM*/
function createProfileCards(data) {
	const gallery = document.getElementById('gallery');
	data.forEach(data => {
		const galleryElements = `<div class="card">
                               <div class="card-img-container">
                                   <img class="card-img" src="${data.picture.large}" alt="profile picture">
                               </div>
                               <div class="card-info-container">
                                   <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
                                   <p class="card-text">${data.email}</p>
                                   <p class="card-text cap">${data.location.city}</p>
                               </div>
                           </div>`;
		gallery.innerHTML += galleryElements;
	});
}
/*Function to create modal window*/
function createModal(profile, dataResults) { //data results are all of the twelve randomly selected user profiles from the api request
	const body = document.querySelector('body');
	const modalWindow = document.createElement('DIV');
	if (document.querySelector('.modal-container')) {
		document.querySelector('.modal-container').remove();
	}
	modalWindow.className = 'modal-container';
	modalWindow.innerHTML = `<div class="modal">
                                <button type="button" id="modal-close-btn" class="modal-close-btn">X</button>
                                <div class="modal-info-container">
                                    <img class="modal-img" src='${profile.picture.large}' alt="profile picture">
                                    <h3 id="name" class="modal-name cap">${profile.name.first} ${profile.name.last}</h3>
                                    <p class="modal-text">${profile.email}</p>
                                    <p class="modal-text cap">${profile.location.city}</p>
                                    <hr>
                                    <p class="modal-text">${profile.cell}</p>
                                    <p class="modal-text">${capLetr(profile.location.street)} ${capLetr(profile.location.city)}, ${stateAbbreviation(profile.location.state)} ${profile.location.postcode}</p>
                                    <p class="modal-text">Birthday: ${formatDOB(profile.dob.date)}</p>
                                </div>
                           </div>
                           <div class="modal-btn-container">
                                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                <button type="button" id="modal-next" class="modal-next btn">Next</button>
                           </div>
                        `;
	body.appendChild(modalWindow);
	// event click to close modalWindow
	closeModalBtn();
	scrollModal(profile, dataResults);
}
//This function scrolls through the different profiles in modal view
function scrollModal(profile, dataResults) {
	const indvProfile = document.querySelectorAll(".card");
	const totalProfiles = indvProfile.length;
	let profileIndex = dataResults.indexOf(profile);
	const modalNext = document.querySelector("#modal-next");
	const modalPrev = document.querySelector('#modal-prev');
	//Event listeners to scroll to next or previous profile modal
	modalNext.addEventListener('click', () => {
		if ((profileIndex + 1) < totalProfiles) {
			createModal(dataResults[profileIndex + 1], dataResults);
		} else {
			createModal(dataResults[0], dataResults); //This resets the modal to 0 after scrolling through end of modals
		}
	});
	modalPrev.addEventListener('click', () => {
		if (dataResults[profileIndex - 1]) createModal(dataResults[profileIndex - 1], dataResults);
		else createModal(dataResults[totalProfiles - 1], dataResults);
	});
}
/**
	//HELPER FUNCTIONS
	**/
/*this function capitalizes the first letter of a word */
function capLetr(string) {
	//return string.charAt(0).toUpperCase() + string.slice(1);
	return string = string.toLowerCase().split(' ').map((words) => words.charAt(0).toUpperCase() + words.substring(1)).join(' ');
}
/*function to format the date of birth of the employee*/
function formatDOB(birthday) {
	let birthdayDateElements = birthday.split('-');
	let birthdayYear = birthdayDateElements[0].substring(2, 4);
	let birthdayMonth = birthdayDateElements[1];
	let birthdayDay = birthdayDateElements[2].substring(0, 2);
	let dob = `${birthdayMonth}/${birthdayDay}/${birthdayYear}`
	return dob;
}
//Function to set the state abbeviations in the modal profile view
function stateAbbreviation(state) {
	let stateAbr = states[state];
	return stateAbr;
}
/**
//Search Functionality 
**/
//function to filter names in the search field
function filterByName(event) {
	event.preventDefault();
	let noResultsArray = [];
	let nameSearch = searchField.value.toLowerCase();
	for (let i = 0; i < profileCards.length; i++) {
		let profileName = profileCards[i].innerText.toLowerCase();
		if (profileName.includes(nameSearch)) {
			profileCards[i].style.display = "flex";
			noResults.innerText = " ";
		} else {
			profileCards[i].style.display = "none";
			noResultsArray.push(profileCards[i]);
			console.log("no Results Array" + noResultsArray);	
		}
		if (noResultsArray.length === 12){
			noResults.innerHTML = "no results found";
		}
	}
}
/**
//Event Listeners
**/
// function to open modal window
function displayModal(dataResults) {
	const employeeCards = document.querySelectorAll(".card")
	for (let i = 0; i < employeeCards.length; i++) {
		employeeCards[i].addEventListener('click', () => {
			let clickedProfile = dataResults[i];
			createModal(clickedProfile, dataResults); // dataResults are all twelve randomly selected profiles
			scrollModal(clickedProfile, dataResults);
		});
	}
}
//This function closes an open modal upon a click of the close modal button or the modal container
function closeModalBtn() {
	const modalContainer = document.querySelector(".modal-container");
	const closeModalButton = document.querySelector('#modal-close-btn');
	modalContainer.addEventListener('click', event => {
		if (event.target === modalContainer || event.target === closeModalButton) modalContainer.remove();
	});
}
//a submission event listener to search for names entered in the search field
searchContainer.addEventListener('submit', function(event) {
	filterByName(event);
});
//a keuUp() event listener method to find results in real time as they are entered into the search field
searchContainer.addEventListener('keyup', function(event) {
	filterByName(event);
});