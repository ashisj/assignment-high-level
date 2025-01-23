import { memo } from 'react';
import { RowLayout } from "@/constants/drawer";
import { Button } from "../ui/button";

interface RowLayoutButtonProps {
  layout: RowLayout;
  onClick: () => void;
}

function RowLayoutButton({ layout, onClick }: RowLayoutButtonProps) {
  return (
    <Button
      variant="outline"
      className="h-24 flex-col items-center justify-center gap-2"
      onClick={onClick}
    >
      <div className="flex gap-1">
        {layout.cols.map((width, index) => (
          <div
            key={index}
            className="h-8 border-2 border-muted rounded"
            style={{ width: `${width * 0.5}rem` }}
          />
        ))}
      </div>
      <span className="text-sm">{layout.label}</span>
    </Button>
  );
}

export default memo(RowLayoutButton);