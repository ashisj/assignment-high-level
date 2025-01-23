import { memo } from "react";
import { Button } from "../ui/button";
import { Element } from "@/constants/drawer";

interface ElementButtonProps extends Element {
  elementType: string;
  onClick: () => void;
}

function ElementButton({
  icon,
  label,
  iconClass = "",
  elementType,
  onClick,
  disabled,
}: ElementButtonProps) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("elementType", elementType);
  };

  return (
    <div
      draggable={!disabled}
      onDragStart={handleDragStart}
      className="cursor-move"
    >
      <Button
        variant="outline"
        className="w-full justify-start gap-2"
        onClick={onClick}
        disabled={disabled}
      >
        <span className={iconClass}>{icon}</span>
        {label}
      </Button>
    </div>
  );
}

export default memo(ElementButton);
