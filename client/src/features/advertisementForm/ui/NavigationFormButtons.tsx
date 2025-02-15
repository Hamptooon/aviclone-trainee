import React from "react";
import { Box, Button } from "@mui/material";
import { UseFormHandleSubmit } from "react-hook-form";
import { FormData } from "../../../shared/types/types";
interface FormNavigationProps {
  activeStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: (values: Partial<FormData>) => void;
  onSubmitStep: UseFormHandleSubmit<Partial<FormData>, undefined>;
  isNextDisabled: boolean;
}

const NavigationFormButtons: React.FC<FormNavigationProps> = ({
  activeStep,
  totalSteps,
  onBack,
  onNext,
  onSubmit,
  onSubmitStep,
  isNextDisabled,
}) => {
  const onFormSubmit = onSubmitStep(onSubmit);
  const onStepSubmit = onSubmitStep(onNext);
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
      {activeStep > 0 && (
        <Button onClick={onBack} sx={{ mr: 1 }}>
          Назад
        </Button>
      )}
      {activeStep === totalSteps - 1 ? (
        <Button
          variant="contained"
          onClick={onFormSubmit}
          disabled={isNextDisabled}
        >
          Опубликовать
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={onStepSubmit}
          disabled={isNextDisabled}
        >
          Далее
        </Button>
      )}
    </Box>
  );
};

export default NavigationFormButtons;
