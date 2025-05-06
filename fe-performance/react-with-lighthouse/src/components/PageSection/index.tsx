import { memo } from "react";

type PageSectionProps = {
  children: React.ReactNode;
};

const PageSectionComponent: React.FC<PageSectionProps> = ({ children }) => {
  return (
    <div className='bg-[url("./bg-section.webp")] h-96'>
      <section className="flex flex-col items-center justify-center h-96 bg-gradient-to-r from-[#002F52] to-[#024271] to-95% w-full opacity-90">
        {children}
      </section>
    </div>
  );
};

const PageSection = memo(PageSectionComponent);
export default PageSection;
