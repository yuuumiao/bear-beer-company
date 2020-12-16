const checkout = document.getElementById("checkout")
//show facture in shopping cart
        const subTotal = document.querySelectorAll(".subTotal");
        const total = document.querySelector(".total");
        let sum = 0;
        subTotal.forEach(sub => {
                const subT = parseInt(sub.innerText);
                // console.log(subT)
                sum+=subT;
        });
        total.innerHTML="";
        total.innerHTML = sum;  


checkout.addEventListener("click", async()=>{
        //add to pendding cart
})