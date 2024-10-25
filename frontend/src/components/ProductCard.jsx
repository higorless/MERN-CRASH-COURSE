import {
  Box,
  Heading,
  Image,
  HStack,
  IconButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useColorModeValue } from "../components/ui/color-mode";
import { GridItem } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { Toaster, toaster } from "../components/ui/toaster";
import { useEffect, useState } from "react";

export const ProductCard = ({ product, errorStateDriller }) => {
  const { deleteProduct } = useProductStore();
  const [deletedState, setDeletedState] = useState(false);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const handleDelete = async (pid) => {
    const { success } = await deleteProduct(pid);

    if (success) {
      setDeletedState((prev) => !prev);
      errorStateDriller(true);
    }
  };

  return (
    <>
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
              <Button colorShceme="blue">
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
