# Website Builder Application

A drag-and-drop website builder that allows users to create websites by adding sections, rows, columns, and various elements.

## Demo

![Demo](demo.png)

### Demo Video

<iframe width="560" height="315" src="https://drive.google.com/file/d/1dAUuaOakPh0DiT1eS2cy6y1oVHVOQN_p/view?usp=drive_link" frameborder="0" allowfullscreen></iframe>


## Features

- **Sections**: Main container blocks
  - Add new sections
  - Drag to reorder sections
  - Delete sections

- **Rows**: Container within sections
  - Add rows with predefined column layouts
  - Drag to reorder rows
  - Delete rows

- **Columns**: Container within rows
  - Support for different width configurations
  - Drag to reorder columns
  - Delete columns

- **Elements**: Content blocks
  - Text elements (Headings, Paragraphs)
  - Media elements (Images)
  - Form elements (Input fields, Buttons)
  - Advanced elements

### Drag and Drop
- Drag and drop functionality for:
  - Sections
  - Rows
  - Columns
  - Elements
- Visual drop zones for accurate placement

### Element Library
- Categorized element picker:
  - Text
  - Media
  - Form
  - Advanced
- Search functionality to filter elements

### State Management
- Save/Load functionality using localStorage
- State persistence across page reloads

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ashisj/assignment-high-level.git
```

2. Navigate to the project directory:
```bash
cd assignment-high-level
```

3. Install dependencies:
```bash
npm install
```
  
4. Run the development server:
```bash
npm run dev
```

5. Open your browser and navigate to http://localhost:5173 to view the application.
