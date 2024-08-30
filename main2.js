const shoppingCart = []

const fetchElectronicArticles = async () => {
    let resp = await fetch("./devices.json")
    let data = await resp.json()
    return data
};

const formatItemForEach = (TypeDevice) => {
    TypeDevice.forEach(el => {
        const productCard = `
        <div class="productCard">
          <img src='${el.img}'/>
          <h3>${el.name}</h3>
          <p>Price: ${el.price}$</p>
          <button class="AddButton" data-img="${el.img}" data-name="${el.name}" data-price="${el.price}">Add to cart</button>
        </div>
      `
        main.insertAdjacentHTML('beforeend', productCard)
    })

    const addButtons = document.getElementsByClassName("AddButton")
    for (const button of addButtons) {
        button.addEventListener("click", addButtonDevice)
    }
}

const addButtonDevice = (event) => {
    const button = event.currentTarget; // Obtiene el botón que fue clicado
    shoppingCart.push({
        image: button.getAttribute('data-img'),
        name: button.getAttribute('data-name'),
        price: button.getAttribute('data-price')
    });
    updateCartDisplay(); // Actualiza la visualización del carrito
};

const updateCartDisplay = () => {
    const contentCart = document.getElementById('contentCart');
    contentCart.innerHTML = ''; // Limpia el contenido del carrito
    shoppingCart.forEach(el => {
        const devicesInCart = `
        <div class='devicesInCart'>
          <img src='${el.image}'/>
          <div class="textBox">
            <p>${el.name}</p>
            <p>Subtotal: ${el.price}$</p>
          </div>
        </div>
      `;
        contentCart.insertAdjacentHTML('beforeend', devicesInCart);
    });
};

const filterAndDisplayDevices = async (type) => {
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
    const electronicArticles = await fetchElectronicArticles();
    const filteredArticles = electronicArticles.filter(el => el.type === type);
    formatItemForEach(filteredArticles);
};

/* Show all main devices */
const all = async () => {
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
    const electronicArticles = await fetchElectronicArticles();
    formatItemForEach(electronicArticles);
};
all();

/* Buttons of categories and shopping cart button */
document.getElementById('phones').addEventListener('click', () => filterAndDisplayDevices("phone"));
document.getElementById('tablets').addEventListener('click', () => filterAndDisplayDevices("tablet"));
document.getElementById('laptops').addEventListener('click', () => filterAndDisplayDevices("laptop"));
document.getElementById('cleaner').addEventListener('click', () => { main.innerHTML = ''; all(); });
document.getElementById('shoppingCartButton').addEventListener('click', () => { sidebar.classList.toggle('show'); });




    
  
