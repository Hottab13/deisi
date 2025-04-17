import { useLocation, useNavigate } from "react-router-dom";

const PATH_CONFIG = {
  entries: {
    base: "/",
    post: "/entries-post",
    add: "/entries-add-post",
    title: "Записи",
  },
  finance: {
    base: "/finance",
    post: "/finance-post",
    add: "/finance-add-post",
    title: "Финансы",
  },
  clients: {
    base: "/clients",
    post: "/clients-post",
    add: "/clients-add-post",
    title: "Клиенты",
  },
  orders: {
    base: "/orders",
    post: "/orders-post",
    add: "/orders-add-post",
    title: "Заказы",
  },
} as const;

export const useHeaderLogic = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const currentSection = (() => {
    if (
      pathname === PATH_CONFIG.entries.base ||
      pathname === PATH_CONFIG.entries.post
    ) {
      return PATH_CONFIG.entries;
    }
    if (
      pathname === PATH_CONFIG.finance.base ||
      pathname === PATH_CONFIG.finance.post
    ) {
      return PATH_CONFIG.finance;
    }
    if (
      pathname === PATH_CONFIG.clients.base ||
      pathname === PATH_CONFIG.clients.post
    ) {
      return PATH_CONFIG.clients;
    }
    if (
      pathname === PATH_CONFIG.orders.base ||
      pathname === PATH_CONFIG.orders.post
    ) {
      return PATH_CONFIG.orders;
    }
    return null;
  })();

  const isPostPath = Object.values(PATH_CONFIG).some(
    (config) => config.post === pathname
  );

  const isAddPostPath = Object.values(PATH_CONFIG).some(
    (config) => config.add === pathname
  );

  const handleClickAddPost = () => {
    if (currentSection) {
      navigate(currentSection.add);
    }
  };

  const handleClickBack = () => {
    navigate(-1);
  };

  return {
    pathname,
    isPostPath,
    isAddPostPath,
    currentSection,
    handleClickAddPost,
    handleClickBack,
  };
};
