import { Box, Heading, Center } from "@chakra-ui/react";
import image from "../../images/old-school-gym.jpg";

export default function LoggerHomeDemo() {
  return (
    <Box
      bgImage={image}
      backgroundSize="cover"
      backgroundPosition="center"
      height="330px"
      rounded={"xl"}
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
          <Heading color={"white"}>Track your workouts</Heading>
        </Center>
      </Box>
    </Box>
  );
}
