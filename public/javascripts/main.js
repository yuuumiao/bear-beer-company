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






function displayProdGrid(products) {
        const productsGrid = document.getElementById("products_grid");
        console.log(products);
}

categoryList.forEach(category => {
        category.addEventListener('click', async () => {
                const chosenCategory = category.getAttribute("data-category")
                // console.log(chosenCategory);
                const getProducts = await axios.get(`/filter/${chosenCategory}`);
                const products = getProducts.data;

                displayProdGrid(products);
        })
})