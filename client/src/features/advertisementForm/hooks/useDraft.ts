import { FormData } from "../../../shared/types/types";

const DRAFT_KEY = "adFormDraft";

export const useDraft = () => {
  const saveDraft = (formData: Partial<FormData>) => {
    localStorage.removeItem(DRAFT_KEY);
    localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
  };

  const loadDraft = (): Partial<FormData> | null => {
    const draft = localStorage.getItem(DRAFT_KEY);
    return draft ? JSON.parse(draft) : null;
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
  };

  return { saveDraft, loadDraft, clearDraft };
};
