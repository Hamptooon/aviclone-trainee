import { Home as HomeIcon, Add as AddIcon } from "@mui/icons-material";
export const NAVIGATION = [
  {
    kind: "header",
    title: "Главное меню",
  },
  {
    segment: "list",
    title: "Главная",
    icon: <HomeIcon />,
  },
  {
    segment: "form",
    title: "Разместить объявление",
    icon: <AddIcon />,
  },
  {
    kind: "divider",
  },
];
