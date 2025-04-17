import { Outlet } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";
import ScrollToTop from "./ScrollToTop";
import { Header } from "./Header/Header";
import { FooterMenu } from "./Footer/FooterMenu/FooterMenu";

const Layout: React.FC = () => {
  return (
    <Container
      px={4} // Горизонтальный отступ на всех устройствах
      mx="auto" // Центрирование
      maxW={{
        base: "100%", // На мобилах и планшетах - полная ширина
        md: "48rem", // ~768px (планшеты в портретной ориентации)
        lg: "62rem", // ~992px (небольшие ноутбуки)
        xl: "80rem", // ~1280px (большие экраны)
        "2xl": "90rem", // ~1440px (Full HD+)
      }}
      w="100%"
      bg="bg_light"
      minH="100vh" // Минимальная высота на весь экран
      display="flex"
      flexDirection="column"
      position="relative"
    >
      <ScrollToTop />

      <Header />

      <Box
        as="main"
        flex={1} // Основное содержимое занимает все доступное пространство
        w="100%"
        maxW="820px"
        mx="auto"
        height="100vh"
        overflow="hidden"
      >
        <Outlet />
      </Box>

      {/* Если Footer нужен */}
      <FooterMenu />
    </Container>
  );
};

export { Layout };
