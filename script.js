const categoryList = document.querySelector(".categories");
const productList = document.querySelector(".products");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const modal = document.getElementById("modal-wrapper");
const modalList = document.querySelector(".modal-list");



document.addEventListener('DOMContentLoaded', () => {
    //CALLBACK > İçerisinde başka fonksiyon çalıştıran fonksiyon
    fetchCategories();
    fetchProducts();
});

function fetchCategories() {
    fetch('https://api.escuelajs.co/api/v1/categories')
        //* gelen veriyi işleme
        .then(response => response.json())
        //* gelen datayı foreach ile her bir obje için fonk çalıştırma 
        .then((data) => data.slice(1, 5).forEach((category) => {
            //* gelen her bir objeyi oluşturulan div'in içine atma
            const categoryDiv = document.createElement('div');
            // Dive class ekleme
            categoryDiv.classList.add('category');
            // Divin içeriğini değiştirme
            categoryDiv.innerHTML = `
        <img src="${category.image}"/>
        <span>${category.name}</span>
     `;
            // Oluşan categoryi htmldeki listeye atma
            categoryList.appendChild(categoryDiv);
        })
        )
        .catch(err => console.log(err))
};

function fetchProducts() {
    // api YE İSTEK ATMA
    fetch('https://api.escuelajs.co/api/v1/products') //endpoint
        // İstek başarılı olursa veriyi işle
        .then((res) => res.json())
        // işlenen veriyi al ve ekrana bas
        .then((data) =>
            data.slice(1, 25).forEach((product) => {
                // DİV oluştur
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                //* içeriği değiştir
                productDiv.innerHTML = `
        <img src="${product.images[0]}" />
          <p class="product-title">${product.title}</p>
          <p class="product-category">${product.name}</p>
          <div class="product-action">
            <p>${product.price} $</p>
            <button onclick="addBasket({id: '${product.id}',name: '${product.title}', price: '${product.price}', image: '${product.images[0]}', amount:1})">Add to Basket</button>
          </div>
        </div>
      `;
                // htmle göndericez
                productList.appendChild(productDiv);
            })
        )
        // hata olursa devreye gir
        .catch();
}


const basket = [];

const addList = () => {
    let totalPrice = 0;
    modalList.innerHTML = '';
  
    basket.forEach((product) => {
      const listItem = document.createElement("div");
      listItem.classList.add("list-item");
      listItem.innerHTML = `
        <div>
          <img src="${product.image}" alt="">
        </div>
        <h4>${product.name}</h4>
        <h4>${product.price}</h4>
        <p> ${product.amount}</p>
      `;
      modalList.appendChild(listItem);
  
      totalPrice += product.price * product.amount;
    });
  
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = totalPrice.toFixed(0);
  };

//* butonlara tıklama olayını izler
openBtn.addEventListener("click", ()=>{
    toggleModal();
    addList();
});
closeBtn.addEventListener("click", ()=>{
    toggleModal();
    modalList.innerHTML='';
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = '0';
  });

//* dışarıya tıklanırsa da kapat*/

modal.addEventListener('click', (e) => {
    if (e.target.id !== "modal") {
        modal.classList.remove('active');
        modalList.innerHTML='';        
    }
});

//*classına active sınıfı eklenir çıkarılır
function toggleModal() {
    modal.classList.toggle('active');
}

// //! Sepete Ekleme İşlemi


function addBasket(product) {
    const findItem = basket.find((i) => i.id === product.id);
    if (findItem) {
      findItem.amount += 1;
    } else {
      basket.push(product);
    }
    addList();
  }





