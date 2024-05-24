/*
 * Denna fil hanterar skapande av nya menyalternativ på webbplatsen.
 * Innehåller funktioner för att skapa nya menyalternativ och sanera inmatade värden.
 * Funktionen fetchMenuItems importeras från fetchMenu.js för att uppdatera menyalternativen efter skapande.
 */

import { fetchMenuItems, sanitizeInput, clearMenuForm, updateMenuItem } from './fetchMenu.js';
import { showSnackbar } from './utils.js';

// När sidan är laddad, lägg till händelselyssnare på formuläret för att skapa menyalternativ
document.addEventListener('DOMContentLoaded', function() {
    const menuForm = document.getElementById('menuForm');
    menuForm.addEventListener('submit', function(event) {
        event.preventDefault();
        createMenuItem();
    });

    const updateButton = document.getElementById('updateMenuButton');
    if (updateButton) {
        updateButton.addEventListener('click', function() {
            updateMenuItem();
        });
    }
});

// Funktion för att skapa ett nytt menyalternativ
function createMenuItem() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/src/html/login.html';
        return;
    }

    const name = sanitizeInput(document.getElementById('menuName').value);
    const description = sanitizeInput(document.getElementById('description').value);
    const price = sanitizeInput(document.getElementById('price').value);
    const category = sanitizeInput(document.getElementById('category').value);

    fetch('http://localhost:3001/api/menu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, description, price, category })
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to create menu item. Status: ' + response.status);
        return response.json();
    })
    .then(data => {
        console.log('Menu item created:', data);
        fetchMenuItems(); // Uppdatera menyalternativen
        clearMenuForm(); // Rensa formuläret
        showSnackbar('Menyalternativ skapat!');
    })
    .catch(error => {
        console.error('Error:', error);
        showSnackbar('Något gick fel. Försök igen.');
    });
}
