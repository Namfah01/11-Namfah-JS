//เริ่มจากการประกาศตัวแปร
const productForm = document.getElementById('productForm');
const productDashboard = document.getElementById('productDashboard');


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
    const productElement = document.createElement('div');           //สร้างelementใหม่ซึ่งก็คือ div ที่ภายในมี checkbox ที่แสดงผลproduct name,price พร้อมทั้งกำหนดขนาดของภาพ
    productElement.innerHTML = `
        <input type="checkbox" class="productSelect">
        <span>${product.name}</span>
        <span>฿${product.price}</span>
        <img src="${product.image}" width="100" height="100">
    `;
	productElement.className = 'font-sans font-semibold text-[18px]';
    productDashboard.appendChild(productElement);       //ให้แสดงผลภายใน productDashborad
}



