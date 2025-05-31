
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Palette, Shirt, Save, Settings, Trash2 } from 'lucide-react';
import { useUserPreferences } from '@/contexts/UserPreferencesContext';

const UserProfilePage = () => {
  const { preferences, updatePreference, clearPreferences } = useUserPreferences();
  const [favoriteColors, setFavoriteColors] = useState(preferences.favoriteColors || []);
  const [preferredStyles, setPreferredStyles] = useState(preferences.preferredStyles || []);
  const [newColor, setNewColor] = useState('');
  const [newStyle, setNewStyle] = useState('');
  const { toast } = useToast();

  const availableColors = ["Red", "Blue", "Green", "Yellow", "Black", "White", "Pink", "Purple", "Orange"];
  const availableStyles = ["Modern", "Vintage", "Minimalist", "Bohemian", "Sporty", "Casual", "Formal"];

  const handleColorToggle = (color) => {
    setFavoriteColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleStyleToggle = (style) => {
    setPreferredStyles(prev =>
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };
  
  const handleSavePreferences = () => {
    updatePreference('favoriteColors', favoriteColors);
    updatePreference('preferredStyles', preferredStyles);
    toast({
      title: "Preferences Saved!",
      description: "Your profile has been updated with your choices.",
      variant: "default",
      duration: 3000,
    });
  };

  const handleClearPreferences = () => {
    clearPreferences();
    setFavoriteColors([]);
    setPreferredStyles([]);
    toast({
      title: "Preferences Cleared!",
      description: "Your saved preferences have been removed.",
      variant: "destructive",
      duration: 3000,
    });
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4"
    >
      <motion.h1 
        className="font-poppins text-4xl md:text-5xl font-bold mb-10 text-center gradient-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Your Profile & Preferences
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glassmorphic-card">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Palette className="mr-3 text-primary h-7 w-7" />
              Favorite Colors
            </CardTitle>
            <CardDescription>Select colors you love to get personalized recommendations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {availableColors.map(color => (
                <Button 
                  key={color}
                  variant={favoriteColors.includes(color) ? "default" : "outline"}
                  onClick={() => handleColorToggle(color)}
                  className={`transition-all duration-200 ${favoriteColors.includes(color) ? 'bg-primary text-primary-foreground' : 'border-primary text-primary hover:bg-primary/10'}`}
                >
                  {color}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphic-card">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Shirt className="mr-3 text-secondary h-7 w-7" />
              Preferred Styles
            </CardTitle>
            <CardDescription>Tell us about your style for tailored design suggestions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-3 gap-2">
              {availableStyles.map(style => (
                <Button 
                  key={style}
                  variant={preferredStyles.includes(style) ? "default" : "outline"}
                  onClick={() => handleStyleToggle(style)}
                  className={`transition-all duration-200 ${preferredStyles.includes(style) ? 'bg-secondary text-secondary-foreground' : 'border-secondary text-secondary hover:bg-secondary/10'}`}
                >
                  {style}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <motion.div 
        className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button onClick={handleSavePreferences} size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity w-full sm:w-auto">
          <Save className="mr-2 h-5 w-5" /> Save Preferences
        </Button>
        <Button onClick={handleClearPreferences} variant="destructive" size="lg" className="w-full sm:w-auto">
          <Trash2 className="mr-2 h-5 w-5" /> Clear All Preferences
        </Button>
      </motion.div>
      
      <Card className="glassmorphic-card mt-12">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Settings className="mr-3 text-accent h-7 w-7" />
            Account Settings
          </CardTitle>
          <CardDescription>Manage your account details and notification preferences. (Placeholder)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="your.email@example.com" className="bg-input/50 border-border focus:border-primary" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Change Password</Label>
            <Input id="password" type="password" placeholder="New Password" className="bg-input/50 border-border focus:border-primary" />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="newsletter" />
            <Label htmlFor="newsletter" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Subscribe to newsletter for updates and offers.
            </Label>
          </div>
           <Button variant="outline" className="mt-4 border-accent text-accent hover:bg-accent/10">Update Account Settings</Button>
        </CardContent>
      </Card>
      <p className="text-center text-muted-foreground mt-8 text-sm">
        User preferences are currently stored in your browser's localStorage. For persistent storage across devices, Supabase integration will be used in a future update.
      </p>
    </motion.div>
  );
};

export default UserProfilePage;