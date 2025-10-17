// Local storage service to replace Firebase functionality

export interface Work {
  id: string;
  image: string;
  title: string;
  createdAt: string;
}

export interface Feedback {
  id: string;
  customer_name: string;
  feedback_text: string;
  rating: number;
  date: string;
  isPinned?: boolean;
  createdAt: string;
}

// Works functions
export const addWork = async (title: string, imageFile: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Validate file
      if (imageFile.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB');
      }
      
      if (!imageFile.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onload = () => {
        const works = getWorksFromStorage();
        const newWork: Work = {
          id: Date.now().toString(),
          title,
          image: reader.result as string,
          createdAt: new Date().toISOString()
        };
        
        works.unshift(newWork);
        localStorage.setItem('works', JSON.stringify(works));
        resolve();
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(imageFile);
    } catch (error) {
      reject(error);
    }
  });
};

export const getWorks = async (): Promise<Work[]> => {
  return getWorksFromStorage();
};

export const deleteWork = async (id: string): Promise<void> => {
  const works = getWorksFromStorage();
  const filteredWorks = works.filter(work => work.id !== id);
  localStorage.setItem('works', JSON.stringify(filteredWorks));
};

// Feedback functions
export const addFeedback = async (feedback: Omit<Feedback, 'id' | 'createdAt'>): Promise<void> => {
  const feedbacks = getFeedbacksFromStorage();
  const newFeedback: Feedback = {
    ...feedback,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  feedbacks.unshift(newFeedback);
  localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
};

export const getFeedbacks = async (): Promise<Feedback[]> => {
  return getFeedbacksFromStorage();
};

export const deleteFeedback = async (id: string): Promise<void> => {
  const feedbacks = getFeedbacksFromStorage();
  const filteredFeedbacks = feedbacks.filter(feedback => feedback.id !== id);
  localStorage.setItem('feedbacks', JSON.stringify(filteredFeedbacks));
};

export const updateFeedback = async (id: string, updates: Partial<Feedback>): Promise<void> => {
  const feedbacks = getFeedbacksFromStorage();
  const updatedFeedbacks = feedbacks.map(feedback => 
    feedback.id === id ? { ...feedback, ...updates } : feedback
  );
  localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
};

// Helper functions
function getWorksFromStorage(): Work[] {
  try {
    const works = localStorage.getItem('works');
    return works ? JSON.parse(works) : [];
  } catch {
    return [];
  }
}

function getFeedbacksFromStorage(): Feedback[] {
  try {
    const feedbacks = localStorage.getItem('feedbacks');
    return feedbacks ? JSON.parse(feedbacks) : [];
  } catch {
    return [];
  }
}