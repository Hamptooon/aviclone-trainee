import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { setActiveStep, updateFormData, resetForm } from "./model/formSlice";
import { FormData } from "./model/types";
import { RootState } from "../../app/store/store";
import BasicStep from "./ui/BasicStep";
import CategoryStep from "./ui/CategoryStep";
import NavigationFormButtons from "./ui/NavigationFormButtons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemas } from "./model/validationSchema";
import * as yup from "yup";
import { FormProvider } from "react-hook-form";
import { AdvertisementType } from "../../shared/types/advertesementTypes";
const AdvertisementForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { activeStep, formData } = useSelector((state: RootState) => {
    return state.form;
  });

  const schema =
    validationSchemas[activeStep === 0 ? "main" : formData.type] ||
    yup.object();

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (!id) {
      dispatch(resetForm());
      methods.reset({
        type: AdvertisementType.REAL_ESTATE,
      });
    }
  }, [dispatch, id, methods]);

  const {
    register,
    handleSubmit,
    reset: resetFormHook,
    formState: { errors },
  } = methods;
  // Загрузка существующего объявления
  const { data: existingAd, isSuccess } = useQuery({
    queryKey: ["ad", id],
    queryFn: () =>
      axios
        .get<FormData>(`http://localhost:3000/items/${id}`)
        .then((res) => res.data),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess && existingAd) {
      resetFormHook(existingAd);
      dispatch(updateFormData(existingAd));
    }
  }, [isSuccess, existingAd, dispatch, resetFormHook]);
  // useEffect(() => {
  //   return () => {
  //     dispatch(resetForm());
  //   };
  // }, [dispatch]);
  const createMutation = useMutation({
    mutationFn: (data: Partial<FormData>) =>
      axios.post("http://localhost:3000/items", data),
    onSuccess: () => {
      navigate("/list");
      dispatch(resetForm());
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<FormData>) =>
      axios.put(`http://localhost:3000/items/${id}`, data),
    onSuccess: () => {
      navigate("/list");
      dispatch(resetForm());
    },
  });

  // useEffect(() => {
  //   if (existingAd) {
  //     dispatch(updateFormData(existingAd));
  //   }
  // }, [existingAd, dispatch]);

  // useEffect(() => {
  //   localStorage.setItem("adFormDraft", JSON.stringify(formData));
  // }, [formData]);

  // useEffect(() => {
  //   const draft = localStorage.getItem("adFormDraft");
  //   if (draft && !id) {
  //     dispatch(updateFormData(JSON.parse(draft)));
  //   }
  // }, []);

  const steps: string[] = ["Описание обьявления", "Детали"];

  const handleNext = (values: Partial<FormData>) => {
    dispatch(setActiveStep(activeStep + 1));
    dispatch(updateFormData(values));
  };

  const handleBack = (): void => {
    dispatch(setActiveStep(activeStep - 1));
  };

  const handleSubmitForm = (values: Partial<FormData>): void => {
    dispatch(updateFormData(values));
    console.log("values", values);
    console.log("AFTER SUBMIT");
    console.log(formData);
    if (id) {
      updateMutation.mutate(values);
    } else {
      createMutation.mutate(values);
    }
  };
  return (
    <FormProvider {...methods}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            {id ? "Редактирование обьявления" : "Создание обьявления"}
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 ? (
            // <BasicStep formData={formData} register={register} errors={errors} />
            <BasicStep />
          ) : (
            <CategoryStep
              formData={formData}
              register={register}
              errors={errors}
            />
          )}

          <NavigationFormButtons
            activeStep={activeStep}
            totalSteps={steps.length}
            onBack={handleBack}
            onNext={handleNext}
            onSubmitStep={handleSubmit}
            onSubmit={handleSubmitForm}
            isNextDisabled={false}
          />
        </Paper>
      </Container>
    </FormProvider>
  );
};

export default AdvertisementForm;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import {
//   Stepper,
//   Step,
//   StepLabel,
//   Typography,
//   Paper,
//   Container,
// } from "@mui/material";
// import { setActiveStep, updateFormData, resetForm } from "./model/formSlice";
// import { FormData } from "./model/types";
// import { RootState } from "../../app/store/store";
// import BasicStep from "./ui/BasicStep";
// import CategoryStep from "./ui/CategoryStep";
// import NavigationFormButtons from "./ui/NavigationFormButtons";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { validationSchemas } from "./model/validationSchema";
// import * as yup from "yup";
// const AdvertisementForm: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { activeStep, formData } = useSelector((state: RootState) => {
//     return state.form;
//   });

//   const schema =
//     validationSchemas[activeStep === 0 ? "main" : formData.type] ||
//     yup.object();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(schema),
//     mode: "onChange",
//   });
//   console.log("muuuu", formData);
//   const { data: existingAd } = useQuery({
//     queryKey: ["ad", id],
//     queryFn: () =>
//       axios
//         .get<FormData>(`http://localhost:3000/items/${id}`)
//         .then((res) => res.data),
//     enabled: !!id,
//   });

//   const createMutation = useMutation({
//     mutationFn: (data: Partial<FormData>) =>
//       axios.post("http://localhost:3000/items", data),
//     onSuccess: () => {
//       navigate("/list");
//       dispatch(resetForm());
//     },
//   });

//   const updateMutation = useMutation({
//     mutationFn: (data: Partial<FormData>) =>
//       axios.put(`http://localhost:3000/items/${id}`, data),
//     onSuccess: () => {
//       navigate("/list");
//       dispatch(resetForm());
//     },
//   });

//   useEffect(() => {
//     if (existingAd) {
//       dispatch(updateFormData(existingAd));
//     }
//   }, [existingAd, dispatch]);

//   useEffect(() => {
//     localStorage.setItem("adFormDraft", JSON.stringify(formData));
//   }, [formData]);

//   useEffect(() => {
//     const draft = localStorage.getItem("adFormDraft");
//     if (draft && !id) {
//       dispatch(updateFormData(JSON.parse(draft)));
//     }
//   }, []);

//   const steps: string[] = ["Описание обьявления", "Детали"];

//   const handleNext = (values: Partial<FormData>) => {
//     dispatch(setActiveStep(activeStep + 1));
//     dispatch(updateFormData(values));
//   };

//   const handleBack = (): void => {
//     dispatch(setActiveStep(activeStep - 1));
//   };

//   const handleSubmitForm = (values: Partial<FormData>): void => {
//     dispatch(updateFormData(values));
//     console.log("values", values);
//     console.log("AFTER SUBMIT");
//     console.log(formData);
//     if (id) {
//       updateMutation.mutate(values);
//     } else {
//       createMutation.mutate(values);
//     }
//   };
//   return (
//     <Container maxWidth="md">
//       <Paper sx={{ p: 4, mt: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           {id ? "Редактирование обьявления" : "Создание обьявления"}
//         </Typography>

//         <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
//           {steps.map((label) => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>

//         {activeStep === 0 ? (
//           <BasicStep formData={formData} register={register} errors={errors} />
//         ) : (
//           <CategoryStep
//             formData={formData}
//             register={register}
//             errors={errors}
//           />
//         )}

//         <NavigationFormButtons
//           activeStep={activeStep}
//           totalSteps={steps.length}
//           onBack={handleBack}
//           onNext={handleNext}
//           onSubmitStep={handleSubmit}
//           onSubmit={handleSubmitForm}
//           isNextDisabled={false}
//         />
//       </Paper>
//     </Container>
//   );
// };

// export default AdvertisementForm;
