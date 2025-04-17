import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { addMonths, subMonths, startOfMonth } from "date-fns";
import { MonthCalendar } from "./MonthCalendar";

import { useSwipeable } from "react-swipeable";

interface CalendarProps {
  type: "entries" | "orders" | "finance";
  rangeStart: Date | null;
  rangeEnd: Date | null;
  handleDateClick: (day: Date) => void;
  selectedDates: Date[];
}

const Calendar: React.FC<CalendarProps> = ({
  type,
  rangeStart,
  rangeEnd,
  handleDateClick,
  selectedDates,
}) => {
  const linkSelektDate = (type: string) => {
    return type === "entries"
      ? "/entries-post"
      : type === "finance"
      ? "/finance-post"
      : "/orders-post";
  };
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [direction, setDirection] = useState(0); // Для анимации -1: влево, 1: вправо

  // Обработчики свайпа
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setDirection(1);
      setCurrentMonth((prev) => addMonths(prev, 1));
    },
    onSwipedRight: () => {
      setDirection(-1);
      setCurrentMonth((prev) => subMonths(prev, 1));
    },
    trackMouse: true,
    //preventDefaultTouchmoveEvent: true,
    delta: 50, // Минимальное расстояние свайпа
  });

  const handleDateSelection = () => {
    navigate(linkSelektDate(type));
  };

  // Анимация перехода
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <Box position="relative" height="100vh" overflow="hidden" {...handlers}>
      {/* Анимированный календарь */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentMonth.toString()}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
          style={{
            position: "absolute",
            width: "100%",
            // height: "calc(100vh - 60px)",
            touchAction: "pan-y",
          }}
        >
          <MonthCalendar
            monthDate={currentMonth}
            selectedDates={selectedDates}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onDateClick={handleDateClick}
          />
          {rangeStart && (
            <Button
              textStyle="regular_14px"
              borderRadius="7px"
              h="32px"
              bg="white"
              w="full"
              mt="30px"
              variant="ghost"
              color="blue_2"
              onClick={handleDateSelection}
            >
              Выбрать
            </Button>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Кнопка выбора (только при выборе диапазона) */}
    </Box>
  );
};

export default Calendar;
