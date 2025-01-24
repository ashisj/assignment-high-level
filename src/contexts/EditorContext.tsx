import { DrawerType } from "@/constants/layouts";
import { createContext, useContext, useReducer, ReactNode } from "react";

// Types
export interface Element {
  id: string;
  type: string;
  content: string;
}

export interface Column {
  id: string;
  width: number;
  elements: Element[];
}

export interface Row {
  id: string;
  columns: Column[];
}

export interface Section {
  id: string;
  type: string;
  rows: Row[];
}

export interface SelectedIds {
  sectionId: string | null;
  rowId?: string | null;
  columnId?: string | null;
}

interface EditorState {
  sections: Section[];
  drawerType: string | null;
  selectedIds: SelectedIds;
  openDrawer: boolean;
}

type EditorAction =
  | { type: "SELECTED_IDS"; payload: { selectedIds: SelectedIds } }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  | { type: "SET_DRAWER_TYPE"; payload: { drawerType: DrawerType } }
  | { type: "ADD_SECTION"; payload: { sectionType: string } }
  | { type: "ADD_ROW"; payload: { columns: number[]; sectionId: string } }
  | {
      type: "ADD_ELEMENT";
      payload: {
        sectionId: string;
        rowId: string;
        columnId: string;
        element: Element;
      };
    }
  | {
      type: "DELETE_ELEMENT";
      payload: {
        sectionId: string;
        rowId: string;
        columnId: string;
        elementId: string;
      };
    }
  | { type: "UPDATE_ELEMENT"; payload: { elementId: string; content: string } }
  | {
      type: "REORDER_ITEMS";
      payload: {
        itemType: string;
        sectionSourceIndex: number;
        sectionTargetIndex: number;
        rowSourceIndex?: number;
        rowTargetIndex?: number;
        columnSourceIndex?: number;
        columnTargetIndex?: number;
        elementSourceIndex?: number;
        elementTargetIndex?: number;
      };
    };

const tempData: Section[] = [
  {
    id: "section-1",
    type: "content",
    rows: [],
  },
];
const initialState: EditorState = {
  sections: tempData,
  drawerType: null,
  selectedIds: {
    sectionId: "section-1",
    rowId: null,
    columnId: null,
  },
  openDrawer: false,
};

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "SELECTED_IDS":
      return {
        ...state,
        selectedIds: {
          ...state.selectedIds,
          ...action.payload.selectedIds,
        },
      };
    case "OPEN_DRAWER":
      return {
        ...state,
        openDrawer: true,
      };

    case "CLOSE_DRAWER":
      return {
        ...state,
        openDrawer: false,
      };
    case "SET_DRAWER_TYPE":
      return {
        ...state,
        drawerType: action.payload.drawerType,
      };

    case "ADD_SECTION":
      return {
        ...state,
        sections: [
          ...state.sections,
          {
            id: `section-${Date.now()}`,
            type: action.payload.sectionType,
            rows: [],
          },
        ],
        selectedIds: {
          sectionId: `section-${Date.now()}`,
          rowId: null,
          columnId: null,
        },
      };

    case "ADD_ROW":
      return {
        ...state,
        sections: state.sections.map((section) =>
          section.id === state.selectedIds.sectionId
            ? {
                ...section,
                rows: [
                  ...section.rows,
                  {
                    id: `row-${Date.now()}`,
                    columns: action.payload.columns.map((width) => ({
                      id: `column-${Date.now()}-${width}-${Math.random()
                        .toString(36)
                        .substring(2, 15)}`,
                      width,
                      elements: [],
                    })),
                  },
                ],
              }
            : section
        ),
      };

    case "ADD_ELEMENT":
      return {
        ...state,
        sections: state.sections.map((section) =>
          section.id === action.payload.sectionId
            ? {
                ...section,
                rows: section.rows.map((row) =>
                  row.id === action.payload.rowId
                    ? {
                        ...row,
                        columns: row.columns.map((column) =>
                          column.id === action.payload.columnId
                            ? {
                                ...column,
                                elements: [
                                  ...column.elements,
                                  action.payload.element,
                                ],
                              }
                            : column
                        ),
                      }
                    : row
                ),
              }
            : section
        ),
      };

    case "DELETE_ELEMENT":
      return {
        ...state,
        sections: state.sections.map((section) => ({
          ...section,
          rows: section.rows.map((row) => ({
            ...row,
            columns: row.columns.map((column) => ({
              ...column,
              elements: column.elements.filter(
                (element) => element.id !== action.payload.elementId
              ),
            })),
          })),
        })),
      };

    case "UPDATE_ELEMENT":
      return {
        ...state,
        sections: state.sections.map((section) => ({
          ...section,
          rows: section.rows.map((row) => ({
            ...row,
            columns: row.columns.map((column) => ({
              ...column,
              elements: column.elements.map((element) =>
                element.id === action.payload.elementId
                  ? { ...element, content: action.payload.content }
                  : element
              ),
            })),
          })),
        })),
      };

    case "REORDER_ITEMS": {
      const {
        itemType,
        sectionSourceIndex,
        sectionTargetIndex,
        rowSourceIndex,
        rowTargetIndex,
        columnSourceIndex,
        columnTargetIndex,
        elementSourceIndex,
        elementTargetIndex,
      } = action.payload;
      const newSections = [...state.sections];

      switch (itemType) {
        case "section": {
          const [movedSection] = newSections.splice(sectionSourceIndex, 1);
          newSections.splice(sectionTargetIndex, 0, movedSection);
          return { ...state, sections: newSections };
        }
        case "row": {
          if (rowSourceIndex !== undefined && rowTargetIndex !== undefined) {
            const sourceSection = newSections[sectionSourceIndex];
            const newRows = [...sourceSection.rows];

            const [movedRow] = newRows.splice(rowSourceIndex, 1);
            newRows.splice(rowTargetIndex, 0, movedRow);

            newSections[sectionSourceIndex] = {
              ...sourceSection,
              rows: newRows,
            };
            return { ...state, sections: [...newSections] };
          }
          return state;
        }
        case "column": {
          if (
            sectionSourceIndex !== undefined &&
            rowSourceIndex !== undefined &&
            columnSourceIndex !== undefined &&
            columnTargetIndex !== undefined
          ) {
            const sourceSection = newSections[sectionSourceIndex];
            const sourceRow = sourceSection.rows[rowSourceIndex];

            const newColumns = [...sourceRow.columns];

            const [movedColumn] = newColumns.splice(columnSourceIndex, 1);

            newColumns.splice(columnTargetIndex, 0, movedColumn);

            const updatedRow = {
              ...sourceRow,
              columns: newColumns,
            };

            const updatedSection = {
              ...sourceSection,
              rows: [
                ...sourceSection.rows.slice(0, rowSourceIndex),
                updatedRow,
                ...sourceSection.rows.slice(rowSourceIndex + 1),
              ],
            };

            newSections[sectionSourceIndex] = updatedSection;

            return { ...state, sections: newSections };
          }

          return state;
        }

        default:
          return state;
      }
    }

    default:
      return state;
  }
}

const EditorContext = createContext<{
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
} | null>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
}
