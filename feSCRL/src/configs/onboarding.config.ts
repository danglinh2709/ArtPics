import { ImageSourcePropType } from "react-native";

export const OnboardingAssets = {
  images: [
    require("../../assets/Unsplash/photo-1764591696199-86732185c728.avif"),
    require("../../assets/Unsplash/photo-1771100732977-223db4a494da.avif"),
    require("../../assets/Unsplash/photo-1772551765247-1c512c9f507d.avif"),
    require("../../assets/Unsplash/photo-1773083405790-20dd0bed4786.avif"),
    require("../../assets/Unsplash/photo-1772289238955-4a4090a0cdb6.avif"),
    require("../../assets/Unsplash/premium_photo-1772490550401-f633cf78d2f7.avif"),
  ] as ImageSourcePropType[],
};

export const OnboardingStrings = {
  appStoreBadge: "APP OF THE DAY",
  awardsBadge: "The Best Apps for Creators",
  greeting: "Chào mừng bạn đến với SCRL",
  title: "Tạo các bài đăng trên mạng xã hội nổi bật",
  subtitle:
    "SCRL là một nền tảng thiết kế mạng xã hội được xây dựng với mục đích, được hàng triệu người sáng tạo sử dụng và yêu thích.",
  getStarted: "Bắt đầu",
  alreadyHaveAccount: "Bạn đã có tài khoản chưa?",
  login: "Đăng Nhập",
  usageSubtitle: "Đưa trải nghiệm của bạn thành của riêng bạn",
  usageTitle: "Bạn định sử dụng SCRL như thế nào?",
  usageOptions: [
    { id: "professional", label: "Cho công việc chuyên nghiệp" },
    { id: "personal", label: "Dùng cho cá nhân" },
    { id: "other", label: "Khác" },
  ],
  continue: "Tiếp tục",
};
