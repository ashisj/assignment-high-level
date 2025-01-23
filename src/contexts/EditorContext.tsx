import { createContext, useContext, useReducer, ReactNode } from 'react';

// Types for our website structure
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
  selectedElement: string | null;
  selectedIds: SelectedIds;
}

type EditorAction =
  | { type: 'ADD_SECTION'; payload: { sectionType: string } }
  | { type: 'ADD_ROW'; payload: { columns: number[], sectionId: string } }
  | { type: 'ADD_ELEMENT'; payload: { sectionId: string; rowId: string; columnId: string; element: Element } }
  | { type: 'DELETE_ELEMENT'; payload: { sectionId: string; rowId: string; columnId: string; elementId: string } }
  | { type: 'SELECT_ELEMENT'; payload: { elementId: string | null } }
  | { type: 'UPDATE_ELEMENT'; payload: { elementId: string; content: string } }
  | { type: 'SELECTED_IDS'; payload: { selectedIds: SelectedIds } };

const tempData: Section[] = [
  {
    id: 'section-1',
    type: 'blank',
    rows: [],
  },
]   
const initialState: EditorState = {
  sections: tempData,
  selectedElement: null,
  selectedIds: {
    sectionId: 'section-1',
    rowId: null,
    columnId: null
  }
};

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'ADD_SECTION':
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
          columnId: null
        }
      };

    case 'ADD_ROW':
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
                      id: `column-${Date.now()}-${width}-${Math.random().toString(36).substring(2, 15)}`,
                      width,
                      elements: [],
                    })),
                  },
                ],
              }
            : section
        ),
      };

    case 'DELETE_ELEMENT':
      return {
        ...state,
        sections: state.sections.map((section) => ({
          ...section,
          rows: section.rows.map((row) => ({
            ...row,
            columns: row.columns.map((column) => ({
              ...column,
              elements: column.elements.filter((element) => element.id !== action.payload.elementId),
            })),
          })),
        })),
      };
    case 'ADD_ELEMENT':
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
                                elements: [...column.elements, action.payload.element],
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

    case 'SELECT_ELEMENT':
      return {
        ...state,
        selectedElement: action.payload.elementId,
      };

    case 'UPDATE_ELEMENT':
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

    
    case 'SELECTED_IDS':
      return {
        ...state,
        selectedIds: {
          ...state.selectedIds,
          ...action.payload.selectedIds
        }
      };
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
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
} 