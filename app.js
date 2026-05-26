
const products = [
    
  { 
    id: 1, 
    name: "Premium A5 Notebook", 
    price: 450, 
    category: "Notebook", 
    img: "https://i.pinimg.com/736x/29/36/77/293677ee72d988b028860d50c811d102.jpg" 
  },
  { 
    id: 2, 
    name: "Gel Pen Set (10 Colors)", 
    price: 320, 
    category: "Pens", 
    img: "https://i.pinimg.com/736x/bc/c0/d7/bcc0d7355510393bc8d31a5a7cb903b2.jpg" 
  },
  { 
    id: 3, 
    name: "Colorful Sticky Notes", 
    price: 180, 
    category: "Notes", 
    img: "https://i.pinimg.com/1200x/3a/fa/06/3afa0607031b92f9834057d38a16d9a8.jpg" 
  },
  { 
    id: 4, 
    name: "24 Colors Art Markers", 
    price: 850, 
    category: "Art Supplies", 
    img: "https://i.pinimg.com/1200x/92/db/af/92dbafc7b2de379901d0aa68cfca26fa.jpg" 
  },
  { 
    id: 5, 
    name: "Hardcover Leather Diary", 
    price: 650, 
    category: "Notebook", 
    img: "https://i.pinimg.com/1200x/28/bf/a2/28bfa2c97c3adb49c23f65db5261da92.jpg" 
  },
  { 
    id: 6, 
    name: "Mechanical Pencil Set", 
    price: 280, 
    category: "Pens", 
    img: "https://i.pinimg.com/1200x/76/41/ac/7641aca17238eb18068a85eb3e0e5aa0.jpg" 
  },
  { 
    id: 7, 
    name: "File Folders Pack", 
    price: 220, 
    category: "Office", 
    img: "https://i.pinimg.com/1200x/c0/09/3b/c0093b067bca7cb0274e9c07c87864ca.jpg" 
  },
  { 
    id: 8, 
    name: "Pastel Highlighter Set", 
    price: 290, 
    category: "Pens", 
    img: "https://i.pinimg.com/1200x/f8/02/3e/f8023edaac9652e2d665ea576192bdab.jpg" 
  },
  {
      id: 9, 
    name: "Premium A5 Notebook", 
    price: 450, 
    category: "Notebook", 
    img: "https://i.pinimg.com/736x/29/36/77/293677ee72d988b028860d50c811d102.jpg" 
  },
  { 
    id: 10, 
    name: "Gel Pen Set (10 Colors)", 
    price: 320, 
    category: "Pens", 
    img: "https://i.pinimg.com/736x/bc/c0/d7/bcc0d7355510393bc8d31a5a7cb903b2.jpg" 
  },
  { 
    id: 11, 
    name: "Colorful Sticky Notes", 
    price: 180, 
    category: "Notes", 
    img: "https://i.pinimg.com/1200x/3a/fa/06/3afa0607031b92f9834057d38a16d9a8.jpg" 
  },
  { 
    id: 12, 
    name: "24 Colors Art Markers", 
    price: 850, 
    category: "Art Supplies", 
    img: "https://i.pinimg.com/1200x/92/db/af/92dbafc7b2de379901d0aa68cfca26fa.jpg" 
  },
  { 
    id: 13, 
    name: "Hardcover Leather Diary", 
    price: 650, 
    category: "Notebook", 
    img: "https://i.pinimg.com/1200x/28/bf/a2/28bfa2c97c3adb49c23f65db5261da92.jpg" 
  },
  { 
    id: 14, 
    name: "Mechanical Pencil Set", 
    price: 280, 
    category: "Pens", 
    img: "https://i.pinimg.com/1200x/76/41/ac/7641aca17238eb18068a85eb3e0e5aa0.jpg" 
  },
  { 
    id: 15, 
    name: "File Folders Pack", 
    price: 220, 
    category: "Office", 
    img: "https://i.pinimg.com/1200x/c0/09/3b/c0093b067bca7cb0274e9c07c87864ca.jpg" 
  },
  { 
    id: 16, 
    name: "Pastel Highlighter Set", 
    price: 290, 
    category: "Pens", 
    img: "https://i.pinimg.com/1200x/f8/02/3e/f8023edaac9652e2d665ea576192bdab.jpg" 
  }
];

let cart = [];

// Rest of the script remains same as previous
function loadProducts() {
  const container = document.getElementById('products');
  container.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.img}" class="w-full h-52 object-cover">
      <div class="p-4">
        <p class="text-sm text-gray-500">${product.category}</p>
        <h3 class="font-semibold text-lg mt-1">${product.name}</h3>
        <p class="text-purple-600 font-bold text-xl mt-3">Rs. ${product.price}</p>
        <button onclick="addToCart(${product.id})" 
          class="mt-4 w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition">
          Add to Cart
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  document.getElementById('cart-count').textContent = cart.length;
  alert(`${product.name} added to cart!`);
}

function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  sidebar.classList.toggle('hidden');
  updateCart();
}

function updateCart() {
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    container.innerHTML += `
      <div class="flex gap-4 mb-6 border-b pb-4">
        <img src="${item.img}" class="w-20 h-20 object-cover rounded-lg">
        <div class="flex-1">
          <h4 class="font-medium">${item.name}</h4>
          <p class="text-purple-600 font-semibold">Rs. ${item.price}</p>
          <button onclick="removeFromCart(${index})" class="text-red-500 text-sm mt-2 hover:underline">Remove</button>
        </div>
      </div>
    `;
  });

  document.getElementById('total-price').textContent = `Rs. ${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  document.getElementById('cart-count').textContent = cart.length;
  updateCart();
}

loadProducts();