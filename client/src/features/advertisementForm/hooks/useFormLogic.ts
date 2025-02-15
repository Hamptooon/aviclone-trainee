export const useFormLogic = (id?: string) => {
  const methods = useForm<FormData>({
    resolver: yupResolver(validationSchemas.main),
    defaultValues: DEFAULT_VALUES,
  });

  const { handleSubmit, reset, control } = methods;
  const formValues = useWatch({ control });

  return { methods, handleSubmit, reset, formValues };
};
