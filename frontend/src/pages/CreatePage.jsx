import {
  Container,
  VStack,
  Heading,
  Box,
  Input,
  Button,
  CardDescription,
} from "@chakra-ui/react";
import { Toaster, toaster } from "../components/ui/toaster";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        description: message,
        type: "Error",
        status: "error",
        duration: "5000",
        isClosable: true,
      });
    } else {
      toaster.create({
        description: message,
        type: "Success",
        status: "success",
        duration: "5000",
        isClosable: true,
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <Container maxW={"2xl"}>
      <Toaster />
      <VStack spacing={8}>
        <Heading as={"h1"}>Create New Product</Heading>
        <Box w={"full"} p={6} rounded={"lg"} shadow={"md"}>
          <VStack>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button onClick={handleAddProduct} w={"full"}>
              {" "}
              Add new product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
