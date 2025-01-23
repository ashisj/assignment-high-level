import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "../ui/tabs";
import ElementSection from "./ElementSection";
import { elementConfigs } from "@/constants/drawer";

function ElementContent({
  handleElementAdd,
}: {
  handleElementAdd: (elementType: string) => void;
}) {
  return (
    <div className="mt-4">
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input placeholder="Search elements..." className="pl-8" />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="w-full">
          {["all", "text", "media", "form", "misc"].map((tab) => (
            <TabsTrigger className="w-full" key={tab} value={tab}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid grid-rows-2 gap-4">
            <ElementSection
              title="Text"
              elements={elementConfigs.text}
              handleElementAdd={handleElementAdd}
            />
            <ElementSection
              title="Media"
              elements={elementConfigs.media}
              handleElementAdd={handleElementAdd}
            />
            <ElementSection
              title="Form"
              elements={elementConfigs.form}
              handleElementAdd={handleElementAdd}
            />
            <ElementSection
              title="Advanced Form"
              elements={elementConfigs.advanced}
              handleElementAdd={handleElementAdd}
            />
          </div>
        </TabsContent>
        <TabsContent value="text" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <ElementSection
              title="Text"
              elements={elementConfigs.text}
              handleElementAdd={handleElementAdd}
            />
          </div>
        </TabsContent>
        <TabsContent value="media" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <ElementSection
              title="Media"
              elements={elementConfigs.media}
              handleElementAdd={handleElementAdd}
            />
          </div>
        </TabsContent>
        <TabsContent value="form" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <ElementSection
              title="Form"
              elements={elementConfigs.form}
              handleElementAdd={handleElementAdd}
            />
          </div>
        </TabsContent>
        <TabsContent value="misc" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <ElementSection
              title="Advanced Form"
              elements={elementConfigs.advanced}
              handleElementAdd={handleElementAdd}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ElementContent;
