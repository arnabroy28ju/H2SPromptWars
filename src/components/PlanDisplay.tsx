'use client';

import React, { useState } from 'react';
import { Airplane, MapPin, CurrencyDollar, Bed, Binoculars, ListBullets } from '@phosphor-icons/react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map'), { 
  ssr: false,
  loading: () => <div className="map-placeholder">Loading Map...</div>
});

const PlanDisplay = ({ result }: { result: any }) => {
  const [filter, setFilter] = useState('all'); // all, flights, hotels, itinerary

  if (!result) return null;

  return (
    <section id="itinerary" className="itinerary-section bg-canvas">
      <div className="container">
        <div className="itinerary-header">
          <div className="route-badge">
            <Airplane size={18} weight="fill" />
            <span>{result.source || 'Your Location'}</span>
            <span className="arrow">→</span>
            <span>{result.destination}</span>
          </div>
          <h2 className="display-lg">Your Journey to {result.destination}</h2>
          <p className="body-md mute">{result.summary}</p>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <button 
            className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <ListBullets size={18} />
            All
          </button>
          <button 
            className={`filter-pill ${filter === 'flights' ? 'active' : ''}`}
            onClick={() => setFilter('flights')}
          >
            <Airplane size={18} />
            Flights
          </button>
          <button 
            className={`filter-pill ${filter === 'hotels' ? 'active' : ''}`}
            onClick={() => setFilter('hotels')}
          >
            <Bed size={18} />
            Hotels
          </button>
          <button 
            className={`filter-pill ${filter === 'itinerary' ? 'active' : ''}`}
            onClick={() => setFilter('itinerary')}
          >
            <Binoculars size={18} />
            Itinerary
          </button>
        </div>

        {/* Map Section - Always show if all or itinerary */}
        {(filter === 'all' || filter === 'itinerary') && (
          <div className="map-container">
            <Map source={result.source} destination={result.destination} />
            <div className="map-overlay-info">
              <MapPin size={24} weight="fill" color="var(--clr-primary)" />
              <p className="body-strong">Exploring {result.destination}</p>
            </div>
          </div>
        )}

        {/* Flights Section */}
        {(filter === 'all' || filter === 'flights') && (
          <div className="section-block">
            <h3 className="heading-xl">Flight Options</h3>
            <div className="cards-grid">
              {result.flights?.map((flight: any, i: number) => (
                <div key={i} className="content-card">
                  <div className="card-tag">Flight • {flight.type}</div>
                  <div className="card-main">
                    <div className="card-info">
                      <Airplane size={24} color="var(--clr-primary)" />
                      <div>
                        <div className="body-strong">{flight.airline}</div>
                        <div className="body-sm mute">{flight.duration} duration</div>
                      </div>
                    </div>
                    <div className="card-price">${flight.price}</div>
                  </div>
                  <button className="btn btn-secondary btn-full">Book Flight</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hotels Section */}
        {(filter === 'all' || filter === 'hotels') && (
          <div className="section-block">
            <h3 className="heading-xl">Hotel Recommendations</h3>
            <div className="cards-grid">
              {result.hotels?.map((hotel: any, i: number) => (
                <div key={i} className="content-card">
                  <div className="card-tag">Hotel • {hotel.rating} Stars</div>
                  <div className="card-main">
                    <div className="card-info">
                      <Bed size={24} color="var(--clr-primary)" />
                      <div>
                        <div className="body-strong">{hotel.name}</div>
                        <div className="body-sm mute">{hotel.neighborhood}</div>
                      </div>
                    </div>
                    <div className="card-price">${hotel.price}/nt</div>
                  </div>
                  <p className="body-sm card-desc">{hotel.description}</p>
                  <button className="btn btn-secondary btn-full">View Property</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Itinerary Days */}
        {(filter === 'all' || filter === 'itinerary') && (
          <div className="section-block">
            <h3 className="heading-xl">Daily Itinerary</h3>
            <div className="itinerary-days">
              {result.itinerary?.map((day: any, dIdx: number) => (
                <div key={dIdx} className="day-section">
                  <div className="day-header">
                    <span className="badge-red">Day {day.day}</span>
                    <h3 className="heading-lg">{day.theme}</h3>
                  </div>
                  
                  <div className="day-grid">
                    {day.activities?.map((activity: any, aIdx: number) => (
                      <div key={`${dIdx}-${aIdx}`} className="pin-card">
                        <div className="pin-image">
                          <img 
                            src={`https://loremflickr.com/500/400/${encodeURIComponent(result.destination)},${encodeURIComponent(activity.activity.split(' ')[0])}?lock=${(dIdx + 1) * (aIdx + 7)}`} 
                            alt={`${activity.activity} in ${result.destination}`} 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=60&w=500";
                            }}
                          />
                        </div>
                        <div className="pin-meta">
                          <div className="time-badge">{activity.time}</div>
                          <h4 className="body-strong">{activity.activity}</h4>
                          <p className="body-sm mute">{activity.location}</p>
                          <p className="body-sm">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="tips-section">
          <h3 className="heading-lg">Traveler Tips</h3>
          <div className="tips-grid">
            {result.tips?.map((tip: string, i: number) => (
              <div key={i} className="tip-tile">
                <p className="body-md">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .itinerary-section {
          padding-bottom: 80px;
        }

        .itinerary-header {
          margin-bottom: var(--space-xxl);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
          max-width: var(--container-narrow);
          margin-left: auto;
          margin-right: auto;
        }

        .route-badge {
          background: var(--clr-surface-card);
          padding: 8px 16px;
          border-radius: var(--rounded-full);
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          color: var(--clr-primary);
        }

        .filter-bar {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 48px;
          overflow-x: auto;
          padding: 4px;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .filter-bar::-webkit-scrollbar {
          display: none;
        }

        .filter-pill {
          background: var(--clr-canvas);
          border: 1px solid var(--clr-hairline);
          padding: 10px 20px;
          border-radius: var(--rounded-full);
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .filter-pill:hover {
          background: var(--clr-surface-card);
        }

        .filter-pill.active {
          background: var(--clr-ink);
          color: white;
          border-color: var(--clr-ink);
        }

        .section-block {
          margin-bottom: 64px;
        }

        .map-container {
          position: relative;
          margin-bottom: 64px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border-radius: var(--rounded-lg);
          overflow: hidden;
        }

        .map-overlay-info {
          position: absolute;
          bottom: 24px;
          right: 24px;
          background: white;
          padding: 12px 20px;
          border-radius: var(--rounded-md);
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
          margin-top: 24px;
        }

        .content-card {
          background: white;
          border: 1px solid var(--clr-hairline);
          border-radius: var(--rounded-md);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .card-tag {
          font-size: 12px;
          font-weight: 800;
          color: var(--clr-primary);
          text-transform: uppercase;
        }

        .card-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .card-price {
          font-size: 20px;
          font-weight: 700;
          color: var(--clr-ink);
        }

        .card-desc {
          font-style: italic;
          color: var(--clr-mute);
        }

        .day-section {
          margin-bottom: 64px;
        }

        .day-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--clr-hairline);
        }

        .badge-red {
          background: var(--clr-primary);
          color: white;
          padding: 4px 12px;
          border-radius: var(--rounded-full);
          font-size: 14px;
          font-weight: 700;
        }

        .day-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .pin-card {
          background: var(--clr-surface-card);
          border-radius: var(--rounded-md);
          overflow: hidden;
          transition: transform 0.2s;
        }

        .pin-card:hover {
          transform: translateY(-4px);
        }

        .pin-image {
          height: 240px;
          background: #eee;
        }

        .pin-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pin-meta {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .time-badge {
          font-size: 12px;
          font-weight: 700;
          color: var(--clr-primary);
          text-transform: uppercase;
        }

        .btn-full {
          width: 100%;
        }

        .tips-section {
          margin-top: 80px;
          padding-top: 48px;
          border-top: 2px solid var(--clr-hairline);
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
          margin-top: 24px;
        }

        .tip-tile {
          background: var(--clr-surface-card);
          padding: 24px;
          border-radius: var(--rounded-md);
        }

        @media (max-width: 768px) {
          .filter-bar {
            justify-content: flex-start;
            margin-bottom: 32px;
          }
          .map-overlay-info {
            bottom: 12px;
            right: 12px;
            padding: 8px 12px;
          }
          .cards-grid, .day-grid, .tips-grid {
            grid-template-columns: 1fr;
          }
          .pin-image {
            height: 200px;
          }
          .section-block {
            margin-bottom: 40px;
          }
        }
      `}</style>
    </section>
  );
};

export default PlanDisplay;
