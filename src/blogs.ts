
import myBodyMyChoiceImage from './assets/my-body-my-choice.avif';
import transHipSurgeryImage from './assets/trans-hip-surgery.png';
// Import markdown files
import myBodyMyChoiceContent from './content/my-body-my-choice.md?raw';

// Content map for easy lookup
// Replace relative image paths with imported image URLs
const processedMyBodyMyChoiceContent = myBodyMyChoiceContent.replace(
  '../assets/trans-hip-surgery.png',
  transHipSurgeryImage
);

export const contentMap: Record<string, string> = {
  'my-body-my-choice': processedMyBodyMyChoiceContent,
};


export const allBlogs = [
{ topic: 'CULTURE', 
    title: 'The Problem with "My Body, My Choice"', 
    image: myBodyMyChoiceImage, 
    date: new Date('2026-02-05T00:00:00-06:00'), 
    featured: false, 
    tag: 'my-body-my-choice'
},
];