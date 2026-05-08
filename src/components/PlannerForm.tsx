'use client';

import React, { useState } from 'react';

const PlannerForm = ({ setResult }: { setResult: (data: any) => void }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    duration: '3',
    travelers: '1',
    vibe: 'Relaxation',
    budget: 'Standard'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, interests: [formData.vibe], constraints: "" }),
      });
      if (!response.ok) throw new Error('Failed to generate');
      const data = await response.json();
      setResult(data);
      document.getElementById('itinerary')?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      alert('Generation failed. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="planner" className="planner-section bg-card">
      <div className="container">
        <div className="modal-card">
          <h2 className="heading-lg text-center">Plan your next trip</h2>
          <p className="body-md text-center mute">Find new ideas to try</p>
          
          <form onSubmit={handleSubmit} className="planner-form">
            <div className="form-grid">
              <div className="input-group">
                <label className="body-strong">Flying from</label>
                <input 
                  type="text" 
                  placeholder="Source city" 
                  className="text-input"
                  value={formData.source}
                  onChange={(e) => setFormData({...formData, source: e.target.value})}
                  required
                />
              </div>
              <div className="input-group">
                <label className="body-strong">Going to</label>
                <input 
                  type="text" 
                  placeholder="Destination" 
                  className="text-input"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label className="body-strong">Days</label>
                <input 
                  type="number" 
                  className="text-input"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  min="1"
                />
              </div>
              <div className="input-group">
                <label className="body-strong">Travelers</label>
                <select 
                  className="text-input"
                  value={formData.travelers}
                  onChange={(e) => setFormData({...formData, travelers: e.target.value})}
                >
                  <option value="1">Solo</option>
                  <option value="2">Couple</option>
                  <option value="4">Group</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label className="body-strong">Vibe</label>
              <div className="chip-grid">
                {['Adventure', 'Relaxation', 'Culture', 'Foodie'].map(v => (
                  <button 
                    key={v}
                    type="button"
                    className={`filter-chip ${formData.vibe === v ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, vibe: v})}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label className="body-strong">Budget Range</label>
              <div className="chip-grid">
                {['Backpacker', 'Standard', 'Luxury'].map(b => (
                  <button 
                    key={b}
                    type="button"
                    className={`filter-chip ${formData.budget === b ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, budget: b})}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Planning...' : 'Continue'}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .modal-card {
          max-width: 540px;
          width: 100%;
          margin: 0 auto;
          background: var(--clr-canvas);
          padding: 40px;
          border-radius: var(--rounded-lg);
          box-shadow: 0 0 20px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .planner-form {
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .chip-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .filter-chip {
          background: var(--clr-surface-card);
          border: 1px solid var(--clr-hairline-soft);
          padding: 8px 16px;
          border-radius: var(--rounded-full);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-chip.active {
          background: var(--clr-ink);
          color: white;
          border-color: var(--clr-ink);
        }

        .btn-full {
          width: 100%;
          height: 48px;
          font-size: 16px;
          border-radius: var(--rounded-full);
        }

        .text-center {
          text-align: center;
        }

        @media (max-width: 768px) {
          .modal-card {
            padding: 24px;
            border-radius: var(--rounded-md);
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default PlannerForm;
