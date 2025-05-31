import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, MessageSquare, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: { type: 'spring', stiffness: 300 }
    }
  };

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-card border-t border-border/40 py-8 text-center text-muted-foreground"
    >
      <div className="container mx-auto">
        <div className="flex justify-center space-x-6 mb-6">
          <motion.a href="#" aria-label="Facebook" variants={iconVariants} whileHover="hover" className="text-muted-foreground hover:text-primary transition-colors">
            <Facebook size={24} />
          </motion.a>
          <motion.a href="#" aria-label="Twitter" variants={iconVariants} whileHover="hover" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter size={24} />
          </motion.a>
          <motion.a href="#" aria-label="Instagram" variants={iconVariants} whileHover="hover" className="text-muted-foreground hover:text-primary transition-colors">
            <Instagram size={24} />
          </motion.a>
          <motion.a href="#" aria-label="LinkedIn" variants={iconVariants} whileHover="hover" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin size={24} />
          </motion.a>
        </div>
        <div className="mb-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
          <Link to="/feedback">
            <Button variant="link" className="text-primary hover:text-secondary">
              <MessageSquare size={18} className="mr-2" /> Give Feedback
            </Button>
          </Link>
          <Link to="/blog">
            <Button variant="link" className="text-primary hover:text-secondary">
              <BookOpen size={18} className="mr-2" /> Our Blog
            </Button>
          </Link>
          <Button variant="link" className="text-primary hover:text-secondary">
            About Us
          </Button>
          <Button variant="link" className="text-primary hover:text-secondary">
            Contact
          </Button>
          <Button variant="link" className="text-primary hover:text-secondary">
            FAQ
          </Button>
        </div>
        <p className="text-sm">
          &copy; {currentYear} Custom Creations Co. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Crafted with <span className="text-primary">&hearts;</span> by Hostinger Horizons
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;