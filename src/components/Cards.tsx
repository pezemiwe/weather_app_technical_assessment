import React from "react";

import { Flex, Image, Text } from "@chakra-ui/react";

interface props {
  image?: string;
  day: string;
  humidity?: any;
}

const Cards: React.FC<props> = ({ image, day, humidity }) => {
  return (
    <Flex
      flexDir="column"
      h="230px"
      color="#000000"
      w="200px"
      borderRadius="lg"
      alignItems="center"
      justifyContent="center"
      px="20"
      py="10"
      mx="2"
      border="1px solid #C4C4C4"
      cursor="pointer"
      _hover={{ bg: "blue.100" }}
    >
      <Text fontSize="md" textAlign="center" mb="4" fontWeight="700">
        {day}
      </Text>
      <Image
        src={image}
        my="2"
        alt=""
      />
      <Text fontSize="lg" mb="1">
        Humidity
      </Text>
      <Text fontSize="md" fontWeight="700">
        {humidity}%
      </Text>
    </Flex>
  );
};
export default Cards;
