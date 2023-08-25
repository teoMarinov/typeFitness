import { Box, Text } from "@chakra-ui/react";

type propType = {
  data: any;
};

export default function NutritionLogger({ data }: propType) {
  console.log(data);
  return (
    <>
      {data.map((log: any) => (
        <Text textColor={"white"}>{log[0]}</Text>
      ))}
    </>
  );
}
