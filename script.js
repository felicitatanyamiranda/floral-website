/* ADD TO CART */
function addToCart(name, price, quantity, message) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    quantity = parseInt(quantity) || 1;

    let item = {
        name: name,
        price: price,
        quantity: quantity,
        message: message || ""
    };

    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");
}

/* UPDATE CUSTOM PRICE */
function updatePrice() {
    let flower = parseInt(document.getElementById("flowerType").value);
    let wrapper = parseInt(document.getElementById("wrapperType").value);
    let qty = parseInt(document.getElementById("customQty").value) || 1;

    let total = (flower + wrapper) * qty;

    document.getElementById("totalPrice").innerText = total;
}

/* ADD CUSTOM BOUQUET */
function addCustomToCart() {

    let flowerSelect = document.getElementById("flowerType");
    let wrapperSelect = document.getElementById("wrapperType");

    let flowerText = flowerSelect.options[flowerSelect.selectedIndex].text;
    let wrapperText = wrapperSelect.options[wrapperSelect.selectedIndex].text;

    let qty = parseInt(document.getElementById("customQty").value) || 1;
    let msg = document.getElementById("customMsg").value || "";
    let price = parseInt(document.getElementById("totalPrice").innerText);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: "Custom Bouquet (" + flowerText + " + " + wrapperText + ")",
        price: price / qty, // store unit price
        quantity: qty,
        message: msg
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Custom bouquet added to cart!");
}

/* DISPLAY CART */
function displayCart() {
    let cartItems = document.getElementById("cartItems");
    let total = document.getElementById("total");

    if (!cartItems) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.innerHTML = "";
    let sum = 0;

    cart.forEach(item => {
        let li = document.createElement("li");

        let itemTotal = item.price * item.quantity;

        li.textContent = item.name + 
            " - Rs." + item.price + 
            " x " + item.quantity + 
            (item.message ? " (" + item.message + ")" : "") +
            " = Rs." + itemTotal;

        cartItems.appendChild(li);

        sum += itemTotal; // ✅ FIXED
    });

    total.textContent = "Total: Rs." + sum;
}

/* CHECKOUT */
function checkout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully!");

    localStorage.removeItem("cart");
    displayCart();
}

/* CONTACT FORM VALIDATION (only necessary) */
function validateForm() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();

    if (name === "" || email === "") {
        alert("Please fill all required fields");
        return false;
    }

    if (!email.includes("@")) {
        alert("Enter a valid email");
        return false;
    }

    alert("Message sent successfully!");
    return true;
}
/* SIGNUP */
function signup() {
    let user = document.getElementById("signupUser").value.trim();
    let pass = document.getElementById("signupPass").value.trim();

    if(user === "" || pass === ""){
        alert("Fill all fields");
        return;
    }

    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);

    alert("Signup successful! Please login.");
    window.location.href = "login.html";
}

/* LOGIN */
function login() {
    let user = document.getElementById("loginUser").value.trim();
    let pass = document.getElementById("loginPass").value.trim();

    let storedUser = localStorage.getItem("user");
    let storedPass = localStorage.getItem("pass");

    if(user === storedUser && pass === storedPass){
        localStorage.setItem("loggedIn", "true");
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid credentials");
    }
}

/* CHECK LOGIN (protect pages) */
function checkLogin() {
    let status = localStorage.getItem("loggedIn");

    if(status !== "true"){
        alert("Please login first!");
        window.location.href = "login.html";
    }
}

/* LOGOUT */
function logout() {
    localStorage.removeItem("loggedIn");
    alert("Logged out!");
    window.location.href = "login.html";
}