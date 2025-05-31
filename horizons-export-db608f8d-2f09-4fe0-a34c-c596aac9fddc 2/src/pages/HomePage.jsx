import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Palette, Layers, Edit3, Eye, Gift, Zap, Shirt, Shirt as Hoodie, Edit, ShoppingBag, BookOpen, MessageSquare as MessageSquareQuote, ArrowRight } from 'lucide-react'; // Added Hoodie, Edit (for Engraved Jewelry), ShoppingBag (for Jackets)
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, delay, linkTo, ctaText }) => {
  const IconComponent = icon;
  const cardContent = (
    <Card className="glassmorphic-card h-full flex flex-col hover:border-primary transition-all duration-300 overflow-hidden">
      <CardHeader className="items-center text-center p-6">
        <motion.div 
          className="p-3 bg-primary/20 rounded-full mb-4"
          whileHover={{ scale: 1.1, rotate: 15 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <IconComponent className="h-10 w-10 text-primary" />
        </motion.div>
        <CardTitle className="font-poppins text-2xl gradient-text">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0 text-center">
        <CardDescription className="text-foreground/80 text-base mb-4">{description}</CardDescription>
        {linkTo && ctaText && (
          <Link to={linkTo} className="mt-auto">
            <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary">
              {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0px 10px 20px hsla(var(--primary), 0.2)" }}
      className="h-full"
    >
      {cardContent}
    </motion.div>
  );
};


const ProductCategoriesSection = () => {
  const categories = [
    { 
      name: "Personalized Apparel", 
      items: [
        { name: "T-shirts", icon: Shirt, link: "/design/tshirt" },
        { name: "Hoodies", icon: Hoodie, link: "/design/hoodie" }, // Assuming 'hoodie' is a valid productId
        { name: "Jackets", icon: ShoppingBag, link: "/design/jacket" } // Assuming 'jacket' is a valid productId
      ] 
    },
    { 
      name: "Unique Gifts", 
      items: [
        { name: "Custom Mugs", icon: Gift, link: "/design/mug" },
        { name: "Photo Books", icon: BookOpen, link: "/design/photobook" }, // Assuming 'photobook' is a valid productId
        { name: "Engraved Jewelry", icon: Edit, link: "/design/jewelry" } // Assuming 'jewelry' is a valid productId
      ] 
    },
  ];

  return (
    <section id="product-categories" className="py-16">
      <motion.h2 
        initial={{ opacity: 0, y:20 }}
        whileInView={{ opacity: 1, y:0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="font-poppins text-4xl md:text-5xl font-bold text-center mb-12"
      >
        Explore Our <span className="gradient-text">Creations</span>
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-10">
        {categories.map((category, catIndex) => (
          <motion.div 
            key={category.name}
            initial={{ opacity: 0, x: catIndex % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: catIndex * 0.2 }}
          >
            <Card className="glassmorphic-card p-2">
              <CardHeader>
                <CardTitle className="text-3xl font-poppins gradient-text">{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.items.map((item, itemIndex) => {
                  const ItemIcon = item.icon;
                  return (
                    <Link to={item.link} key={item.name}>
                      <motion.div
                        whileHover={{ scale: 1.03, boxShadow: "0px 5px 15px hsla(var(--secondary), 0.15)" }}
                        className="p-4 bg-card/60 rounded-lg border border-border hover:border-secondary transition-colors flex items-center space-x-3"
                      >
                        <ItemIcon className="h-8 w-8 text-secondary" />
                        <span className="text-lg text-foreground/90">{item.name}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y:20 }}
          whileInView={{ opacity: 1, y:0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: categories.length * 0.2 + 0.2}}
        >
          <Link to="/products">
            <Button size="lg" variant="outline" className="text-lg border-primary text-primary hover:bg-primary/10 hover:text-primary transition-colors">
              Shop The New Collection <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
    </section>
  );
};


const FeaturedBlogSection = () => {
  const featuredPost = {
    slug: 'the-ultimate-guide-to-writing', // Placeholder slug
    title: "The Ultimate Guide to Writing",
    author: "Dani Martinez",
    readTime: "5 min read",
    description: "Explore opinion pieces from world-class journalists and master the art of compelling writing.",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  };
  return (
    <section id="featured-blog" className="py-16 bg-card/30 rounded-lg glassmorphic-card">
       <motion.h2 
        initial={{ opacity: 0, y:20 }}
        whileInView={{ opacity: 1, y:0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="font-poppins text-4xl md:text-5xl font-bold text-center mb-12"
      >
        From Our <span className="gradient-text">Blog</span>
      </motion.h2>
      <motion.div 
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="overflow-hidden shadow-xl hover:shadow-primary/20 transition-shadow">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img-replace src={featuredPost.imageUrl} alt={`Blog post: ${featuredPost.title}`} class="h-64 w-full object-cover md:h-full"/>
            </div>
            <div className="md:w-1/2 p-6 flex flex-col justify-center bg-card">
              <CardTitle className="text-3xl font-poppins gradient-text mb-3">{featuredPost.title}</CardTitle>
              <p className="text-sm text-muted-foreground mb-1">{featuredPost.author} | {featuredPost.readTime}</p>
              <CardDescription className="text-foreground/80 text-base mb-6">{featuredPost.description}</CardDescription>
              <Link to={`/blog/${featuredPost.slug}`}>
                <Button variant="link" className="text-lg text-primary p-0 h-auto">
                  Read it on our Blog <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};

const TestimonialSection = () => {
  const testimonials = [
    { quote: "I love how easy it is to create something truly unique!", author: "Alex P.", time: "3 days ago", avatar: "AP" },
    { quote: "The quality of the personalized hoodie I ordered was outstanding!", author: "Sarah K.", time: "1 week ago", avatar: "SK" },
    { quote: "Customer service was super helpful in guiding my design choices.", author: "Mike B.", time: "2 weeks ago", avatar: "MB" },
  ];
  return(
    <section id="social-proof" className="py-16">
       <motion.h2 
        initial={{ opacity: 0, y:20 }}
        whileInView={{ opacity: 1, y:0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="font-poppins text-4xl md:text-5xl font-bold text-center mb-12"
      >
        What Our <span className="gradient-text">Creators Say</span>
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <Card className="glassmorphic-card h-full flex flex-col">
              <CardContent className="p-6 flex-grow flex flex-col">
                <MessageSquareQuote className="h-10 w-10 text-primary mb-4" />
                <p className="text-foreground/90 text-lg italic mb-6 flex-grow">"{testimonial.quote}"</p>
                <div className="flex items-center mt-auto">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};


const HomePage = () => {
  const { toast } = useToast();

  const showPlaceholderToast = (featureName) => {
    toast({
      title: `${featureName} - Coming Soon!`,
      description: `Full functionality for ${featureName.toLowerCase()} will be implemented with backend integration.`,
      variant: "default",
      duration: 3000,
    });
  };
  
  const coreFeaturesList = [
    { icon: Palette, title: "Intuitive Personalization", description: "Easily customize apparel, accessories, and gifts." },
    { icon: Layers, title: "Diverse Product Range", description: "T-shirts, hats, mugs, and more base products." },
    { icon: Edit3, title: "Powerful Design Tools", description: "Add text, images, patterns with our rich element library." },
    { icon: Eye, title: "Real-Time Preview", description: "Visualize your creations instantly before ordering." },
  ];

  return (
    <div className="space-y-20 md:space-y-28 overflow-x-hidden">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50"></div>
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary rounded-full filter blur-[150px] opacity-20 animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-secondary rounded-full filter blur-[120px] opacity-15 animate-pulse-glow animation-delay-2000"></div>
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-lg md:text-xl text-primary mb-3 font-medium"
        >
          A thoughtful combination of design and function.
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-poppins text-5xl md:text-7xl font-extrabold mb-6"
        >
          <span className="gradient-text">Design Your Dreams,</span>
          <br />
          Wear Your Story.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-10"
        >
          The long wait is over. Discover our New Collection. Unleash your creativity with our intuitive platform.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 150 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/products">
            <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity transform hover:scale-105 shadow-lg hover:shadow-primary/40 w-full sm:w-auto">
              Explore Now <Zap className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/blog">
             <Button variant="outline" size="lg" className="text-lg px-10 py-6 border-accent text-accent hover:bg-accent/10 hover:text-accent transition-colors w-full sm:w-auto">
               Read it on our Blog <BookOpen className="ml-2 h-5 w-5"/>
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Product Categories Section */}
      <ProductCategoriesSection />

      {/* Core Features Section */}
      <section id="core-features" className="py-16">
        <motion.h2 
          initial={{ opacity: 0, y:20 }}
          whileInView={{ opacity: 1, y:0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="font-poppins text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Why You'll <span className="gradient-text">Love</span> CustomCreations
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreFeaturesList.map((feature, index) => (
            <FeatureCard key={`core-${index}`} icon={feature.icon} title={feature.title} description={feature.description} delay={index} />
          ))}
        </div>
      </section>
      
      {/* Featured Blog Section */}
      <FeaturedBlogSection />
      
      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Final Call to Action */}
      <section className="py-20 text-center bg-gradient-to-br from-primary/70 via-secondary/70 to-accent/70 rounded-lg shadow-2xl my-16">
        <motion.h2 
          initial={{ opacity: 0, y:20 }}
          whileInView={{ opacity: 1, y:0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="font-poppins text-4xl md:text-5xl font-bold text-primary-foreground mb-6"
        >
          Ready to Bring Your Ideas to Life?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y:20 }}
          whileInView={{ opacity: 1, y:0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10"
        >
          Join thousands of creators turning imagination into reality. It's fun, easy, and incredibly rewarding.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 150 }}
        >
           <Link to="/products">
            <Button size="lg" className="text-lg px-10 py-6 bg-background text-primary hover:bg-foreground hover:text-background transition-colors transform hover:scale-105 shadow-lg">
              Shop the New Collection
            </Button>
          </Link>
        </motion.div>
      </section>

      <div className="fixed bottom-4 right-4 z-50">
         <Link to="/feedback">
          <Button
            variant="default"
            size="icon"
            className="rounded-full h-14 w-14 bg-gradient-to-tr from-primary to-secondary text-primary-foreground shadow-lg hover:opacity-90 transform hover:scale-110 transition-all"
            aria-label="Give Feedback"
          >
            <MessageSquareQuote className="h-7 w-7" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;