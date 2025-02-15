export type NavigationItem = {
  kind?: string;
  title?: string;
  segment?: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
};
