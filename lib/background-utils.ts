// Categories for the background images
export const backgroundCategories = {
  'Professional': [1, 2, 3, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  'Abstract': [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
  'Nature': [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
  'City': [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62],
  'Gradient': [63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76],
  'Minimal': [77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
  'Creative': [91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 9]
};

// Sample QR code image (placeholder)
export const qrCodePlaceholder = '/images/qr-placeholder.svg';

// Generate background templates from the categories
export const generateBackgroundTemplates = () => {
  let templates: Array<{
    id: string;
    name: string;
    category: string;
    thumbnail: string;
    imagePath: string;
  }> = [];
  
  Object.entries(backgroundCategories).forEach(([category, imageIds]) => {
    imageIds.forEach(id => {
      templates.push({
        id: id.toString(),
        name: `Background ${id}`,
        category: category,
        thumbnail: `/backgrounds/${id}.jpg`,
        imagePath: `/backgrounds/${id}.jpg`
      });
    });
  });
  
  return templates;
};

// Sample user backgrounds
export const userBackgrounds = [
  {
    id: '1',
    name: 'My Office Background',
    template: 'Minimal',
    created: '2 days ago',
    card: 'Personal Card',
    imagePath: '/backgrounds/77.jpg',
    qrPosition: 'bottom-right'
  },
  {
    id: '2',
    name: 'Team Meeting Background',
    template: 'Gradient',
    created: '1 week ago',
    card: 'Work Card',
    imagePath: '/backgrounds/63.jpg',
    qrPosition: 'top-left'
  }
]; 