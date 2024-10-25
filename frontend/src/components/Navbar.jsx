import { Container, Flex, Text, HStack, Button } from "@chakra-ui/react";
import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa6";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"extrabold"}
          textTransform={"uppercase"}
          textAlign={"center"}
        >
          <Link to={"/"}>Product Store</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <CiSquarePlus fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <FaMoon /> : <FaSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
