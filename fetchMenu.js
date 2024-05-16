document.addEventListener('DOMContentLoaded', function() {
    fetchMenuItems();
});

function fetchMenuItems() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login.');
        window.location.href = 'index.html';
        return;
    }

    fetch('http://localhost:3001/api/menu', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch menu items. Status: ${response.status}`);
        }
        return response.json();
    })
    .then(menuItems => {
        displayMenuItems(menuItems);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayMenuItems(menuItems) {
    const menuItemsList = document.getElementById('menuItemsList');
    menuItemsList.innerHTML = ''; // Clear the list before adding new items

    menuItems.forEach(menuItem => {
        const article = document.createElement('article');
        
        const name = document.createElement('h2');
        name.textContent = menuItem.name;
        article.appendChild(name);
        
        const description = document.createElement('p');
        description.textContent = menuItem.description;
        article.appendChild(description);
        
        const price = document.createElement('p');
        price.textContent = `Pris: ${menuItem.price} kr`;
        article.appendChild(price);
        
        const category = document.createElement('p');
        category.textContent = `Kategori: ${menuItem.category}`;
        article.appendChild(category);

        menuItemsList.appendChild(article);
    });
}
