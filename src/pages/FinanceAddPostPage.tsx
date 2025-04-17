import {
  IconCategory,
  IconComment,
  IconDate,
  IconNameFinance,
  IconPaymentType,
  IconSum,
} from "@/assets/icons";
import { BaseField } from "@/components/BaseField";
import { Box, Button, Flex, VStack, Text } from "@chakra-ui/react";

import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  date: Date;
  category: string;
  paymentType: string;
  sum:number;
  nameFinance: string;
  сomment:string;
}

export const FinanceAddPostPage = () => {
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
      nameFinance: "",
      category: "",
      paymentType: "",
      сomment:""
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // Форматируем дату
    const formattedDate = data.date
      ? new Date(data.date).toLocaleDateString("ru-RU")
      : "Не указана";

    // Собираем полное сообщение
    const alertMessage = `
    Категория: ${data.category || "Не указана"}
    Дата: ${formattedDate}
    Тип: ${data.paymentType || "Не указано"}
    Сумма: ${data.sum || "Не указано"}
    Название: ${data.nameFinance || "Не указано"}
    Комментарий: ${data.сomment || "Не указано"}
  `;

    alert(alertMessage);
    console.log("Отправленные данные:", data);
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

      <VStack w="full" gap={0}>
        <BaseField
          icon={IconDate}
          placeholder="Дата"
          bgIcon={"blue_2"}
          name="date"
          border="top"
          control={control}
          errors={errors}
          isDatePicker
          dateFormat="yyyy-MM-dd"
          minDate={new Date(1900, 0, 1)}
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
          name="category"
          register={register}
          errors={errors}
          icon={IconCategory}
          isSelect
          options={[
            { value: "individual", label: "Индивидуальный" },
            { value: "corporate", label: "Корпоративный" },
            { value: "loops", label: "Петли" },
          ]}
          validationRules={{
            category: {
              required: "Пожалуйста выберите категорию",
            },
          }}
          placeholder="Категория клиента"
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
          name="paymentType"
          register={register}
          errors={errors}
          icon={IconPaymentType}
          isSelect
          options={[
            { value: "individual", label: "Индивидуальный" },
            { value: "corporate", label: "Корпоративный" },
            { value: "loops", label: "Петли" },
          ]}
          validationRules={{
            category: {
              required: "Пожалуйста выберите тип оплаты",
            },
          }}
          placeholder="Тип оплаты"
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
          name="sum"
          type="number"
          register={register}
          errors={errors}
          icon={IconSum}
          placeholder="Сумма"
          bgIcon="blue_2"
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
          name="nameFinance"
          icon={IconNameFinance}
          placeholder="Наименование"
          bgIcon={"blue_2"}
          register={register}
          errors={errors}
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
          name="сomment"
          type="texteria"
          border="bottom"
          icon={IconComment}
          placeholder="Комментарий"
          bgIcon={"blue_2"}
          register={register}
          errors={errors}
        />
      </VStack>
    </form>
  );
};
