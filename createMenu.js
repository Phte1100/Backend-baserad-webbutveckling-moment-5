document.addEventListener('DOMContentLoaded', function() {
    fetchMenuItems();

    const menuForm = document.getElementById('menuForm');
    menuForm.addEventListener('submit', function(event) {
        event.preventDefault();
        createMenuItem();
    });
});

function createMenuItem() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login.');
        window.location.href = 'login.html';
        return;
    }

    const name = document.getElementById('name').value;
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
        if (!response.ok) {
            throw new Error('Failed to create menu item. Status: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Menu item created:', data);
        fetchMenuItems(); // Refresh menu items list
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
