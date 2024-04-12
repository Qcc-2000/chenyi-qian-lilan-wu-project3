/* eslint-disable react/prop-types */
export default function MaxWidth({ children, className }) {
    return (
      <div className={`w-full mx-auto max-w-[1280px] ${className}`}>
        {children}
      </div>
    );
  }
  