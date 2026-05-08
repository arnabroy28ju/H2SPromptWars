'use client';

import React from 'react';
import Link from 'next/link';
import { MagnifyingGlass, Bell, ChatCircleDots, UserCircle } from '@phosphor-icons/react';

const Navbar = () => {
  return (
    <nav className="primary-nav">
      <div className="nav-container">
        <div className="nav-left">
          <Link href="/" className="logo-link">
            <div className="logo-icon-container">
              <svg viewBox="0 0 40 40" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="10" fill="var(--clr-primary)"/>
                <path d="M12 12L20 28L28 12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="20" cy="18" r="3" fill="white"/>
              </svg>
            </div>
            <span className="logo-text">Voyage<span>AI</span></span>
          </Link>
          
          <div className="nav-menu">
            <Link href="/" className="nav-item active">Home</Link>
            <Link href="#" className="nav-item">Explore</Link>
          </div>
        </div>

        <div className="nav-center">
          <div className="search-bar">
            <MagnifyingGlass size={20} color="var(--clr-mute)" weight="bold" />
            <input type="text" placeholder="Search" className="search-input" />
          </div>
        </div>

        <div className="nav-right">
          <div className="icon-group">
            <button className="nav-icon"><Bell size={24} weight="bold" /></button>
            <button className="nav-icon"><ChatCircleDots size={24} weight="bold" /></button>
            <button className="nav-icon profile-icon"><UserCircle size={28} weight="fill" /></button>
          </div>
          <div className="auth-group">
            <button className="btn-login">Log in</button>
            <button className="btn-signup">Sign up</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .primary-nav {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          height: 80px;
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 1000;
          padding: 0 24px;
          border-bottom: 1px solid rgba(218, 218, 211, 0.5);
        }

        .nav-container {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-left, .nav-right {
          flex: 1;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border-radius: var(--rounded-full);
          transition: background 0.2s;
        }

        .logo-link:hover {
          background: var(--clr-surface-card);
        }

        .logo-text {
          font-weight: 700;
          font-size: 20px;
          color: var(--clr-ink);
          letter-spacing: -0.8px;
          display: flex;
          align-items: center;
        }

        .logo-text span {
          color: var(--clr-primary);
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-item {
          padding: 10px 16px;
          border-radius: var(--rounded-full);
          font-weight: 600;
          font-size: 15px;
          color: var(--clr-ink);
          transition: background 0.2s;
        }

        .nav-item:hover {
          background: var(--clr-surface-card);
        }

        .nav-item.active {
          background: var(--clr-ink);
          color: white;
        }

        .nav-center {
          flex: 1.5;
          display: flex;
          justify-content: center;
          padding: 0;
        }

        .search-bar {
          background: #efefef;
          height: 48px;
          border-radius: var(--rounded-full);
          display: flex;
          align-items: center;
          padding: 0 16px;
          gap: 12px;
          width: 100%;
          max-width: 580px;
          transition: background 0.2s;
        }

        .search-bar:hover {
          background: #e1e1da;
        }

        .search-input {
          background: none;
          border: none;
          width: 100%;
          font-size: 16px;
          outline: none;
        }

        .nav-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
        }

        .icon-group {
          display: flex;
          align-items: center;
        }

        .nav-icon {
          background: none;
          border: none;
          padding: 10px;
          border-radius: 50%;
          cursor: pointer;
          color: var(--clr-mute);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-icon:hover {
          background: var(--clr-surface-card);
          color: var(--clr-ink);
        }

        .auth-group {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: 8px;
        }

        .btn-login {
          background: none;
          border: none;
          font-weight: 700;
          font-size: 15px;
          padding: 10px 14px;
          border-radius: var(--rounded-full);
          cursor: pointer;
        }

        .btn-login:hover {
          background: var(--clr-surface-card);
        }

        .btn-signup {
          background: var(--clr-primary);
          color: white;
          border: none;
          font-weight: 700;
          font-size: 15px;
          padding: 10px 18px;
          border-radius: var(--rounded-full);
          cursor: pointer;
        }

        .btn-signup:hover {
          background: var(--clr-primary-pressed);
        }

        @media (max-width: 1024px) {
          .nav-center {
            display: none;
          }
          .nav-container {
            gap: 12px;
          }
        }

        @media (max-width: 768px) {
          .primary-nav {
            height: 64px;
            padding: 0 16px;
          }
          .nav-menu, .auth-group, .icon-group .nav-icon:not(.profile-icon) {
            display: none;
          }
          .logo-text {
            font-size: 18px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
