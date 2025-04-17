import { Tabs, Text, VStack } from "@chakra-ui/react";
interface FooterMenuItemProps {
  item: any;
  isActive: boolean;
  onClick: () => void;
}
const FooterMenuItem: React.FC<FooterMenuItemProps> = ({
  item,
  isActive,
  onClick,
}) => {
  return (
    <Tabs.Trigger
      value={item.value}
      flex="1"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      onClick={onClick}
    >
      <VStack gap={"5px"}>
        <item.icon color={isActive ? "blue_2" : "gray"} boxSize="22px" />
        <Text
          color={isActive ? "blue_2" : "gray"}
          textStyle="regular_11px"
          mb="env(safe-area-inset-bottom)"
        >
          {item.nameKey}
        </Text>
      </VStack>
    </Tabs.Trigger>
  );
};
export { FooterMenuItem };
