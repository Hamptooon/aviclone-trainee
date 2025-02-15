import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { setActiveStep, updateFormData, resetForm } from "./model/formSlice";
import { FormData } from "../../shared/types/types";
import { RootState } from "../../app/store/store";
import BasicStep from "./ui/BasicStep";
import CategoryStep from "./ui/CategoryStep";
import NavigationFormButtons from "./ui/NavigationFormButtons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemas } from "./model/validationSchema";
import * as yup from "yup";
import { FormProvider, useWatch } from "react-hook-form";
import { DEFAULT_VALUES } from "./config/config";
import {
  useAdvertisementById,
  useCreateAdvertisement,
  useUpdateAdvertisement,
} from "../../shared/hooks/useAdvertisement";
import { useDraft } from "./hooks/useDraft";
const AdvertisementForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;
  const { activeStep, formData } = useSelector((state: RootState) => {
    return state.form;
  });
  const getValidationSchema = () => {
    if (activeStep === 0) {
      return validationSchemas["main"];
    } else if (formData.type) {
      return validationSchemas[formData.type];
    }
    return yup.object();
  };
  const methods = useForm({
    resolver: yupResolver(getValidationSchema()),
    mode: "onChange",
    defaultValues: {
      propertyType: DEFAULT_VALUES.propertyType,
      brand: DEFAULT_VALUES.brand,
      serviceType: DEFAULT_VALUES.serviceType,
    },
  });

  const { handleSubmit, reset: resetFormHook, getValues } = methods;

  const formValues = useWatch({
    control: methods.control,
  });

  const { data: existingAd, isSuccess } = useAdvertisementById(id);

  const createMutation = useCreateAdvertisement();
  const updateMutation = useUpdateAdvertisement(id);
  useEffect(() => {
    if (isSuccess && existingAd) {
      console.log("resetHook, dispatch exisingAd");
      resetFormHook(existingAd);
      dispatch(updateFormData(existingAd));
    }
  }, [isSuccess, existingAd, dispatch, resetFormHook]);

  const { saveDraft, loadDraft, clearDraft } = useDraft();
  useEffect(() => {
    dispatch(setActiveStep(0));
    if (!isSuccess && !existingAd) {
      const draft = loadDraft();
      if (draft) {
        resetFormHook(draft);
        dispatch(updateFormData(draft));
      }
    }
  }, [existingAd, isSuccess, resetFormHook, dispatch]);

  useEffect(() => {
    if (!isSuccess && !existingAd) {
      saveDraft(formData);
    }
  }, [formData, isSuccess, existingAd]);

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, [id, existingAd]);
  useEffect(() => {
    dispatch(updateFormData(getValues()));
  }, [formValues, dispatch]);
  const steps: string[] = ["Описание обьявления", "Детали"];

  const handleNext = () => {
    dispatch(setActiveStep(activeStep + 1));
  };

  const handleBack = (): void => {
    dispatch(setActiveStep(activeStep - 1));
  };

  const handleSubmitForm = (values: Partial<FormData>): void => {
    console.log("ID", id);
    if (existingAd) {
      updateMutation.mutate(values, {
        onSuccess: () => {
          navigate("/list");
          dispatch(resetForm());
        },
      });
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          dispatch(resetForm());
          resetFormHook({});
          clearDraft();
          navigate("/list");
        },
      });
    }
  };
  return (
    <FormProvider {...methods}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            {existingAd ? "Редактирование обьявления" : "Создание обьявления"}
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 ? (
            <BasicStep />
          ) : (
            <CategoryStep formData={formData} />
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
