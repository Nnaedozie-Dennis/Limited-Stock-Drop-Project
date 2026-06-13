import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-4 flex items-center rounded-full border p-2 cursor-pointer"
    >
      <ArrowLeft size={18} />
    
    </button>
  );
};

export default BackButton;
