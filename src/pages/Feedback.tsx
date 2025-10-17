import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, MessageSquare, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { addFeedback, getFeedbacks, Feedback } from "../lib/supabaseService";



const FeedbackPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      const feedbacksData = await getFeedbacks();
      setFeedbacks(feedbacksData);
    } catch (error) {
      console.error('Error loading feedbacks:', error);
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setIsSubmitting(true);
    
    try {
      await addFeedback({
        customer_name: name,
        feedback_text: message,
        rating,
        date: new Date().toLocaleDateString(),
        is_pinned: false
      });
      
      setName("");
      setMessage("");
      setRating(5);
      await loadFeedbacks();
      alert("Thank you for your feedback! We appreciate your input.");
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-md">
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center max-w-7xl">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <img src="https://i.postimg.cc/5tpJ1bLY/MY-L.png" alt="Namma Designs Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
            <h1 className="text-lg sm:text-2xl font-bold text-foreground">
              Namma <span className="text-primary">Designs</span>
            </h1>
          </Link>
          
          <Link to="/">
            <Button variant="outline" className="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base px-3 sm:px-4">
              <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/10 py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
            <MessageSquare className="text-primary mb-2 sm:mb-0 sm:mr-3" size={32} />
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-foreground text-center">
              Share Your <span className="text-primary">Feedback</span>
            </h1>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            We value your opinion! Tell us about your experience with our designs and services.
          </p>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Card className="shadow-lg">
            <CardHeader>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center">
                Give Us Your Feedback
              </h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          size={24}
                          className={`${
                            star <= rating
                              ? "fill-primary text-primary"
                              : "text-gray-300"
                          } hover:text-primary transition-colors`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({rating} star{rating !== 1 ? 's' : ''})
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Your Feedback
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your experience with our designs..."
                    rows={5}
                    className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2"
                >
                  <Send size={16} />
                  <span>{isSubmitting ? "Submitting..." : "Submit Feedback"}</span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Display Feedbacks */}
      {feedbacks.length > 0 && (
        <section className="py-8 sm:py-12 lg:py-16 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-8 sm:mb-12">
              Recent Feedback
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feedbacks.slice(0, 6).map((feedback) => (
                <Card key={feedback.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(feedback.rating)].map((_, i) => (
                          <Star key={i} className="fill-primary text-primary" size={16} />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{feedback.date}</span>
                    </div>
                    <p className="font-semibold text-foreground">{feedback.customer_name}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic text-sm">
                      "{feedback.feedback_text}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-white border-t py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-7xl">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <img src="https://i.postimg.cc/5tpJ1bLY/MY-L.png" alt="Logo" className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
            <span className="text-sm sm:text-base text-foreground font-semibold">
              Namma <span className="text-primary">Designs</span>
            </span>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm">
            © 2025 Namma Designs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FeedbackPage;