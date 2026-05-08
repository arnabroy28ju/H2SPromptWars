'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PlannerForm from '@/components/PlannerForm';
import PlanDisplay from '@/components/PlanDisplay';
import Reviews from '@/components/Reviews';
import Lenis from '@studio-freight/lenis';

export default function Home() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="main-wrapper grain-overlay">
      <Navbar />
      <Hero />
      <PlannerForm setResult={setResult} />
      <PlanDisplay result={result} />
      <Reviews />
      
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4 className="body-strong">Quick Links</h4>
              <a href="#">Explore</a>
              <a href="#">Shop</a>
              <a href="#">Users</a>
            </div>
            <div className="footer-col">
              <h4 className="body-strong">Voyage for</h4>
              <a href="#">Businesses</a>
              <a href="#">Creators</a>
              <a href="#">Developers</a>
            </div>
            <div className="footer-col">
              <h4 className="body-strong">About</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Help Center</a>
            </div>
            <div className="footer-col">
              <h4 className="body-strong">Get the app</h4>
              <a href="#">iOS</a>
              <a href="#">Android</a>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="logo-link">
              <svg viewBox="0 0 40 40" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="12" fill="var(--clr-primary)"/>
                <path d="M12 12L20 28L28 12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="20" cy="18" r="3" fill="white"/>
              </svg>
              <span className="logo-text">Voyage<span>AI</span></span>
            </div>
            <p className="caption">© 2026 VoyageAI • Powered by Google Gemini</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .main-wrapper {
          min-height: 100vh;
        }

        .footer {
          padding: 80px 0 40px;
          border-top: 1px solid var(--clr-hairline);
          background: white;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          margin-bottom: 64px;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-col h4 {
          margin-bottom: 8px;
        }

        .footer-col a {
          text-decoration: none;
          color: var(--clr-mute);
          font-size: 14px;
          transition: color 0.2s;
        }

        .footer-col a:hover {
          color: var(--clr-ink);
        }

        .footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo-text {
          color: var(--clr-ink);
          font-weight: 700;
          font-size: 24px;
          letter-spacing: -1.2px;
        }

        .logo-text span {
          color: var(--clr-primary);
        }

        .caption {
          font-size: 12px;
          color: var(--clr-mute);
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </main>
  );
}
