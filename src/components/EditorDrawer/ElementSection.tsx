import { memo } from 'react';
import { Element } from "@/constants/drawer";
import ElementButton from "./ElementButton";

interface ElementSectionProps {
  title: string;
  elements: Element[];
  handleElementAdd: (elementType: string) => void;
}

function ElementSection({ title, elements, handleElementAdd }: ElementSectionProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium mb-2">{title}</h3>
      {elements.map((element) => (
        <ElementButton
          key={element.id}
          {...element}
          elementType={element.id}
          onClick={() => handleElementAdd(element.id)}
        />
      ))}
    </div>
  );
}

export default memo(ElementSection);