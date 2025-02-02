import { createClient, groq } from "next-sanity";

// Sanity client configuration
const sanityClient = createClient({
  projectId: "w2vhrkv5", // Replace with your Sanity project ID
  dataset: "production", // Replace with your dataset name
  apiVersion: "2023-01-01", // Use your API version
  useCdn: false, // Set to true in production
});

// Query to fetch all products (product details, including image URL)
export const fetchProductsQuery = groq`
  *[_type == "products"]{
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    "image": image.asset->url,  // Fetch image URL for the product
    "category": category->title,
    description,
    inventory,
    tags
  }
`;

// Query to fetch all categories (category details, including image asset)
export const fetchCategoriesQuery = groq`
  *[_type == "categories"]{
    _id,
    title,
    "image": image.asset->url,  // Fetch only the URL of the category image
    products
  }
`;

// Query to fetch both products and categories in one call
export const fetchAllDataQuery = groq`
  {
    "products": *[_type == "products"]{
      _id,
      title,
      price,
      priceWithoutDiscount,
      badge,
      "image": image.asset->url,  // Fetch image URL for the product
      "category": category->title,
      description,
      inventory,
      tags
    },
    "categories": *[_type == "categories"]{
      _id,
      title,
      "image": image.asset->url,  // Fetch the URL of the category image
      products
    }
  }
`;

// Query to fetch a single product by its ID
export const fetchProductByIdQuery = groq`
  *[_type == "products" && _id == $id][0] {
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    "image": image.asset->url,  // Fetch image URL for the product
    "category": category->title,
    description,
    inventory,
    tags
  }
`;

// Query to fetch a single category by its ID
export const fetchCategoryByIdQuery = groq`
  *[_type == "categories" && _id == $id][0] {
    _id,
    title,
    "image": image.asset->url,  // Fetch the URL of the category image
    products
  }
`;

// Function to fetch all data using the combined query (both products and categories)
export async function fetchAllData() {
  return sanityClient.fetch(fetchAllDataQuery);
}

// Function to fetch only products
export async function fetchProducts() {
  return sanityClient.fetch(fetchProductsQuery);
}

// Function to fetch only categories
export async function fetchCategories() {
  return sanityClient.fetch(fetchCategoriesQuery);
}

// Function to fetch a product by its ID
export async function fetchProductById(id: string) {
  return sanityClient.fetch(fetchProductByIdQuery, { id });
}

// Function to fetch a category by its ID
export async function fetchCategoryById(id: string) {
  return sanityClient.fetch(fetchCategoryByIdQuery, { id });
}