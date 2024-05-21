const tabsBtn   = document.querySelectorAll('.tab-item');
let gridContainer = document.querySelectorAll('.grid-container');
const moreBtn = document.querySelector('.btn-more');
const menuGrid = document.querySelector('.menu-grid');
let gridItems;
let gridContainerActive;

tabsBtn.forEach(tabClick);

function tabClick(tab) {
    tab.addEventListener('click', function() {
        moreBtn.remove();
        let currentBtn = tab;        
        let tabId = currentBtn.getAttribute("data-tab");        
        let currentGrid = document.querySelector(tabId);        

        if( ! currentBtn.classList.contains('tab-item-active') ) {
            tabsBtn.forEach(function(tab) {
                tab.classList.remove('tab-item-active');
                
            });
    
            gridContainer.forEach(function(tab) {
                tab.classList.remove('grid-container-active');
                tab.classList.add('grid-container-disabled');
            });
    
            currentBtn.classList.add('tab-item-active');            
            currentGrid.classList.remove('grid-container-disabled');
            currentGrid.classList.add('grid-container-active');
        }  
        gridItems = document.querySelectorAll('.grid-container-active .grid-item');
        console.log(gridItems.length);
        if (gridItems.length > 4) {
            for (let j = 4; j < gridItems.length; j++) {
                gridItems[j].classList.add('grid-item-disabled');        
            }  
            menuGrid.append(moreBtn);          
        } 
    });
}

document.querySelector('.tab-item').click();

// 
// MODALS
// 

const body = document.querySelector('body');
const modalItems = document.querySelectorAll('.grid-item');
if (modalItems.length > 0) {
    for (let i = 0; i < modalItems.length; i++) {
        const modalItem = modalItems[i];
       
        modalItem.addEventListener('click', function(event) {
            const currentModal = document.getElementById('modal');
            // определить путь к изображению 
            let modalItemsImg= document.querySelectorAll('.item-img img');
            
            // вставить изображение в модальное окно
            let modalImgBlock = document.querySelector('.modal-img');
            modalImgBlock.innerHTML = '<img>';
            let modalImg = document.querySelector('.modal-img img');
            console.log(modalImg);
            modalImg.src = modalItemsImg[i].src;
            // Вставить название  и описание
            let modalItemsName = document.querySelectorAll('.item-name h3');            
            let modalName = document.querySelector('.modal-name');
            modalName.innerHTML = modalItemsName[i].textContent;

            let modalItemsDescr = document.querySelectorAll('.item-descr');
            let modalDescr = document.querySelector('.modal-descr');
            modalDescr.innerHTML = modalItemsDescr[i].textContent;


            // Вставка табов в зависимости от типа блюд

            let menuType = document.querySelector('.grid-container-active').id;
            console.log(menuType);
            let modalSize = document.querySelector('.modal-size');
            let modalAdd = document.querySelector('.modal-add');

            if (menuType === 'coffee') {
                modalSize.innerHTML = '<h4>Size</h4><div class="offer-tabs modal-tabs"><div class="tab-item tab-item-active" id="sizeS"><div class="tab-img tab-img-active">S</div><div class="tab-name tab-name-active">200 ml</div></div><div class="tab-item" id="sizeM"><div class="tab-img">M</div><div class="tab-name">300 ml</div></div><div class="tab-item" id="sizeL"><div class="tab-img">L</div><div class="tab-name">400 ml</div></div></div>';
                modalAdd.innerHTML = '<h4>Additives</h4><div class="offer-tabs modal-tabs"><div class="tab-item"><div class="tab-img">1</div><div class="tab-name">Sugar</div></div><div class="tab-item"><div class="tab-img">2</div><div class="tab-name">Cinnamon</div></div><div class="tab-item"><div class="tab-img">3</div><div class="tab-name">Syrup</div></div></div>'
            } 
            if (menuType === 'tea') {
                modalSize.innerHTML = '<h4>Size</h4><div class="offer-tabs modal-tabs"><div class="tab-item tab-item-active" id="sizeS"><div class="tab-img tab-img-active">S</div><div class="tab-name tab-name-active">200 ml</div></div><div class="tab-item" id="sizeM"><div class="tab-img">M</div><div class="tab-name">300 ml</div></div><div class="tab-item" id="sizeL"><div class="tab-img">L</div><div class="tab-name">400 ml</div></div></div>';
                modalAdd.innerHTML = '<h4>Additives</h4><div class="offer-tabs modal-tabs"><div class="tab-item"><div class="tab-img">1</div><div class="tab-name">Sugar</div></div><div class="tab-item"><div class="tab-img">2</div><div class="tab-name">Lemon</div></div><div class="tab-item"><div class="tab-img">3</div><div class="tab-name">Syrup</div></div></div>'

            }
            if (menuType === 'dessert') {
                modalSize.innerHTML = '<h4>Size</h4><div class="offer-tabs modal-tabs"><div class="tab-item tab-item-active" id="sizeS"><div class="tab-img tab-img-active">S</div><div class="tab-name tab-name-active">50 g</div></div><div class="tab-item" id="sizeM"><div class="tab-img">M</div><div class="tab-name">100 g</div></div><div class="tab-item" id="sizeL"><div class="tab-img">L</div><div class="tab-name">200 g</div></div></div>';
                modalAdd.innerHTML = '<h4>Additives</h4><div class="offer-tabs modal-tabs"><div class="tab-item"><div class="tab-img">1</div><div class="tab-name">Berries</div></div><div class="tab-item"><div class="tab-img">2</div><div class="tab-name">Nuts</div></div><div class="tab-item"><div class="tab-img">3</div><div class="tab-name">Jam</div></div></div>'
            }

            modalOpen(currentModal);
            event.preventDefault();
            //Price
            let modalItemsPrice = document.querySelectorAll('.item-price');
            let modalPrice = document.querySelector('.modal-price-block p');
            let startPrice = (+(modalItemsPrice[i].textContent).trim().slice(1, -1));
            let startPriceFix = startPrice.toFixed(2)
            modalPrice.innerHTML = `$${startPriceFix}`;
            let currentPrice = startPrice;
            let priceWithAdd = 0;
            let priceAll;
            //переключение размеров
            const modalTabsSize = document.querySelectorAll('.modal-size .modal-tabs');            
            const tabItemSizeAll = document.querySelectorAll('.modal-size .modal-tabs .tab-item');

            modalTabsSize[0].addEventListener('click', function(e) {
                for (let i = 0; i < tabItemSizeAll.length; i++) {
                    tabItemSizeAll[i].classList.remove('tab-item-active'); 
                }  
                
                let tabItemSize = e.target.closest('.tab-item');                
                tabItemSize.classList.add('tab-item-active');
                if (tabItemSize.id == 'sizeS') {
                    currentPrice = startPrice;
                }
 
                if (tabItemSize.id == 'sizeM') {
                    currentPrice = startPrice + 0.5;
                }
                if (tabItemSize.id == 'sizeL') {
                    currentPrice = startPrice + 1;
                }
                priceAll = currentPrice + priceWithAdd;
                let priceAllFix = priceAll.toFixed(2);
                
                modalPrice.innerHTML = `$${priceAllFix}`; 
                              
            })
            
            // переключение добавок
            const modalTabsAdd = document.querySelectorAll('.modal-add .modal-tabs');            
            modalTabsAdd[0].addEventListener('click', function(e) {
                
                let tabItemAdd = e.target.closest('.tab-item');                
                tabItemAdd.classList.toggle('tab-item-active');                
                if (tabItemAdd.classList.contains('tab-item-active')) {
                    priceWithAdd += 0.5;

                } else {
                    priceWithAdd -= 0.5;
                }
                priceAll = currentPrice + priceWithAdd;
                let priceAllFix = priceAll.toFixed(2);
                modalPrice.innerHTML = `$${priceAllFix}`; 
            })
        });
    }
}
const modalCloseElem = document.querySelectorAll('.modal-close');
if (modalCloseElem.length > 0) {
    for (let i = 0; i < modalCloseElem.length; i++) {
        const currentCloseElem = modalCloseElem[i];
        currentCloseElem.addEventListener('click', function(event) {
            modalClose(currentCloseElem.closest('.modal'));
            event.preventDefault();
        });
    }
}

function modalOpen(currentModal) {
    const modalActive = document.querySelector('.modal.open');
    console.log(modalActive)
    if (currentModal) {
        currentModal.classList.add('open');
        document.body.style.overflow = "hidden";
        currentModal.addEventListener('click', function (event) {
            if (!event.target.closest('.modal-content')) {
                modalClose(event.target.closest('.modal'));
            }
        });
    }
}
function modalClose(currentModal) {
    currentModal.classList.remove('open');
    document.body.style.overflow = "";
}

// MORE-BTN
// 

gridItems = document.querySelectorAll('.grid-container-active .grid-item');

if (gridItems.length > 4) {
    for (let j = 4; j < gridItems.length; j++) {
        gridItems[j].classList.add('grid-item-disabled');        
    }
    menuGrid.append(moreBtn);
    
}
moreBtn.addEventListener('click', function() {
    for (let j = 4; j < gridItems.length; j++) {
        gridItems[j].classList.remove('grid-item-disabled');        
    }
    moreBtn.remove();
})
