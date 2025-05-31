import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CalendarDays, Tag, UserCircle, MessageSquare, ArrowRight } from 'lucide-react';

const placeholderPostsData = {
  'top-5-personalized-gift-ideas-for-holidays': {
    slug: 'top-5-personalized-gift-ideas-for-holidays',
    title: 'Top 5 Personalized Gift Ideas for the Holidays',
    seoTitle: 'Best Personalized Gift Ideas for Holidays | CustomCreations',
    metaDescription: 'Discover unique and heartfelt custom gifts like personalized apparel and mugs for the holidays. Find inspiration for memorable presents at CustomCreations.',
    keyphrase: 'personalized gift ideas',
    content: `
      <p class="mb-4 text-lg leading-relaxed">The holiday season is just around the corner, and what better way to show your love than with <strong>personalized gift ideas</strong> that speak from the heart? At CustomCreations, we believe that a personal touch can transform a simple gift into a cherished memory. Let's dive into some fantastic options!</p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-3 gradient-text">1. Custom T-Shirts with a Personal Message</h2>
      <img-replace src="https://images.unsplash.com/photo-1600195077909-46ccf5216105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="A collection of custom t-shirts with unique designs - keyphrase: custom t-shirt gifts" class="rounded-lg my-4 shadow-lg w-full" />
      <p class="mb-4">A custom t-shirt isn't just clothing; it's a wearable statement. You can print an inside joke, a favorite quote, or a meaningful graphic. It's a perfect example of <em>thoughtful custom apparel</em>. <a href="/products" class="text-primary hover:underline">Design your t-shirt now!</a></p>

      <h2 class="text-2xl font-semibold mt-6 mb-3 gradient-text">2. Personalized Mugs for Cozy Mornings</h2>
      <p class="mb-4">Imagine sipping your morning coffee from a mug that features a beloved photo or a motivational quote. Personalized mugs are practical, heartwarming, and always a hit. They are excellent for showcasing <em>unique photo gifts</em>.</p>

      <h2 class="text-2xl font-semibold mt-6 mb-3 gradient-text">3. Custom Hats for a Stylish Statement</h2>
      <p class="mb-4">For the fashion-forward person in your life, a custom hat with an embroidered monogram or a cool design can be a fantastic gift. It's a subtle yet stylish way to express individuality. Explore our <a href="/products" class="text-primary hover:underline">custom hat options</a>.</p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-3 gradient-text">4. Personalized Tote Bags for Everyday Use</h2>
      <img-replace src="https://images.unsplash.com/photo-1579065560486-cfa34080d330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="A stylish personalized tote bag with a custom print - keyphrase: personalized tote bag gifts" class="rounded-lg my-4 shadow-lg w-full" />
      <p class="mb-4">A sturdy and stylish tote bag customized with a unique design or name is both practical and personal. Perfect for shopping, carrying books, or as a daily accessory. This is a great way to offer <em>eco-friendly custom gifts</em>.</p>

      <h2 class="text-2xl font-semibold mt-6 mb-3 gradient-text">5. Custom Phone Cases with a Personal Flair</h2>
      <p class="mb-4">In today's digital age, a phone is an extension of oneself. A custom phone case featuring a favorite artwork, photo, or pattern makes for a trendy and personal gift. It's a modern take on <strong>personalized gift ideas</strong>.</p>

      <p class="mt-6 text-lg leading-relaxed">No matter who you're shopping for, adding a personal touch shows you've put thought and care into your gift. Explore all these options and more at CustomCreations to make this holiday season truly special. For more inspiration, check out our guide on <a href="/blog/designing-your-own-tshirt-a-beginners-guide" class="text-primary hover:underline">how to design your own t-shirt</a>.</p>
    `,
    date: '2025-05-15',
    category: 'Gift Ideas',
    author: 'Jane Doe',
    imageUrl: 'https://images.unsplash.com/photo-1576070939640-3f5345001458?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Beautifully wrapped personalized gifts under a Christmas tree - main image for personalized gift ideas article',
  },
  'designing-your-own-tshirt-a-beginners-guide': {
    slug: 'designing-your-own-tshirt-a-beginners-guide',
    title: 'Designing Your Own T-Shirt: A Beginner\'s Guide',
    seoTitle: 'How to Design Your Own T-Shirt | Beginner Tips | CustomCreations',
    metaDescription: 'Learn the basics of t-shirt design, from choosing graphics to color theory. Create stunning custom t-shirts with our easy guide. Start designing at CustomCreations!',
    keyphrase: 'designing your own t-shirt',
    content: `
      <p class="mb-4 text-lg leading-relaxed">Want to start <strong>designing your own t-shirt</strong> but don't know where to begin? It's easier than you think! This guide will walk you through the fundamental steps to create a t-shirt design you'll love to wear or gift.</p>

      <h2 class="text-2xl font-semibold mt-6 mb-3 gradient-text">1. Define Your Concept and Audience</h2>
      <p class="mb-4">Before you even think about colors or fonts, ask yourself: What's the message or theme of my t-shirt? Who am I designing it for? A clear concept will guide your design choices. Is it for a band, a family reunion, or just a personal statement? Understanding this will help you create <em>impactful custom apparel</em>.</p>

      <h2 class="text-2xl font-semibold mt-6 mb-3 gradient-text">2. Choose Your Graphics and Imagery</h2>
      <img-replace src="https://images.unsplash.com/photo-1576578848076-53808c9c7088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="A mood board with various graphic design elements for t-shirt creation - keyphrase: t-shirt graphic design" class="rounded-lg my-4 shadow-lg w-full" />
      <p class="mb-4">You can use original artwork, photographs, or typography. If you're not an artist, don't worry! There are many resources for royalty-free images and icons. Ensure your images are high-resolution for a crisp print. Our platform offers a library of design elements to get you started with <em>easy t-shirt design</em>.</p>

      <h2 class="text-2xl font-semibold mt-6 mb-3 gradient-text">3. Master Basic Color Theory</h2>
      <p class="mb-4">Colors evoke emotions and can make or break your design. Consider the color of the t-shirt itself and how your design colors will interact with it. Use contrasting colors for readability. For example, light text on a dark shirt or vice versa. Learn more about <a href="https://www.colormatters.com/color-and-design/basic-color-theory" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">basic color theory here</a> (outbound link).</p>

      <h2 class="text-2xl font-semibold mt-6 mb-3 gradient-text">4. Typography Matters</h2>
      <p class="mb-4">The font you choose says a lot. A playful font might suit a fun event, while a clean, modern font could be better for a professional look. Ensure your text is legible from a distance. Experiment with font pairings, but don't use too many different fonts in one design. This is key for <strong>designing your own t-shirt</strong> effectively.</p>

      <h2 class="text-2xl font-semibold mt-6 mb-3 gradient-text">5. Use a Design Tool (Like Ours!)</h2>
      <p class="mb-4">Our intuitive design tool makes it easy to upload images, add text, and arrange elements. You can preview your design in real-time to see how it will look on the final product. <a href="/products" class="text-primary hover:underline">Start designing now</a> and bring your vision to life!</p>

      <p class="mt-6 text-lg leading-relaxed">With these tips, you're well on your way to creating amazing custom t-shirts. Remember, practice makes perfect. Don't be afraid to experiment and have fun with it! For more gift ideas, check out our post on <a href="/blog/top-5-personalized-gift-ideas-for-holidays" class="text-primary hover:underline">top holiday gifts</a>.</p>
    `,
    date: '2025-05-10',
    category: 'Design Tips',
    author: 'Alex Creative',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'A person proudly wearing a custom designed t-shirt - main image for designing your own t-shirt article',
  },
   'why-custom-mugs-make-the-perfect-corporate-gift': {
    slug: 'why-custom-mugs-make-the-perfect-corporate-gift',
    title: 'Why Custom Mugs Make the Perfect Corporate Gift',
    seoTitle: 'Custom Mugs for Corporate Gifting | Benefits & Ideas | CustomCreations',
    metaDescription: 'Discover why personalized mugs are ideal corporate gifts. Boost brand visibility and morale with custom mugs from CustomCreations. Practical and memorable.',
    keyphrase: 'custom mugs corporate gift',
    content: `
      <p class="mb-4 text-lg leading-relaxed">When it comes to corporate gifting, finding an item that is practical, memorable, and budget-friendly can be a challenge. Enter the humble yet powerful custom mug. A <strong>custom mugs corporate gift</strong> strategy can yield surprising benefits for your business.</p>

      <h2 class="text-2xl font-semibold mt-6 mb-3 gradient-text">1. Enhanced Brand Visibility</h2>
      <img-replace src="https://images.unsplash.com/photo-1555975443-9109f7536018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="Office desk with a branded custom mug prominently displayed - keyphrase: branded mugs visibility" class="rounded-lg my-4 shadow-lg w-full" />
      <p class="mb-4">A mug with your company logo or message sits on a desk, gets carried into meetings, and is used daily. This constant exposure reinforces your brand identity not just to the recipient but to everyone they interact with. It's a subtle yet effective form of advertising, making it a great <em>promotional business item</em>.</p>

      <h2 class="text-2xl font-semibold mt-6 mb-3 gradient-text">2. Practical and Appreciated</h2>
      <p class="mb-4">Unlike some corporate gifts that end up in a drawer, mugs are genuinely useful. Whether for coffee, tea, or even pens, they serve a purpose. This utility ensures your gift is appreciated and used regularly, keeping your brand top-of-mind. This makes them ideal as <em>employee appreciation gifts</em>.</p>

      <h2 class="text-2xl font-semibold mt-6 mb-3 gradient-text">3. Cost-Effective Marketing</h2>
      <p class="mb-4">Custom mugs offer a high perceived value at a relatively low cost per unit, especially when ordered in bulk. This makes them an excellent choice for businesses of all sizes looking for an impactful marketing tool that doesn't break the bank. Consider them for your next <a href="https://www.forbes.com/advisor/business/promotional-product-marketing/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">promotional campaign</a> (outbound link).</p>

      <h2 class="text-2xl font-semibold mt-6 mb-3 gradient-text">4. Versatile for Any Occasion</h2>
      <p class="mb-4">Custom mugs are suitable for a wide range of corporate events: employee onboarding, client appreciation, trade shows, holiday gifts, or company milestones. Their versatility makes them a go-to option for any <strong>custom mugs corporate gift</strong> need.</p>
      
      <h2 class="text-2xl font-semibold mt-6 mb-3 gradient-text">5. Fosters a Positive Company Culture</h2>
      <img-replace src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="Team members enjoying coffee in matching company branded mugs - keyphrase: company culture gifts" class="rounded-lg my-4 shadow-lg w-full" />
      <p class="mb-4">Gifting custom mugs to employees can create a sense of unity and belonging. It's a small gesture that can contribute to a positive work environment and make employees feel valued. This is an important aspect of <em>building team spirit</em>.</p>

      <p class="mt-6 text-lg leading-relaxed">Ready to elevate your corporate gifting strategy? <a href="/products" class="text-primary hover:underline">Explore our range of customizable mugs</a> at CustomCreations and make a lasting impression. For other gift ideas, see our <a href="/blog/top-5-personalized-gift-ideas-for-holidays" class="text-primary hover:underline">holiday gift guide</a>.</p>
    `,
    date: '2025-05-05',
    category: 'Business',
    author: 'Marketer Mike',
    imageUrl: 'https://images.unsplash.com/photo-1580819223288-802099317c1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'A collection of branded custom mugs on an office desk - main image for custom mugs corporate gift article',
  }
};


const SingleBlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = placeholderPostsData[slug];
    if (foundPost) {
      setPost(foundPost);
      document.title = foundPost.seoTitle || foundPost.title;
      
      let metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (!metaDescriptionTag) {
        metaDescriptionTag = document.createElement('meta');
        metaDescriptionTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescriptionTag);
      }
      metaDescriptionTag.setAttribute('content', foundPost.metaDescription || foundPost.title);

      let metaKeywordsTag = document.querySelector('meta[name="keywords"]');
      if(!metaKeywordsTag) {
        metaKeywordsTag = document.createElement('meta');
        metaKeywordsTag.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywordsTag);
      }
      metaKeywordsTag.setAttribute('content', foundPost.keyphrase || '');


    } else {
      console.error("Post not found for slug:", slug);
    }

    return () => {
      document.title = 'CustomCreations - Design Your Dreams'; 
      const metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', 'Unleash your creativity with our intuitive platform. Personalize apparel, accessories, and gifts that truly represent you.');
      }
      const metaKeywordsTag = document.querySelector('meta[name="keywords"]');
      if (metaKeywordsTag) {
        metaKeywordsTag.setAttribute('content', 'custom apparel, personalized gifts, t-shirt design, custom mugs, creative gifts');
      }
    };
  }, [slug]);

  if (!post) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <motion.h1 
          className="font-poppins text-3xl md:text-4xl font-bold mb-4 gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Loading Post...
        </motion.h1>
        <p className="text-muted-foreground">If it takes too long, the post might not exist.</p>
        <Link to="/blog" className="mt-8 inline-block">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4 max-w-4xl"
    >
      <article>
        <header className="mb-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link to="/blog" className="text-primary hover:underline mb-4 inline-block">
              <ArrowLeft className="inline-block mr-1 h-4 w-4" /> Back to Blog
            </Link>
          </motion.div>
          <motion.h1 
            className="font-poppins text-4xl md:text-5xl font-extrabold mb-4 gradient-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {post.title}
          </motion.h1>
          <motion.div 
            className="flex items-center justify-center text-sm text-muted-foreground space-x-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="flex items-center"><CalendarDays className="mr-1 h-4 w-4" /> Published on {post.date}</span>
            <span className="flex items-center"><Tag className="mr-1 h-4 w-4" /> Category: {post.category}</span>
            <span className="flex items-center"><UserCircle className="mr-1 h-4 w-4" /> By {post.author}</span>
          </motion.div>
        </header>

        <motion.div 
          className="aspect-[16/9] md:aspect-[2/1] overflow-hidden rounded-xl mb-10 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <img-replace src={post.imageUrl} alt={post.imageAlt || `Main image for ${post.title}`} class="w-full h-full object-cover" />
        </motion.div>

        <motion.div 
          className="prose prose-lg lg:prose-xl max-w-none text-foreground/90 prose-headings:gradient-text prose-a:text-primary prose-strong:text-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <motion.section 
          aria-labelledby="related-content-title" 
          className="mt-12 pt-8 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 id="related-content-title" className="text-2xl font-semibold mb-6 gradient-text">You Might Also Like</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glassmorphic-card hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">How to Choose Colors for Your Custom Apparel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 text-sm">A quick guide to color psychology in design.</p>
                <Link to="#" className="text-primary hover:underline">Read More <ArrowRight className="inline-block ml-1 h-4 w-4" /></Link>
              </CardContent>
            </Card>
            <Card className="glassmorphic-card hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">The Future of Personalized Products</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 text-sm">Trends and innovations in the customization industry.</p>
                <Link to="#" className="text-primary hover:underline">Read More <ArrowRight className="inline-block ml-1 h-4 w-4" /></Link>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <motion.section 
          aria-labelledby="comments-title" 
          className="mt-12 pt-8 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 id="comments-title" className="text-2xl font-semibold mb-6 gradient-text flex items-center">
            <MessageSquare className="mr-3 h-7 w-7" /> Comments (Conceptual)
          </h2>
          <div className="bg-card/50 p-6 rounded-lg glassmorphic-card">
            <p className="text-muted-foreground">Comments section would be implemented here with a backend integration (e.g., Supabase).</p>
          </div>
        </motion.section>

      </article>
    </motion.div>
  );
};

export default SingleBlogPostPage;