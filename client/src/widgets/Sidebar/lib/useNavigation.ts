import { useNavigate } from "react-router-dom";
export const useNavigation = () => {
  const navigate = useNavigate();

  const handleNavigate = (segment: string) => {
    navigate(`/${segment}`);
  };

  return { handleNavigate };
};
