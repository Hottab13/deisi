import { useLocation, useNavigate } from "react-router-dom";
import { Box, IconProps, Tabs } from "@chakra-ui/react";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useState,
} from "react";

import { FooterMenuItem } from "./FooterMenuItem";
import {
  IconClients,
  IconEntries,
  IconFinance,
  IconOrders,
} from "@/assets/icons";

export interface FooterMenuItem {
  value: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  nameKey: string;
  link: string;
}

const footerMenu: FooterMenuItem[] = [
  { value: "entries", icon: IconEntries, nameKey: "Записи", link: "/" },
  {
    value: "orders",
    icon: IconOrders,
    nameKey: "Заказы",
    link: "/orders",
  },
  {
    value: "clients",
    icon: IconClients,
    nameKey: "Клиенты",
    link: "/clients",
  },
  {
    value: "finance",
    icon: IconFinance,
    nameKey: "Финансы",
    link: "/finance",
  },
];

const FooterMenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Определяем активный элемент на основе текущего пути
  const getActiveItem = (path: string): string => {
    const menuItem = footerMenu.find(item => 
      path.startsWith(item.link) && item.link !== "/" || 
      (item.link === "/" && path === "/")
    );
    return menuItem?.value || "entries";
  };

  const [activeItem, setActiveItem] = useState<string>(() => {
    // При инициализации проверяем localStorage или определяем по текущему пути
    const saved = localStorage.getItem("footerMenuActiveItem");
    return saved || getActiveItem(pathname);
  });

  // Обновляем активный элемент при изменении пути
  useEffect(() => {
    const currentActive = getActiveItem(pathname);
    setActiveItem(currentActive);
    localStorage.setItem("footerMenuActiveItem", currentActive);
  }, [pathname]);

  const handleItemClick = (value: string) => {
    const menuItem = footerMenu.find(item => item.value === value);
    if (menuItem) {
      navigate(menuItem.link);
    }
  };

  return (
    <Box
      w="full"
      borderTopWidth="1px"
      borderColor="bg_light"
      pos="fixed"
      bottom="0"
      left="0"
      flex={1} // Основное содержимое занимает все доступное пространство
      maxW="820px"
      mx="auto"
      zIndex={999}
      bg="bg_light"
      alignContent="center"
      h="calc(64px + env(safe-area-inset-bottom))"
      pb="env(safe-area-inset-bottom)"
    >
      <Tabs.Root value={activeItem}>
        <Tabs.List
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          position="relative"
          h="64px"
        >
          {footerMenu.map((item) => (
            <FooterMenuItem
              key={item.value}
              item={item}
              isActive={activeItem === item.value}
              onClick={() => handleItemClick(item.value)}
            />
          ))}
        </Tabs.List>
      </Tabs.Root>
    </Box>
  );
};
export { FooterMenu };
