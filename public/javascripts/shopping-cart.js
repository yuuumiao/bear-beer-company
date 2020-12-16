const checkout = document.getElementById("checkout");
const quantityList = document.querySelectorAll(".quantity-shopping-cart div");
const priceList = document.querySelectorAll(".price-shopping-cart div");
const subList = document.querySelectorAll(".subTotal");

for(let i= 0; i<priceList.length; i++){
      let subSum=0
      console.log(i,parseInt(quantityList[i].innerText), quantityList[i].innerText);

        if(parseInt(quantityList[i].innerText)){
                subSum = (parseInt(quantityList[i].innerText)*parseInt(priceList[i].innerText)).toString();
        }else{
                subSum = "";
        }
        subList[i].innerText= subSum;

}

//show facture in shopping cart
        const subTotal = document.querySelectorAll(".subTotal");
        const total = document.querySelector(".total");
        let sum = 0;
        subTotal.forEach(sub => {
                const subT = parseInt(sub.innerText);
                // console.log(subT)")
                sum+=subT;
        });
        total.innerHTML="";
        total.innerHTML = sum;  


checkout.addEventListener("click", async()=>{
        //add to pendding cart
})