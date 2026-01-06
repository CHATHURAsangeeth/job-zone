import { Riple } from "react-loading-indicators";

const LoadingSnippet = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-none">
      <Riple color="#32cd32" size="medium" text="" textColor="" />
    </div>
  );
};

export default LoadingSnippet;
