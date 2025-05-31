import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { UserPlus, LogIn, Eye, EyeOff, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const AccountCreationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords Mismatch",
        description: "Please ensure both password fields match.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            date_of_birth: formData.dob,
          }
        }
      });
      if (error) throw error;
      toast({ title: "Account Created!", description: "Please check your email to verify your account." });
      navigate('/login'); 
    } catch (error) {
      toast({ title: "Account Creation Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4 flex justify-center items-center min-h-[calc(100vh-15rem)]"
    >
      <Card className="w-full max-w-md glassmorphic-card shadow-2xl">
        <CardHeader className="text-center">
          <motion.div 
            className="mx-auto mb-4 p-3 bg-primary/20 rounded-full w-fit"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
          >
            <UserPlus className="h-10 w-10 text-primary" />
          </motion.div>
          <CardTitle className="font-poppins text-3xl gradient-text">Create Your Account</CardTitle>
          <CardDescription>Join CustomCreations and start personalizing today!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="bg-input/50"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required className="bg-input/50"/>
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="•••••••• (min. 6 characters)" value={formData.password} onChange={handleChange} required className="bg-input/50"/>
              <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-7 h-7 w-7 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
              </Button>
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required className="bg-input/50"/>
               <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-7 h-7 w-7 text-muted-foreground" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <div className="relative">
                 <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} required className="bg-input/50 pr-10"/>
                 <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"/>
              </div>
            </div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <UserPlus className="h-5 w-5" />
                    </motion.div>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </motion.div>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already registered?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Log in here
            </Link>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AccountCreationPage;