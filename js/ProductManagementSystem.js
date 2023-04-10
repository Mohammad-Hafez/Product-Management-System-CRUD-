let productName     = document.getElementById("productName");
let productPrice    = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productCount    = document.getElementById("productCount");
let productDesc     = document.getElementById("productdesc");
let updateBtn       = document.getElementById("updateBtn");
let addBtn          = document.getElementById("addBtn");
let cancelBtn = document.getElementById("cancel");
let productList = [];
let productListName = "productList";
let currentProductIndex;
if (productList.length == 0) {
    hideTable()
}else{}
if (localStorage.getItem(productListName) == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem(productListName));
  displayProduct(productList);
}
function hideTable() {
    document.querySelector("thead").classList.add("d-none")
    document.querySelector(".search").classList.add("d-none")
}
function addProduct(){
    product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            count: productCount.value,
            desc: productDesc.value,
        }
    validateInputData()
    if (validateInputData() == true) {
                productList.push(product);
                setLocalstorage("productList", productList);
                displayProduct(productList);
                updateFormValues();
    } else {
    }
}
function displayProduct(List) {
    let dispalyCartoona = ``;
    for (let i = 0; i < List.length; i++ ){
        dispalyCartoona += 
        `<tr>
            <td>${[i+1]}</td>
            <td>${List[i].newName ? List[i].newName : List[i].name}</td>
            <td>${List[i].price}</td>
            <td>${List[i].category}</td>
            <td>${List[i].count}</td>
            <td>${List[i].desc}</td>
            <td><button onclick="getUpdateProduct(${i})" class="btn btn-outline-success btn-sm">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
        </tr>`
    }
    document.getElementById("tBody").innerHTML = dispalyCartoona;
}
function deleteProduct(delindex) {
    if (confirm("Are You Sure This Product Will be Deleted For Ever ?") == true) {
        productList.splice(delindex, 1)
        displayProduct(productList);
        setLocalstorage("productList", productList);
        if (delindex == currentProductIndex ) {
            updateFormValues();
        }
        if (productList.length == 0) {
            changeBtns()
            hideTable()
        }else { }
    }
}
function getUpdateProduct(updateIndex) {
    addBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
    cancelBtn.classList.remove("d-none")
    updateFormValues(productList[updateIndex])
    currentProductIndex = productList.indexOf(productList[updateIndex]);
    return currentProductIndex;
}
function updateProduct(i) {
    product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        count: productCount.value,
        desc: productDesc.value,
    }
    validateInputData()
    if (validateInputData() == true) {
        productList.splice(i, 1, product)
        displayProduct(productList);
        setLocalstorage("productList", productList);
        updateFormValues();
        changeBtns();
    }else {
        document.querySelector(".invalidmsg").classList.replace("d-none", "d-block")
    }
}
function searchByName(s) {
    let searchByNameList = [];
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(s.toLowerCase()) == true) {
            searchByNameList.push(productList[i]);
            productList[i].newName = productList[i].name.toLowerCase().replace(s.toLowerCase()
            , `<span class="text-danger">${s}</span>`)
        }
    }
    displayProduct(searchByNameList);
}
function cancelTranaction() {
    updateFormValues();
    changeBtns();
}
function updateFormValues(flag){
    productName.value= flag ? flag.name: ''
    productPrice.value= flag ? flag.price:''
    productCategory.value = flag ? flag.category:''
    productCount.value= flag ? flag.count:''
    productDesc.value = flag ? flag.desc : ''
    document.querySelector(".invalidmsg").classList.replace("d-block", "d-none")
    erorrFixedStyle(productName);erorrFixedStyle(productPrice);erorrFixedStyle(productCategory);erorrFixedStyle(productCount);erorrFixedStyle(productDesc); 
}
function changeBtns() {
    updateBtn.classList.add("d-none")
    cancelBtn.classList.add("d-none")
    addBtn.classList.remove("d-none")
}
function setLocalstorage(key,value) {
    localStorage.setItem(key, JSON.stringify(value));
}
    function erorrStyle(element) {
      element.style.border = "2px #f25454 solid";
      element.style.boxShadow =
        "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #f25454";
    }
    function erorrFixedStyle(ele) {
      ele.style.border = "none";
      ele.style.boxShadow = "none";
    }
function validateInputData() {
    productNameRegex = /^[A-Z]\s?([a-zA-Z0-9]){0,30}\s?([a-zA-Z0-9]){0,30}$/gm;
    productPriceRegex = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/gm
    productCategoryRegex = /^[A-Z]\s?([a-zA-Z0-9]){0,30}\s?([a-zA-Z0-9]){0,30}$/gm;
    productCountRegex = /^\d{0,9}\S$/gm
    productDescRegex = /^\S[\w\[\]`!@#$%\^&*()={}:;<>+'-]*/gm
    nameResult = productNameRegex.test(productName.value);
    priceResult = productPriceRegex.test(productPrice.value);
    categoryResult = productCategoryRegex.test(productCategory.value);
    countResult = productCountRegex.test(productCount.value);
    descResult = productDescRegex.test(productDesc.value);
    if (nameResult == false || priceResult == false || categoryResult == false || countResult == false || descResult == false) {
        if (nameResult == false) {
            erorrStyle(productName)
            document.querySelector(".invalid-name-message").classList.replace("d-none", "d-block")
        } else {
            document.querySelector(".invalid-name-message").classList.replace("d-block", "d-none");
            erorrFixedStyle(productName);
        }
        if (priceResult == false) {
            erorrStyle(productPrice)
        } else {
            erorrFixedStyle(productPrice);
        }
        if (categoryResult == false) {
            erorrStyle(productCategory)
        } else {
            erorrFixedStyle(productCategory);
        }
        if (countResult == false) {
            erorrStyle(productCount)
        } else {
            erorrFixedStyle(productCount);
        }
        if (descResult == false) {
            erorrStyle(productDesc)
        } else {
            erorrFixedStyle(productDesc);
        }
    } else {
        return true;
    }
}