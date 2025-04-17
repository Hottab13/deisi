import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isWithinInterval,
  startOfMonth,
} from "date-fns";
import { ru } from "date-fns/locale";
import React from "react";

interface MonthCalendarProps {
  monthDate: Date;
  selectedDates: Date[];
  onDateClick: (day: Date) => void;
  rangeStart: Date | null;
  rangeEnd: Date | null;
}

type CalendarWeek = (Date | null)[];

const MonthCalendar: React.FC<MonthCalendarProps> = ({ monthDate, selectedDates, onDateClick, rangeStart, rangeEnd }) => {
  const today = new Date();
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const daysToShow = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays: string[] = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const startDayOfWeek: number = getDay(monthStart) === 0 ? 6 : getDay(monthStart) - 1;
  const totalDays: number = daysToShow.length;
  const totalCells: number = startDayOfWeek + totalDays;
  const totalRows: number = Math.ceil(totalCells / 7);

  // Разбиваем дни на строки (недели)
  const weeks: CalendarWeek[] = [];
  let currentWeek: CalendarWeek = [];

  // Добавляем пустые ячейки в первую неделю
  for (let i = 0; i < startDayOfWeek; i++) {
    currentWeek.push(null);
  }

  // Заполняем недели днями месяца
  daysToShow.forEach((day: Date, index: number) => {
    currentWeek.push(day);

    if (currentWeek.length === 7 || index === daysToShow.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Проверяем, находится ли день в выбранном диапазоне
  const isInRange = (day: Date): boolean => {
    if (!rangeStart || !rangeEnd) return false;
    return isWithinInterval(day, { start: rangeStart, end: rangeEnd });
  };

  // Проверяем, является ли день границей диапазона
  const isRangeEdge = (day: Date): boolean => {
    if (!rangeStart || !rangeEnd) return false;
    return isSameDay(day, rangeStart) || isSameDay(day, rangeEnd);
  };

    return (
      <Box
        overflowY="auto"
        scrollBehavior="smooth"
       // p={4}
        data-month={monthDate.toISOString()}
      >
        <Text
          textStyle="bold_14px"
          color="black"
          textTransform="capitalize"
          mb={4}
        >
          {format(monthDate, "LLLL", { locale: ru })}
        </Text>

        <Grid
          templateColumns="repeat(7, 1fr)"
          gap={"11px"}
          borderBottom="1px solid"
          borderColor="var(--gray_transparent, #A1A1A133)"
        >
          {weekDays.map((day: string) => (
            <GridItem key={day} textStyle="regular_10px" color="gray">
              {day}
            </GridItem>
          ))}
        </Grid>

        <Box>
          {weeks.map((week: CalendarWeek, weekIndex: number) => (
            <Grid
              key={`week-${weekIndex}`}
              templateColumns="repeat(7, 1fr)"
              mt="4px"
              position="relative"
              pb={weekIndex < totalRows - 1 ? "10px" : 0}
              _after={{
                content: '""',
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                height: "1px",
                backgroundColor: "var(--gray_transparent, #A1A1A133)",
                display: weekIndex < totalRows - 1 ? "block" : "none",
              }}
            >
              {week.map((day: Date | null, dayIndex: number) => {
                if (!day) {
                  return <GridItem key={`empty-${weekIndex}-${dayIndex}`} />;
                }

                const isToday = isSameDay(day, today);
                const isSelected = selectedDates.some((d) => isSameDay(d, day));
                const inRange = isInRange(day);
                const isEdge = isRangeEdge(day);

                return (
                  <GridItem
                  key={`day-${day.toString()}`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  mt="4px"
                  pt={0}
                  textStyle="regular_14px"
                  cursor="pointer"
                  color={
                    isEdge || (isSelected && selectedDates.length === 1) // Крайние или одиночная выбранная
                      ? "white"
                      : isToday && !isSelected && !inRange
                      ? "blue_2"
                      : "black"
                  }
                  bg={
                    isEdge || (isSelected && selectedDates.length === 1) // Крайние или одиночная выбранная
                      ? "blue_2"
                      : isSelected
                      ? "var(--gray_transparent, #A1A1A133)"
                      : inRange
                      ? "gray.100"
                      : "transparent"
                  }
                  borderRadius="50%"
                  boxSize={"25px"}
                  position="relative"
                  _hover={{
                    bg: isEdge || (isSelected && selectedDates.length === 1)
                      ? "blue.600"
                      : isSelected || inRange
                      ? "blue.200"
                      : "blue.50",
                  }}
                  onClick={() => onDateClick(day)}
                  _before={
                    inRange && !isEdge && !(isSelected && selectedDates.length === 1)
                      ? {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          bottom: 0,
                          left: dayIndex === 0 ? "50%" : 0,
                          right: dayIndex === 6 ? "50%" : 0,
                          bg: "gray.100",
                          zIndex: -1,
                        }
                      : undefined
                  }
                >
                  {format(day, "d")}
                  {isToday && !isSelected && !isEdge && !inRange && (
                    <Box
                      position="absolute"
                      bottom="2px"
                      left="50%"
                      transform="translateX(-50%)"
                      width="4px"
                      height="4px"
                      borderRadius="full"
                      bg="blue.500"
                    />
                  )}
                </GridItem>
                );
              })}
            </Grid>
          ))}
        </Box>
      </Box>
    );
  };

export { MonthCalendar };
