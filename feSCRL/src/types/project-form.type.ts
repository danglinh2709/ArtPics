export type TProjectTabKey = "projects" | "files";

export type TTabItem = {
  key: TProjectTabKey;
  label: string;
};

export type TEmptyStateConfig = {
  title: string;
  subtitle: string;
  buttonText: string;
};
