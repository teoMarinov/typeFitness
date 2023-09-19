import { Box, Heading, Center } from "@chakra-ui/react";
import image from "../../../images/5bd35dee2f759-wallpaper-preview.jpg";

export default function DietPlannerHomeDemo() {
  return (
    <Box
      bgImage={image}
      backgroundSize="cover"
      backgroundPosition="center"
      height="330px"
      w={"630px"}
      _hover={{
        transform: "translateY(-15px)",
      }}
      transition="transform 0.2s ease"
    >
      <Box
        rounded={"xl"}
        height="330px"
        w="630px"
        style={{
          backdropFilter: "blur(3px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Center height="full">
          <Heading color={"white"}>Set up a diet</Heading>
        </Center>
      </Box>
    </Box>
  );
}
