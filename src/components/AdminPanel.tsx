import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Upload, Trash2, Pin, Star, Home, Tag } from "lucide-react";
import { 
  addWork as firebaseAddWork, 
  getWorks, 
  deleteWork as firebaseDeleteWork,
  getFeedbacks,
  deleteFeedback as firebaseDeleteFeedback,
  updateFeedback,
  addOffer,
  getOffers,
  deleteOffer,
  updateOffer,
  Work,
  Feedback,
  Offer
} from "../lib/supabaseService";
import { supabase } from "../lib/supabase";



const AdminPanel: React.FC = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<'works' | 'feedbacks' | 'offers'>('works');
  const [offers, setOffers] = useState<Offer[]>([]);
  const [offerTitle, setOfferTitle] = useState("");
  const [offerDescription, setOfferDescription] = useState("");
  const [offerDiscount, setOfferDiscount] = useState("");
  const [offerValidUntil, setOfferValidUntil] = useState("");
  const [offerImage, setOfferImage] = useState("");
  const [offerImageFile, setOfferImageFile] = useState<File | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("admin-auth");
    if (auth === "authenticated") {
      setIsAuthenticated(true);
    }
    
    loadWorks();
    loadFeedbacks();
    loadOffers();
  }, []);

  const loadWorks = async () => {
    try {
      const worksData = await getWorks();
      setWorks(worksData);
    } catch (error) {
      console.error('Error loading works:', error);
    }
  };

  const loadFeedbacks = async () => {
    try {
      const feedbacksData = await getFeedbacks();
      setFeedbacks(feedbacksData);
    } catch (error) {
      console.error('Error loading feedbacks:', error);
    }
  };

  const loadOffers = async () => {
    try {
      const offersData = await getOffers();
      setOffers(offersData);
    } catch (error) {
      console.error('Error loading offers:', error);
    }
  };

  const handleLogin = () => {
    if (password === "admin12345") {
      setIsAuthenticated(true);
      localStorage.setItem("admin-auth", "authenticated");
      setPassword("");
    } else {
      alert("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin-auth");
  };



  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB. Please compress your image.");
        return;
      }
      
      setImageFile(file);
      
      // Show preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addWork = async () => {
    if (!title || !imageFile) {
      alert("Please enter title and select an image");
      return;
    }
    
    try {
      await firebaseAddWork(title, imageFile);
      setTitle("");
      setImage("");
      setImageFile(null);
      await loadWorks();
      alert("Work added successfully!");
    } catch (error) {
      console.error('Error adding work:', error);
      alert("Failed to add work. Please try again.");
    }
  };

  const deleteWork = async (id: string) => {
    try {
      await firebaseDeleteWork(id);
      await loadWorks();
    } catch (error) {
      console.error('Error deleting work:', error);
      alert("Failed to delete work. Please try again.");
    }
  };



  const deleteFeedback = async (id: string) => {
    try {
      await firebaseDeleteFeedback(id);
      await loadFeedbacks();
    } catch (error) {
      console.error('Error deleting feedback:', error);
      alert("Failed to delete feedback. Please try again.");
    }
  };

  const togglePinFeedback = async (id: string) => {
    const feedback = feedbacks.find(f => f.id === id);
    if (!feedback) return;
    
    const newPinnedStatus = !feedback.is_pinned;
    
    try {
      await updateFeedback(id, { is_pinned: newPinnedStatus });
      await loadFeedbacks();
    } catch (error) {
      console.error('Error updating feedback:', error);
      alert("Failed to update feedback. Please try again.");
    }
  };

  const handleOfferImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB. Please compress your image.");
        return;
      }
      
      setOfferImageFile(file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setOfferImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addNewOffer = async () => {
    if (!offerTitle || !offerDescription || !offerDiscount || !offerValidUntil) {
      alert("Please fill all offer fields");
      return;
    }
    
    try {
      let imageUrl = "";
      
      if (offerImageFile) {
        const fileName = `offer_${Date.now()}_${offerImageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('offers')
          .upload(fileName, offerImageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('offers')
          .getPublicUrl(fileName);
        
        imageUrl = publicUrl;
      }
      
      await addOffer({
        title: offerTitle,
        description: offerDescription,
        discount: offerDiscount,
        valid_until: offerValidUntil,
        is_active: true,
        image: imageUrl || undefined
      });
      
      setOfferTitle("");
      setOfferDescription("");
      setOfferDiscount("");
      setOfferValidUntil("");
      setOfferImage("");
      setOfferImageFile(null);
      await loadOffers();
      alert("Offer added successfully!");
    } catch (error) {
      console.error('Error adding offer:', error);
      alert("Failed to add offer. Please try again.");
    }
  };

  const deleteOfferById = async (id: string) => {
    try {
      await deleteOffer(id);
      await loadOffers();
    } catch (error) {
      console.error('Error deleting offer:', error);
      alert("Failed to delete offer. Please try again.");
    }
  };

  const toggleOfferStatus = async (id: string) => {
    const offer = offers.find(o => o.id === id);
    if (!offer) return;
    
    try {
      await updateOffer(id, { is_active: !offer.is_active });
      await loadOffers();
    } catch (error) {
      console.error('Error updating offer:', error);
      alert("Failed to update offer. Please try again.");
    }
  };

  const pinnedFeedbacks = feedbacks.filter(f => f.is_pinned);
  const unpinnedFeedbacks = feedbacks.filter(f => !f.is_pinned);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg border max-w-md w-full">
          <div className="text-center mb-6">
            <img src="https://i.postimg.cc/5tpJ1bLY/MY-L.png" alt="Logo" className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground">Admin Login</h2>
            <p className="text-muted-foreground mt-2">Enter password to access admin panel</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img src="https://i.postimg.cc/5tpJ1bLY/MY-L.png" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Admin Panel</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <Link to="/" className="w-full sm:w-auto">
              <Button variant="outline" className="flex items-center justify-center space-x-1 sm:space-x-2 w-full sm:w-auto text-sm sm:text-base">
                <Home size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Go to Home</span>
                <span className="sm:hidden">Home</span>
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="outline" className="w-full sm:w-auto text-sm sm:text-base">
              Logout
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <Button
            onClick={() => setActiveTab('works')}
            variant={activeTab === 'works' ? 'default' : 'outline'}
          >
            Manage Works
          </Button>
          <Button
            onClick={() => setActiveTab('feedbacks')}
            variant={activeTab === 'feedbacks' ? 'default' : 'outline'}
          >
            Manage Feedbacks ({feedbacks.length})
          </Button>
          <Button
            onClick={() => setActiveTab('offers')}
            variant={activeTab === 'offers' ? 'default' : 'outline'}
          >
            Manage Offers ({offers.length})
          </Button>
        </div>
        
        {activeTab === 'works' && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-lg border mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                <Upload className="mr-2 text-primary" size={20} />
                Add New Work
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Work Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-muted-foreground">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {image && (
                    <div className="mt-2">
                      <img src={image} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                    </div>
                  )}
                </div>
                <Button onClick={addWork} className="w-full md:w-auto">
                  Add Work
                </Button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-6">Current Works ({works.length})</h3>
              <div className="space-y-3">
                {works.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No works added yet</p>
                ) : (
                  works.map((work) => (
                    <div key={work.id} className="flex justify-between items-center p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <img src={work.image} alt={work.title} className="w-16 h-16 object-cover rounded-lg" />
                        <div>
                          <span className="font-medium text-foreground">{work.title}</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => deleteWork(work.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'offers' && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-lg border mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">Add New Offer</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Offer Title"
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea
                  placeholder="Offer Description"
                  value={offerDescription}
                  onChange={(e) => setOfferDescription(e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Discount (e.g., 50% OFF)"
                  value={offerDiscount}
                  onChange={(e) => setOfferDiscount(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="date"
                  value={offerValidUntil}
                  onChange={(e) => setOfferValidUntil(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-muted-foreground">
                    Offer Image (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleOfferImageUpload}
                    className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {offerImage && (
                    <div className="mt-2">
                      <img src={offerImage} alt="Offer Preview" className="w-32 h-32 object-cover rounded-lg" />
                    </div>
                  )}
                </div>
                <Button onClick={addNewOffer} className="w-full md:w-auto">
                  Add Offer
                </Button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-6">All Offers ({offers.length})</h3>
              <div className="space-y-3">
                {offers.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No offers added yet</p>
                ) : (
                  offers.map((offer) => (
                    <div key={offer.id} className="p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        {offer.image && (
                          <img src={offer.image} alt={offer.title} className="w-16 h-16 object-cover rounded-lg mr-4" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-foreground">{offer.title}</h4>
                            <span className={`px-2 py-1 text-xs rounded ${offer.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {offer.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{offer.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>Discount: {offer.discount}</span>
                            <span>Valid until: {new Date(offer.valid_until).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button
                            onClick={() => toggleOfferStatus(offer.id)}
                            variant="outline"
                            size="sm"
                          >
                            {offer.is_active ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button
                            onClick={() => deleteOfferById(offer.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'feedbacks' && (
          <>
            {pinnedFeedbacks.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-lg border mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Pin className="mr-2 text-primary" size={20} />
                  Pinned Feedbacks ({pinnedFeedbacks.length})
                </h3>
                <div className="space-y-3">
                  {pinnedFeedbacks.map((feedback) => (
                    <div key={feedback.id} className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-foreground">{feedback.customer_name}</span>
                          <div className="flex items-center">
                            {[...Array(feedback.rating)].map((_, i) => (
                              <Star key={i} className="fill-primary text-primary" size={14} />
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => togglePinFeedback(feedback.id)}
                            variant="outline"
                            size="sm"
                          >
                            <Pin size={14} className="text-primary" />
                          </Button>
                          <Button
                            onClick={() => deleteFeedback(feedback.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic mb-1">"{feedback.feedback_text}"</p>
                      <p className="text-xs text-muted-foreground">{feedback.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-6">All Feedbacks ({unpinnedFeedbacks.length})</h3>
              <div className="space-y-3">
                {unpinnedFeedbacks.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No feedbacks yet</p>
                ) : (
                  unpinnedFeedbacks.map((feedback) => (
                    <div key={feedback.id} className="flex justify-between items-start p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-foreground">{feedback.customer_name}</span>
                          <div className="flex items-center">
                            {[...Array(feedback.rating)].map((_, i) => (
                              <Star key={i} className="fill-primary text-primary" size={14} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground italic mb-1">"{feedback.feedback_text}"</p>
                        <p className="text-xs text-muted-foreground">{feedback.date}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          onClick={() => togglePinFeedback(feedback.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Pin size={14} />
                        </Button>
                        <Button
                          onClick={() => deleteFeedback(feedback.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;