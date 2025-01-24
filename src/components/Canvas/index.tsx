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
  const [editingElement, setEditingElement] = useState<CanvasElement | null>(null);
  const [draggedItem, setDraggedItem] = useState<{
    type: "section" | "row" | "column" | "element";
    sectionId: string;
    sectionIndex: number;
    rowId?: string;
    rowIndex?: number;
    columnId?: string;
    columnIndex?: number;
    elementId?: string;
    elementIndex?: number;
  } | null>(null);

  const handleAddRow = (
    e: React.MouseEvent<HTMLButtonElement>,
    sectionId: string
  ) => {
    e.stopPropagation();
    dispatch({ type: "SELECTED_IDS", payload: { selectedIds: { sectionId } } });
    dispatch({ type: "SET_DRAWER_TYPE", payload: { drawerType: "row" } });
    dispatch({ type: "OPEN_DRAWER" });
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
      payload: { selectedIds: { sectionId, rowId, columnId } },
    });
    dispatch({ type: "SET_DRAWER_TYPE", payload: { drawerType: "element" } });
    dispatch({ type: "OPEN_DRAWER" });
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

  const handleElementEdit = (element: CanvasElement) => setEditingElement(element);

  const handleElementUpdate = () => {
    if (editingElement) {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: { elementId: editingElement.id, content: editingElement.content },
      });
      setEditingElement(null);
    }
  };

  const renderElement = (element: CanvasElement) => {
    switch (element.type) {
      case elementTypes.headline:
        return <h1 className="text-4xl font-bold">{element.content || "Add your Headline"}</h1>;
      case elementTypes.subheadline:
        return <h2 className="text-2xl font-semibold">{element.content || "Add your Subheadline"}</h2>;
      case elementTypes.paragraph:
        return <p className="text-base">{element.content || "Add your Paragraph"}</p>;
      case elementTypes.button:
        return <Button>{element.content || "Click Me"}</Button>;
      case elementTypes.image:
        return <img src={element.content || "/upload.png"} alt="Content" className="max-w-full h-auto" />;
      case elementTypes.bulletList:
        return (
          <ul className="list-disc pl-6">
            {element.content
              ? element.content.split("\n").map((item, index) => (
                  <li key={index}>{item.trim() || "List item"}</li>
                ))
              : <li>Add list items</li>}
          </ul>
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
    dispatch({ type: "SELECTED_IDS", payload: { selectedIds: { sectionId, rowId, columnId } } });
  };

  const getSelectedStyles = (
    type: "section" | "row" | "column",
    id: string
  ) => {
    const { selectedIds } = state;
    return selectedIds[`${type}Id`] === id ? selectedStyles[type] : "";
  };

  const handleDragStart = (
    e: React.DragEvent,
    type: string,
    sectionId: string,
    sectionIndex: number,
    rowId?: string,
    rowIndex?: number,
    columnId?: string,
    columnIndex?: number,
    elementId?: string,
    elementIndex?: number
  ) => {
    e.stopPropagation();
    setDraggedItem({ type, sectionId, sectionIndex, rowId, rowIndex, columnId, columnIndex, elementId, elementIndex });
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ type, sectionId, sectionIndex, rowId, rowIndex, columnId, columnIndex, elementId, elementIndex })
    );
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-gray-100");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("bg-gray-100");
  };

  const handleDrop = (
    e: React.DragEvent,
    targetType: string,
    targetSectionId: string,
    targetSectionIndex: number,
    targetRowId: string,
    targetRowIndex: number,
    targetColumnId: string,
    targetColumnIndex: number
  ) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-gray-100");

    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    if (data.type === targetType) {
      dispatch({
        type: "REORDER_ITEMS",
        payload: {
          itemType: targetType,
          sectionSourceIndex: data.sectionIndex,
          sectionTargetIndex: targetSectionIndex,
          rowSourceIndex: data.rowIndex,
          rowTargetIndex: targetRowIndex,
          columnSourceIndex: data.columnIndex,
          columnTargetIndex: targetColumnIndex,
        },
      });
    }
    setDraggedItem(null);
  };

  return (
    <>
      <div className="bg-gray-100 p-4 overflow-y-auto flex-1" id="canvas">
        {state.sections.map((section, sectionIndex) => (
          <div
            key={section.id}
            draggable
            onDragStart={(e) => handleDragStart(e, "section", section.id, sectionIndex)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "section", section.id, sectionIndex)}
            className={`mb-8 bg-white rounded-lg shadow-lg p-4 transition-all ${
              draggedItem?.sectionId === section.id ? "opacity-50" : ""
            } ${getSelectedStyles("section", section.id)}`}
            data-section-id={section.id}
            onClick={handleBlockClick}
          >
            {section.rows.length === 0 && (
              <div className="flex justify-center items-center mb-4" data-section-id={section.id}>
                <Button variant="outline" size="sm" onClick={(e) => handleAddRow(e, section.id)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Row
                </Button>
              </div>
            )}

            {section.rows.map((row, rowIndex) => (
              <div
                key={row.id}
                draggable
                onDragStart={(e) => handleDragStart(e, "row", section.id, sectionIndex, row.id, rowIndex)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "row", section.id, sectionIndex, row.id, rowIndex)}
                className={`mb-4 p-4 transition-all ${
                  draggedItem?.rowId === row.id ? "opacity-50" : ""
                } ${getSelectedStyles("row", row.id)}`}
                data-row-id={row.id}
                data-section-id={section.id}
              >
                <div className="flex gap-4">
                  {row.columns.map((column, columnIndex) => (
                    <div
                      key={column.id}
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(
                          e,
                          "column",
                          section.id,
                          sectionIndex,
                          row.id,
                          rowIndex,
                          column.id,
                          columnIndex
                        )
                      }
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => {
                        const elementType =
                          e.dataTransfer.getData("elementType");
                        if (elementType) {
                          e.stopPropagation();
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
                        } else {
                          handleDrop(e, "column", section.id, sectionIndex, row.id, rowIndex, column.id, columnIndex);
                        }
                      }}
                      className={`flex-1 min-h-[100px] border-2 border-dashed border-gray-300 rounded p-4  s relative transition-all ${
                        draggedItem?.columnId === column.id ? "opacity-50" : ""
                      } ${getSelectedStyles("column", column.id)}`}
                      style={{ flex: column.width }}
                      data-column-id={column.id}
                      data-row-id={row.id}
                      data-section-id={section.id}
                    >
                      {column.elements.length === 0 && (
                        <div className="flex justify-center items-center mb-4" data-column-id={column.id} data-row-id={row.id} data-section-id={section.id}>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => handleAddElement(e, section.id, row.id, column.id)}
                          >
                            Add Elements
                          </Button>
                        </div>
                      )}

                      {column.elements.map((element) => (
                        <div className="relative group bg-gray-50 p-2 mb-2 rounded" key={element.id}>
                          <div className="drag-handle cursor-move">{renderElement(element)}</div>
                          <div className="absolute top-1 right-2 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleElementEdit(element)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() =>
                                    handleDeleteElement(section.id, row.id, column.id, element.id)
                                  }
                                >
                                  <Trash className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => handleAddElement(e, section.id, row.id, column.id)}
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

      <Dialog open={!!editingElement} onOpenChange={() => setEditingElement(null)}>
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
          ) : editingElement?.type === "bulletList" ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Add one item per line</p>
              <Textarea
                placeholder="Item 1\nItem 2\nItem 3"
                value={editingElement.content}
                onChange={(e) =>
                  setEditingElement({
                    ...editingElement,
                    content: e.target.value,
                  })
                }
                rows={5}
              />
            </div>
          ) : (
            <Textarea
              placeholder="Content"
              value={editingElement?.content}
              onChange={(e) =>
                setEditingElement({
                  ...editingElement,
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
