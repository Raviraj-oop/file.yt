import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import Navbar from './components/Navbar/Navbar.components';
import Footer from './components/Footer/Footer.component';
import TechnologyHighlights from './components/sections/TechnologyHighlights';
import { PageSkeleton } from './components/ui/Skeleton';
import { ToastProvider } from './components/ui/Toast';
import { AdminActivityProvider } from './states/adminActivity';

const DashBoard = lazy(() => import('./Application/screens/Dashboard/DashBoard.component'));
const Services = lazy(() => import('./Application/screens/Services/Services.components'));
const AboutUs = lazy(() => import('./Application/Aboutus/AboutUs.component'));
const ContactUs = lazy(() => import('./Application/ContactUs/ContactUs.component'));
const Gallery = lazy(() => import('./Application/Gallery/Gallery.components'));
const Products = lazy(() => import('./Application/Products/Products'));
const Clients = lazy(() => import('./Application/Clients/Clients'));
const InternshipProgram = lazy(() => import('./Application/internshipProgram/InternshipProgram'));
const TermsAndCondition = lazy(() => import('./Application/TermsAndPrivacy/TermsAndCondition/TermsAndCondition'));
const PrivacyPolicy = lazy(() => import('./Application/TermsAndPrivacy/PrivacyPolicy/PrivacyPolicy'));

/** Start each page at the top, or at the #section when the link has one. */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    let tries = 0;
    const timer = window.setInterval(() => {
      const el = document.getElementById(hash.slice(1));
      tries += 1;
      if (el) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      }
      if (el || tries > 30) window.clearInterval(timer);
    }, 100);
    return () => window.clearInterval(timer);
  }, [pathname, hash]);
  return null;
};

function App() {
  const { pathname } = useLocation();
  const path = pathname.toLowerCase();

  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <AdminActivityProvider>
          <ScrollManager />
          <Navbar />
          <motion.main
            key={path}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/Services" element={<Services />} />
                <Route path="/Products" element={<Products />} />
                <Route path="/Clients" element={<Clients />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/ContactUs" element={<ContactUs />} />
                <Route path="/Gallery" element={<Gallery />} />
                <Route path="/internship" element={<InternshipProgram />} />

                {/* Links from the Services menu that previously had no page */}
                <Route path="/ai-solution" element={<Navigate to="/Services#ai-solution" replace />} />
                <Route path="/mobile-apps" element={<Navigate to="/Services#mobile-apps" replace />} />
                <Route path="/web-design" element={<Navigate to="/Services#web-design" replace />} />

                {/* Login and the admin panel are closed. /LogIn and /AdminPanel fall through to the home page below. */}
                <Route path="/TermsConditions" element={<TermsAndCondition />} />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>
          </motion.main>
          {path !== '/' && <TechnologyHighlights />}
          {!/^\/products\/*$/.test(path) && <Footer />}
        </AdminActivityProvider>
      </ToastProvider>
    </MotionConfig>
  );
}

export default App;
