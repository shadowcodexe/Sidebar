const arrow = document.querySelector('.sidebar-arrow');
const headerArrow = document.querySelector('.sidebar-header__arrow');
const sidebar = document.querySelector('.sidebar');
const dropdown = document.querySelector('.sidebar-header__dropdown');
const optionAdd = document.querySelector('.sidebar-header__dropdown-add');
let hide = true;

function showSidebar() {
    let titles = document.querySelectorAll('.sidebar-menu__option-title');
    let headerTitle = document.querySelector('.sidebar-header__title');
    hide = false;
    
    arrow.style.transform = 'rotate(90deg)';

    sidebar.style.animation = 'fadeInLeftBig 0.3s cubic-bezier(0.77, 0, 0.175, 1) forwards';

    setTimeout(() => {headerTitle.style.display = 'block';
    headerArrow.style.display = 'flex';

    titles.forEach(title => title.style.display = 'block') 
    },200);

    let options = document.querySelectorAll('.sidebar-menu__option');

    options.forEach((option) => {
        option.removeAttribute('id');
    })

    arrow.removeEventListener('click',showSidebar);
    arrow.addEventListener('click',() => {
        hide = true;
        if (hide) {
            dropdown.style.opacity = 0;
            dropdown.style.zIndex = -99;
            dropdown.style.pointerEvents = 'none';
            headerArrow.style.transform = 'rotate(0deg)';
            headerArrow.addEventListener('click',dropdownShow);
        }
        arrow.style.transform = 'rotate(-90deg)';
        sidebar.style.animation = 'fadeInLeftOut 0.3s cubic-bezier(0.075, 0.82, 0.165, 1) forwards';

            headerTitle.style.display = 'none';
            headerArrow.style.display = 'none';

            options.forEach((option) => {
                option.setAttribute('id','option');
            })

            titles.forEach(title => title.style.display = 'none');
            arrow.addEventListener('click',showSidebar);
    })
};

arrow.addEventListener('click',showSidebar);

function dropdownShow() {
        if (!hide) {
            headerArrow.style.transform = 'rotate(180deg)';
            dropdown.style.opacity = 1;
            dropdown.style.zIndex = 99;
            dropdown.style.pointerEvents = 'all';
            headerArrow.removeEventListener('click',dropdownShow);
            headerArrow.addEventListener('click',() => {
            headerArrow.style.transform = 'rotate(0deg)';
            dropdown.style.opacity = 0;
            dropdown.style.pointerEvents = 'none';
            dropdown.style.zIndex = -99;
            headerArrow.addEventListener('click',dropdownShow);
        }) 
        };
}

headerArrow.addEventListener('click',dropdownShow);

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let i = 1;

let closeButtons = document.querySelectorAll('.dropdown-item__close');

function addNewOrg() {
    if (i < 10) {
        optionAdd.onclick = i++;
        let arr = [];
        arr.push('1');
        let newOrgItem = document.createElement('div');
        newOrgItem.classList.add('sidebar-header__dropdown-item');
        dropdown.appendChild(newOrgItem);
        let itemLogo = document.createElement('div');
        itemLogo.classList.add('dropdown-item__logo');
        itemLogo.style.background = 'rgb(' + getRandom(0,255) + ',' + getRandom(0,255) + ',' + getRandom(0,255) + ')';
        newOrgItem.appendChild(itemLogo);
        itemLogo.innerHTML = 'W';
        let itemTitle = document.createElement('p');
        itemTitle.classList.add('dropdown-item__title');
        itemTitle.innerHTML = 'Organization ' + i;
        newOrgItem.appendChild(itemTitle);
        let itemClose = document.createElement('span');
        itemClose.classList.add('dropdown-item__close');
        itemClose.innerHTML = 'X';
        newOrgItem.appendChild(itemClose);

        itemClose.addEventListener('click', () => {
            i--;
            itemClose.closest('.sidebar-header__dropdown-item').style.display = 'none';
        })
    }
};

optionAdd.addEventListener('click',addNewOrg);