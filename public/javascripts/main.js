const categoryList = document.querySelectorAll(".category-list-item input");
const seeMoreList = document.querySelectorAll(".see-more");
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
        productsGrid.innerHTML = '';
        for (let i = 0; i < products.length; i++) {
                productsGrid.innerHTML += `
<a href="/collection/{{_id}}" class="product-item-wrapper">
        <div class="product-img">
                <img src="{{image}}" alt="{{this.name}}">
        </div>
        <div class="product-info">
                <p class="product-name">{{name}}</p>
                <p class="product-cat">Category: {{category}}</p>
                <p class="product-price">Price: ${{ price }}</p>
        </div>

        <p class="product-description">{{description}}</p>

</a>
`
        }

}

categoryList.forEach(category => {
        category.addEventListener('click', async () => {
                const chosenCategory = category.getAttribute("data-category")
                // console.log(chosenCategory);
                const getProducts = await axios.get(`/api/manage/filter/${chosenCategory}`);
                const products = getProducts.data;
                console.log(products)

                displayProdGrid(products);
        })
})