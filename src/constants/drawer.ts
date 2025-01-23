export const elementTypes = {
  headline: "headline",
  subheadline: "subheadline",
  paragraph: "paragraph",
  bulletList: "bulletList",
  image: "image",
  imagePopup: "imagePopup",
  video: "video",
  videoPopup: "videoPopup",
  audioPlayer: "audioPlayer",
  button: "button",
  facebook: "facebook",
  input: "input",
  select: "select",
  textarea: "textarea",
  checkbox: "checkbox",
  smsSignup: "smsSignup",
  billing: "billing",
};

interface BaseLayout {
  id: string;
  label: string;
  disabled?: boolean;
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
    description: 'Full-width section with background image or color',
    disabled: true
  },
  {
    id: 'content',
    label: 'Content Section',
    icon: '📄',
    description: 'Standard content width with padding',
    disabled: true
  },
  {
    id: 'feature',
    label: 'Feature Section',
    icon: '✨',
    description: 'Highlight key features or services',
    disabled: true
  },
  {
    id: 'cta',
    label: 'Call to Action',
    icon: '🔔',
    description: 'Conversion-focused section',
    disabled: true
  },
  {
    id: 'gallery',
    label: 'Gallery Section',
    icon: '🖼️',
    description: 'Display multiple images in a grid',
    disabled: true
  },
  {
    id: 'testimonial',
    label: 'Testimonial Section',
    icon: '💬',
    description: 'Show customer reviews and feedback',
    disabled: true
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
    description: 'Column for mixed content types',
    disabled: true
  },
  {
    id: 'form',
    label: 'Form Column',
    icon: '📋',
    description: 'Column for form elements',
    disabled: true
  }
];

export const elementConfigs = {
  text: [
    { id: elementTypes.headline, label: 'Headline', icon: 'H', iconClass: 'font-serif' },
    { id: elementTypes.subheadline, label: 'Sub-headline', icon: 'A', iconClass: 'font-serif' },
    { id: elementTypes.paragraph, label: 'Paragraph', icon: '¶' },
    { id: elementTypes.bulletList, label: 'Bullet List', icon: '•' },
  ],
  media: [
    { id: elementTypes.image, label: 'Image', icon: '🖼️' },
    { id: elementTypes.imagePopup, label: 'Image Popup', icon: '🖼️' },
    { id: elementTypes.video, label: 'Video', icon: '▶️' },
    { id: elementTypes.videoPopup, label: 'Video Popup', icon: '▶️' },
    { id: elementTypes.audioPlayer, label: 'Audio Player', icon: '🔊' },
  ],
  form: [
    { id: elementTypes.button, label: 'Button', icon: '⬜' },
    { id: elementTypes.facebook, label: 'Facebook Option', icon: 'f' },
    { id: elementTypes.input, label: 'Input', icon: '⬜' },
    { id: elementTypes.select, label: 'Select Box', icon: '☐' },
    { id: elementTypes.textarea, label: 'Text Area', icon: '📝' },
    { id: elementTypes.checkbox, label: 'Checkbox Headline', icon: '☑️' },
  ],
  advanced: [
    { id: elementTypes.smsSignup, label: 'SMS Sign Up', icon: '📱' },
    { id: elementTypes.billing, label: 'Billing Info', icon: '💳' },
  ],
}; 