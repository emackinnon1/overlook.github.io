import $ from 'jquery';
import dom from './dom.js';
// import state from './state';
// import User from './User';
import Manager from './Manager';
import Hotel from './Hotel';


$(window).on('load', retrieveAllData);
$('.sign-in').on('click', dom.handleUserLogin);
$('.book-room-button').on('click', dom.displayMakeBookingDashboard);
$('.search-rooms-button').on('click', dom.displayAvailableRoomsByDate);
$('.make-booking-dashboard').on('click', dom.submitBooking);
// $('.searchbar').on('keyup', dom.filterByRoomType);

export let manager, hotel, roomsData;

function retrieveAllData() {
	Promise.all([
			fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms").then(response => response.json()),
			fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings").then(response => response.json()),
			fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices").then(response => response.json()),
			fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users").then(response => response.json())
		])
		.then(data => makeHotel(data[0].rooms, data[1].bookings, data[2].roomServices, data[3].users))
		.catch(error => console.log(error));
}

function makeHotel(rooms, bookings, roomServices, users) {
	manager = new Manager(users)
	hotel = new Hotel(bookings, roomServices, rooms);
}

export function postBooking(post) {
	fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(post)
	})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(err => console.error(err))
}

function updateHotelBookings() {
	// fetch bookings
	//.then(updatestate)
}

