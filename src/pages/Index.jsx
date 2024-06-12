import React, { useRef, useState, useEffect } from "react";
import { Container, IconButton, VStack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, Input } from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";

const Index = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let drawing = false;

    const startDrawing = (e) => {
      drawing = true;
      draw(e);
    };

    const endDrawing = () => {
      drawing = false;
      context.beginPath();
    };

    const draw = (e) => {
      if (!drawing) return;
      context.lineWidth = brushSize;
      context.lineCap = "round";
      context.strokeStyle = color;

      context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      context.stroke();
      context.beginPath();
      context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", endDrawing);
    canvas.addEventListener("mousemove", draw);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", endDrawing);
      canvas.removeEventListener("mousemove", draw);
    };
  }, [color, brushSize]);

  return (
    <Container centerContent maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%" height="100%">
        <Box position="absolute" top={4} right={4}>
          <IconButton aria-label="Settings" icon={<FaCog />} size="lg" onClick={onOpen} />
        </Box>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} style={{ border: "1px solid #000" }} />
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={4}>
              <label>Brush Color:</label>
              <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </Box>
            <Box>
              <label>Brush Size:</label>
              <Slider aria-label="slider-ex-1" defaultValue={brushSize} min={1} max={50} onChange={(val) => setBrushSize(val)}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;