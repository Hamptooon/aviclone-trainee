// export const basicStepSchema = yup.object().shape({
//   name: yup.string().required("Name is required").min(3, "Too short"),
//   description: yup.string().required("Description is required").min(10),
//   location: yup.string().required("Location is required"),
//   type: yup.string().required("Category is required"),
//   photo: yup
//     .string()
//     .url("Invalid URL format")
//     .test(
//       "is-image-url",
//       "URL must point to an image file",
//       (value) =>
//         !value || // Allow empty
//         /\.(jpeg|jpg|gif|png|webp)$/.test(value?.toLowerCase() || "")
//     )
//     .notRequired(),
// });

// export const realEstateSchema = yup.object().shape({
//   propertyType: yup.string().required("Property type is required"),
//   area: yup
//     .number()
//     .typeError("Area must be a number")
//     .positive("Area must be positive")
//     .required("Area is required"),
//   rooms: yup
//     .number()
//     .typeError("Rooms must be a number")
//     .min(1, "At least 1 room")
//     .required("Rooms are required"),
//   price: yup
//     .number()
//     .typeError("Price must be a number")
//     .positive("Price must be positive")
//     .required("Price is required"),
// });

// export const carSchema = yup.object().shape({
//   brand: yup.string().required("Brand is required"),
//   model: yup.string().required("Model is required"),
//   year: yup
//     .number()
//     .typeError("Year must be a number")
//     .min(1900, "Year must be valid")
//     .max(new Date().getFullYear(), "Year can't be in the future")
//     .required("Year is required"),
// });

// export const serviceSchema = yup.object().shape({
//   serviceType: yup.string().required("Service type is required"),
//   experience: yup
//     .number()
//     .typeError("Experience must be a number")
//     .min(0, "Experience can't be negative")
//     .required("Experience is required"),
//   cost: yup
//     .number()
//     .typeError("Cost must be a number")
//     .positive("Cost must be positive")
//     .required("Cost is required"),
// });

import * as yup from "yup";
import { AdvertisementType } from "../../../shared/types/advertesementTypes";

export const validationSchemas: Record<
  AdvertisementType | "main",
  yup.AnyObjectSchema
> = {
  main: yup.object().shape({
    name: yup
      .string()
      .trim()
      .required("Название обязательно")
      .min(3, "Слишком короткое (минимум 3 символа)")
      .max(100, "Слишком длинное (максимум 100 символов)"),
    description: yup
      .string()
      .trim()
      .required("Описание обязательно")
      .min(10, "Слишком короткое (минимум 10 символов)")
      .max(1000, "Слишком длинное (максимум 1000 символов)"),
    location: yup
      .string()
      .trim()
      .required("Локация обязательна")
      .max(255, "Слишком длинное (максимум 255 символов)"),
    photo: yup
      .string()
      .url("Некорректный формат изображения (должен быть URL)")
      .notRequired(),
    type: yup
      .string()
      .oneOf(Object.values(AdvertisementType), "Выберите категорию")
      .required(),
  }),

  [AdvertisementType.REAL_ESTATE]: yup.object().shape({
    propertyType: yup.string().required("Выберите тип недвижимости"),
    area: yup
      .number()
      .required("Укажите площадь")
      .positive("Площадь должна быть положительной")
      .min(10, "Минимальная площадь — 10 м²")
      .max(100000, "Максимальная площадь — 100 000 м²"),
    rooms: yup
      .number()
      .required("Укажите количество комнат")
      .integer("Количество комнат должно быть целым числом")
      .min(1, "Минимум 1 комната")
      .max(50, "Максимум 20 комнат"),
    price: yup
      .number()
      .required("Укажите цену")
      .positive("Цена должна быть положительной")
      .min(1000, "Минимальная цена — 1 000")
      .max(100000000, "Максимальная цена — 100 000 000"),
  }),

  [AdvertisementType.AUTO]: yup.object().shape({
    brand: yup
      .string()
      .trim()
      .required("Выберите марку")
      .min(2, "Название марки слишком короткое")
      .max(50, "Название марки слишком длинное"),
    model: yup
      .string()
      .trim()
      .required("Введите модель")
      .min(1, "Название модели слишком короткое")
      .max(50, "Название модели слишком длинное"),
    year: yup
      .number()
      .required("Укажите год выпуска")
      .min(1900, "Год выпуска не может быть меньше 1900")
      .max(
        new Date().getFullYear(),
        `Год выпуска не может быть больше ${new Date().getFullYear()}`
      ),
    mileage: yup
      .number()
      .positive("Пробег должен быть положительным")
      .max(1000000, "Максимальный пробег — 1 000 000 км")
      .optional(),
  }),

  [AdvertisementType.SERVICES]: yup.object().shape({
    serviceType: yup
      .string()
      .trim()
      .required("Выберите тип услуги")
      .min(3, "Слишком короткое (минимум 3 символа)")
      .max(100, "Слишком длинное (максимум 100 символов)"),
    experience: yup
      .number()
      .required("Укажите опыт работы")
      .integer("Опыт работы должен быть целым числом")
      .positive("Опыт должен быть положительным")
      .min(0, "Опыт не может быть меньше 0")
      .max(70, "Максимальный опыт — 50 лет"),
    cost: yup
      .number()
      .required("Укажите стоимость")
      .positive("Стоимость должна быть положительной")
      .min(10, "Минимальная стоимость — 10")
      .max(100000000, "Максимальная стоимость — 100 000 000"),
    schedule: yup
      .string()
      .trim()
      .max(255, "Слишком длинное расписание (максимум 255 символов)")
      .optional(),
  }),
};
