import { ReactNode, useMemo } from "react";
import styles from "./HeroBanner.module.css";

export type HeroBannerProps = {
  backgroundImage?: string;
  mainImage?: string;
  children?: ReactNode;
};

const HeroBanner = ({
  backgroundImage,
  mainImage,
  children,
}: HeroBannerProps) => {
  const backgroundStyle = useMemo(
    () =>
      backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {},
    [backgroundImage]
  );

  return (
    <section className={styles.heroBanner}>
      <div className={styles.gridOverlay} style={backgroundStyle}></div>
      <div className={styles.heroContent}>
        {mainImage && (
          <div className={styles.mainImageWrapper}>
            <img
              src={mainImage}
              alt="Hora de abraças seu lado geek!"
              className={styles.mainImage}
            />
          </div>
        )}

        {children && <div className={styles.textContent}>{children}</div>}
      </div>
    </section>
  );
};

export default HeroBanner;
