let cart = JSON.parse(localStorage.getItem("cart")) || [];

const hearts = document.querySelectorAll(".fa-heart");
const cartBtns = document.querySelectorAll(".cart-btn");
const cartIcon = document.querySelector(".fa-shopping-cart");
const cartContainer = document.querySelector(".cartcont");


function addToCart(product){

    const name = product.querySelector("h3").innerText;

    const priceText = product.querySelector(".price").childNodes[0].nodeValue;

    const price = parseInt(priceText.replace(/\D/g,''));

    const img = product.querySelector("img").src;

    const existing = cart.find(item => item.name === name);

    if(existing){
        existing.qty += 1;
    }else{
        cart.push({
            name:name,
            price:price,
            img:img,
            qty:1
        });
    }

    localStorage.setItem("cart",JSON.stringify(cart));

    renderCart();
}



hearts.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault();

        const product = btn.closest(".box");

        addToCart(product);
    });
});


cartBtns.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault();

        const product = btn.closest(".box");

        addToCart(product);
    });
});


cartIcon.addEventListener("click",(e)=>{
    e.preventDefault();

    cartContainer.classList.toggle("active");
});



function renderCart(){

    cartContainer.innerHTML = "<h2>Your Cart</h2>";

    let total = 0;

    cart.forEach((item,index)=>{

        total += item.price * item.qty;

        const div = document.createElement("div");

        div.classList.add("cart-item");

        div.innerHTML = `
        <img src="${item.img}" width="60">
        
        <div>
            <p>${item.name}</p>
            <p>Rs ${item.price}</p>
        </div>

        <div>
            <button onclick="decreaseQty(${index})">-</button>
            <span>${item.qty}</span>
            <button onclick="increaseQty(${index})">+</button>
        </div>

        <button onclick="removeItem(${index})">❌</button>
        `;

        cartContainer.appendChild(div);

    });

    const totalDiv = document.createElement("h3");

    totalDiv.innerText = "Total : Rs " + total;

    cartContainer.appendChild(totalDiv);
}


function increaseQty(index){

    cart[index].qty++;

    localStorage.setItem("cart",JSON.stringify(cart));

    renderCart();
}


function decreaseQty(index){

    if(cart[index].qty > 1){
        cart[index].qty--;
    }else{
        cart.splice(index,1);
    }

    localStorage.setItem("cart",JSON.stringify(cart));

    renderCart();
}


function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    renderCart();
}


renderCart();