import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, Tag } from 'lucide-react';

const placeholderPosts = [
  {
    slug: 'top-5-personalized-gift-ideas-for-holidays',
    title: 'Top 5 Personalized Gift Ideas for the Holidays',
    description: 'Discover unique and heartfelt custom gifts that will wow your loved ones this holiday season. From custom apparel to personalized mugs, find inspiration here.',
    date: '2025-05-15',
    category: 'Gift Ideas',
    keyphrase: 'personalized gift ideas',
    imageUrl: 'https://images.unsplash.com/photo-1576070939640-3f5345001458?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    imageAlt: 'Beautifully wrapped personalized gifts under a Christmas tree',
  },
  {
    slug: 'designing-your-own-tshirt-a-beginners-guide',
    title: 'Designing Your Own T-Shirt: A Beginner\'s Guide',
    description: 'Learn the basics of t-shirt design, from choosing the right graphics to understanding color theory. Create stunning custom t-shirts with ease!',
    date: '2025-05-10',
    category: 'Design Tips',
    keyphrase: 'designing your own t-shirt',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    imageAlt: 'A person proudly wearing a custom designed t-shirt',
  },
  {
    slug: 'why-custom-mugs-make-the-perfect-corporate-gift',
    title: 'Why Custom Mugs Make the Perfect Corporate Gift',
    description: 'Explore the benefits of using personalized mugs as corporate gifts. Boost brand visibility and employee morale with this practical and thoughtful present.',
    date: '2025-05-05',
    category: 'Business',
    keyphrase: 'custom mugs corporate gift',
    imageUrl: 'https://images.unsplash.com/photo-1580819223288-802099317c1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    imageAlt: 'A collection of branded custom mugs on an office desk',
  },
];

const BlogPostCard = ({ post, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0px 10px 20px hsla(var(--primary), 0.2)" }}
      className="h-full"
    >
      <Card className="glassmorphic-card h-full flex flex-col overflow-hidden hover:border-primary transition-all duration-300">
        <div className="aspect-video overflow-hidden">
          <img-replace src={post.imageUrl} alt={post.imageAlt || `Blog post image for ${post.title}`} class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
        </div>
        <CardHeader className="p-6">
          <CardTitle className="font-poppins text-2xl gradient-text mb-2">{post.title}</CardTitle>
          <div className="flex items-center text-xs text-muted-foreground space-x-4 mb-2">
            <span className="flex items-center"><CalendarDays className="mr-1 h-4 w-4" /> {post.date}</span>
            <span className="flex items-center"><Tag className="mr-1 h-4 w-4" /> {post.category}</span>
          </div>
          <CardDescription className="text-foreground/80 text-base line-clamp-3">{post.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0 mt-auto">
          <Link to={`/blog/${post.slug}`}>
            <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const BlogPage = () => {
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
        CustomCreations Blog
      </motion.h1>
      <motion.p 
        className="text-xl text-foreground/80 text-center mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Inspiration, tips, and news about personalized products and creative designs. Your go-to resource for all things custom!
      </motion.p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {placeholderPosts.map((post, index) => (
          <BlogPostCard key={post.slug} post={post} delay={index} />
        ))}
      </div>
      
      <motion.div 
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: placeholderPosts.length * 0.1 + 0.5}}
      >
        <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90">
          Load More Posts
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default BlogPage;