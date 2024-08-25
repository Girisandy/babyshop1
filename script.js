// js for**********togglemeu **********when bar and cross bar:


// document.getElementById('bar').addEventListener('click', function() {
//     var menu = document.getElementById('navbar');
//     var icon = document.getElementById('baricon');
    
//     if (menu.style.display === 'flex') {
//         menu.style.display = 'none';
//         icon.classList.remove('fa-times');
//         icon.classList.add('fa-bars');
//     } else {
//         menu.style.display = 'flex';
//         icon.classList.remove('fa-bars');
//         icon.classList.add('fa-times');
//     }
// });


// js for ________using only bar not cross mark:

document.getElementById('bar').addEventListener('click', function() {
    var menu = document.getElementById('navbar');
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
    }
});


/**********************without rotate home section***************************/ 
// let currentIndex = 0;
// const sections = document.querySelectorAll('.home1');
// const prevBtn = document.getElementById('prevBtn');
// const nextBtn = document.getElementById('nextBtn');

// function showSection(index) {
//   const offset = -index * 100;
//   sections.forEach(section => {
//     section.style.transform = `translateX(${offset}%)`;
//   });
// }

// prevBtn.addEventListener('click', () => {
//   currentIndex = (currentIndex - 1 + sections.length) % sections.length;
//   showSection(currentIndex);
// });

// nextBtn.addEventListener('click', () => {
//   currentIndex = (currentIndex + 1) % sections.length;
//   showSection(currentIndex);
// });

// // Initially show the first section
// showSection(currentIndex);


/*******************with rotate image auto move default images also******/
let currentIndex = 0;
const sections = document.querySelectorAll('.home1');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideIntervalTime = 10000; // 2 seconds
let slideInterval;

// Function to show the section based on the current index
function showSection(index) {
  const offset = -index * 100; // Calculate the offset for the transform
  sections.forEach(section => {
    section.style.transform = `translateX(${offset}%)`;
    section.style.transition = 'transform 0.02s ease-in-out'; // Smooth transition
  });
}

// Function to move to the next section automatically
function autoMove() {
  currentIndex = (currentIndex + 1) % sections.length; // Increment the index and wrap around
  showSection(currentIndex); // Show the next section
}

// Start the auto-moving slider
function startAutoSlide() {
  slideInterval = setInterval(autoMove, slideIntervalTime); // Set the interval for auto sliding
}

// Event listener for the Prev button
prevBtn.addEventListener('click', () => {
  clearInterval(slideInterval); // Stop auto slide when button is clicked
  currentIndex = (currentIndex - 1 + sections.length) % sections.length; // Decrement the index and wrap around
  showSection(currentIndex); // Show the previous section
  startAutoSlide(); // Restart auto slide after manual change
});

// Event listener for the Next button
nextBtn.addEventListener('click', () => {
  clearInterval(slideInterval); // Stop auto slide when button is clicked
  currentIndex = (currentIndex + 1) % sections.length; // Increment the index and wrap around
  showSection(currentIndex); // Show the next section
  startAutoSlide(); // Restart auto slide after manual change
});

// Initially show the first section and start auto slide
showSection(currentIndex);
startAutoSlide();

/****************product section******************/ 

// document.addEventListener('DOMContentLoaded', function() {
//     const slider = document.querySelector('.slider .product2');
//     const prevButton = document.querySelector('.prev');
//     const nextButton = document.querySelector('.next');
//     const products = document.querySelectorAll('.product1');
//     const productWidth = products[0].clientWidth;
//     let currentIndex = 0;

//     nextButton.addEventListener('click', function() {
//         if (currentIndex < products.length - 1) {
//             currentIndex++;
//         } else {
//             currentIndex = 0; // Reset to the first slide
//         }
//         slider.style.transition = currentIndex === 0 ? 'none' : 'transform 0.5s ease-in-out';
//         slider.style.transform = `translateX(-${productWidth * currentIndex}px)`;
        
//         if (currentIndex === 0) {
//             setTimeout(() => {
//                 slider.style.transition = 'transform 0.5s ease-in-out'; // Reapply transition
//             }, 50); // Brief delay to ensure the change is applied
//         }
//     });

//     prevButton.addEventListener('click', function() {
//         if (currentIndex > 0) {
//             currentIndex--;
//         } else {
//             currentIndex = products.length - 1; // Go to the last slide
//         }
//         slider.style.transition = currentIndex === products.length - 1 ? 'none' : 'transform 0.5s ease-in-out';
//         slider.style.transform = `translateX(-${productWidth * currentIndex}px)`;
        
//         if (currentIndex === products.length - 1) {
//             setTimeout(() => {
//                 slider.style.transition = 'transform 0.5s ease-in-out'; // Reapply transition
//             }, 50); // Brief delay to ensure the change is applied
//         }
//     });
// });



// /***************cart section box kula veratha active pandrathu*************/





document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider .product2');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const products = document.querySelectorAll('.product1');
  const productWidth = products[0].clientWidth;
  const cartSection = document.getElementById('cartSection');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  let currentIndex = 0;
  let totalCost = 0;

  function openCart() {
      cartSection.style.right = '0';
  }

  function updateTotalCost() {
      cartTotal.textContent = totalCost.toFixed(2);
  }

  // Add to Cart Functionality
  const cartButtons = document.querySelectorAll('.cart1');
  cartButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
          const productName = products[index].querySelector('h1').innerText;
          const productPrice = parseFloat(products[index].querySelector('.price').childNodes[0].nodeValue.replace('$', ''));
          const productImage = products[index].querySelector('img').src;

          const listItem = document.createElement('li');

          listItem.innerHTML = `
              <img class="cart-item-image" src="${productImage}" alt="${productName}">
              <div class="cart-item-details">
                  <h4>${productName}</h4>
                  <div class="price">$${productPrice.toFixed(2)}</div>
              </div>
              <div class="cart-item-controls">
                  <button class="decrease">-</button>
                  <input type="number" value="1" min="1" class="quantity">
                  <button class="increase">+</button>
                  <button class="delete-btn">
                      <i class="fa-solid fa-trash"></i>
                  </button>
              </div>
          `;

          cartItems.appendChild(listItem);

          totalCost += productPrice;
          updateTotalCost();

          openCart();

          // Quantity control
          const decreaseButton = listItem.querySelector('.decrease');
          const increaseButton = listItem.querySelector('.increase');
          const quantityInput = listItem.querySelector('.quantity');

          decreaseButton.addEventListener('click', () => {
              if (quantityInput.value > 1) {
                  quantityInput.value--;
                  totalCost -= productPrice;
                  updateTotalCost();
              }
          });

          increaseButton.addEventListener('click', () => {
              quantityInput.value++;
              totalCost += productPrice;
              updateTotalCost();
          });

          // Delete item from cart
          const deleteButton = listItem.querySelector('.delete-btn');
          deleteButton.addEventListener('click', () => {
              totalCost -= productPrice * quantityInput.value;
              updateTotalCost();
              listItem.remove();
          });
      });
  });

  nextButton.addEventListener('click', function() {
      if (currentIndex < products.length - 1) {
          currentIndex++;
          slider.style.transform = `translateX(-${productWidth * currentIndex}px)`;
      }
  });

  prevButton.addEventListener('click', function() {
      if (currentIndex > 0) {
          currentIndex--;
          slider.style.transform = `translateX(-${productWidth * currentIndex}px)`;
      }
  });
});

/*****************************cart section toggle button**************/ 

document.addEventListener('DOMContentLoaded', function() {
    const cartSection = document.getElementById('cartSection');
    const cartToggle = document.getElementById('giri');
    const closeCart = document.getElementById('closeCart');

    // Function to open the cart section
    function openCart() {
        cartSection.style.right = '0';
    }

    // Function to close the cart section
    function closeCartSection() {
        cartSection.style.right = '-300px';
    }

    // Toggle Cart Section when the cart icon is clicked
    cartToggle.addEventListener('click', openCart);

    // Close Cart Section when the close icon is clicked
    closeCart.addEventListener('click', closeCartSection);
});



// contact page 


document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Capture form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simulate form submission (e.g., send the data to the server)
    console.log('Form Submitted:', { name, email, message });

    // Display a confirmation message
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = 'Thank you for contacting us, ' + name + '! We will get back to you shortly.';
    formMessage.style.color = 'green';

    // Reset the form fields
    document.getElementById('contactForm').reset();
});

