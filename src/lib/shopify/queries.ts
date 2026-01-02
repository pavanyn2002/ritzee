const productFragment = `
  id
  handle
  availableForSale
  title
  description
  descriptionHtml
  options {
    id
    name
    values
  }
  priceRange {
    maxVariantPrice {
      amount
      currencyCode
    }
    minVariantPrice {
      amount
      currencyCode
    }
  }
  compareAtPriceRange {
    maxVariantPrice {
      amount
      currencyCode
    }
    minVariantPrice {
      amount
      currencyCode
    }
  }
  variants(first: 250) {
    edges {
      node {
        id
        title
        availableForSale
        selectedOptions {
          name
          value
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
      }
    }
  }
  featuredImage {
    url
    altText
    width
    height
  }
  images(first: 20) {
    edges {
      node {
        url
        altText
        width
        height
      }
    }
  }
  media(first: 10) {
    edges {
      node {
        ... on Model3d {
          sources {
            url
            mimeType
            format
            filesize
          }
        }
      }
    }
  }
  tags
  updatedAt
`;

export const getProductsQuery = /* GraphQL */ `
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ${productFragment}
        }
      }
    }
  }
`;

export const getCollectionProductsQuery = /* GraphQL */ `
  query getCollectionProducts($handle: String!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
    collection(handle: $handle) {
      products(sortKey: $sortKey, reverse: $reverse, first: 100) {
        edges {
          node {
            ${productFragment}
          }
        }
      }
    }
  }
`;

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ${productFragment}
    }
  }
`;
// Fetch Collections with their products for the Shop page
export const getCollectionsQuery = /* GraphQL */ `
  query getCollections {
    collections(first: 100, sortKey: TITLE) {
      edges {
        node {
          id
          title
          handle
          description
          products(first: 20) {
            edges {
              node {
                ${productFragment}
              }
            }
          }
        }
      }
    }
  }
`;
