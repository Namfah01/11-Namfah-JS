//เริ่มจากการประกาศตัวแปร
const productForm = document.getElementById('productForm');
const productDashboard = document.getElementById('productDashboard');
const cart = [];
const addToCartBtn = document.getElementById('addToCartBtn');

//Create Product section
productForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;   //ประกาศตัวแปรทั้งสาม
    const price = document.getElementById('productPrice').value;
    const image = document.getElementById('productImage').value;

    if (!isNaN(price) && /\.(jpg|png|gif)$/i.test(image)) {
        const product = { name, price: parseFloat(price), image };   // เปลี่ยนราคาจาก sting มาเป็น num เพื่อให้สามารถนำไปคำนวนได้
        addProductToDashboard(product);
		document.getElementById('productName').value =  '';
		document.getElementById('productPrice').value = '';
		document.getElementById('productImage').value = '';    //ใส่เพื่อให้หลังจากป้อนinput และ create product เสร็จแล้ว ให้ช่องทั้งสามกลับมาแสดงผลว่างอีกครั้ง
    } else {
        alert('Invalid input');  //มีป้ายประกาศแจ้งให้ใส่ข้อมูล input
    }
});

//add to productdashbord section
function addProductToDashboard(product) {
    const productElement = document.createElement('div');           //สร้างelementใหม่ซึ่งก็คือ div ที่ภายในมี checkbox ที่แสดงผลproduct name,price ในรูปแบบของspan พร้อมทั้งกำหนดขนาดของภาพ
    productElement.innerHTML = `
        <input type="checkbox" class="productSelect">
        <span>${product.name}</span>
        <span>฿${product.price}</span>
        <img src="${product.image}" width="100" height="100">
    `;
	productElement.className = 'font-sans font-semibold text-[18px]';
    productDashboard.appendChild(productElement);       //ให้แสดงผลภายใน productDashborad
}

//add to cart
addToCartBtn.addEventListener('click', function () {       //เพิ่มeventlistening เมื่อกดปุ่มจะเลือก Product ที่ถูกเลือกใน checkbox
    const selectedProducts = document.querySelectorAll('.productSelect:checked');
    cart.length = 0;
    selectedProducts.forEach(productElement => {                 //แสดงproductที่ถูกเลือกในแต่ละครั้ง
        const name = productElement.nextElementSibling.textContent;  //แสดงข้อความในspanของproduct name
        const price = parseFloat(productElement.nextElementSibling.nextElementSibling.textContent.slice(1));  //ดึงราคามาจากspanของราคาสินค้า ฿100 โดยตัด฿ออก เพื่อให้เหลือแต่จำนวนราคาในรูปแบบของ sting จากนั้นใช้ parseFolat แปลงเป็นตัวเลขในรูปแบบทศนิยม และเก็บไว้ในรูปแบบของ price
        cart.push({ name, price });  //เพิ่ม name , price ของสินค้าแต่ละชิ้นลงใน cart
    });
    displayCart();  //เรียกใช้ฟังก์ชั่น
});

//displayCart กำหนดรูปแบบการแสดงผลproduct ใน class
function displayCart() {
    const cartDiv = document.getElementById('cart');      //ดึง product element จาก cart มาใส่ใน cartDiv
    cartDiv.innerHTML = 'Cart: ';  //กำหนดข้อความเริ่มต้นที่แสดงในcartDiv
    cart.forEach(product => {      //วนลูปเพื่อแสดงproductที่ถูกเลือกใน cart แต่ละครั้ง
        cartDiv.innerHTML += `${product.name} (฿${product.price}), `;   //นำค่าที่ได้มาแสดงผลในรูปแบบ name ,price(฿100)
    });
}


