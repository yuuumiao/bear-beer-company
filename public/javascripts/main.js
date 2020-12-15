const categoryList = document.querySelectorAll(".category-list-item input");

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