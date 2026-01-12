function scrollToBooking() {
  document.getElementById("booking").scrollIntoView({
    behavior: "smooth"
  });
}

let total = 0;
let serialNo = 1;

// Store added items
const cartItems = {};

function toggleItem(button, name, price) {
  const cart = document.getElementById("cart");

  // IF ITEM NOT ADDED ➜ ADD IT
  if (!cartItems[name]) {
    // Create table row
    const row = document.createElement("tr");
    row.setAttribute("id", name);

    row.innerHTML = `
      <td>${serialNo++}</td>
      <td>${name}</td>
      <td>₹${price}</td>
    `;

    cart.appendChild(row);

    cartItems[name] = price;
    total += price;

    // Change button to REMOVE
    button.innerText = "Remove Item";
    button.classList.remove("add");
    button.classList.add("remove");

  } 
  // IF ITEM ALREADY ADDED ➜ REMOVE IT
  else {
    const row = document.getElementById(name);
    row.remove();

    total -= cartItems[name];
    delete cartItems[name];

    // Change button back to ADD
    button.innerText = "Add Item";
    button.classList.remove("remove");
    button.classList.add("add");
  }

  // Update total amount
  document.getElementById("total").innerText = total;

  // Show "No items added" if cart empty
  if (Object.keys(cartItems).length === 0) {
    serialNo = 1;
  }
}

function bookNow() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const errorMsg = document.getElementById("cart-error");
  const successMsg = document.getElementById("confirmation");

  // Hide messages initially
  errorMsg.style.display = "none";
  successMsg.style.display = "none";

  // ❌ NO ITEMS ADDED
  if (Object.keys(cartItems).length === 0) {
    errorMsg.style.display = "block";

    // Auto hide after 3 seconds
    setTimeout(() => {
      errorMsg.style.display = "none";
    }, 3000);

    return;
  }

  // ❌ FORM EMPTY
  if (!name || !email || !phone) {
    alert("Please fill all booking details");
    return;
  }

  // ✅ SEND EMAIL
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    name: name,
    email: email,
    phone: phone,
    total: total
  });

  // ✅ SHOW SUCCESS MESSAGE
  successMsg.innerText =
    "Thank you for booking the service. We will get back to you soon!";
  successMsg.style.display = "block";

  // Auto hide success message
  setTimeout(() => {
    successMsg.style.display = "none";
  }, 4000);

  // Optional: clear form
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}



