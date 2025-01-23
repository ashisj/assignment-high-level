import { memo } from 'react';
import { Button } from "../ui/button";
import { ContentLayout } from '@/constants/drawer';

interface LayoutCardProps extends ContentLayout {
  onClick?: () => void;
}

function LayoutCard({
  icon,
  label,
  description,
  onClick,
  disabled
}: LayoutCardProps) {
  return (
    <Button
      variant="outline"
      className="h-auto p-4 flex-col items-start gap-2 text-left"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Button>
  );
}

export default memo(LayoutCard);