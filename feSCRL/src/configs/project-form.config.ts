import {
  TEmptyStateConfig,
  TProjectTabKey,
  TTabItem,
} from "../types/project-form.type";

export const TABS: TTabItem[] = [
  { key: "projects", label: "Tất cả các dự án" },
  { key: "files", label: "Tệp tin" },
];

export const EMPTY_STATE_MAP: Record<TProjectTabKey, TEmptyStateConfig> = {
  projects: {
    title: "Không có dự án",
    subtitle: "Bắt đầu một dự án mới và biến ý tưởng của bạn thành hiện thực.",
    buttonText: "Tạo dự án",
  },
  files: {
    title: "Không có thư mục",
    subtitle: "Nhóm các dự án liên quan để quản lý",
    buttonText: "Tạo thư mục",
  },
};
