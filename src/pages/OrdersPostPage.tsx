
import { Box, Flex, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hook";

export const OrdersPostPage = () => {
  const { ordersRangeStart, ordersRangeEnd } = useAppSelector(
    (state) => state.rootReducer.calendarSlice
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!ordersRangeStart) {
      navigate("/");
    }
  }, [ordersRangeStart, navigate]);

  const formatDate = (date: Date | string | null) => {
    if (!date) return "Не указана";
    const dateObj = new Date(date);
    return `${format(dateObj, "dd.MM.yyyy", { locale: ru })}, ${format(dateObj, "EEEE", { locale: ru })}`;
  };

  return (
    <Box>
      {/* Блок даты начала */}
      <DateInfoBox
        label="Дата начала"
        date={ordersRangeStart}
        formatDate={formatDate}
        bottomRounded={!ordersRangeEnd} // Скругляем низ только если нет даты окончания
      />
      
      {/* Разделитель (только если есть дата окончания) */}
      {ordersRangeEnd && (
       
          <Box
            w="full"
            //ml="40px"
            h="1px"
            bg="#A1A1A133"
          />
   
      )}

      {/* Блок даты окончания (если есть) */}
      {ordersRangeEnd && (
        <DateInfoBox
          label="Дата конца"
          date={ordersRangeEnd}
          formatDate={formatDate}
          topRounded={false} // Убираем скругление сверху
        />
      )}
    </Box>
  );
};

type DateInfoBoxProps = {
  label: string;
  date: Date | string | null;
  formatDate: (date: Date | string | null) => string;
  topRounded?: boolean;
  bottomRounded?: boolean;
};

const DateInfoBox = ({ 
  label, 
  date, 
  formatDate,
  topRounded = true,
  bottomRounded = true
}: DateInfoBoxProps) => (
  <Flex
  justifyContent="space-between"
  w="full"
  h="32px"
  alignItems="center"
  bg="white"
  px="8px"
  borderTopRadius={topRounded ? "7px" : "0"}
  borderBottomRadius={bottomRounded ? "7px" : "0"}
  >
    <Text textStyle={"regular_14px"} color="black">{label}</Text>
    <Text textStyle={"regular_14px"} color="gray">{formatDate(date)}</Text>
  </Flex>
);