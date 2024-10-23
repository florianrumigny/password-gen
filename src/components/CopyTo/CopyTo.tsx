import { Copy } from "lucide-react";
import "./copyto.css";

type HandleCopy = {
  handleCopy: () => void;
};

function CopyTo({ handleCopy }: HandleCopy) {
  return (
    <button className="button-copy" onClick={handleCopy}>
      <Copy size={15} color="#fff" />
    </button>
  );
}

export default CopyTo;
