import {
  IconAddres,
  IconCategory,
  IconDate,
  IconEmail,
  IconName,
  IconTel,
} from "@/assets/icons";
import { BaseField } from "@/components/BaseField";
import { Box, Button, Flex, VStack, Text } from "@chakra-ui/react";

import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  name: string;
  category: string;
  dateOfBirth: Date;
  tel: number;
  address: string;
  email: string;
}

export const ClientsAddPostPage = () => {
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
     // dateOfBirth: new Date(),
      //tel: 0,
      address: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // Форматируем дату
    const formattedDate = data.dateOfBirth
      ? new Date(data.dateOfBirth).toLocaleDateString("ru-RU")
      : "Не указана";

    // Собираем полное сообщение
    const alertMessage = `
    Категория: ${data.category || "Не указана"}
    Дата: ${formattedDate}
    ФИО: ${data.name || "Не указано"}
    Телефон: ${data.tel || "Не указано"}
    Адресс: ${data.address || "Не указано"}
    Почта: ${data.email || "Не указано"}
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
          border="top"
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
          /* isSelect
          options={[
            { value: "1", label: "Петр" },
            { value: "2", label: "Василий" },
            { value: "3", label: "Света" },
          ]}
          validationRules={{
            name: {
              required: "Пожалуйста введите имя",
            },
          }}*/
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
          icon={IconDate}
          placeholder="Дата рождения"
          bgIcon={"blue_2"}
          name="dateOfBirth"
          control={control}
          errors={errors}
          isDatePicker
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
          name="tel"
          type="number"
          icon={IconTel}
          placeholder="Номер телефона"
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
          name="address"
          icon={IconAddres}
          placeholder="Адрес"
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
          name="email"
          border="bottom"
          icon={IconEmail}
          placeholder="Почта"
          bgIcon={"blue_2"}
          register={register}
          errors={errors}
        />
      </VStack>
    </form>
  );
};
