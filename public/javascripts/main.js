const seeMoreList = document.querySelectorAll(".see-more");
const categoryList = document.querySelectorAll(".category-list-item input");
const priceList = document.querySelectorAll(".price-list-item input");
const sortLowToHigh = document.querySelector(".low-high-price");
const sortHighToLow = document.querySelector(".high-low-price");
const searchInput = document.querySelector("#search input");
const searchBtn = document.querySelector("#search a");
const matchList = document.getElementById("match-list");
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
        title.innerHTML += ` Products: <span id="products_count" class="products-count">(${products.length})</span>`


        productsGrid.innerHTML = '';
        console.log(products.length);
        if (products.length !== 0) {
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
        } else {
                productsGrid.innerHTML += `<h1>*******************No products in this category</h1>`;
        }

}
//sort by category
categoryList.forEach(category => {
        category.addEventListener('click', async () => {
                const chosenCategory = category.getAttribute("data-category");
                let getProducts = [];
                if (chosenCategory === "Allproducts") {
                        getProducts = await axios.get(`/api/manage`);

                } else {
                        getProducts = await axios.get(`/api/manage/filter/${chosenCategory}`);
                }

                const products = getProducts.data;


                displayProdGrid(products);
        })
});

//sort by price
priceList.forEach(price => {
        price.addEventListener('click', async () => {
                let largestPrice = price.getAttribute("data-price");
                let smallestPrice = largestPrice - 2;

                if (largestPrice == 6) {
                        largestPrice = 100;
                }
                const getProducts = await axios.get(`/api/manage/filter/price/${smallestPrice}/${largestPrice}`);
                const products = getProducts.data;
                // console.log(products)

                displayProdGrid(products);
        })
})

//sort by price: low to high price
sortLowToHigh.addEventListener('click', async () => {
        const getProducts = await axios.get(`api/manage`);
        const products = getProducts.data.sort(function (a, b) {
                if (a.price < b.price) return -1;
                else if (a.price > b.price) return 1;
                else return 0;
        });
        displayProdGrid(products);
})

sortHighToLow.addEventListener('click', async () => {
        const getProducts = await axios.get(`api/manage`);
        const products = getProducts.data.sort(function (a, b) {
                if (a.price < b.price) return 11;
                else if (a.price > b.price) return -1;
                else return 0;
        });
        displayProdGrid(products);
})


//searching by name of beer

searchInput.addEventListener('input', async () => {
        const res = await axios.get(`api/manage`);
        const states = res.data;
        console.log(states)
        //get matches to current text input
        let products = states.filter(state => {
                const regex = new RegExp(`^${searchInput.value}`, 'gi');
                // console.log(state.category)
                return state.name.match(regex);
        });
        // console.log(products)
        if (searchInput.value.length === 0) {
                products = [];
                displayProdGrid(products)
        } else {
                displayProdGrid(products)
        };
});


//start