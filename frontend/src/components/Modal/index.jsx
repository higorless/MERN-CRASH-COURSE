import "./centeredModal.css";
import { IoCloseOutline } from "react-icons/io5";
import { Box, Heading, Image, HStack, Button, Text } from "@chakra-ui/react";

export function MyVerticallyCenteredModal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <Box className="modal-overlay">
      <Box className="modal-content">
        <Heading>
          <Text as="h2">Edite seus itens</Text>
        </Heading>
        <Box>{children}</Box>
        <Button onClick={onClose} className="close-button">
          <IoCloseOutline style={{ color: "#000000" }} />
        </Button>
      </Box>
    </Box>
  );
}
