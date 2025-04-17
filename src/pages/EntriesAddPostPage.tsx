import {
  IconCategory,
  IconDate,
  IconExecutor,
  IconName,
  IconProduct,
  IconStatus,
  IconTime,
} from "@/assets/icons";
import { BaseField } from "@/components/BaseField";
import { Box, Button, Flex, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";

const COLORS = ["purple", "#33AADB", "#FB2E55", "#FF9302"];

import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  name: string;
  category: string;
  date: Date;
  time: string;
  products: Array<{
    product: string;
    status: string;
    executor: string;
  }>;
}

export const EntriesAddPostPage = () => {
  const [productCount, setProductCount] = useState(1); // Начинаем с 1 блока
  //const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      category: "",
      products: [{ product: "", status: "", executor: "" }],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // Форматируем дату
    const formattedDate = data.date
      ? new Date(data.date).toLocaleDateString("ru-RU")
      : "Не указана";

    // Форматируем время
    const formattedTime = data.time
      ? new Date(data.time).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Не указано";

    // Форматируем продукты
    const formattedProducts = data.products
      ? data.products
          .map(
            (prod, index) =>
              `Продукт ${index + 1}:
        - Название: ${prod.product}
        - Исполнитель: ${prod.executor}
        - Статус: ${prod.status}`
          )
          .join("\n\n")
      : "Нет продуктов";

    // Собираем полное сообщение
    const alertMessage = `
    Категория: ${data.category || "Не указана"}
    Дата: ${formattedDate}
    Время: ${formattedTime}
    ФИО: ${data.name || "Не указано"}
    
    Продукты:
    ${formattedProducts}
  `;

    alert(alertMessage);
    console.log("Отправленные данные:", data);
  };

  const addProductBlock = () => {
    setProductCount((prev) => prev + 1);
  };
  const hendleCancel = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        position="sticky"
        top="0"
        zIndex="sticky"
        width="100%"
        w="full"
        as="header"
        justify="space-between"
        align="center"
        h="50px"
        bg="bg_light"
      >
        <Button
          onClick={hendleCancel}
          m={0}
          p={0}
          color="blue_2"
          textStyle="regular_14px"
        >
          Отмена
        </Button>

        <Text
          textStyle="bold_14px"
          color="black"
          position="absolute" // Абсолютное позиционирование
          left="50%" // Сдвигаем на 50% вправо
          transform="translateX(-50%)" // Смещаем назад на половину своей ширины
        >
          Создание
        </Text>

        <Button
          textStyle="regular_14px"
          color="gray"
          type="submit"
          m={0}
          p={0}
          // onClick={hendleClickAddPost}
          // w="33%" // Занимает 1/3 ширины
          display="flex"
          justifyContent="flex-end" // Выравниваем содержимое по правому краю
        >
          Сохранить
        </Button>
      </Flex>

      <VStack gap="30px" w="full" mt="10px">
        <VStack w="full" gap={0}>
          <BaseField
            border="top"
            name="category"
            register={register}
            errors={errors}
            icon={IconCategory}
            isSelect
            options={[
              { value: "1", label: "Индивидуальный" },
              { value: "2", label: "Корпоративный" },
              { value: "3", label: "Петли" },
            ]}
            validationRules={{
              category: {
                required: "Пожалуйста выберите категорию",
              },
            }}
            placeholder="Категория"
            bgIcon={"blue_2"}
          />
          <Flex justifyContent="flex-end" w="full" bg="white">
            <Box
              w="calc(100% - 40px)" // 100% минус отступ иконки
              ml="40px" // Совпадает с отступом иконки
              h="1px"
              bg="#A1A1A133"
            />
          </Flex>
          <BaseField
            name="name"
            register={register}
            errors={errors}
            icon={IconName}
            placeholder="Имя Фамилия"
            bgIcon={"blue_2"}
            isSelect
            border="bottom"
            options={[
              { value: "1", label: "Петр" },
              { value: "2", label: "Василий" },
              { value: "3", label: "Света" },
            ]}
            validationRules={{
              name: {
                required: "Пожалуйста выберите клиента",
              },
            }}
          />
        </VStack>
        <VStack w="full" gap={0}>
          <BaseField
            icon={IconDate}
            placeholder="Дата"
            bgIcon={"green"}
            name="date"
            control={control}
            errors={errors}
            isDatePicker
            border="top"
            dateFormat="yyyy-MM-dd"
            minDate={new Date(1900, 0, 1)}
            maxDate={new Date()}
          />
          <Flex justifyContent="flex-end" w="full" bg="white">
            <Box
              w="calc(100% - 40px)" // 100% минус отступ иконки
              ml="40px" // Совпадает с отступом иконки
              h="1px"
              bg="#A1A1A133"
            />
          </Flex>
          <BaseField
            name="time"
            border="bottom"
            icon={IconTime}
            placeholder="Время"
            bgIcon={"green"}
            control={control}
            errors={errors}
            isTimePicker
            timeFormat="HH:mm"
          />
        </VStack>

        {Array.from({ length: productCount }).map((_, index) => {
          const colorIndex = index % COLORS.length; // Вычисляем индекс цвета (0, 1, 2, 3, 0, 1, ...)
          const bgIcon = COLORS[colorIndex]; // Получаем цвет из массива

          return (
            <VStack w="full" key={index} gap={0} position="relative">
              <BaseField
                border="top"
                name={`products.${index}.product`}
                register={register}
                errors={errors}
                icon={IconProduct}
                placeholder="Изделие"
                bgIcon={bgIcon} // Передаём цвет
              />
              <Flex justifyContent="flex-end" w="full" bg="white">
                <Box
                  w="calc(100% - 40px)" // 100% минус отступ иконки
                  ml="40px" // Совпадает с отступом иконки
                  h="1px"
                  bg="#A1A1A133"
                />
              </Flex>
              <BaseField
                name={`products.${index}.status`}
                register={register}
                errors={errors}
                icon={IconStatus}
                placeholder="Статус"
                bgIcon={bgIcon} // Тот же цвет
              />
              <Flex justifyContent="flex-end" w="full" bg="white">
                <Box
                  w="calc(100% - 40px)" // 100% минус отступ иконки
                  ml="40px" // Совпадает с отступом иконки
                  h="1px"
                  bg="#A1A1A133"
                />
              </Flex>
              <BaseField
                name={`products.${index}.executor`}
                register={register}
                errors={errors}
                icon={IconExecutor}
                border="bottom"
                placeholder="Исполнитель"
                bgIcon={bgIcon} // Тот же цвет
              />
            </VStack>
          );
        })}
        <Button
          onClick={addProductBlock}
          bg="white"
          w="full"
          color="blue_2"
          height="32px"
          borderRadius="7px"
          textStyle="regular_14px"
        >
          Добавить
        </Button>
      </VStack>
    </form>
  );
};
