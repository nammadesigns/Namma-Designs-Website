import { supabase } from './supabase'

export interface Work {
  id: string;
  image: string;
  title: string;
  created_at: string;
}

export interface Feedback {
  id: string;
  customer_name: string;
  feedback_text: string;
  rating: number;
  date: string;
  is_pinned?: boolean;
  created_at: string;
}

// Works functions
export const addWork = async (title: string, imageFile: File): Promise<void> => {
  try {
    // Validate file
    if (imageFile.size > 5 * 1024 * 1024) {
      throw new Error('File size must be less than 5MB');
    }
    
    if (!imageFile.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }

    // Upload image to Supabase Storage
    const fileName = `${Date.now()}_${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('works')
      .upload(fileName, imageFile);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('works')
      .getPublicUrl(fileName);

    // Insert work record
    const { error: insertError } = await supabase
      .from('works')
      .insert([{ title, image: publicUrl }]);

    if (insertError) throw insertError;
  } catch (error) {
    console.error('Error adding work:', error);
    throw error;
  }
};

export const getWorks = async (): Promise<Work[]> => {
  try {
    const { data, error } = await supabase
      .from('works')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting works:', error);
    return [];
  }
};

export const deleteWork = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('works')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting work:', error);
    throw error;
  }
};

// Feedback functions
export const addFeedback = async (feedback: Omit<Feedback, 'id' | 'created_at'>): Promise<void> => {
  try {
    const { error } = await supabase
      .from('feedbacks')
      .insert([feedback]);

    if (error) throw error;
  } catch (error) {
    console.error('Error adding feedback:', error);
    throw error;
  }
};

export const getFeedbacks = async (): Promise<Feedback[]> => {
  try {
    const { data, error } = await supabase
      .from('feedbacks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting feedbacks:', error);
    return [];
  }
};

export const deleteFeedback = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('feedbacks')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw error;
  }
};

export const updateFeedback = async (id: string, updates: Partial<Feedback>): Promise<void> => {
  try {
    const { error } = await supabase
      .from('feedbacks')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating feedback:', error);
    throw error;
  }
};