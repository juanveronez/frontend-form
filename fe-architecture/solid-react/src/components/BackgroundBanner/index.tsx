import { FC } from "react";
import HeroBanner, { HeroBannerProps } from "../HeroBanner";

type BackgroundBannerProps = Pick<HeroBannerProps, "backgroundImage">;

const BackgroundBanner: FC<BackgroundBannerProps> = ({ backgroundImage }) => (
  <HeroBanner backgroundImage={backgroundImage} />
);

export default BackgroundBanner;
