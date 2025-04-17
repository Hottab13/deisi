import { Flex, HStack, IconButton, IconProps, Text } from "@chakra-ui/react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";


import { useHeaderLogic } from "./hook/useHeaderLogic";
import { IconAddPost, IconBack } from "../../assets/icons";

export type MenuItem = {
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  name: string;
  path: string;
};

const Header = () => {
  const {
    isPostPath,
    isAddPostPath,
    currentSection,
    handleClickAddPost,
    handleClickBack,
  } = useHeaderLogic();

  if (isAddPostPath) {
    return null;
  }

  return (
    <Flex
      position="sticky"
      top="0"
      zIndex="sticky"
      width="100%"
      as="header"
      justify="space-between"
      align="center"
      h="63px"
      bg="bg_light"
    >
      {isPostPath ? (
        <HStack
          cursor="pointer"
          zIndex={1}
          gap="7px"
          onClick={handleClickBack}
          w="33%"
          alignItems="center"
          justifyContent="flex-start"
        >
          <IconBack h="17px" />
          <Text color="blue_2" textStyle="regular_14px">
            Назад
          </Text>
        </HStack>
      ) : (
        <Text textStyle="bold_14px" color="black" w="33%">
          {format(new Date(), " yyyy", { locale: ru })}
        </Text>
      )}

      <Text
        textStyle="bold_14px"
        color="black"
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
      >
        {currentSection?.title ?? ""}
      </Text>

      <IconButton
        onClick={handleClickAddPost}
        w="33%"
        display="flex"
        justifyContent="flex-end"
        aria-label="Добавить запись"
        variant="ghost"
      >
        <IconAddPost boxSize="17px" />
      </IconButton>
    </Flex>
  );
};
export { Header };
