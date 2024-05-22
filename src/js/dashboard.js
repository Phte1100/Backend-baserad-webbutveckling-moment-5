import './fetchBookings.js';
import './createBooking.js';
import './fetchMenu.js';
import './createMenu.js';
import './protected.js';
import { myFunction, showSnackbar, sanitizeInput } from './utils.js';

// Gör funktionerna tillgängliga globalt
window.myFunction = myFunction;
window.showSnackbar = showSnackbar;
window.sanitizeInput = sanitizeInput;