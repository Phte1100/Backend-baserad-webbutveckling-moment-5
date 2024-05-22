// utils.js
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    let currentSectionIndex = 0;

    // Hämta tidinputfältet
    const timeInput = document.getElementById('time');
    if (timeInput) {
        timeInput.addEventListener('input', function() {
            const timeValue = timeInput.value;
            const [hours, minutes] = timeValue.split(':').map(Number);

            if (minutes !== 0 && minutes !== 30) {
                if (minutes < 15) {
                    timeInput.value = `${hours.toString().padStart(2, '0')}:00`;
                } else if (minutes < 45) {
                    timeInput.value = `${hours.toString().padStart(2, '0')}:30`;
                } else {
                    const nextHour = (hours + 1) % 24;
                    timeInput.value = `${nextHour.toString().padStart(2, '0')}:00`;
                }
            }
        });
    }
});

// Funktion för att växla navigeringsmenyn på små skärmar
export function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// Funktion för att visa en snackbar med ett meddelande
export function showSnackbar(message) {
    var snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.className = "show";
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}

export function sanitizeInput(input) {
    return input ? input.replace(/(<([^>]+)>)/ig, '') : '';
}
