let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discounts = document.getElementById('discounts');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let searchtitle = document.getElementById("btnsearchTitle");
let searchInput = document.getElementById("search");
let searchCategoryBtn = document.getElementById("btnsearchcategory");
let searchMode="";

function getTotal(){
    if(price.value){
        let result = (+price.value - +taxes.value - +ads.value) - +discounts.value;
        total.innerHTML = result>0? result : 0;
        total.style.background="#0f0";
    }else{
        total.innerHTML='';
        total.style.background="#f10";
    }
}

let datapro = localStorage.product ? JSON.parse(localStorage.product) : [];
showData();

submit.onclick = function(){
    if(!title.value || !price.value || !category.value){
        alert("Please fill Title, Price, and Category");
        return;
    }
    let newpro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discounts.value,
        total:total.innerHTML,
        count:count.value||1,
        category:category.value
    }
    countpro(newpro);
    localStorage.setItem("product",JSON.stringify(datapro));
    cleardata();
    showData();
}

function cleardata(){
    title.value=''; price.value=''; taxes.value=''; ads.value='';
    discounts.value=''; total.innerHTML=''; count.value=''; category.value='';
}

function showData(products=datapro){
    let table='';
    for(let i=0;i<products.length;i++){
        table += `<tr>
            <td>${i+1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick="updateproduct(${i})">Update</button></td>
            <td><button onclick="deleteProduct(${i})">Delete</button></td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML=table;

    let deleteAllBtn=document.getElementById("deleteAllBtn");
    if(datapro.length>0){
        if(!deleteAllBtn){
            let btn=document.createElement("button");
            btn.id="deleteAllBtn";
            btn.textContent=`Delete All (${datapro.length})`;
            btn.style.background="#f10"; btn.style.color="#fff"; btn.style.margin="10px 0";
            btn.style.padding="10px"; btn.style.border="none"; btn.style.borderRadius="5px";
            btn.style.cursor="pointer";
            document.querySelector(".outputs").prepend(btn);
            btn.onclick=function(){datapro=[]; localStorage.removeItem("product"); showData();}
        }else{deleteAllBtn.textContent=`Delete All (${datapro.length})`;}
    }else if(deleteAllBtn) deleteAllBtn.remove();
}

function countpro(newpro){
    let c=+count.value||1;
    for(let i=0;i<c;i++) datapro.push(newpro);
}

function deleteProduct(index){datapro.splice(index,1); localStorage.setItem("product",JSON.stringify(datapro)); showData();}

function updateproduct(index){
    title.value=datapro[index].title;
    price.value=datapro[index].price;
    taxes.value=datapro[index].taxes;
    ads.value=datapro[index].ads;
    discounts.value=datapro[index].discount;
    total.innerHTML=datapro[index].total;
    category.value=datapro[index].category;

    submit.onclick=function(){
        datapro[index].title=title.value;
        datapro[index].price=price.value;
        datapro[index].taxes=taxes.value;
        datapro[index].ads=ads.value;
        datapro[index].discount=discounts.value;
        datapro[index].total=total.innerHTML;
        datapro[index].category=category.value;

        localStorage.setItem("product",JSON.stringify(datapro));
        showData();
        cleardata();
        submit.onclick=null;
    }
}

searchtitle.onclick=function(){searchMode="title"; searchInput.placeholder="Search By Title"; searchInput.value=""; showData();}
searchCategoryBtn.onclick=function(){searchMode="category"; searchInput.placeholder="Search By Category"; searchInput.value=""; showData();}
searchInput.oninput=function(){
    let term=searchInput.value.toLowerCase().trim();
    let filtered=datapro.filter(function(product){
        if(searchMode==="title") return product.title.toLowerCase().includes(term);
        if(searchMode==="category") return product.category.toLowerCase().includes(term);
        return true;
    });
    showData(filtered);
}