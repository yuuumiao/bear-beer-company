const seeMoreList = document.querySelectorAll(".see-more");
const categoryList = document.querySelectorAll(".category-list-item input");
const priceList = document.querySelectorAll(".price-list-item input");
let isSeeMore = false;

//handle 'see more' button: show description
for (let i = 0; i < seeMoreList.length; i++) {
        seeMoreList[i].addEventListener('click', () => {
                const fullDescriptionCell = document.querySelectorAll('.description-cell .full');
                const lessDescriptionCell = document.querySelectorAll('.description-cell .less');
                isSeeMore = !isSeeMore;
                if (isSeeMore) {
                        fullDescriptionCell[i].style.display = "block";
                        lessDescriptionCell[i].style.display = "none";
                } else {
                        fullDescriptionCell[i].style.display = "none";
                        lessDescriptionCell[i].style.display = "block";
                }

        })
}

//filter by category


function displayProdGrid(products) {
        const productsGrid = document.getElementById("products_grid");
        const title = document.getElementById("products-title");
        //display title to show numbers of products in this category
        title.innerHTML = '';
        title.innerHTML +=` Products: <span id="products_count" class="products-count">(${products.length})</span>`
        

        productsGrid.innerHTML = '';
        console.log(products.length);
        if(products.length !== 0){
                for (let i = 0; i < products.length; i++) {
                        console.log("check")
                        productsGrid.innerHTML += `
                        <a href="/collection/${products[i]._id}" class="product-item-wrapper">
                        <div class="product-img">
                                <img src="${products[i].image}" alt="${products[i].name}">
                        </div>
                        <div class="product-info">
                                <p class="product-name">${products[i].name}</p>
                                <p class="product-cat">Category: ${products[i].category}</p>
                                <p class="product-price">Price: $ ${products[i].price}</p>
                        </div>
        
                        <p class="product-description">${products[i].description}</p>
        
                        </a>
                        `
                }
        }else{
                productsGrid.innerHTML += `<h1>*******************No products in this category</h1>`;
        }

}
//sort by category
categoryList.forEach(category => {
        category.addEventListener('click', async () => {
                const chosenCategory = category.getAttribute("data-category")
                // console.log(chosenCategory);
                const getProducts = await axios.get(`/api/manage/filter/${chosenCategory}`);
                const products = getProducts.data;
                // console.log(products)

                displayProdGrid(products);
        })
});

//sort by price
priceList.forEach(price => {
        price.addEventListener('click', async()=>{
                const largestPrice = price.getAttribute("data-price");
                const smallestPrice = largestPrice - 2;
                const getProducts = await axios.get(`/api/manage/filter/price/${smallestPrice}/${largestPrice}`);
                const products = getProducts.data;
                // console.log(products)

                displayProdGrid(products);
        })
})