const shoppingCart = JSON.parse(localStorage.getItem("localBackupCart")) || []

const fetchElectronicArticles = async () => {
    try {
        let resp = await fetch("./devices.json")
        if (!resp.ok) {
            throw new Error('Network response was not ok')
        }
        let data = await resp.json()
        return data
    } catch (error) {
        console.error('Error fetching electronic articles:', error)
    }
}


/* Items main format DOM */
const formatItemForEach = (TypeDevice) => {
    TypeDevice.forEach(el => {
        const productCard = `
        <div class="productCard">
          <img src='${el.img}'/>
          <h3>${el.name}</h3>
          <p>Price: ${el.price.toFixed(2)}$</p>
          <button class="AddButton" id-Number='${el.id}' img="${el.img}" name="${el.name}" price="${el.price}">Add to cart</button>
        </div>
      `
        main.insertAdjacentHTML('beforeend', productCard)
    })

    const addButtons = document.getElementsByClassName("AddButton")
    for (const button of addButtons) {
        button.addEventListener("click", addButtonDevice)
    }
}

/* Add button for all products in main */
const addButtonDevice = (event) => {
    const button = event.currentTarget
    const idNumber = button.getAttribute('id-Number')
    const image = button.getAttribute('img')
    const name = button.getAttribute('name')
    const price = parseFloat(button.getAttribute('price'))

    const existingDevice = shoppingCart.find(device => device.id === idNumber)

    if (!existingDevice) {
        shoppingCart.push({
            id: idNumber,
            image: image,
            name: name,
            price: price,
            quantity: 1
        });
    } else {
        existingDevice.quantity += 1
    }
    localStorage.setItem("localBackupCart", JSON.stringify(shoppingCart))
    updateCartDisplay()
    showTotalCart()
}

const updateCartDisplay = () => {
    const contentCart = document.getElementById('contentCart')
    contentCart.innerHTML = ''
    shoppingCart.forEach(el => {
        const devicesInCart = `
        <div class='devicesInCart'>
          <img src='${el.image}'/>
          <div class="textBox">
            <p>${el.name}</p>
            <p>Subtotal: ${(el.price * el.quantity).toFixed(2)}$</p>
            <p>Quantity: ${el.quantity}</p>
          </div>
          <div class='quitOrAddButtons'>
            <button id-Number='${el.id}' img="${el.image}" name="${el.name}" price="${el.price}" class="add-quit more">+</button>
            <button id-Number='${el.id}' img="${el.image}" name="${el.name}" price="${el.price}" class="add-quit less">-</button>
          </div>
        </div>
      `
        contentCart.insertAdjacentHTML('beforeend', devicesInCart)
        showTotalCart()
    })

    const addQuitButtons = document.getElementsByClassName("add-quit")
    for (const button of addQuitButtons) {
        button.addEventListener("click", button.classList.contains('more') ? moreDevices : lessDevices)
    }
}

/*More button por device in shopping cart */
const moreDevices = (event) => {
    const button = event.currentTarget
    const idNumber = button.getAttribute('id-Number')
    const existingDevice = shoppingCart.find(device => device.id === idNumber)

    if (existingDevice) 
        existingDevice.quantity += 1
        localStorage.setItem("localBackupCart", JSON.stringify(shoppingCart))
        updateCartDisplay()
        showTotalCart()
    }


/*More button for device in shopping cart */
const lessDevices = (event) => {
  const button = event.currentTarget
  const idNumber = button.getAttribute('id-Number')
  const existingDeviceIndex = shoppingCart.findIndex(device => device.id === idNumber)

  if (existingDeviceIndex !== -1) {
      const existingDevice = shoppingCart[existingDeviceIndex]

      if (existingDevice.quantity > 1) {
          existingDevice.quantity -= 1
      } else {
          shoppingCart.splice(existingDeviceIndex, 1)
      }

      localStorage.setItem("localBackupCart", JSON.stringify(shoppingCart))
      updateCartDisplay()
      showTotalCart()
  }
}

const cleanerCart = () => {
    localStorage.clear()
    shoppingCart.length = 0
    updateCartDisplay()
    showTotalCart()
}


/* Show all main devices */
const all = async () => {
    main.innerHTML = ''
    const electronicArticles = await fetchElectronicArticles()
    formatItemForEach(electronicArticles)
}
/* Filter for devices types */
const filterAndDisplayDevices = async (type) => {
    main.innerHTML = ''
    const electronicArticles = await fetchElectronicArticles()
    const filteredArticles = electronicArticles.filter(el => el.type === type)
    formatItemForEach(filteredArticles)
}
all()

const showTotalCart = () => {
    const total = document.getElementById('total')
    const totalPrice = shoppingCart.reduce((counter, object) => counter + object.price * object.quantity, 0)
    total.innerHTML = `<p>Total: ${totalPrice.toFixed(2)}</p>`
}

finishBuyAlert = () => {
    const existOrNot = shoppingCart.length > 0
    if (existOrNot) {
        swal({
            title: "SUCESSFUL PURCHASE",
            text: "Your purchase has been finalized!",
            icon: "success",
            button: "Done",
        });
        cleanerCart()
    }else{
        swal({
            title: "ATTENTION",
            text: "Your shopping cart is empty!",
            icon: "error",
            button: "Done",
          });
    }

}

/* Buttons of categories and shopping cart button */
document.getElementById('phones').addEventListener('click', () => filterAndDisplayDevices("phone"))
document.getElementById('tablets').addEventListener('click', () => filterAndDisplayDevices("tablet"))
document.getElementById('laptops').addEventListener('click', () => filterAndDisplayDevices("laptop"))
document.getElementById('cleaner').addEventListener('click', () => { main.innerHTML = ''; all(); })
document.getElementById('shoppingCartButton').addEventListener('click', () => { sidebar.classList.toggle('show'); updateCartDisplay(); })
document.getElementById('clearCart').addEventListener('click', cleanerCart)
document.getElementById('buy').addEventListener('click', () => finishBuyAlert())

    
  
