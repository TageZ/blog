import modernMediaImage from './assets/misunderstood-villain.jpg';
// Import markdown files
import modernMediaContent from './content/the-misunderstood-villain-trope.md?raw';

// Content map for easy lookup
export const contentMap: Record<string, string> = {
  'modern-media': modernMediaContent,
};


export const allBlogs = [
    { topic: 'CULTURE', 
    title: 'The Misunderstood Villain Trope', 
    image: modernMediaImage, 
    date: new Date('2025-12-13T00:00:00-06:00'), 
    featured: false, 
    tag: 'the-misunderstood-villain-trope'
},
];