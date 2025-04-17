import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import {
  Center,
  Field,
  IconProps,
  Input,
  InputGroup,
  NativeSelect,
} from "@chakra-ui/react";
import {
  Control,
  FieldErrors,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { ru } from 'date-fns/locale/ru';
import React from "react";
import { Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker.css";
import ReactDOM from "react-dom";

registerLocale("ru", ru);

const COMMON_STYLES = {
  input: {
    height: "32px",
    borderRadius: 0,
    textStyle: "regular_14px",
    _hover: { borderColor: "none" },
    _focus: {
      border: "none",
      outline: "none",
      boxShadow: "none",
    },
    _placeholder: { color: "gray" },
    // pl: "6px",
  },
  select: {
    height: "32px",
    borderRadius: 0,
    textStyle: "regular_14px",
    color: "gray",
    _focus: {
      border: "none",
      outline: "none",
      boxShadow: "none",
    },
    _hover: { borderColor: "none" },
    _placeholder: { color: "gray" },
    pl: "40px",
  },
  error: {
    color: "#9D3841",
  },
};

const getBorderStyles = (border: BorderType) => {
  switch (border) {
    case "top":
      return {
        borderTopRadius: "7px",
        borderBottomRadius: "0",
      };
    case "bottom":
      return {
        borderBottomRadius: "7px",
        borderTopRadius: "0",
      };
    case "none":
    default:
      return {
        border: "none",
        borderRadius: "none",
      };
  }
};

type BaseFormValues = Record<string, any>;
type BorderType = "top" | "bottom" | "none" | undefined;

type FormValidationRules<T extends BaseFormValues> = {
  [K in keyof T]?: RegisterOptions<T, Path<T>>;
};

interface BaseFieldProps<T extends BaseFormValues> {
  name: Path<T>;
  control?: Control<T>; // Добавляем control для Controller
  register?: UseFormRegister<T>;
  errors: FieldErrors<T>;
  type?: string;
  placeholder?: string;
  icon: React.ComponentType<IconProps>;
  bgIcon?: string;
  isSelect?: boolean;
  isDatePicker?: boolean;
  isTimePicker?: boolean;
  options?: Array<{ value: string; label: string }>;
  validationRules?: FormValidationRules<T>;
  dateFormat?: string;
  timeFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  showTimeSelect?: boolean;
  showTimeSelectOnly?: boolean;
  border?: BorderType;
}

interface CustomInputProps {
  value?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  ref?: React.Ref<HTMLInputElement>;
  placeholder?: string;
}

const BaseField = <T extends BaseFormValues>({
  name,
  control,
  register,
  errors,
  type = "text",
  placeholder,
  icon: Icon,
  bgIcon,
  isSelect = false,
  isDatePicker = false,
  isTimePicker = false,
  options = [],
  validationRules,
  dateFormat = "dd/MM/yyyy",
  timeFormat = "HH:mm",
  minDate,
  maxDate,
  showTimeSelect = false,
  border,
}: //showTimeSelectOnly = false,
BaseFieldProps<T>) => {
  const hasError = !!errors[name];
  const errorMessage = errors[name]?.message?.toString() || "Validation error";

  // Стилизованный инпут для DatePicker
  const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
    ({ value, onClick }, ref) => (
      <Input
        onClick={onClick}
        ref={ref}
        value={value}
        placeholder={placeholder}
        pl={10} // Отступ для иконки
        width="100%"
        bg={hasError ? "red.50" : "white"}
        readOnly
        border="none" // Убираем бордер
        outline="none" // Убираем outline при фокусе
        {...COMMON_STYLES.input}
        {...getBorderStyles(border)}
      />
    )
  );

  return (
    <Field.Root required invalid={hasError}>
      <InputGroup
        width="full"
        pos="relative"
        overflow="visible"
        startElement={
          <Center bg={bgIcon} boxSize={"20px"} borderRadius={"5px"}>
            <Icon boxSize={"12px"} />
          </Center>
        }
      >
        {isSelect ? (
          <NativeSelect.Root>
            <NativeSelect.Field
              {...register?.(name, validationRules?.[name])}
              borderColor={hasError ? "#9D3841" : "white"}
              bg={hasError ? "red.50" : "white"}
              {...COMMON_STYLES.select}
              {...getBorderStyles(border)}
              m={0}
              py={0}
            >
              {placeholder && <option value="">{placeholder}</option>}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        ) : isDatePicker || isTimePicker ? (
          <Controller
            control={control}
            name={name}
            rules={validationRules?.[name]}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                popperPlacement="bottom-start"
                popperContainer={({ children }) =>
                  ReactDOM.createPortal(children, document.body)
                }
                locale="ru"
                selected={value ? new Date(value) : null}
                onChange={(date: Date | null) => {
                  if (date) {
                    onChange(date);
                  } else {
                    onChange(null); // или другое значение по умолчанию
                  }
                }}
                placeholderText={placeholder}
                dateFormat={
                  isTimePicker && !isDatePicker
                    ? timeFormat
                    : isDatePicker && !showTimeSelect
                    ? dateFormat
                    : `${dateFormat} ${timeFormat}`
                }
                minDate={minDate}
                maxDate={maxDate}
                showTimeSelect={showTimeSelect || isTimePicker}
                showTimeSelectOnly={isTimePicker}
                timeFormat={timeFormat}
                timeIntervals={15}
                customInput={<CustomInput />}
                className="react-datepicker__input"
              />
            )}
          />
        ) : (
          <Input
            {...register?.(name, validationRules?.[name])}
            type={type}
            placeholder={placeholder}
            borderColor={hasError ? "#9D3841" : "#EDEDED"}
            bg={hasError ? "red.50" : "white"}
            color={hasError ? "#9D3841" : "black"}
            {...COMMON_STYLES.input}
            {...getBorderStyles(border)}
          />
        )}
      </InputGroup>
      <Field.ErrorText {...COMMON_STYLES.error}>{errorMessage}</Field.ErrorText>
    </Field.Root>
  );
};

export { BaseField };
