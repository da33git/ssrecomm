export interface ProductList {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// export interface Categories

const toJson = (res: Response) => {
  if (res.status === 404) {
    return undefined;
  }

  return res.json();
};

export const fetchProducts = async (
  category?: string
): Promise<ProductList> => {
  const categoryPath = category ? `/category/${category}` : "";
  const res = await fetch(`https://dummyjson.com/products${categoryPath}`);
  return toJson(res);
};

export const fetchSalesProducts = async (): Promise<Product[]> => {
  const allProducts = await fetchProducts();
  return allProducts.products.filter(
    ({ discountPercentage }) => discountPercentage > 10
  );
};

// export const fetchCategories = (): Promise<string[]> =>
//   fetch("https://dummyjson.com/products/categories").then(toJson);
// export const fetchCategories = async (): Promise<string[]> => {
//   const res = await fetch("https://dummyjson.com/products/categories");

//   if (res.status === 404) {
//     return [];
//   }

//   const categories: string[] = await res.json();
//   const result = categories.map((obj) => obj.slug);
//   return result;
// };
interface Category {
  id: number;
  slug: string;
  name: string;
}

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const res = await fetch("https://dummyjson.com/products/categories");

    if (!res.ok) {
      console.error(
        `Fetch failed with status ${res.status}: ${res.statusText}`
      );
      return [];
    }

    const data: unknown = await res.json();

    // Runtime validation (safeguard)
    if (!Array.isArray(data)) {
      console.error("Unexpected data format:", data);
      return [];
    }

    // Use a type assertion with a runtime guard
    const categories = data.filter(
      (item): item is Category =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as any).slug === "string"
    );

    // Extract the slug field
    return categories.map((cat) => cat.slug);
  } catch (err) {
    console.error("Error fetching category slugs:", err);
    return [];
  }
};

export const fetchProduct = (id: string): Promise<Product> =>
  fetch(`https://dummyjson.com/products/${id}`).then(toJson);

export const fetchCategoryImage = async (category: string) => {
  // console.log("fCI_cat: ", category);

  const { products } = await fetchProducts(category);
  // console.log("fCI_prod: ", products);

  return products[0].thumbnail;
};

export const fetchTestimonials = () =>
  Promise.resolve([
    {
      text: "I recently purchased a dress from this online store and was blown away by the quality and fit. It was even better than I expected and I received so many compliments when I wore it. I'll definitely be back for more!",
      source: "Sarah D.",
    },
    {
      text: "I was hesitant to order a piece of furniture online, but the team at this online store made the process so easy and hassle-free. The item arrived on time and in perfect condition, and it looks amazing in my home. I highly recommend this store for their excellent customer service and high-quality products.",
      source: "John P.",
    },

    {
      text: "I'm always on the lookout for the latest tech gadgets, and this online store has an amazing selection. I ordered a new smartwatch and it arrived quickly and was exactly what I was looking for. The prices are also very competitive, so I know I'm getting a great deal. I'm already browsing their site for my next purchase!",
      source: "Emily R.",
    },
  ]);
