import { create } from "zustand";

let hotReloadController;

export const useProductStore =
  hotReloadController ??
  create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
      if (!newProduct.name || !newProduct.image || !newProduct.price) {
        return { success: false, message: "Please fill in all fields" };
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product Created Successfully" };
    },
    fetchProducts: async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      set({ products: data.data });
      return { success: true, message: "All products listed" };
    },
    deleteProduct: async (pid) => {
      try {
        const res = await fetch(`/api/products/${pid}`, {
          method: "DELETE",
        });
        const data = await res.json();

        set((state) => ({
          products: state.products.filter((product) => product._id !== pid),
        }));
        return { success: true, message: data.message };
      } catch (err) {
        console.error("Connection Error: ", err);
        return {
          success: false,
          message: "Error trying to connect with the server",
        };
      }
    },
  }));
