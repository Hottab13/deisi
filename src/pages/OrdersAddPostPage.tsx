import {
  IconAccessories,
  IconBuyer,
  IconCategory,
  IconConstructor,
  IconDesigner,
  IconEndDate,
  IconLining,
  IconName,
  IconOrdersComment,
  IconProduct,
  IconStartDate,
  IconTailor,
  IconTextile,
} from "@/assets/icons";
import { BaseField } from "@/components/BaseField";
import { Box, Button, Flex, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";

const COLORS = ["purple", "#33AADB", "#FB2E55", "#FF9302"];

import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  name: string;
  category: string;
  startDate: Date;
  endDate: Date;
  time: string;
  products: Array<{
    product: string;
    textile: string;
    lining: string;
    accessories: string;
    comment: string;
    designer: string;
    productConstructor: string;
    tailor:string;
    buyer:string;
  }>;
}

export const OrdersAddPostPage = () => {
  const [productCount, setProductCount] = useState(1); // Начинаем с 1 блока
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
      products: [
        {
          product: "",
          textile: "",
          lining: "",
          accessories: "",
          comment: "",
          designer: "",
          productConstructor: "",
          tailor:"",
          buyer:""
        },
      ],
    },
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // Форматируем дату
    const startDate = data.startDate
      ? new Date(data.startDate).toLocaleDateString("ru-RU")
      : "Не указана";

      const endDate = data.endDate
      ? new Date(data.endDate).toLocaleDateString("ru-RU")
      : "Не указана";


    // Форматируем продукты
    const formattedProducts = data.products
      ? data.products
          .map(
            (prod, index) =>
              `Продукт ${index + 1}:
        - Название: ${prod.product}
        - Текстиль: ${prod.textile}
        - Подкладка: ${prod.lining}
        - Фурнитура: ${prod.accessories}
        - Комментарий: ${prod.comment}

        - Дизайнер: ${prod.designer}
        - Конструктор: ${prod.productConstructor}
        - Портной: ${prod.tailor}
        - Закупщик: ${prod.buyer}`
          )
          .join("\n\n")
      : "Нет продуктов";

    // Собираем полное сообщение
    const alertMessage = `
    Категория: ${data.category || "Не указана"}
    Дата приема: ${startDate}
    Дата сдачи: ${endDate}
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
              { value: "Individual", label: "Индивидуальный" },
              { value: "Corporate", label: "Корпоративный" },
              { value: "Loops", label: "Петли" },
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
              { value: "Петр", label: "Петр" },
              { value: "Василий", label: "Василий" },
              { value: "Света", label: "Света" },
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
            icon={IconStartDate}
            placeholder="Дата приема"
            bgIcon={"green"}
            name="startDate"
            control={control}
            errors={errors}
            isDatePicker
            border="top"
            dateFormat="dd-MM-yyyy"
            minDate={new Date()}
            maxDate={new Date(2100, 0, 1)}
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
            icon={IconEndDate}
            placeholder="Дата сдачи"
            bgIcon={"green"}
            name="endDate"
            control={control}
            errors={errors}
            isDatePicker
            border="bottom"
            dateFormat="dd-MM-yyyy"
            minDate={new Date()}
            maxDate={new Date(2100, 0, 1)}
          />
        </VStack>

        {Array.from({ length: productCount }).map((_, index) => {
          const colorIndex = index % COLORS.length; // Вычисляем индекс цвета (0, 1, 2, 3, 0, 1, ...)
          const bgIconProduct = COLORS[colorIndex]; // Получаем цвет из массива
          const bgIconManufacturer = COLORS[colorIndex + 1];
          return (
            <>
              <VStack w="full" gap={0} key={index} position="relative">
                <BaseField
                  border="top"
                  name={`products.${index}.product`}
                  register={register}
                  errors={errors}
                  icon={IconProduct}
                  placeholder="Изделие"
                  bgIcon={bgIconProduct} // Передаём цвет
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
                  name={`products.${index}.textile`}
                  register={register}
                  errors={errors}
                  icon={IconTextile}
                  placeholder="Ткань"
                  bgIcon={bgIconProduct} // Тот же цвет
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
                  name={`products.${index}.lining`}
                  register={register}
                  errors={errors}
                  icon={IconLining}
                  placeholder="Подкладка"
                  bgIcon={bgIconProduct} // Тот же цвет
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
                  name={`products.${index}.accessories`}
                  register={register}
                  errors={errors}
                  icon={IconAccessories}
                  placeholder="Фурнитура"
                  bgIcon={bgIconProduct} // Тот же цвет
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
                  name={`products.${index}.comment`}
                  register={register}
                  errors={errors}
                  icon={IconOrdersComment}
                  border="bottom"
                  placeholder="Комментарий"
                  bgIcon={bgIconProduct} // Тот же цвет
                />
              </VStack>

              <VStack w="full" gap={0} key={index+1} position="relative">
                <BaseField
                  border="top"
                  name={`products.${index}.designer`}
                  register={register}
                  errors={errors}
                  icon={IconDesigner}
                  placeholder="Дизайнер"
                  bgIcon={bgIconManufacturer} // Передаём цвет
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
                  name={`products.${index}.productConstructor`}
                  register={register}
                  errors={errors}
                  icon={IconConstructor}
                  placeholder="Конструктор"
                  bgIcon={bgIconManufacturer} // Тот же цвет
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
                  name={`products.${index}.tailor`}
                  register={register}
                  errors={errors}
                  icon={IconTailor}
                  placeholder="Портной"
                  bgIcon={bgIconManufacturer} // Тот же цвет
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
                  name={`products.${index}.buyer`}
                  register={register}
                  errors={errors}
                  icon={IconBuyer}
                  border="bottom"
                  placeholder="Закупщик"
                  bgIcon={bgIconManufacturer} // Тот же цвет
                />
              </VStack>
            </>
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
