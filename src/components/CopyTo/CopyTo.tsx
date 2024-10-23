import { Copy } from "lucide-react";
import "./copyto.css";
import { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

type HandleCopy = {
  handleCopy: () => void;
};

function CopyTo({ handleCopy }: HandleCopy) {
  const [open, setOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleClick = () => {
    handleCopy();
    setCopied(true);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      setCopied(false);
    }, 2000);
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <button className="button-copy" onClick={handleClick}>
            <Copy size={15} color="#fff" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content className="tooltip-content" side="top">
          {copied ? "Password Copied" : "Copy to clipboard"}
          <Tooltip.Arrow className="tooltip-arrow" color="#272727" />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default CopyTo;
