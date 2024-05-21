document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('menuItemsList') || document.getElementById('menuSection')) {
        fetchMenuItems();
    }

    const updateButton = document.getElementById('updateMenuButton');
    if (updateButton) {
        updateButton.addEventListener('click', function() {
            updateMenuItem();
        });
    }
});

function fetchMenuItems() {
    fetch('http://localhost:3001/api/menu')
        .then(response => {
            if (!response.ok) throw new Error(`Failed to fetch menu items. Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            displayMenuItems(data);
            printMenuAsArticles(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayMenuItems(menuItems) {
    const menuItemsList = document.getElementById('menuItemsList');
    if (!menuItemsList) return; // Exit if the element does not exist

    menuItemsList.innerHTML = ''; // Clear existing menu items

    menuItems.forEach(menuItem => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${menuItem.name} - ${menuItem.description} - ${menuItem.price} kr - ${menuItem.category}
            <button type="button" class="btn edit-menu-btn" data-menuid="${menuItem._id}">Redigera</button>
            <button type="button" class="btn delete-menu-btn" data-menuid="${menuItem._id}">Radera</button>
        `;
        menuItemsList.appendChild(li);
    });

    attachMenuEventListeners();
}

function printMenuAsArticles(menuItems) {
    const menuSection = document.getElementById('menuSection');
    if (!menuSection) return; // Exit if the element does not exist

    menuSection.innerHTML = ''; // Clear previous content

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

function attachMenuEventListeners() {
    const deleteButtons = document.querySelectorAll('.delete-menu-btn');
    const editButtons = document.querySelectorAll('.edit-menu-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuId = this.getAttribute('data-menuid');
            deleteMenuItem(menuId);
        });
    });

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuId = this.getAttribute('data-menuid');
            editMenuItem(menuId);
        });
    });
}

function editMenuItem(id) {
    console.log(`Editing menu item ID: ${id}`);

    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login.');
        window.location.href = '/src/html/login.html';
        return;
    }

    fetch(`http://localhost:3001/api/menu/${id}`, {
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

function updateMenuItem() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/src/html/login.html';
        return;
    }
    const id = document.getElementById('menuId').value;
    const name = document.getElementById('menuName').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;

    fetch(`http://localhost:3001/api/menu/${id}`, {
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
            fetchMenuItems(); // Refresh menu items list
            clearMenuForm();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function clearMenuForm() {
    document.getElementById('menuId').value = '';
    document.getElementById('menuName').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('category').value = '';
    document.getElementById('updateMenuButton').style.display = 'none';
    document.getElementById('menuForm').querySelector('button[type="submit"]').style.display = 'block';
}

function deleteMenuItem(id) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login.');
        window.location.href = '/src/html/login.html';
        return;
    }

    fetch(`http://localhost:3001/api/menu/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to delete menu item. Status: ' + response.status);
            fetchMenuItems(); // Refresh menu items list
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
