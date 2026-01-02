/**
 * Generate Random Test Data for Shopify
 * 
 * This script generates random product data that you can use to manually
 * create products in your Shopify admin dashboard for testing purposes.
 * 
 * Run: npx ts-node scripts/generate-test-data.ts
 */

interface ProductData {
    title: string;
    description: string;
    price: string;
    compareAtPrice?: string;
    tags: string[];
    vendor: string;
    productType: string;
    imageUrl: string;
}

interface CollectionData {
    title: string;
    handle: string;
    description: string;
}

// Random data pools
const adjectives = [
    'Premium', 'Luxury', 'Classic', 'Modern', 'Vintage', 'Trendy',
    'Elite', 'Urban', 'Minimalist', 'Bold', 'Sleek', 'Artisan'
];

const productTypes = [
    'Hoodie', 'T-Shirt', 'Sneakers', 'Jacket', 'Jeans', 'Backpack',
    'Watch', 'Sunglasses', 'Cap', 'Sweatshirt', 'Joggers', 'Boots'
];

const colors = [
    'Black', 'White', 'Navy', 'Grey', 'Beige', 'Olive', 'Burgundy',
    'Charcoal', 'Cream', 'Midnight Blue', 'Forest Green'
];

const materials = [
    'Cotton', 'Leather', 'Denim', 'Wool', 'Canvas', 'Suede',
    'Polyester Blend', 'Organic Cotton', 'Recycled Materials'
];

const descriptions = [
    'Crafted with attention to detail and designed for everyday wear.',
    'A timeless piece that combines style with functionality.',
    'Made from premium materials for lasting comfort and durability.',
    'Perfect for any occasion, from casual outings to special events.',
    'Designed with modern aesthetics and superior craftsmanship.',
    'An essential addition to your wardrobe collection.',
    'Featuring contemporary design elements and classic appeal.',
    'Built to last with quality construction and refined details.'
];

const vendors = ['Ritzee Originals', 'Urban Collective', 'Modern Essentials', 'Artisan Co.'];

const tags = [
    'new-arrival', 'bestseller', 'limited-edition', 'sustainable',
    'premium-quality', 'trending', 'exclusive', 'handcrafted'
];

// Unsplash image URLs for different product categories
const imageCategories: Record<string, string[]> = {
    'Hoodie': [
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800',
    ],
    'T-Shirt': [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
    ],
    'Sneakers': [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800',
    ],
    'Jacket': [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
    ],
    'default': [
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
    ]
};

function randomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function randomPrice(min: number, max: number): string {
    return (Math.random() * (max - min) + min).toFixed(2);
}

function generateProductTitle(): string {
    const adj = randomItem(adjectives);
    const color = randomItem(colors);
    const type = randomItem(productTypes);
    return `${adj} ${color} ${type}`;
}

function generateProductDescription(title: string, material: string): string {
    const baseDesc = randomItem(descriptions);
    return `${title} - ${baseDesc} Made from high-quality ${material.toLowerCase()} for ultimate comfort and style. Available in multiple sizes.`;
}

function getProductImage(productType: string): string {
    const category = imageCategories[productType] || imageCategories['default'];
    return randomItem(category);
}

function generateProduct(): ProductData {
    const title = generateProductTitle();
    const productType = productTypes.find(type => title.includes(type)) || randomItem(productTypes);
    const material = randomItem(materials);
    const price = randomPrice(29.99, 199.99);
    const compareAtPrice = Math.random() > 0.5 ? randomPrice(parseFloat(price) + 20, parseFloat(price) + 80) : undefined;

    return {
        title,
        description: generateProductDescription(title, material),
        price,
        compareAtPrice,
        tags: [randomItem(tags), randomItem(tags), randomItem(tags)].filter((v, i, a) => a.indexOf(v) === i),
        vendor: randomItem(vendors),
        productType,
        imageUrl: getProductImage(productType)
    };
}

function generateCollection(): CollectionData {
    const adjective = randomItem(adjectives);
    const season = randomItem(['Spring', 'Summer', 'Fall', 'Winter']);
    const year = new Date().getFullYear();

    return {
        title: `${adjective} ${season} Collection ${year}`,
        handle: `test-collection-${Date.now()}`,
        description: `Discover our ${adjective.toLowerCase()} ${season.toLowerCase()} collection featuring handpicked items that blend style with functionality. Limited time exclusive pieces.`
    };
}

// Generate test data
console.log('🎨 SHOPIFY TEST DATA GENERATOR\n');
console.log('='.repeat(60));

const collection = generateCollection();
console.log('\n📦 COLLECTION DATA:');
console.log(JSON.stringify(collection, null, 2));

console.log('\n\n🛍️  PRODUCTS DATA (5 items):\n');
const products: ProductData[] = [];
for (let i = 0; i < 5; i++) {
    const product = generateProduct();
    products.push(product);
    console.log(`\n--- Product ${i + 1} ---`);
    console.log(JSON.stringify(product, null, 2));
}

console.log('\n\n' + '='.repeat(60));
console.log('\n✅ Test data generated successfully!');
console.log('\n📋 NEXT STEPS:');
console.log('1. Copy the collection data above');
console.log('2. Go to Shopify Admin → Products → Collections');
console.log('3. Create a new collection with the data');
console.log('4. Copy each product data and create products in Shopify');
console.log('5. Add all products to the collection');
console.log('6. Visit your frontend to see the sync!\n');

// Export for programmatic use
export { generateProduct, generateCollection, type ProductData, type CollectionData };
