export type Maybe<T> = T | null;

export type Connection<T> = {
    edges: Array<Edge<T>>;
};

export type Edge<T> = {
    node: T;
};

export type Image = {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
};

export type Money = {
    amount: string;
    currencyCode: string;
};

export type ProductPriceRange = {
    minVariantPrice: Money;
    maxVariantPrice: Money;
};

export type Product = {
    id: string;
    handle: string;
    availableForSale: boolean;
    title: string;
    description: string;
    descriptionHtml: string;
    options: ProductOption[];
    priceRange: ProductPriceRange;
    featuredImage?: Image;
    images: Connection<Image>;
    variants: Connection<ProductVariant>;
    tags: string[];
    updatedAt: string;
    media?: Connection<Model3d>;
};

export type Model3d = {
    sources: {
        url: string;
        mimeType: string;
        format: string;
        filesize: number;
    }[];
};

export type ProductOption = {
    id: string;
    name: string;
    values: string[];
};

export type ProductVariant = {
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: {
        name: string;
        value: string;
    }[];
    price: Money;
};

export type Collection = {
    id: string;
    handle: string;
    title: string;
    description: string;
    products: Connection<Product>;
    updatedAt: string;
};
