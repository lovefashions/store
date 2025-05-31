import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useDesign } from '@/contexts/DesignContext'; // Assuming current design is in context

const OrderConfirmationPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { lastFinalizedDesign } = useDesign(); // Get the latest finalized design


  // Placeholder for order details - in a real app, this would come from a cart/order state
  const orderDetails = lastFinalizedDesign ? {
    productId: lastFinalizedDesign.productId,
    productName: lastFinalizedDesign.productId ? lastFinalizedDesign.productId.charAt(0).toUpperCase() + lastFinalizedDesign.productId.slice(1) : 'Custom Product', // Basic name
    quantity: 1,
    price: 25.99, // Example price
    shipping: 5.00,
    total: 30.99,
    designElementsCount: lastFinalizedDesign.elements.length
  } : null;


  const handleConfirmOrder = () => {
    // Placeholder for actual order processing
    console.log("Order Confirmed:", orderDetails);
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase! Your personalized item is on its way.",
      variant: "default",
      duration: 5000,
      className: "bg-green-500 text-white border-green-600"
    });
    // Here you would typically clear the cart/design and redirect to a thank you page or orders history.
    // For now, let's redirect to home.
    setTimeout(() => navigate('/'), 2000);
  };

  if (!orderDetails) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-12 px-4 text-center"
      >
        <ShoppingBag className="mx-auto h-24 w-24 text-primary mb-6" />
        <h1 className="font-poppins text-3xl md:text-4xl font-bold mb-4">No Design to Confirm</h1>
        <p className="text-muted-foreground mb-8">It seems you haven't finalized a design yet. Please go back and create your masterpiece!</p>
        <Link to="/products">
          <Button size="lg">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Products
          </Button>
        </Link>
      </motion.div>
    );
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4 max-w-3xl"
    >
      <motion.h1 
        className="font-poppins text-4xl md:text-5xl font-bold mb-10 text-center gradient-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <CheckCircle className="inline-block mr-3 h-10 w-10 text-primary" />
        Confirm Your Order
      </motion.h1>

      <Card className="glassmorphic-card shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">Order Summary</CardTitle>
          <CardDescription>Please review your order details before placing it.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3 p-4 border border-border rounded-lg bg-card/50">
            <h3 className="text-xl font-semibold text-primary">{orderDetails.productName}</h3>
            <div className="flex justify-between">
              <span>Product ID:</span>
              <span className="font-medium">{orderDetails.productId}</span>
            </div>
            <div className="flex justify-between">
              <span>Design Elements:</span>
              <span className="font-medium">{orderDetails.designElementsCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Quantity:</span>
              <span className="font-medium">{orderDetails.quantity}</span>
            </div>
             <div className="flex justify-between">
              <span>Item Price:</span>
              <span className="font-medium">${orderDetails.price.toFixed(2)}</span>
            </div>
             <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="font-medium">${orderDetails.shipping.toFixed(2)}</span>
            </div>
            <div className="border-t border-border my-2"></div>
            <div className="flex justify-between text-xl font-bold">
              <span className="gradient-text">Total:</span>
              <span className="gradient-text">${orderDetails.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Placeholder for Design Preview */}
          <div className="p-4 border border-border rounded-lg bg-card/50">
             <h3 className="text-xl font-semibold mb-2">Design Preview (Conceptual)</h3>
             <div className="w-full h-40 bg-muted/30 rounded flex items-center justify-center">
                <p className="text-muted-foreground">Your Awesome Design Here!</p>
                {/* In a real app, you'd render the design elements here */}
             </div>
          </div>
          
          {/* Placeholder for Payment Info */}
          <div className="p-4 border border-border rounded-lg bg-card/50">
            <h3 className="text-xl font-semibold mb-3 flex items-center"><CreditCard className="mr-2 text-secondary"/>Payment Information</h3>
            <p className="text-muted-foreground text-sm">
              Secure payment processing will be handled by Stripe.
              You'll be redirected to Stripe Checkout to complete your purchase.
              (This is a placeholder - no actual payment will be processed.)
            </p>
          </div>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4"
            initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}
          >
            <Link to={`/design/${orderDetails.productId}`}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-5 w-5" /> Back to Design
              </Button>
            </Link>
            <Button 
              onClick={handleConfirmOrder} 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 text-lg px-8 py-6"
            >
              Confirm & Place Order
            </Button>
          </motion.div>
        </CardContent>
      </Card>
      <p className="text-center text-muted-foreground mt-8 text-sm">
        This is a conceptual order confirmation. No real order will be placed or payment processed.
      </p>
    </motion.div>
  );
};

export default OrderConfirmationPage;