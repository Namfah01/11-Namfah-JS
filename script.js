//เริ่มจากการประกาศตัวแปร
const productForm = document.getElementById('productForm');
const productDashboard = document.getElementById('productDashboard');
const cart = [];
const addToCartBtn = document.getElementById('addToCartBtn');
const calculatePriceBtn = document.getElementById('calculatePriceBtn');
const totalPrice = document.getElementById('totalPrice')



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
    <h1 class="flex text-[20px] justify-center text-pink-500">${product.name}</h1>
    <h2 class="flex text-[18px] text-blue-400 justify-center">฿${product.price}</h2>
    <img src="${product.image}" width="100" height="100" w-full class="flex justify-center pt-2" >
`;
	productElement.className = 'font-sans font-semibold text-[16px] flex-col bg-white border border-pink p-8 flex ';
    productDashboard.appendChild(productElement);      //ให้แสดงผลภายใน productDashborad
}

//add to cart
addToCartBtn.addEventListener('click', function () {       //เพิ่มeventlistening เมื่อกดปุ่มจะเลือก Product ที่ถูกเลือกใน checkbox
    const selectedProducts = document.querySelectorAll('.productSelect:checked');
    cart.length = 0;
    selectedProducts.forEach(productElement => {                 //แสดงproductที่ถูกเลือกในแต่ละครั้ง
        const name = productElement.nextElementSibling.textContent;  //แสดงข้อความในspanของproduct name
        const price = parseFloat(productElement.nextElementSibling.nextElementSibling.textContent.slice(1));  //ดึงราคามาจากspanของราคาสินค้า ฿100 โดยตัด฿ออก เพื่อให้เหลือแต่จำนวนราคาในรูปแบบของ sting จากนั้นใช้ parseFolat แปลงเป็นตัวเลขในรูปแบบทศนิยม และเก็บไว้ในรูปแบบของ price
        const image = productElement.nextElementSibling.nextElementSibling.nextElementSibling.getAttribute('src');
        cart.push({ name, price, image });;  //เพิ่ม name , price, image ของสินค้าแต่ละชิ้นลงใน cart
    });
    displayCart();  //เรียกใช้ฟังก์ชั่น
});

//displayCart กำหนดรูปแบบการแสดงผลproduct ใน cart รวมถึงปุ่ม remove product
function displayCart() {
    const cartDiv = document.getElementById('cart');      //ดึง product element จาก cart มาใส่ใน cartDiv
    cartDiv.innerHTML = ' ';  //กำหนดที่ว่างสำหรับแสดงสินค้า
    cart.forEach((product, index)=> {      //วนลูปเพื่อแสดงproductที่ถูกเลือกใน cart แต่ละครั้ง
        const productElement = document.createElement('div');
        productElement.innerHTML = `
        <h1 class="flex text-[20px] justify-center text-pink-500">${product.name}</h1>
        <h2 class="flex text-[18px] text-blue-400 justify-center">฿${product.price}</h2>
        <img src="${product.image}" width="100" height="100" w-full class="flex justify-center pt-2" >
        <i class="fa-solid fa-trash fa-lg absolute right-[8px] bottom-[18px]" style="color: #f03838;"></i>`; //กำหนดค่าให้ไอคอนอยู่ขอบล่างเพื่อความสวยงาม
            // นำข้อมูลที่ได้มาแสดงผลในรูปแบบของ product cart และเพิ่มไอคอนถังขยะ เพื่อในการลบ product ออกจาก cart

        productElement.className = 'relative font-sans font-semibold text-[16px] flex-col bg-white border border-pink p-8 flex';  //กำหนดรูปแบบตัวอักษร
        const removeBtn = productElement.querySelector('.fa-trash'); //ใช้เพื่อเลือกไอคอนถังขยะในการลบสินค้า
        removeBtn.addEventListener('click', () => removeFromCart(index)); //เมื่อคลิก0tเรียกใช้ฟังก์ชันเพื่อลบสินค้าที่เลือก

        cartDiv.appendChild(productElement);    //แสดงสินค้า productElement ใน cart
    });
}

//remove form cart
function removeFromCart(index) {   //ลบสินค้าโดยลบแค่index ของสินค้าที่เลือกเพียงชิ้นเดียว
    cart.splice(index, 1);
    displayCart(); //อัปเดตการแสดงผล
}

//calculatePrice
calculatePriceBtn.addEventListener('click', function () {        //เมื่อคลิกปุ้ม functionจะถูกเรียกใช้
    const total = cart.reduce((sum, product) => sum + product.price, 0);      //คำนวนราคาสินค้าที่ปรากฎใน array ของ cart  กำหนดค่าเริ่มต้นของ sum เป็น 0 เมื่อเพิ่มสินค้าในตระกร้า จะนำราคาใหม่มาคำนวนกับsum ที่คงเหลือก่อนหน้า
    alert(` ท่านได้ชำระเงินเป็นจำนวน  ${total.toFixed(2)} บาท`) ;     //แสดงประโยคที่กำหนดและราคาพร้อมทศนิยม 2 ตำแหน่งใน alert box
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `Total Price: ${total.toFixed(2)}฿`; //แสดงราคาพร้อมทศนิยม 2 ตำแหน่งในtotalPriceElemnet แทนที่ pay now เป็น totalprice
});




