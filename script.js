let title = document.getElementById(`title`);
let price = document.getElementById(`price`);
let taxes = document.getElementById(`taxes`);
let ads = document.getElementById(`ads`);
let discounts = document.getElementById(`discounts`);
let total = document.getElementById(`total`);
let count = document.getElementById(`count`);
let category = document.getElementById(`category`);
let submit = document.getElementById(`submit`);
//get total

function getTotal() {

    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value)
            - +discounts.value;
        total.innerHTML = result;
        total.style.background = `#040`;
    }
    else {
        total.innerHTML = '';
        total.style.background = `#a00d02`;

    }

}


//create product
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
}
else {
    let datapro = [];
}
submit.onclick = function () {
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discounts.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    datapro.push(newpro);
    localStorage.setItem(`product`, JSON.stringify(datapro))
    cleardata()
}






//save local storage


//clear inputs after create
function cleardata() {
    title.value = '';
    price.value = '';
    ads.value = '';
    discounts.value = '';
    taxes.value = '';
    title.innerHTML = '';
    count.value = '';
    category.value = '';
}

//read

//count

//delete

//update

//search

//clean data