import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "../ui/tabs";
import ElementSection from "./ElementSection";
import { elementConfigs } from "@/constants/drawer";

type TabConfig = {
  value: string;
  title: string;
  configKey?: keyof typeof elementConfigs;
};

const TABS: TabConfig[] = [
  { value: "all", title: "All" },
  { value: "text", title: "Text", configKey: "text" },
  { value: "media", title: "Media", configKey: "media" },
  { value: "form", title: "Form", configKey: "form" },
  { value: "misc", title: "Misc", configKey: "advanced" },
];

function ElementContent({
  handleElementAdd,
}: {
  handleElementAdd: (elementType: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filterElements = (elements: typeof elementConfigs.text) => {
    return elements.filter((element) =>
      element.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredConfigs = Object.entries(elementConfigs).reduce(
    (acc, [key, elements]) => ({
      ...acc,
      [key]: filterElements(elements),
    }),
    {} as typeof elementConfigs
  );

  const renderTabContent = (tab: TabConfig) => {
    if (tab.value === "all") {
      return (
        <div className="grid grid-rows-2 gap-4">
          {Object.entries(filteredConfigs).map(([key, elements]) =>
            elements.length > 0 ? (
              <ElementSection
                key={key}
                title={key.charAt(0).toUpperCase() + key.slice(1)}
                elements={elements}
                handleElementAdd={handleElementAdd}
              />
            ) : null
          )}
        </div>
      );
    }

    const configKey = tab.configKey;
    if (!configKey || !filteredConfigs[configKey]?.length) return null;

    return (
      <div className="grid grid-cols-2 gap-4">
        <ElementSection
          title={tab.title}
          elements={filteredConfigs[configKey]}
          handleElementAdd={handleElementAdd}
        />
      </div>
    );
  };

  return (
    <div className="mt-4">
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input 
          placeholder="Search elements..." 
          className="pl-8" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="w-full">
          {TABS.map((tab) => (
            <TabsTrigger className="w-full" key={tab.value} value={tab.value}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4">
            {renderTabContent(tab)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default ElementContent;
