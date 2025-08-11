const products = [
  {
    name: 'HP Victus Gaming',
    price: '1.149€',
    discount: '-18%',
    image: './assets/hp-laptop.png',
    alt: 'Portátil HP Victus Gaming',
    category: 'portatil'
  },
  {
    name: 'AMD Ryzen 7 9800X3D',
    price: '629,90€',
    discount: '-16%',
    image: './assets/amd-ryzen.png',
    alt: 'Procesador AMD Ryzen 7 9800X3D',
    category: 'procesador'
  },
  {
    name: 'Apple iPad 2024',
    price: '379,99€',
    discount: 'Promoción',
    image: './assets/ipad.png',
    alt: 'Apple iPad 2024',
    category: 'tablet'
  },
  {
    name: 'ASUS GeForce RTX 4060',
    price: '319,99€',
    discount: '-20%',
    image: './assets/rtx-4060.png',
    alt: 'Tarjeta gráfica ASUS GeForce RTX 4060',
    category: 'grafica'
  },
  {
    name: 'ASUS VivoBook 15',
    price: '459€',
    discount: '-13%',
    image: './assets/asus-vivobook.png',
    alt: 'Portátil ASUS VivoBook 15',
    category: 'portatil'
  },
  {
    name: 'LG UHD TV 43',
    price: '289€',
    discount: '-42%',
    image: './assets/lg-tv.png',
    alt: 'Televisor LG UHD TV 43',
    category: 'televisor'
  },
  {
    name: 'Samsung Galaxy S22',
    price: '799€',
    discount: 'Promoción',
    image: './assets/samsung-galaxy.png',
    alt: 'Teléfono Samsung Galaxy S22',
    category: 'telefono'
  },
  {
    name: 'Dyson V11 Aspiradora',
    price: '599€',
    discount: '-25%',
    image: './assets/dyson-vacuum.png',
    alt: 'Aspiradora Dyson V11',
    category: 'aspiradora'
  },
  {
    name: 'Apple Watch Series 9',
    price: '429€',
    discount: '-10%',
    image: './assets/apple-watch.jpg',
    alt: 'Apple Watch Series 9',
    category: 'reloj'
  },
  {
    name: 'Sony WH-1000XM5',
    price: '299€',
    discount: '-15%',
    image: './assets/sony-wh.jpg',
    alt: 'Auriculares Sony WH-1000XM5',
    category: 'auriculares'
  },
  {
    name: 'Nintendo Switch OLED',
    price: '349,00€',
    discount: '-12%',
    image: './assets/nintendo-switch.webp',
    alt: 'Nintendo Switch OLED',
    category: 'consola'
  },
  {
    name: 'Logitech MX Master 3S',
    price: '109,99€',
    discount: '-18%',
    image: './assets/logitech-mx.webp',
    alt: 'Ratón Logitech MX Master 3S',
    category: 'raton'
  }
]


const productList = document.querySelector('.product-grid')
const categoryFilter = document.getElementById('category-filter')
const searchInput = document.getElementById('search-input')
const searchForm = document.querySelector('.search-bar')


const cartList = document.querySelector('.cart-items')
const cartCount = document.querySelector('.cart-count')


let currentCategory = 'all'
let currentSearch = ''


let cart = []


function loadCart() {
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    cart = JSON.parse(savedCart)
  }
}


function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart))
}


function renderCart() {
  if (!cartList) return

  cartList.innerHTML = ''

  if (cart.length === 0) {
    cartList.innerHTML = '<p>El carrito está vacío.</p>'
    if (cartCount) cartCount.textContent = '0'
    return
  }

  cart.forEach((item, index) => {
    const li = document.createElement('li')
    li.classList.add('cart-item')
    li.innerHTML = `
      <img src="${item.image}" alt="${item.alt}" />
      <div class="cart-item-info">
        <p>${item.name}</p>
        <p>${item.price}</p>
      </div>
      <button class="remove-btn" data-index="${index}">Eliminar</button>
    `
    cartList.appendChild(li)
  })

  if (cartCount) cartCount.textContent = cart.length.toString()


  const removeButtons = cartList.querySelectorAll('.remove-btn')
  removeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.index
      cart.splice(index, 1)
      saveCart()
      renderCart()
    })
  })
}


function renderProducts(filterCategory = 'all', searchQuery = '') {
  productList.innerHTML = ''

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filterCategory === 'all' || product.category === filterCategory
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  if (filteredProducts.length === 0) {
    const li = document.createElement('li')
    li.classList.add('no-results')
    li.innerHTML = `<p>No se han encontrado productos que coincidan con la búsqueda.</p>`
    productList.appendChild(li)
    return
  }

  filteredProducts.forEach((product) => {
    const li = document.createElement('li')
    li.innerHTML = `
      <article class="product">
        <a href="#" target="_blank" rel="noopener">
          <img src="${product.image}" alt="${product.alt}" />
          <h3>${product.name}</h3>
        </a>
        <p>${product.price}</p>
        <span class="discount">${product.discount}</span>
        <!-- Botón añadir al carrito -->
        <button class="add-to-cart-btn" data-name="${product.name}">Añadir al carrito</button>
      </article>
    `
    productList.appendChild(li)
  })


  const addButtons = productList.querySelectorAll('.add-to-cart-btn')
  addButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const productName = e.target.dataset.name
      const productToAdd = products.find((p) => p.name === productName)
      if (productToAdd) {
        cart.push(productToAdd)
        saveCart()
        renderCart()
      }
    })
  })
}


if (searchForm) {
  searchForm.addEventListener('submit', (e) => e.preventDefault())
}


if (categoryFilter) {
  categoryFilter.addEventListener('change', (e) => {
    currentCategory = e.target.value
    renderProducts(currentCategory, currentSearch)
  })
} else {
  console.warn('No se encontró el elemento con id category-filter')
}


if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value
    renderProducts(currentCategory, currentSearch)
  })
} else {
  console.warn('No se encontró el input con id search-input')
}


loadCart()
renderProducts()
renderCart()

