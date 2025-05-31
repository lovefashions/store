import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Send, MessageSquare, Star } from 'lucide-react';

const FeedbackPage = () => {
  const [feedbackType, setFeedbackType] = useState('general');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (rating === 0 && (feedbackType === "product" || feedbackType === "experience")) {
        toast({
            title: "Rating Required",
            description: "Please select a star rating for your feedback.",
            variant: "destructive",
            duration: 3000,
        });
        return;
    }
    if (!comments.trim()) {
        toast({
            title: "Comments Required",
            description: "Please provide some comments for your feedback.",
            variant: "destructive",
            duration: 3000,
        });
        return;
    }

    console.log({
      feedbackType,
      rating,
      comments,
      email,
    });

    localStorage.setItem('userFeedback', JSON.stringify({ feedbackType, rating, comments, email, timestamp: new Date().toISOString() }));

    toast({
      title: "Feedback Sent!",
      description: "Thank you for helping us improve CustomCreations!",
      variant: "default",
      duration: 3000,
    });
    setRating(0);
    setComments('');
    setEmail('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4 max-w-2xl"
    >
      <motion.h1 
        className="font-poppins text-4xl md:text-5xl font-bold mb-10 text-center gradient-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <MessageSquare className="inline-block mr-3 h-10 w-10" />
        Share Your Feedback
      </motion.h1>

      <Card className="glassmorphic-card">
        <CardHeader>
          <CardTitle className="text-2xl">We Value Your Opinion</CardTitle>
          <CardDescription>Let us know how we can make CustomCreations even better for you. Your insights are crucial for our growth!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitFeedback} className="space-y-6">
            <div>
              <Label htmlFor="feedbackType" className="text-lg">Feedback Type</Label>
              <div className="flex space-x-4 mt-2">
                {['general', 'design_process', 'product_quality', 'website_ux'].map((type) => (
                  <Button
                    key={type}
                    type="button"
                    variant={feedbackType === type ? 'default' : 'outline'}
                    onClick={() => setFeedbackType(type)}
                    className={`capitalize transition-all duration-200 ${feedbackType === type ? 'bg-primary text-primary-foreground' : 'border-primary text-primary hover:bg-primary/10'}`}
                  >
                    {type.replace('_', ' ')}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="rating" className="text-lg">Your Rating</Label>
              <div className="flex space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    type="button"
                    key={star}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star 
                      className={`h-8 w-8 cursor-pointer transition-colors duration-200 ${star <= rating ? 'text-accent fill-accent' : 'text-muted-foreground hover:text-accent/70'}`}
                    />
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="comments" className="text-lg">Your Comments</Label>
              <Textarea 
                id="comments" 
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Tell us more about your experience or suggestions..." 
                className="min-h-[120px] mt-2 bg-input/50 border-border focus:border-primary"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-lg">Your Email (Optional)</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="So we can follow up if needed" 
                className="mt-2 bg-input/50 border-border focus:border-primary"
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity">
                <Send className="mr-2 h-5 w-5" /> Submit Feedback
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
      <p className="text-center text-muted-foreground mt-8 text-sm">
        Feedback is currently logged to the console and stored in localStorage for demonstration. A full backend (like Supabase) would be needed for persistent storage and processing.
      </p>
    </motion.div>
  );
};

export default FeedbackPage;