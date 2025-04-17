
import { Flex, VStack, Text, HStack, Box } from "@chakra-ui/react";
import { IconArrow } from "../assets/icons";

const ClientsPage = () => {
  return (
    <VStack w="full" gap={0}>
      <DateInfoBox label="Индивидуальные" bgColor="blue_2" topRounded />
      <Flex justifyContent="flex-end" w="full" bg="white">
        <Box
          w="calc(100% - 40px)" // 100% минус отступ иконки
          ml="40px" // Совпадает с отступом иконки
          h="1px"
          bg="#A1A1A133"
        />
      </Flex>
      <DateInfoBox label="Корпоративные" bgColor="green" />
      <Flex justifyContent="flex-end" w="full" bg="white">
        <Box
          w="calc(100% - 40px)" // 100% минус отступ иконки
          ml="40px" // Совпадает с отступом иконки
          h="1px"
          bg="#A1A1A133"
        />
      </Flex>
      <DateInfoBox label="Петли" bgColor="purple" bottomRounded />
    </VStack>
  );
};

type DateInfoBoxProps = {
  label: string;
  bgColor: string;
  topRounded?: boolean;
  bottomRounded?: boolean;
};

const DateInfoBox = ({
  label,
  bgColor,
  topRounded,
  bottomRounded,
}: DateInfoBoxProps) => (
  <Flex
    justifyContent="space-between"
    w="full"
    h="32px"
    alignItems="center"
    bg="white"
    px="8px"
    // borderRadius={"7px"}
    borderTopRadius={topRounded ? "7px" : "0"}
    borderBottomRadius={bottomRounded ? "7px" : "0"}
  >
    <HStack gap="9px">
      <Box bg={bgColor} boxSize={"20px"} borderRadius={"5px"} />
      <Text textStyle={"regular_14px"} color="black">
        {label}
      </Text>
    </HStack>
    <IconArrow h="10px" />
  </Flex>
);
export default ClientsPage;
