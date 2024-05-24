//เริ่มจากการประกาศตัวแปร
const productForm = document.getElementById('productForm');


//Create Product section
productForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;   //ประกาศตัวแปรทั้งสาม
    const price = document.getElementById('productPrice').value;
    const image = document.getElementById('productImage').value;

    if (!isNaN(price) && /\.(jpg|png|gif)$/i.test(image)) {
        const product = { name, price: parseFloat(price), image };   // เปลี่ยนราคาจาก sting มาเป็น num เพื่อให้สามารถนำไปคำนวนได้
        addProductToDashboard(product);
		document.getElementById('productName').value = '';
		document.getElementById('productPrice').value = '';
		document.getElementById('productImage').value = '';    //บรรทัด 20-22 ใส่เพื่อให้หลังจากป้อนinput และ create product เสร็จแล้ว ให้ช่องทั้งสามกลับมาแสดงผลว่างอีกครั้ง
    } else {
        alert('Invalid input');  //มีป้ายประกาศแจ้งให้ใส่ input
    }
});



