'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from '@phosphor-icons/react';

const reviews = [
  {
    name: "Sarah Jenkins",
    role: "Solo Backpacker",
    text: "VoyageAI planned my entire Japan trip in seconds. The budget suggestions were spot on, and I found hidden gems I never would have found on my own!",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    stars: 5
  },
  {
    name: "Marcus Thorne",
    role: "Luxury Traveler",
    text: "The high-end recommendations for the Swiss Alps were impeccable. It felt like having a personal concierge in my pocket.",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    stars: 5
  },
  {
    name: "Elena Rodriguez",
    role: "Digital Nomad",
    text: "I love the UI! It's so fluid and fast. Planning my month-long stay in Bali was actually fun for once.",
    avatar: "https://i.pravatar.cc/150?u=elena",
    stars: 5
  }
];

const Reviews = () => {
  return (
    <section className="reviews-section bg-canvas">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="heading-xl">Loved by explorers worldwide</h2>
          <p className="body-md mute">Join 10,000+ travelers planning with AI</p>
        </div>

        <div className="reviews-grid">
          {reviews.map((review, idx) => (
            <motion.div 
              key={idx}
              className="review-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="review-stars">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} size={18} weight="fill" color="#FFB800" />
                ))}
              </div>
              <p className="review-text body-md">"{review.text}"</p>
              <div className="review-author">
                <img src={review.avatar} alt={review.name} className="author-avatar" loading="lazy" />
                <div className="author-info">
                  <h4 className="body-strong">{review.name}</h4>
                  <p className="caption mute">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .reviews-section {
          padding: var(--space-section) 0;
          border-top: 1px solid var(--clr-hairline-soft);
        }

        .section-header {
          margin-bottom: var(--space-xxl);
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-xl);
        }

        .review-card {
          background: var(--clr-surface-soft);
          padding: var(--space-xl);
          border-radius: var(--rounded-lg);
          border: 1px solid var(--clr-hairline-soft);
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .review-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
          background: white;
        }

        .review-stars {
          display: flex;
          gap: 4px;
        }

        .review-text {
          font-style: italic;
          color: var(--clr-ink);
          line-height: 1.6;
          flex-grow: 1;
        }

        .review-author {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding-top: var(--space-md);
          border-top: 1px solid var(--clr-hairline-soft);
        }

        .author-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }

        .author-info {
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 768px) {
          .reviews-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Reviews;
