'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TravelCarousel from './TravelCarousel';

const Hero = () => {
  return (
    <section className="hero-section bg-soft">
      <div className="container">
        <div className="hero-content">
          <motion.h1 
            className="display-xl text-center hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Plan the life you love <br /> with VoyageAI
          </motion.h1>
          
          <motion.div 
            className="carousel-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <TravelCarousel />
          </motion.div>

          <div className="feature-grid">
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="feature-text">
                <h2 className="heading-xl">Get your next <br /> great travel idea</h2>
                <p className="body-md">Whether it's a weekend getaway or a month-long expedition, our AI curates experiences that match your soul.</p>
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore now
                </button>
              </div>
              <div className="feature-image">
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800" alt="Travel" loading="lazy" />
              </div>
            </motion.div>

            <motion.div 
              className="feature-card reverse"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="feature-image">
                <img src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800" alt="Adventure" loading="lazy" />
              </div>
              <div className="feature-text">
                <h2 className="heading-xl">See it, plan it, <br /> do it</h2>
                <p className="body-md">From hidden gems to iconic landmarks, get a step-by-step itinerary powered by Gemini 1.5 Pro.</p>
                <button className="btn btn-primary btn-lg">Get started</button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          padding: var(--space-section) 0;
          overflow: hidden;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-xxl);
          width: 100%;
        }

        .hero-title {
          max-width: 900px;
          margin-bottom: var(--space-md);
        }

        .carousel-container {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          padding: var(--space-lg) 0;
        }

        .text-center {
          text-align: center;
        }

        .feature-grid {
          display: flex;
          flex-direction: column;
          gap: 48px;
          width: 100%;
          margin-top: 48px;
        }

        .feature-card {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 32px;
          align-items: center;
          background: var(--clr-canvas);
          padding: 40px;
          border-radius: var(--rounded-lg);
          border: 1px solid var(--clr-hairline-soft);
          perspective: 1000px;
        }

        .feature-card.reverse {
          grid-template-columns: 1.2fr 1fr;
        }

        .feature-text {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: flex-start;
        }

        .feature-image {
          height: 400px;
          border-radius: var(--rounded-md);
          overflow: hidden;
          transition: transform 0.5s ease;
        }

        .feature-card:hover .feature-image {
          transform: rotateY(-5deg) rotateX(5deg) scale(1.02);
        }

        .feature-card.reverse:hover .feature-image {
          transform: rotateY(5deg) rotateX(5deg) scale(1.02);
        }

        .feature-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .btn-lg {
          padding: 14px 28px;
          font-size: 16px;
        }

        @media (max-width: 1024px) {
          .feature-card, .feature-card.reverse {
            grid-template-columns: 1fr;
            padding: 32px;
            gap: 24px;
          }
          .feature-image {
            height: 350px;
            order: -1;
          }
        }

        @media (max-width: 768px) {
          .hero-content {
            gap: 32px;
          }
          .feature-grid {
            gap: 24px;
          }
          .feature-card {
            padding: 24px;
            border-radius: var(--rounded-md);
          }
          .feature-image {
            height: 250px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
