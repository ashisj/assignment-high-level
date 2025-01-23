import { useEditor } from "../contexts/EditorContext";
import { Plus, MoreVertical, Edit, Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Draggable from "react-draggable";
import EditorDrawer from "./EditorDrawer";
import { DrawerType } from "@/constants/layouts";
import { elementTypes } from "@/constants/drawer";

// Add this interface near the top of the file
interface CanvasElement {
  id: string;
  content: string;
  type: string;
}

// Add these styles near the top of the file
const selectedStyles = {
  section: "ring-2 ring-blue-500",
  row: "ring-2 ring-green-500",
  column: "ring-2 ring-purple-500",
};

function Canvas() {
  const { state, dispatch } = useEditor();
  const [editingElement, setEditingElement] = useState<CanvasElement | null>(
    null
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDrawerType, setSelectedDrawerType] =
    useState<DrawerType>(null);

  const handleAddRow = (
    e: React.MouseEvent<HTMLDivElement>,
    sectionId: string
  ) => {
    e.stopPropagation();
    dispatch({
      type: "SELECTED_IDS",
      payload: {
        selectedIds: { sectionId },
      },
    });
    setSelectedDrawerType("row");
    setDrawerOpen(true);
  };

  const handleAddElement = (
    e: React.MouseEvent<HTMLDivElement>,
    sectionId: string,
    rowId: string,
    columnId: string
  ) => {
    e.stopPropagation();
    dispatch({
      type: "SELECTED_IDS",
      payload: {
        selectedIds: { sectionId, rowId, columnId },
      },
    });
    setSelectedDrawerType("element");
    setDrawerOpen(true);
  };
  const handleDeleteElement = (
    sectionId: string,
    rowId: string,
    columnId: string,
    elementId: string
  ) => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { sectionId, rowId, columnId, elementId },
    });
  };

  const handleElementEdit = (element: CanvasElement) => {
    setEditingElement(element);
  };

  const handleElementUpdate = () => {
    if (editingElement) {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          elementId: editingElement.id,
          content: editingElement.content,
        },
      });
      setEditingElement(null);
    }
  };

  const renderElement = (element: CanvasElement) => {
    switch (element.type) {
      case elementTypes.headline:
        return <h1 className="text-4xl font-bold">{element.content}</h1>;
      case elementTypes.subheadline:
        return <h2 className="text-2xl font-semibold">{element.content}</h2>;
      case elementTypes.paragraph:
        return <p className="text-base">{element.content}</p>;
      case elementTypes.button:
        return <Button>{element.content || "Click Me"}</Button>;
      case elementTypes.image:
        return (
          <img
            src={element.content}
            alt="Content"
            className="max-w-full h-auto"
          />
        );
      default:
        return <div>{element.content}</div>;
    }
  };

  console.table(state);

  const handleBlockClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const sectionId = target.getAttribute("data-section-id");
    const rowId = target.getAttribute("data-row-id");
    const columnId = target.getAttribute("data-column-id");
    dispatch({
      type: "SELECTED_IDS",
      payload: {
        selectedIds: { sectionId, rowId, columnId },
      },
    });
  };

  // Add this helper function
  const getSelectedStyles = (
    type: "section" | "row" | "column",
    id: string
  ) => {
    const { selectedIds } = state;
    switch (type) {
      case "section":
        return selectedIds.sectionId === id ? selectedStyles.section : "";
      case "row":
        return selectedIds.rowId === id ? selectedStyles.row : "";
      case "column":
        return selectedIds.columnId === id ? selectedStyles.column : "";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4" id="canvas">
        {state.sections.map((section) => (
          <div
            key={section.id}
            className={`mb-8 bg-white rounded-lg shadow-lg p-4 transition-all ${getSelectedStyles(
              "section",
              section.id
            )}`}
            data-section-id={section.id}
            onClick={handleBlockClick}
          >
            {section.rows.length === 0 && (
              <div
                className="flex justify-center items-center mb-4"
                data-section-id={section.id}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => handleAddRow(e, section.id)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Row
                </Button>
              </div>
            )}

            {section.rows.map((row) => (
              <div
                key={row.id}
                className={`mb-4 transition-all ${getSelectedStyles(
                  "row",
                  row.id
                )}`}
                data-row-id={row.id}
                data-section-id={section.id}
              >
                <div className="flex gap-4">
                  {row.columns.map((column) => (
                    <div
                      key={column.id}
                      className={`flex-1 min-h-[100px] border-2 border-dashed border-gray-300 rounded p-2 relative transition-all ${getSelectedStyles(
                        "column",
                        column.id
                      )}`}
                      style={{ flex: column.width }}
                      data-column-id={column.id}
                      data-row-id={row.id}
                      data-section-id={section.id}
                    >
                      {column.elements.length === 0 && (
                        <div className="flex justify-center items-center mb-4"
                          data-column-id={column.id}
                          data-row-id={row.id}
                          data-section-id={section.id}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) =>
                              handleAddElement(e, section.id, row.id, column.id)
                            }
                          >
                            Add Elements
                          </Button>
                        </div>
                      )}

                      {column.elements.map((element) => (
                        // <Draggable
                        //   key={element.id}
                        //   axis="both"
                        //   handle=".drag-handle"
                        //   defaultPosition={{ x: 0, y: 0 }}
                        //   grid={[1, 1]}
                        //   scale={1}
                        // >
                        <div className="relative group bg-gray-50 p-2 mb-2 rounded">
                          <div className="drag-handle cursor-move">
                            {renderElement(element)}
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={() => handleElementEdit(element)}
                                >
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() =>
                                    handleDeleteElement(
                                      section.id,
                                      row.id,
                                      column.id,
                                      element.id
                                    )
                                  }
                                >
                                  <Trash className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleAddElement(
                                      section.id,
                                      row.id,
                                      column.id
                                    )
                                  }
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Element
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        // </Draggable>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Edit Element Dialog */}
      <Dialog
        open={!!editingElement}
        onOpenChange={() => setEditingElement(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {editingElement?.type}</DialogTitle>
          </DialogHeader>
          {editingElement?.type === "image" ? (
            <Input
              type="url"
              placeholder="Image URL"
              value={editingElement.content}
              onChange={(e) =>
                setEditingElement({
                  ...editingElement,
                  content: e.target.value,
                })
              }
            />
          ) : (
            <Textarea
              placeholder="Content"
              value={editingElement?.content}
              onChange={(e) =>
                setEditingElement({
                  ...editingElement!,
                  content: e.target.value,
                })
              }
            />
          )}
          <Button onClick={handleElementUpdate}>Save Changes</Button>
        </DialogContent>
      </Dialog>
      <EditorDrawer
        isOpen={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedDrawerType(null);
        }}
        drawerType={selectedDrawerType}
      />
    </>
  );
}

export default Canvas;
