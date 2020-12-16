const btnAddToCart = document.querySelectorAll(".btn-shopping");


for(let i=0; i< btnAddToCart.length; i++){
        btnAddToCart[i].addEventListener('click', async()=>{
                const quantityInput = document.querySelectorAll(".input-shopping");
                const quantity = quantityInput[0].value
                const product = quantityInput[0].getAttribute("class").split(' ')[1];
                try{
                        await axios.post(`/shoppingcart/${product}`, {items: })
                }catch(err){
                        console.log(err)
                }
        })
}


// btnAddToCart.forEach(btn => {
//         btn.addEventListener('click', ()=> {
//                 console.log(btn)
//         })
// })