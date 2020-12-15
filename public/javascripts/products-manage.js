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
                        seeMoreList[i].innerHTML='';
                        seeMoreList[i].innerHTML=`<i class="fas fa-angle-double-left"></i>`;
                        
                } else {
                        fullDescriptionCell[i].style.display = "none";
                        lessDescriptionCell[i].style.display = "block";
                        seeMoreList[i].innerHTML='';
                        seeMoreList[i].innerHTML=`<i class="fas fa-angle-double-right"></i>`;
                }

        })
}