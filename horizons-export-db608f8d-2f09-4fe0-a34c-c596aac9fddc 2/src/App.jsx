import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import UserProfilePage from '@/pages/UserProfilePage';
import FeedbackPage from '@/pages/FeedbackPage';
import ProductSelectionPage from '@/pages/ProductSelectionPage';
import DesignToolPage from '@/pages/DesignToolPage';
import OrderConfirmationPage from '@/pages/OrderConfirmationPage';
import BlogPage from '@/pages/BlogPage';
import SingleBlogPostPage from '@/pages/SingleBlogPostPage';
import AccountCreationPage from '@/pages/AccountCreationPage';
import LoginPage from '@/pages/LoginPage';
import AiSuggestionPage from '@/pages/AiSuggestionPage'; // Added new page
import { Toaster } from '@/components/ui/toaster';
import { UserPreferencesProvider } from '@/contexts/UserPreferencesContext';
import { DesignProvider } from '@/contexts/DesignContext';

function App() {
  return (
    <UserPreferencesProvider>
      <DesignProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/products" element={<ProductSelectionPage />} />
              <Route path="/design/:productId" element={<DesignToolPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<SingleBlogPostPage />} />
              <Route path="/create-account" element={<AccountCreationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/ai-suggestions" element={<AiSuggestionPage />} /> {/* Added new route */}
            </Routes>
            <Toaster />
          </Layout>
        </Router>
      </DesignProvider>
    </UserPreferencesProvider>
  );
}

export default App;