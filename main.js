let maketOfDude
let currentCom = 0;
window.onload = function () {
    // let findButt = document.querySelector('.poisk');
    // findButt.addEventListener('click', GetInformationAboutCom); 
    maketOfDude = document.getElementById('companyItem-template').cloneNode(true);
    pagination()
    GetInformationAboutCom();
// console.log(maketOfDude);
    addListenerFindBtn();

    document.getElementById('socialka').addEventListener('change', socialGay);

    let menuButt = document.querySelectorAll('.menuButt');
    menuButt.forEach(function (btn) {
        btn.addEventListener('click', setFunk)
    })
}

let data
let globSum

function setFunk(event) {
    let oper = event.target.innerHTML;
    let pole = event.target.closest('.menuButt').querySelector('.pole');
    let price = Number(String(event.target.closest('.card-body').querySelector('.price').innerHTML).slice(0, -2));
    let summary = document.getElementById('summary');
    switch (oper) {
        case '+':
            // alert("+")
            pole.innerHTML = Number(pole.innerHTML) + 1;

            // alert(summary.innerHTML);
            summary.innerHTML = Number(summary.innerHTML) + price;
            globSum = summary.innerHTML;
            // alert(summary.innerHTML);
            break
        case '-':
            // alert("-")
            if (pole.innerHTML != 0 && pole.innerHTML != NaN) {
                pole.innerHTML = Number(pole.innerHTML) - 1;

                // alert(summary.innerHTML);
                summary.innerHTML = Number(summary.innerHTML) - price;
                globSum = summary.innerHTML;
                // alert(summary.innerHTML);
            }
            break
    }
    if (pole.innerHTML == "0") {
        pole.innerHTML = "";
    }


    // alert(oper);
}


function GetInformationAboutCom() {
    let url_add = "https://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants";
    let api_key = "bec7c4f3-a6b3-4175-a1bb-4d855c9a187c";
    let url = new URL(url_add);
    url.searchParams.append("api_key", api_key);
  /*  axios.post('https://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants?api_key=b47b35cf-b327-43d6-9683-88e83dd06714', data, config)
        .then((res) => {
            alert("dsa")
            console.log(res)
        })
        .catch((err) => {
            alert("dsa")
            console.log(err)
        });
*/

    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.setRequestHeader('Access-Control-Allow-Credentials', true);
    xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    xhr.setRequestHeader('Access-Control-Allow-Headers', 'Origin, Product-Session, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Referer, User-Agent');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    xhr.responseType = 'json';
    xhr.onload = function () {
        console.log(this.response);
        sortComElements(this.response);
        data = this.response
    }
    xhr.send();


}

function socialGay() {
    let checkbox = document.getElementById('socialka');
    if (checkbox.checked == true) {
        // alert(currentCom['socialDiscount']);
        // alert(globSum);
        // alert(currentCom["socialPrivileges"])
        if (currentCom["socialPrivileges"] == true) {
            globSum = globSum * (100 - currentCom["socialDiscount"]) / 100


        } else {
            document.getElementById('socialka').disabled;
        }
    } else {
        if (currentCom["socialPrivileges"] == true) {
            globSum = globSum / (100 - currentCom["socialDiscount"]) * 100
            // alert(globSum);

        } else {
            document.getElementById('socialka').disabled;
        }
    }
    document.getElementById('summary').innerHTML = globSum
}

function xTwo(params) {

}

function sortComElements(array) {
    let companyList = document.querySelector('.company-list');
    let counter = 0
    sortByRate(array);
    while (counter < 5) {
        // for (let element of array) {
        //     companyList.append(createComBlock(element));
        // }
        counter = counter + 1
        companyList.append(createComBlock(array[counter]))
    }

}

function createComBlock(company) {
    let item = document.getElementById('companyItem-template').cloneNode(true);
    // let item = maketOfDude.cloneNode(true);

    item.querySelector('.company-name').innerHTML = company['name'];
    item.querySelector('.company-type').innerHTML = company['typeObject'];
    item.querySelector('.company-address').innerHTML = company['address'];
    item.querySelector('.company-admArea').innerHTML = company['admArea'];
    item.querySelector('.company-district').innerHTML = company['district'];
    item.querySelector('.company-discount').innerHTML = company['socialDiscount'];
    item.querySelector('.company-rating').innerHTML = "Рейтинг " + company['rate'] / 20;
    item.setAttribute('id', company['id']);
    item.classList.remove('d-none');
    item.querySelector(".chooseButt").addEventListener('click', event => {
        createMenu(company['id'])
    })
    item.classList.add("new"); //класс для последующего удаления в использовании фильтров
    return item;


}

function createComBlockforFilter(company) {
    // console.log(maketOfDude);
    // let item = document.getElementById('companyItem-template').cloneNode(true);
    let item = maketOfDude.cloneNode(true);
    item.querySelector('.company-name').innerHTML = company['name'];
    item.querySelector('.company-type').innerHTML = company['typeObject'];
    item.querySelector('.company-address').innerHTML = company['address'];
    item.querySelector('.company-admArea').innerHTML = company['admArea'];
    item.querySelector('.company-district').innerHTML = company['district'];
    item.querySelector('.company-discount').innerHTML = company['socialDiscount'];
    item.querySelector('.company-rating').innerHTML = "Рейтинг " + company['rate'] / 20;
    item.setAttribute('id', company['id']);
    item.classList.remove('d-none');

    item.querySelector(".chooseButt").addEventListener('click', event => {
        createMenu(company['id'])
    })
    item.classList.add("new"); //класс для последующего удаления в использовании фильтров
    // console.log(item);
    return item;


}

function sortByRate(array) {
    array.sort()
    array.sort(function (a, b) {
        if (a.rate / 20 < b.rate / 20) {
            return 1;
        }
        if (a.rate / 20 > b.rate / 20) {
            return -1;
        }
        return 0;
    });
}

function createMenu(id) {
    // alert(id);
    let menu = document.getElementById('gal');
    menu.style.display = 'block';


    console.log(data);
    data.forEach(element => {
        if (element['id'] == id) {
            currentCom = element;
            document.getElementById('set-1').innerHTML = element['set_1'] + " Р";
            document.getElementById('set-2').innerHTML = element['set_2'] + " Р";
            document.getElementById('set-3').innerHTML = element['set_3'] + " Р";
            document.getElementById('set-4').innerHTML = element['set_4'] + " Р";
            document.getElementById('set-5').innerHTML = element['set_5'] + " Р";
            document.getElementById('set-6').innerHTML = element['set_6'] + " Р";
            document.getElementById('set-7').innerHTML = element['set_7'] + " Р";
            document.getElementById('set-8').innerHTML = element['set_8'] + " Р";
            document.getElementById('set-9').innerHTML = element['set_9'] + " Р";
            document.getElementById('set-10').innerHTML = element['set_10'] + " Р";


        }
    });

}


function addListenerFindBtn() {

    const divs = document.querySelectorAll('.poisk');
    divs.forEach(el => el.addEventListener('click', event => {
        var filter1 = document.getElementById("select");
        var area = filter1.options[filter1.selectedIndex].text;

        var filter2 = document.getElementById("selec");
        var district = filter2.options[filter2.selectedIndex].text;

        var filter3 = document.getElementById("sele");
        var type = filter3.options[filter3.selectedIndex].text;

        var filter4 = document.getElementById("sel");
        var discount = filter4.options[filter4.selectedIndex].text;

        sortArray(data, district, area, type, discount)
    }));
}
function getCurFilters(){
    var filter1 = document.getElementById("select");
    var area = filter1.options[filter1.selectedIndex].text;

    var filter2 = document.getElementById("selec");
    var district = filter2.options[filter2.selectedIndex].text;

    var filter3 = document.getElementById("sele");
    var type = filter3.options[filter3.selectedIndex].text;

    var filter4 = document.getElementById("sel");
    var discount = filter4.options[filter4.selectedIndex].text;

    let mas = [district, area, type, discount]
    return mas
}

let paginationStart = 0
let paginationMax = 4
let paginationMin = 0
let current = 0
let currentElementsByFilters = 0
let previousPag
function pagination(){
    let pag1 = document.querySelector('.pag-butt-1');
    let pag2 = document.querySelector('.pag-butt-2');
    let pag3 = document.querySelector('.pag-butt-3');
    let pag4 = document.querySelector('.pag-butt-4');
    let pagPrevious = document.querySelector('.pag-butt-back');
    let pageNext = document.querySelector('.pag-butt-next');

    pagPrevious.addEventListener('click',event => {updatePaginationStart(-1)
        clickPreviousPag(current,getPag())})
    pageNext.addEventListener('click',event => {updatePaginationStart(1)
        clickNextPag(current,getPag())

    })

    pag1.addEventListener('click',event => {current = 1 + paginationStart
        paginationStart = 0
        alert("fgvh")
        setVisualClickPag(pag1,previousPag)
        previousPag = pag1
        sortArray((0+paginationStart)*10,data, getCurFilters()[0], getCurFilters()[1], getCurFilters()[2], getCurFilters()[3])})
    pag2.addEventListener('click',event => {current = 2 + paginationStart
        paginationStart = 1
        setVisualClickPag(pag2,previousPag)
        previousPag = pag2
        sortArray((1+paginationStart)*10,data, getCurFilters()[0], getCurFilters()[1], getCurFilters()[2], getCurFilters()[3])})
    pag3.addEventListener('click',event => {current = 3 + paginationStart
        paginationStart = 2
        setVisualClickPag(pag3,previousPag)
        previousPag = pag3
        sortArray((2+paginationStart)*10,data, getCurFilters()[0], getCurFilters()[1], getCurFilters()[2], getCurFilters()[3])})
    pag4.addEventListener('click',event => {current = 4 + paginationStart
        paginationStart = 3
        setVisualClickPag(pag4,previousPag)
        previousPag = pag4
        sortArray((3+paginationStart)*10,data, getCurFilters()[0], getCurFilters()[1], getCurFilters()[2], getCurFilters()[3])})
}
function  clickPreviousPag(cur,pag){
   // alert("previous fun",cur)
    if(cur - 1>paginationMin){
        alert("previous click")
        pag.click()
    }
}
function  df(){

}
function  setVisualClickPag(curPag,prevPag){
   // alert("setVisualClickPag click")
   // alert(curPag)
   // alert(curPag.style.backgroundColor)
    if(prevPag!= undefined) prevPag.style.backgroundColor = "white"
    curPag.style.backgroundColor = "grey"
   /// alert(curPag.style.backgroundColor)

}
function  clickNextPag(cur,pag){
    alert("fghjk")
    alert(paginationMax)
    alert(cur)
    //if(cur  <=paginationMax){
        alert("next click")
        pag.click()
    //}
}
function getPag(){
    alert("sdf")
    alert(paginationStart)
    alert("sdf")
    let pag1 = document.querySelector('.pag-butt-1');
    let pag2 = document.querySelector('.pag-butt-2');
    let pag3 = document.querySelector('.pag-butt-3');
    let pag4 = document.querySelector('.pag-butt-4');
    if((paginationStart)%4 == 0) return pag1
    if((paginationStart)%4 == 1) return pag2
    if((paginationStart)%4 == 2) return pag3
    if((paginationStart)%4 == 3) return pag4
    return null

}
function updatePaginationStart(add){
    paginationStart = paginationStart + add
    if(paginationStart>paginationMax) {
        paginationStart =currentElementsByFilters%10-1
    }
    if(paginationStart<paginationMin) {
        paginationStart=0
    }

}

function sortArray(nonActiveCounter,array, district, area, type, discount) {
  //  alert("sort Array")
    let companyList = document.querySelector('.company-list');

    let activeCounter = 0// это счетчик именно элементов массива которые удовлетворяют сортировки

    let counter = 0// индек элемента в массиве
    companyList.innerHTML = "";
  //  alert(array)
    while (counter < array.length - 2) {
        counter = counter + 1
        let current = array[counter + 1]
        let point = 0

        if (district == "Не выбрано") {
            point = point + 1
        } else {
            if (current['district'] == district) {
                point = point + 1
            }
        }
        if (area == "Не выбрано") {
            point = point + 1
        } else {
            if (current['admArea'] == area) {
                point = point + 1
            }
        }
        if (type == "Не выбрано") {
            point = point + 1
        } else {
            if (current['typeObject'] == type) {
                point = point + 1
            }
        }
        if (discount == "Не выбрано") {
            point = point + 1
        } else {
            if (current['socialDiscount'] > 0) {
                point = point + 1
            }
        }
        if (point == 4) {
            if(nonActiveCounter ==0 && activeCounter < 20) {
                activeCounter = activeCounter + 1
                companyList.append(createComBlockforFilter(array[counter + 1]))
            }else{
                nonActiveCounter = nonActiveCounter - 1
            }
        }

    }
    currentElementsByFilters = activeCounter
}


