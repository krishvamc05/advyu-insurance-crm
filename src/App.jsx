import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { ApplyFunnelPage } from './pages/ApplyFunnelPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { captureUtmParams } from './utils/utmTracker';

function RouteLifecycleHandler() {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    captureUtmParams(search);
  }, [search]);

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <RouteLifecycleHandler />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apply" element={<ApplyFunnelPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
