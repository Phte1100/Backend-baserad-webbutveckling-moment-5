import { fetchBookings, displayBookings, attachBookingEventListeners, deleteBooking, editBooking, updateBooking, clearForm } from './bookingService.js';

document.addEventListener('DOMContentLoaded', function() {
    fetchBookings();
});
