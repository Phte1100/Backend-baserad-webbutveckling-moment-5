document.addEventListener('DOMContentLoaded', function() {
    const menuForm = document.getElementById('menuForm');
    menuForm.addEventListener('submit', function(event) {
        event.preventDefault();
        createMenuItem();
    });
});

function createMenuItem() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/src/html/login.html';
        return;
    }

    const name = document.getElementById('menuName').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;

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
        fetchMenuItems(); // Refresh menu items list
        clearMenuForm();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function updateMenu() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login.');
        window.location.href = 'login.html';
        return;
    }

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
        if (!response.ok) {
            throw new Error('Failed to update menu. Status: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Booking updated:', data);
        fetchBookings(); // Refresh bookings list
        clearForm();
        document.getElementById('updateButton').style.display = 'none';
        document.getElementById('menuItemForm').querySelector('button[type="submit"]').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function clearForm() {
    document.getElementById('menuName').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('category').value = '';
}


function deleteMenuItem(id) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login.');
        window.location.href = 'login.html';
        return;
    }

    fetch(`http://localhost:3001/api/menu/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete menuitem. Status: ' + response.status);
        }
        fetchBookings(); // Refresh bookings list
    })
    .catch(error => {
        console.error('Error:', error);
    });
}