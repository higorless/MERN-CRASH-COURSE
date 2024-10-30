import {
  Box,
  Heading,
  Image,
  HStack,
  Button,
  Text,
  Input,
  VStack,
} from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useColorModeValue } from "../components/ui/color-mode";
import { useDisclosure } from "@chakra-ui/react";
import { GridItem } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useEffect, useState } from "react";
import { MyVerticallyCenteredModal } from "../components/Modal";
import { Toaster, toaster } from "../components/ui/toaster";

export const ProductCard = ({ product, errorStateDriller }) => {
  const [deletedState, setDeletedState] = useState(false);
  const [updatedStateProduct, setUpdatedProduct] = useState(product);
  const [isOpen, setIsOpen] = useState(false);
  const { deleteProduct, updateProduct } = useProductStore();

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const handleDelete = async (pid) => {
    const { success } = await deleteProduct(pid);

    if (success) {
      setDeletedState((prev) => !prev);
      errorStateDriller(true);
    }
  };

  const handleEditProduct = () => {
    setIsOpen((prev) => !prev);
  };

  const handleUpdateProduct = async () => {
    const conditions = [
      !updatedStateProduct.name,
      !updatedStateProduct.price,
      !updatedStateProduct.price,
    ];

    if (!conditions.every) {
      return toaster.create({
        description: "Please fill out all fields",
        type: "Success",
        status: "Error",
        duration: "5000",
        isClosable: true,
      });
    }

    const { message, success } = await updateProduct(
      product._id,
      updatedStateProduct
    );

    toaster.create({
      description: message,
      type: "Success",
      status: "Error",
      duration: "5000",
      isClosable: true,
    });
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    console.log(updatedStateProduct);
  }, [updatedStateProduct]);

  return (
    <>
      <MyVerticallyCenteredModal show={isOpen} onClose={handleEditProduct}>
        <Toaster />
        <VStack>
          <Input
            placeholder="Product Name"
            name="name"
            value={updatedStateProduct.name}
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedStateProduct,
                name: e.target.value,
              })
            }
          />
          <Input
            placeholder="Price"
            name="price"
            type="number"
            value={updatedStateProduct.price}
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedStateProduct,
                price: e.target.value,
              })
            }
          />
          <Input
            placeholder="Image URL"
            name="image"
            value={updatedStateProduct.image}
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedStateProduct,
                image: e.target.value,
              })
            }
          />
          <HStack>
            <Button onClick={handleUpdateProduct}>Update</Button>
            <Button>Cancel</Button>
          </HStack>
        </VStack>
      </MyVerticallyCenteredModal>
      <GridItem>
        <Box
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          transition="all 0.3s"
          _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
          bg={bg}
        >
          <Image
            src={product.image}
            alt={product.name}
            h={48}
            w="full"
            objectFit="cover"
          />

          <Box p={4}>
            <Heading as="h3" size="md" mb={2}>
              {product.name}
            </Heading>

            <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
              ${product.price}
            </Text>

            <HStack spacing={2}>
              <Button colorShceme="blue" onClick={() => handleEditProduct()}>
                <MdEdit />
              </Button>
              <Button
                onClick={() => handleDelete(product._id)}
                colorShceme="red"
              >
                {" "}
                <MdDeleteForever />{" "}
              </Button>
            </HStack>
          </Box>
        </Box>
      </GridItem>
    </>
  );
};
