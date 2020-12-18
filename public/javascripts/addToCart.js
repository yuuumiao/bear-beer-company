const btnAddToCart = document.querySelectorAll(".btn-shopping");
const displayMessage = document.getElementById("displayMessage2")

for (let i = 0; i < btnAddToCart.length; i++) {
        btnAddToCart[i].addEventListener('click', async () => {
                const quantityInput = document.querySelectorAll(".input-shopping");
                const quantity = parseInt(quantityInput[0].value);
                const productId = quantityInput[0].getAttribute("data-shopping-id");

                try {
                        console.log("check")
                        await axios.post(`/shoppingcart/${productId}`, { quantity, productId });
                        // const body = document.querySelectorAll(".one-product-container");
                        // body[0].innerHTML += `
                        // <div ><p class="displayMessage">Product is added to shopping cart</p></div>
                        // `
                        // alert("coucou already added")



                        if (btnAddToCart[0].classList.contains("active")) {

                                displayMessage.textContent = "You already added this product to your shopping cart"
                                console.log(displayMessage)
                        } else {

                                displayMessage.textContent = "Your product has been successfully added to the shopping cart"
                                btnAddToCart[0].classList.add("active")

                        }


                } catch (err) {
                        console.log(err)
                }

        })
}


