import { ADVERTISEMENT_TYPES } from "./../../../shared/constants/advertisementsFieldTypes";
import * as yup from "yup";

export const validationSchemas: Record<string, yup.AnyObjectSchema> = {
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
      .oneOf(Object.values(ADVERTISEMENT_TYPES), "Выберите категорию")
      .required(),
  }),

  [ADVERTISEMENT_TYPES.realEstate]: yup.object().shape({
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

  [ADVERTISEMENT_TYPES.auto]: yup.object().shape({
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

  [ADVERTISEMENT_TYPES.services]: yup.object().shape({
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
