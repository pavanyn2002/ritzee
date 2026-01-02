
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/products.json');
const data = fs.readFileSync(filePath, 'utf8');
const json = JSON.parse(data);

json.products = json.products.map(p => {
    // Convert based on approx 40x mulitplier to get realistic "Luxury Streetwear" INR pricing
    // e.g. 60 -> 2400. Let's make it look nice like 2499.
    p.price = Math.ceil((p.price * 50) / 100) * 100 - 1;
    if (p.originalPrice) {
        p.originalPrice = Math.ceil((p.originalPrice * 50) / 100) * 100 - 1;
    }
    return p;
});

fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
console.log('Prices updated successfully!');
