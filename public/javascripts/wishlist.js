const btnWishlist = document.getElementById("btn-wishlist")
const displayMessage = document.getElementById("displayMessage")

  
btnWishlist.onclick = handleWishlist; 

async function handleWishlist (){
    
    try{
        const productId = btnWishlist.getAttribute("data-wishlist-id");
        // console.log(productId)
        console.log("handle wish list function is called");

        if(btnWishlist.classList.contains("active")){
            
            displayMessage.textContent = "You already added this product to your wishlist" 

        }else{

        displayMessage.textContent = "Your product has been successfully added to the wishlist"
        await axios.post("/user/wishlist/product-add/" + productId, {productId})
        btnWishlist.classList.add("active")
        
        }

    }catch(err){

        console.log(err);

    }
}
