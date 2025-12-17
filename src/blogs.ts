import modernMediaImage from './assets/misunderstood-villain.jpg';
import myBodyMyChoiceImage from './assets/my-body-my-choice.avif';
// Import markdown files
import modernMediaContent from './content/the-misunderstood-villain-trope.md?raw';
import myBodyMyChoiceContent from './content/my-body-my-choice.md?raw';

// Content map for easy lookup
export const contentMap: Record<string, string> = {
  'modern-media': modernMediaContent,
  'my-body-my-choice': myBodyMyChoiceContent,
};


export const allBlogs = [
    { topic: 'CULTURE', 
    title: 'The Misunderstood Villain Trope', 
    image: modernMediaImage, 
    date: new Date('2025-12-13T00:00:00-06:00'), 
    featured: false, 
    tag: 'the-misunderstood-villain-trope'
},
{ topic: 'CULTURE', 
    title: 'The Problem with "My Body, My Choice"', 
    image: myBodyMyChoiceImage, 
    date: new Date('2025-12-16T00:00:00-06:00'), 
    featured: false, 
    tag: 'my-body-my-choice'
},
];