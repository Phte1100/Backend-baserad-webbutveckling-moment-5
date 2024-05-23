/*
 * Denna fil innehåller allmänna verktygsfunktioner som används i flera delar av applikationen.
 * Funktioner inkluderar att växla navigeringsmenyn, visa snackbars och sanera inmatade värden.
 */

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

// Funktion för att sanera inmatade värden för att undvika XSS-attacker
export function sanitizeInput(input) {
    return input ? input.replace(/(<([^>]+)>)/ig, '') : '';
}
