// Local Storage Service for Admin Panel and Feedback Management

import { worksData } from '../data/worksData';

export interface LocalWork {
  id: string;
  image: string;
  title: string;
  created_at: string;
}

export interface LocalFeedback {
  id: string;
  customer_name: string;
  feedback_text: string;
  rating: number;
  date: string;
  is_pinned?: boolean;
  created_at: string;
}

export interface LocalOffer {
  id: string;
  title: string;
  description: string;
  discount: string;
  valid_until: string;
  is_active: boolean;
  image?: string;
  created_at: string;
}

// Initial sample data
const initialFeedbacks: LocalFeedback[] = [
  {
    id: "1",
    customer_name: "Sathyanarayana H R",
    rating: 5,
    feedback_text: "Super work on time low cost Quickly response every time. Professional services on editing of creating card's Instagram promotions Other's",
    date: "18/10/2025",
    is_pinned: true,
    created_at: "2024-10-18"
  },
  {
    id: "2",
    customer_name: "Amith Shetty", 
    rating: 5,
    feedback_text: "Amazing work with reasoning price 🤌 Thank you.",
    date: "10/18/2025",
    is_pinned: true,
    created_at: "2024-10-18"
  },
  {
    id: "3",
    customer_name: "Priya Sharma",
    rating: 5,
    feedback_text: "Excellent design work! Very creative and professional. Highly recommended for all design needs.",
    date: "15/10/2025",
    is_pinned: true,
    created_at: "2024-10-15"
  },
  {
    id: "4",
    customer_name: "Rajesh Kumar",
    rating: 4,
    feedback_text: "Good quality work and timely delivery. Will definitely work again for future projects.",
    date: "12/10/2025",
    is_pinned: false,
    created_at: "2024-10-12"
  },
  {
    id: "5",
    customer_name: "Sneha Patel",
    rating: 5,
    feedback_text: "Outstanding creativity and attention to detail. The designs exceeded my expectations!",
    date: "08/10/2025",
    is_pinned: false,
    created_at: "2024-10-08"
  },
  {
    id: "6",
    customer_name: "Arjun Nair",
    rating: 5,
    feedback_text: "Professional service with quick turnaround. The social media designs were perfect for our campaign.",
    date: "05/10/2025",
    is_pinned: false,
    created_at: "2024-10-05"
  }
];

// Utility functions
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

const getStorageData = <T>(key: string, defaultData: T[]): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultData;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultData;
  }
};

const setStorageData = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Initialize data if not exists
const initializeData = () => {
  if (!localStorage.getItem('namma-feedbacks')) {
    setStorageData('namma-feedbacks', initialFeedbacks);
  }
  if (!localStorage.getItem('namma-works')) {
    setStorageData('namma-works', []);
  }
  if (!localStorage.getItem('namma-offers')) {
    setStorageData('namma-offers', []);
  }
};

// Initialize on import
initializeData();

// Works functions
export const getWorks = async (): Promise<LocalWork[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const localWorks = getStorageData('namma-works', []);
      // Combine static works data with local storage works
      // Static works first, then local works at the end
      const allWorks = [...worksData, ...localWorks];
      resolve(allWorks);
    }, 100);
  });
};

export const addWork = async (title: string, imageFile: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        const localWorks = getStorageData('namma-works', []);
        const newWork: LocalWork = {
          id: generateId(),
          title,
          image: imageDataUrl,
          created_at: new Date().toISOString()
        };
        // Add new work at the end of local works
        localWorks.push(newWork);
        setStorageData('namma-works', localWorks);
        resolve();
      };
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(imageFile);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteWork = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const localWorks = getStorageData('namma-works', []);
      // Only allow deletion of local works (not static works)
      const filteredWorks = localWorks.filter((work: LocalWork) => work.id !== id);
      setStorageData('namma-works', filteredWorks);
      resolve();
    }, 100);
  });
};

// Get only local works (for admin panel display)
export const getLocalWorks = async (): Promise<LocalWork[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getStorageData('namma-works', []));
    }, 100);
  });
};

// Feedback functions
export const getFeedbacks = async (): Promise<LocalFeedback[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getStorageData('namma-feedbacks', initialFeedbacks));
    }, 100);
  });
};

export const addFeedback = async (feedback: Omit<LocalFeedback, 'id' | 'created_at'>): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const feedbacks = getStorageData('namma-feedbacks', initialFeedbacks);
      const newFeedback: LocalFeedback = {
        ...feedback,
        id: generateId(),
        created_at: new Date().toISOString()
      };
      feedbacks.unshift(newFeedback);
      setStorageData('namma-feedbacks', feedbacks);
      resolve();
    }, 100);
  });
};

export const deleteFeedback = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const feedbacks = getStorageData('namma-feedbacks', initialFeedbacks);
      const filteredFeedbacks = feedbacks.filter((feedback: LocalFeedback) => feedback.id !== id);
      setStorageData('namma-feedbacks', filteredFeedbacks);
      resolve();
    }, 100);
  });
};

export const updateFeedback = async (id: string, updates: Partial<LocalFeedback>): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const feedbacks = getStorageData('namma-feedbacks', initialFeedbacks);
      const updatedFeedbacks = feedbacks.map((feedback: LocalFeedback) => 
        feedback.id === id ? { ...feedback, ...updates } : feedback
      );
      setStorageData('namma-feedbacks', updatedFeedbacks);
      resolve();
    }, 100);
  });
};

// Offers functions
export const getOffers = async (): Promise<LocalOffer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getStorageData('namma-offers', []));
    }, 100);
  });
};

export const addOffer = async (offer: Omit<LocalOffer, 'id' | 'created_at'>): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const offers = getStorageData('namma-offers', []);
      const newOffer: LocalOffer = {
        ...offer,
        id: generateId(),
        created_at: new Date().toISOString()
      };
      offers.unshift(newOffer);
      setStorageData('namma-offers', offers);
      resolve();
    }, 100);
  });
};

export const deleteOffer = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const offers = getStorageData('namma-offers', []);
      const filteredOffers = offers.filter((offer: LocalOffer) => offer.id !== id);
      setStorageData('namma-offers', filteredOffers);
      resolve();
    }, 100);
  });
};

export const updateOffer = async (id: string, updates: Partial<LocalOffer>): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const offers = getStorageData('namma-offers', []);
      const updatedOffers = offers.map((offer: LocalOffer) => 
        offer.id === id ? { ...offer, ...updates } : offer
      );
      setStorageData('namma-offers', updatedOffers);
      resolve();
    }, 100);
  });
};

export const getActiveOffers = async (): Promise<LocalOffer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const offers = getStorageData('namma-offers', []);
      const activeOffers = offers.filter((offer: LocalOffer) => offer.is_active);
      resolve(activeOffers);
    }, 100);
  });
};