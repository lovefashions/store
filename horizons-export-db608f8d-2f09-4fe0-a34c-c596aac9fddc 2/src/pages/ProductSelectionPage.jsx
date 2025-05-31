import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shirt, Coffee, Zap, Package, ChevronRight } from 'lucide-react'; // Zap for Hat, Package for Other

const products = [
  { id: 'tshirt', name: 'T-Shirt', description: 'Classic cotton t-shirt, perfect for any design.', icon: Shirt, priceRange: '$15 - $25' },
  { id: 'mug', name: 'Coffee Mug', description: 'Ceramic mug, ideal for vibrant images and text.', icon: Coffee, priceRange: '$10 - $20' },
  { id: 'hat', name: 'Cap / Hat', description: 'Stylish caps and hats, great for logos and slogans.', icon: Zap, priceRange: '$12 - $22' },
  { id: 'bag', name: 'Tote Bag', description: 'Durable tote bags for everyday use or gifting.', icon: Package, priceRange: '$18 - $30' },
  // Add more products here
];

const ProductCard = ({ product, delay }) => {
  const IconComponent = product.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0px 10px 20px hsla(var(--primary), 0.2)" }}
      className="h-full"
    >
      <Link to={`/design/${product.id}`} className="block h-full">
        <Card className="glassmorphic-card h-full flex flex-col hover:border-primary transition-all duration-300 overflow-hidden">
          <CardHeader className="items-center text-center p-6">
            <motion.div 
              className="p-4 bg-primary/20 rounded-full mb-4"
              whileHover={{ scale: 1.1, rotate: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <IconComponent className="h-12 w-12 text-primary" />
            </motion.div>
            <CardTitle className="font-poppins text-2xl gradient-text">{product.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">{product.priceRange}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow p-6 pt-0 text-center">
            <p className="text-foreground/80 text-base mb-4">{product.description}</p>
            <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary">
              Customize This <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

const ProductSelectionPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4"
    >
      <motion.h1 
        className="font-poppins text-4xl md:text-5xl font-bold mb-4 text-center gradient-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Select Your Canvas
      </motion.h1>
      <motion.p 
        className="text-xl text-foreground/80 text-center mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Choose a base product to start your personalization journey. Each item is a blank slate for your creativity!
      </motion.p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} delay={index} />
        ))}
      </div>
      
      <motion.div 
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: products.length * 0.1 + 0.5}}
      >
        <p className="text-muted-foreground">Looking for something else? More products coming soon!</p>
      </motion.div>
    </motion.div>
  );
};

export default ProductSelectionPage;