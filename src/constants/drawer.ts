interface BaseLayout {
  id: string;
  label: string;
}

export interface RowLayout extends BaseLayout {
  cols: number[];
}

export interface ContentLayout extends BaseLayout {
  icon: string;
  description: string;
}

export const rowLayouts: RowLayout[] = [
  { id: '1-col', label: '1 Column', cols: [12] },
  { id: '2-col', label: '2 Columns', cols: [6, 6] },
  { id: '3-col', label: '3 Columns', cols: [4, 4, 4] },
  { id: '4-col', label: '4 Columns', cols: [3, 3, 3, 3] },
  { id: '5-col', label: '5 Columns', cols: [2.4, 2.4, 2.4, 2.4, 2.4] },
  { id: '6-col', label: '6 Columns', cols: [2, 2, 2, 2, 2, 2] },
  { id: 'left-sidebar', label: 'Left Sidebar', cols: [4, 8] },
  { id: 'right-sidebar', label: 'Right Sidebar', cols: [8, 4] },
];

export const sectionLayouts: ContentLayout[] = [
  {
    id: 'blank',
    label: 'Blank Section',
    icon: '-',
    description: 'Full-width blank section'
  },
  { 
    id: 'hero',
    label: 'Hero Section',
    icon: '🎯',
    description: 'Full-width section with background image or color'
  },
  {
    id: 'content',
    label: 'Content Section',
    icon: '📄',
    description: 'Standard content width with padding'
  },
  {
    id: 'feature',
    label: 'Feature Section',
    icon: '✨',
    description: 'Highlight key features or services'
  },
  {
    id: 'cta',
    label: 'Call to Action',
    icon: '🔔',
    description: 'Conversion-focused section'
  },
  {
    id: 'gallery',
    label: 'Gallery Section',
    icon: '🖼️',
    description: 'Display multiple images in a grid'
  },
  {
    id: 'testimonial',
    label: 'Testimonial Section',
    icon: '💬',
    description: 'Show customer reviews and feedback'
  }
];

export const columnLayouts: ContentLayout[] = [
  {
    id: 'text',
    label: 'Text Column',
    icon: '📝',
    description: 'Basic text content column'
  },
  {
    id: 'image',
    label: 'Image Column',
    icon: '🖼️',
    description: 'Column optimized for images'
  },
  {
    id: 'mixed',
    label: 'Mixed Content',
    icon: '🔄',
    description: 'Column for mixed content types'
  },
  {
    id: 'form',
    label: 'Form Column',
    icon: '📋',
    description: 'Column for form elements'
  }
];

export const elementConfigs = {
  text: [
    { id: 'headline', label: 'Headline', icon: 'H', iconClass: 'font-serif' },
    { id: 'subheadline', label: 'Sub-headline', icon: 'A', iconClass: 'font-serif' },
    { id: 'paragraph', label: 'Paragraph', icon: '¶' },
    { id: 'bullet-list', label: 'Bullet List', icon: '•' },
  ],
  media: [
    { id: 'image', label: 'Image', icon: '🖼️' },
    { id: 'image-popup', label: 'Image Popup', icon: '🖼️' },
    { id: 'video', label: 'Video', icon: '▶️' },
    { id: 'video-popup', label: 'Video Popup', icon: '▶️' },
    { id: 'audio-player', label: 'Audio Player', icon: '🔊' },
  ],
  form: [
    { id: 'button', label: 'Button', icon: '⬜' },
    { id: 'facebook', label: 'Facebook Option', icon: 'f' },
    { id: 'input', label: 'Input', icon: '⬜' },
    { id: 'select', label: 'Select Box', icon: '☐' },
    { id: 'textarea', label: 'Text Area', icon: '📝' },
    { id: 'checkbox', label: 'Checkbox Headline', icon: '☑️' },
  ],
  advanced: [
    { id: 'sms-signup', label: 'SMS Sign Up', icon: '📱' },
    { id: 'billing', label: 'Billing Info', icon: '💳' },
  ],
}; 