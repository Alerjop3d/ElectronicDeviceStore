const main = document.getElementById("main")
const sidebar = document.getElementById('sidebar')
const toggleButtonCart = document.getElementById('shoppingCartButton')
const ShowPhonesButton = document.getElementById("phones")
const ShowTabletsButton = document.getElementById("tablets")
const ShowLaptopsButton = document.getElementById("laptops")
const ClearButton = document.getElementById("cleaner")

const fetchElectronicArticles = async () => {
  let resp = await fetch("./devices.json")
  let data = await resp.json()
  return data
}
const shoppingCart = []

const formatItemForEach = (TypeDevice) => {
  TypeDevice.forEach(el => {
    const productCard = `
      <div class="productCard">
        <img src='${el.img}'/>
        <h3>${el.name}</h3>
        <p>Price:${el.price}$</p>
        <button class="AddButton">Add to cart</button>
      </div>
    `
    main.insertAdjacentHTML('beforeend', productCard)
  }
)

  const addButtons = document.getElementsByClassName("AddButton")
  const arraybutton = Array.from(addButtons)
  arraybutton.forEach(boton => {
  boton.addEventListener("click", addButtonDevice)
  })
}



const all = async() => {
  main.innerHTML = ''
  const electronicArticles = await fetchElectronicArticles()
  formatItemForEach(electronicArticles)
}

const searchPhones = async () => {
  main.innerHTML = ''
  const electronicArticles = await fetchElectronicArticles()
  const phones = electronicArticles.filter(el => el.type === "phone")
  formatItemForEach(phones);
};

const searchTablets = async () => {
  main.innerHTML = '';
  const electronicArticles = await fetchElectronicArticles()
  const tablets = electronicArticles.filter(el => el.type === "tablet")
  formatItemForEach(tablets);
};

const searchLaptops = async () => {
  main.innerHTML = '';
  const electronicArticles = await fetchElectronicArticles()
  const laptops = electronicArticles.filter(el => el.type === "laptop")
  formatItemForEach(laptops);
};

const clear = () => main.innerHTML = ''

const tooglefunc = () => {
  sidebar.classList.toggle('show')
}

toggleButtonCart.addEventListener("click", tooglefunc)
ShowPhonesButton.addEventListener("click", searchPhones)
ShowTabletsButton.addEventListener("click", searchTablets)
ShowLaptopsButton.addEventListener("click", searchLaptops)
ClearButton.addEventListener("click", all)

all() 

const addButtonDevice = (el) => {
  shoppingCart.push({
    image: el.img,
    name: el.name,
    price: el.price
  })
}






