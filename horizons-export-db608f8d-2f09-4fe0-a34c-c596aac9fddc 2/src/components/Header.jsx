import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, UserCircle, BookOpen, LogIn, Bot } from 'lucide-react'; // Added Bot icon
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  // Placeholder for authentication status
  const isAuthenticated = false; 

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -3 }}
            className="flex items-center space-x-2"
          >
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="font-poppins text-2xl font-bold gradient-text">CustomCreations</span>
          </motion.div>
        </Link>
        <nav className="flex items-center space-x-1 md:space-x-2">
          <Link to="/products">
            <Button variant="ghost" className="text-foreground hover:text-primary transition-colors">Products</Button>
          </Link>
          <Link to="/design/tshirt">
            <Button variant="ghost" className="text-foreground hover:text-primary transition-colors">Design Lab</Button>
          </Link>
           <Link to="/ai-suggestions">
            <Button variant="ghost" className="text-foreground hover:text-primary transition-colors">
              <Bot className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline">AI Suggestions</span>
            </Button>
          </Link>
          <Link to="/blog">
            <Button variant="ghost" className="text-foreground hover:text-primary transition-colors">
              <BookOpen className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline">Blog</span>
            </Button>
          </Link>
          
          {isAuthenticated ? (
            <Link to="/profile">
              <Button variant="ghost" className="text-foreground hover:text-primary transition-colors px-2 md:px-3">
                <UserCircle className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">Profile</span>
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="ghost" className="text-foreground hover:text-primary transition-colors px-2 md:px-3">
                <LogIn className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">Login</span>
              </Button>
            </Link>
          )}

          <Link to="/create-account">
            <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity">
              Get Started
            </Button>
          </Link>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;