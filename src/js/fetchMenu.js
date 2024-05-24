// fetchMenu.js

/*
 * Denna fil hanterar hämtning och visning av menyalternativ på webbplatsen.
 * Innehåller funktioner för att hämta menyalternativ från servern, visa dem som artiklar eller lista,
 * samt för att redigera och radera menyalternativ.
 */

import { showSnackbar } from './utils.js';

document.addEventListener('DOMContentLoaded', function() {
    const menuSection = document.getElementById('menuSection');
    const menuItemsList = document.getElementById('menuItemsList');

    if (menuSection || menuItemsList) {
        fetchMenuItems();
    } else {
        console.error('Neither "menuSection" nor "menuItemsList" found on this page.');
    }
});

let menuItems = [];

// Funktion för att hämta menyalternativ från servern
export function fetchMenuItems() {
    fetch('https://backend-baserad-webbutveckling-moment-5.onrender.com/api/menu')
    .then(response => {
        if (!response.ok) throw new Error(`Failed to fetch menu items. Status: ${response.status}`);
        return response.json();
    })
    .then(data => {
        menuItems = data;
        if (document.getElementById('menuSection')) {
            printMenuAsArticles(menuItems);
        }
        if (document.getElementById('menuItemsList')) {
            displayMenuItems(menuItems);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Funktion för att visa menyalternativ som artiklar för externa användare
function printMenuAsArticles(menuItems) {
    const menuSection = document.getElementById('menuSection');
    if (!menuSection) return; 

    menuSection.innerHTML = ''; 

    menuItems.forEach(item => {
        const article = document.createElement('article');
        article.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>${item.price} kr</p>
        `;
        menuSection.appendChild(article);
    });
}

// Funktion för att visa menyalternativ som lista med ikoner i admingränssnittet
function displayMenuItems(menuItems) {
    const menuItemsList = document.getElementById('menuItemsList');
    if (!menuItemsList) {
        console.error('Element with id "menuItemsList" not found');
        return;
    }
    menuItemsList.innerHTML = ''; 

    menuItems.forEach(menuItem => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${menuItem.name} - ${menuItem.description} - ${menuItem.price} kr - ${menuItem.category}
            <br>
            <span class="material-icons edit-menu-icon" data-menuid="${menuItem._id}">refresh</span>
            <span class="material-icons delete-menu-icon" data-menuid="${menuItem._id}">delete</span>
            <hr>
            `;
        menuItemsList.appendChild(li);
    });

    attachMenuEventListeners();
}

// Funktion för att lägga till händelselyssnare på redigerings- och raderingsikoner
function attachMenuEventListeners() {
    const deleteIcons = document.querySelectorAll('.delete-menu-icon');
    const editIcons = document.querySelectorAll('.edit-menu-icon');
    
    deleteIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const menuId = this.getAttribute('data-menuid');
            deleteMenuItem(menuId);
        });
    });

    editIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const menuId = this.getAttribute('data-menuid');
            editMenuItem(menuId);
        });
    });
}

// Hämtar ett menyalternativ från servern och fyller i formulärfält för redigering
function editMenuItem(id) {
    console.log(`Editing menu item ID: ${id}`);

    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login.');
        window.location.href = '/src/html/login.html';
        return;
    }

    fetch(`https://backend-baserad-webbutveckling-moment-5.onrender.com/api/menu/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to fetch menu item. Status: ' + response.status);
        return response.json();
    })
    .then(menuItem => {
        document.getElementById('menuId').value = menuItem._id;
        document.getElementById('menuName').value = menuItem.name;
        document.getElementById('description').value = menuItem.description;
        document.getElementById('price').value = menuItem.price;
        document.getElementById('category').value = menuItem.category;
        document.getElementById('updateMenuButton').style.display = 'block';
        document.getElementById('menuForm').querySelector('button[type="submit"]').style.display = 'none';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Skickar de uppdaterade värdena från formulärfält till servern för att uppdatera menyalternativet
export function updateMenuItem() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/src/html/login.html';
        return;
    }

    const id = document.getElementById('menuId').value;
    const name = sanitizeInput(document.getElementById('menuName').value);
    const description = sanitizeInput(document.getElementById('description').value);
    const price = sanitizeInput(document.getElementById('price').value);
    const category = sanitizeInput(document.getElementById('category').value);

    fetch(`https://backend-baserad-webbutveckling-moment-5.onrender.com/api/menu/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, description, price, category })
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to update menu item. Status: ' + response.status);
        return response.json();
    })
    .then(data => {
        console.log('Menu item updated:', data);
        fetchMenuItems();
        clearMenuForm();
        showSnackbar('Menyalternativ uppdaterad!');
    })
    .catch(error => {
        console.error('Error:', error);
        showSnackbar('Något gick fel. Försök igen.');
    });
}

// Rensa formuläret efter uppdatering eller skapande av menyalternativ
export function clearMenuForm() {
    document.getElementById('menuId').value = '';
    document.getElementById('menuName').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('category').value = '';
    document.getElementById('updateMenuButton').style.display = 'none';
    document.getElementById('menuForm').querySelector('button[type="submit"]').style.display = 'block';
}

// Raderar ett menyalternativ
function deleteMenuItem(id) {
    console.log(`Delete menu item ID: ${id}`);

    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login.');
        window.location.href = '/src/html/login.html';
        return;
    }

    fetch(`https://backend-baserad-webbutveckling-moment-5.onrender.com/api/menu/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to delete menu item. Status: ' + response.status);
        fetchMenuItems();
        showSnackbar('Menyalternativ raderad!');
    })
    .catch(error => {
        console.error('Error:', error);
        showSnackbar('Något gick fel. Försök igen.');
    });
}

// Funktion för att sanera inmatade värden för att undvika XSS-attacker
export function sanitizeInput(input) {
    return input ? input.replace(/(<([^>]+)>)/ig, '') : '';
}
