const btnAddToCart = document.querySelectorAll(".btn-shopping");


for (let i = 0; i < btnAddToCart.length; i++) {
        btnAddToCart[i].addEventListener('click', async () => {
                const quantityInput = document.querySelectorAll(".input-shopping");
                const quantity = parseInt(quantityInput[0].value);
                const productId = quantityInput[0].getAttribute("data-shopping-id");
              
                try {
                        console.log("check")
                        await axios.post(`/shoppingcart/${productId}`, { quantity, productId });
                        const body = document.querySelectorAll(".one-product-container");
                        body[0].innerHTML += `
                        <div class="show-success-add"><p>Product is added to shopping cart</p></div>
                        `
                        // alert("coucou already added")
                        
                } catch (err) {
                        console.log(err)
                }
               
        })
}


