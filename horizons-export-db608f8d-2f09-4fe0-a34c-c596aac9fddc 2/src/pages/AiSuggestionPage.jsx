import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Bot, Zap, Sparkles, Palette, Shirt, Gift } from 'lucide-react';

const productTypes = ["T-Shirt", "Mug", "Hat", "Tote Bag", "Hoodie", "Phone Case"];
const designStyles = ["Minimalist", "Vintage", "Modern", "Abstract", "Typography", "Nature-inspired", "Geometric"];
const colorPalettes = [
  { name: "Vibrant Sunset", colors: ["#FF6B6B", "#FFA500", "#FFD700"], description: "Warm and energetic, perfect for bold statements." },
  { name: "Ocean Breeze", colors: ["#00BFFF", "#1E90FF", "#ADD8E6"], description: "Calm and refreshing, ideal for cool and serene designs." },
  { name: "Forest Canopy", colors: ["#228B22", "#3CB371", "#90EE90"], description: "Earthy and natural, great for organic or eco-themed items." },
  { name: "Monochromatic Chic", colors: ["#333333", "#808080", "#D3D3D3"], description: "Sleek and sophisticated, for a timeless modern look." },
  { name: "Pastel Dreams", colors: ["#FFB6C1", "#E6E6FA", "#AFEEEE"], description: "Soft and gentle, excellent for delicate and whimsical designs." }
];

const ANY_PRODUCT_VALUE = "any-product-placeholder";
const ANY_STYLE_VALUE = "any-style-placeholder";

const AiSuggestionPage = () => {
  const { toast } = useToast();
  const [userInput, setUserInput] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMockRecommendations = () => {
    setIsLoading(true);
    setRecommendations([]);

    setTimeout(() => {
      const newRecommendations = [];
      const numRecs = Math.floor(Math.random() * 3) + 2;

      for (let i = 0; i < numRecs; i++) {
        const product = (selectedProduct && selectedProduct !== ANY_PRODUCT_VALUE) ? selectedProduct : productTypes[Math.floor(Math.random() * productTypes.length)];
        const style = (selectedStyle && selectedStyle !== ANY_STYLE_VALUE) ? selectedStyle : designStyles[Math.floor(Math.random() * designStyles.length)];
        const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
        
        let keywords = userInput.split(',').map(k => k.trim()).filter(k => k);
        if (keywords.length === 0) keywords = ["creative", "unique", "personalized"];
        const keyword = keywords[Math.floor(Math.random() * keywords.length)];

        newRecommendations.push({
          id: Date.now() + i,
          title: `Inspired ${product} Idea #${i + 1}`,
          description: `A ${style} ${product} featuring ${keyword} elements, using the '${palette.name}' color palette. ${palette.description}`,
          productType: product,
          designStyle: style,
          colorPalette: palette,
          userKeywords: userInput,
        });
      }
      setRecommendations(newRecommendations);
      setIsLoading(false);
      toast({
        title: "Suggestions Ready!",
        description: "Here are some AI-powered ideas based on your input.",
      });
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim() && (!selectedProduct || selectedProduct === ANY_PRODUCT_VALUE) && (!selectedStyle || selectedStyle === ANY_STYLE_VALUE)) {
      toast({
        title: "Input Needed",
        description: "Please provide some keywords, select a product, or choose a style.",
        variant: "destructive",
      });
      return;
    }
    getMockRecommendations();
  };

  const RecommendationCard = ({ rec }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="glassmorphic-card overflow-hidden hover:shadow-primary/20 transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-primary/30 to-secondary/30 p-4">
          <CardTitle className="text-xl font-poppins flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-primary" />
            {rec.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <p className="text-foreground/90">{rec.description}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <Shirt className="h-4 w-4 mr-2 text-primary" /> Product: {rec.productType}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Palette className="h-4 w-4 mr-2 text-secondary" /> Style: {rec.designStyle}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Colors:</span>
            {rec.colorPalette.colors.map(color => (
              <div key={color} style={{ backgroundColor: color }} className="w-5 h-5 rounded-full border border-border"/>
            ))}
          </div>
          {rec.userKeywords && <p className="text-xs text-muted-foreground italic">Inspired by: "{rec.userKeywords}"</p>}
           <Button variant="outline" className="w-full mt-3 border-primary text-primary hover:bg-primary/10" onClick={() => navigateToDesign(rec.productType)}>
            Customize this Idea <Zap className="ml-2 h-4 w-4"/>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
  
  const navigateToDesign = (productType) => {
    const path = `/design/${productType.toLowerCase().replace(/\s+/g, '')}`;
    window.location.href = path; 
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4"
    >
      <motion.h1 
        className="font-poppins text-4xl md:text-5xl font-bold mb-4 text-center gradient-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Bot className="inline-block h-12 w-12 mr-3 text-primary" />
        AI Design Suggester
      </motion.h1>
      <motion.p 
        className="text-xl text-foreground/80 text-center mb-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Tell us your ideas, and let our AI craft personalized design suggestions for your custom products!
      </motion.p>

      <Card className="w-full max-w-2xl mx-auto glassmorphic-card shadow-xl mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Describe Your Vision</CardTitle>
          <CardDescription>Enter keywords, choose a product or style, or let the AI surprise you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="userInput">Keywords (comma-separated)</Label>
              <Textarea 
                id="userInput" 
                value={userInput} 
                onChange={(e) => setUserInput(e.target.value)} 
                placeholder="e.g., space theme, cats, retro, birthday gift" 
                className="bg-input/50 min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productType">Product Type (Optional)</Label>
                <Select onValueChange={setSelectedProduct} value={selectedProduct}>
                  <SelectTrigger id="productType" className="bg-input/50">
                    <SelectValue placeholder="Any Product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ANY_PRODUCT_VALUE}>Any Product</SelectItem>
                    {productTypes.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="designStyle">Design Style (Optional)</Label>
                 <Select onValueChange={setSelectedStyle} value={selectedStyle}>
                  <SelectTrigger id="designStyle" className="bg-input/50">
                    <SelectValue placeholder="Any Style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ANY_STYLE_VALUE}>Any Style</SelectItem>
                    {designStyles.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90" disabled={isLoading}>
              {isLoading ? (
                <>
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Bot className="h-5 w-5" />
                  </motion.div>
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5"/> Get AI Suggestions
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {recommendations.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-poppins text-3xl font-bold text-center mb-8 gradient-text">
            Your Personalized Recommendations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map(rec => (
              <RecommendationCard key={rec.id} rec={rec} />
            ))}
          </div>
        </motion.section>
      )}

      { !isLoading && recommendations.length === 0 && (
         <div className="text-center py-10">
            <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">Waiting for your creative spark!</p>
            <p className="text-sm text-muted-foreground">Fill in the form above to get started.</p>
        </div>
      )}
      
      <p className="text-center text-muted-foreground mt-12 text-sm">
        This AI Suggestion Tool is for demonstration purposes. Real AI/ML models would be integrated with a backend for more advanced recommendations.
      </p>
    </motion.div>
  );
};

export default AiSuggestionPage;