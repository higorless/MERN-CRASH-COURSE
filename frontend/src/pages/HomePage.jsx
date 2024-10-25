import React, { useEffect, useState } from "react";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product.js";
import { ProductCard } from "../components/ProductCard.jsx";
import { Grid } from "@chakra-ui/react";
import { Toaster, toaster } from "../components/ui/toaster";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [deleteErrorStatus, setDeleteErrorStatus] = useState();

  const statusErrorReceiver = (status) => {
    setDeleteErrorStatus(status);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (deleteErrorStatus) {
      console.log("Produto deletado com sucesso!");

      toaster.create({
        description: "Produto deletado com sucesso",
        type: "Success",
        status: "success",
        duration: "5000",
        isClosable: true,
      });

      setDeleteErrorStatus(false);
    }
  }, [deleteErrorStatus]);

  return (
    <Container maxW="container.xl" py={12}>
      <Toaster />
      <VStack spacing={8}>
        <Text fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>
          Current Products
        </Text>

        <Grid
          templateColumns={{
            md: "repeat(1, 1fr)",
            lg: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
          }}
          gap={6}
          w={"full"}
        >
          {products.map((product) => {
            return (
              <ProductCard
                key={product._id}
                product={product}
                errorStateDriller={statusErrorReceiver}
              />
            );
          })}
        </Grid>

        {!products.length && (
          <Text
            fontSie="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
                paddingInline={2}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
