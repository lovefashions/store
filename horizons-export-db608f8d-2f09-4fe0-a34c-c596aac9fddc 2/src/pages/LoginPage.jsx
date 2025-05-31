import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      toast({ title: "Login Successful!", description: "Welcome back!" });
      navigate('/'); 
    } catch (error) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
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
            className="mx-auto mb-4 p-3 bg-secondary/20 rounded-full w-fit"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
          >
            <LogIn className="h-10 w-10 text-secondary" />
          </motion.div>
          <CardTitle className="font-poppins text-3xl gradient-text">Welcome Back!</CardTitle>
          <CardDescription>Log in to continue your creative journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required className="bg-input/50"/>
            </div>
            <div className="space-y-2 relative">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="text-sm text-primary hover:underline">Forgot password?</Link>
              </div>
              <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password} onChange={handleChange} required className="bg-input/50"/>
              <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-7 h-7 w-7 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="rememberMe" name="rememberMe" checked={formData.rememberMe} onCheckedChange={(checked) => setFormData(prev => ({...prev, rememberMe: checked}))} />
              <Label htmlFor="rememberMe" className="text-sm font-normal">Remember me</Label>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-secondary to-primary text-primary-foreground" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <LogIn className="h-5 w-5" />
                    </motion.div>
                    Logging In...
                  </>
                ) : (
                  "Log In"
                )}
              </Button>
            </motion.div>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Don't have an account?
            </p>
            <Link to="/create-account">
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary">
                 Sign Up Here <UserPlus className="ml-2 h-4 w-4"/>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LoginPage;