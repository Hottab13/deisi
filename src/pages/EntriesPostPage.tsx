import { useAppSelector } from "@/hook";
import { Box, Flex, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const EntriesPostPage = () => {
  const { entriesRangeStart, entriesRangeEnd } = useAppSelector(
    (state) => state.rootReducer.calendarSlice
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!entriesRangeStart) {
      navigate("/");
    }
  }, [entriesRangeStart, navigate]);

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
        date={entriesRangeStart}
        formatDate={formatDate}
        bottomRounded={!entriesRangeEnd} // Скругляем низ только если нет даты окончания
      />
      
      {/* Разделитель (только если есть дата окончания) */}
      {entriesRangeEnd && (
       
          <Box
            w="full"
            //ml="40px"
            h="1px"
            bg="#A1A1A133"
          />
   
      )}

      {/* Блок даты окончания (если есть) */}
      {entriesRangeEnd && (
        <DateInfoBox
          label="Дата конца"
          date={entriesRangeEnd}
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