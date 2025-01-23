import { useEditor } from "@/contexts/EditorContext";
import { Plus, MoreVertical, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { elementTypes } from "@/constants/drawer";

interface CanvasElement {
  id: string;
  content: string;
  type: string;
}

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

  const handleAddRow = (
    e: React.MouseEvent<HTMLButtonElement>,
    sectionId: string
  ) => {
    e.stopPropagation();
    dispatch({
      type: "SELECTED_IDS",
      payload: {
        selectedIds: { sectionId },
      },
    });

    dispatch({
      type: "SET_DRAWER_TYPE",
      payload: {
        drawerType: "row",
      },
    });
    dispatch({
      type: "OPEN_DRAWER",
    });
  };

  const handleAddElement = (
    e: React.MouseEvent<HTMLButtonElement>,
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
    dispatch({
      type: "SET_DRAWER_TYPE",
      payload: {
        drawerType: "element",
      },
    });
    dispatch({
      type: "OPEN_DRAWER",
    });
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
      <div className="bg-gray-100 p-4 overflow-y-auto flex-1" id="canvas">
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
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add("bg-gray-100");
                      }}
                      onDragLeave={(e) => {
                        e.currentTarget.classList.remove("bg-gray-100");
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove("bg-gray-100");
                        const elementType =
                          e.dataTransfer.getData("elementType");
                        if (elementType) {
                          dispatch({
                            type: "ADD_ELEMENT",
                            payload: {
                              sectionId: section.id,
                              rowId: row.id,
                              columnId: column.id,
                              element: {
                                id: `${elementType}-${Date.now()}`,
                                type: elementType,
                                content: "",
                              },
                            },
                          });
                        }
                      }}
                    >
                      {column.elements.length === 0 && (
                        <div
                          className="flex justify-center items-center mb-4"
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
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

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
    </>
  );
}

export default Canvas;
