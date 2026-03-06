import React, { useState } from 'react';
// 1. Import the specific icons you need
import { Search, Home, PenTool, FileText, Settings, Github, Linkedin } from 'lucide-react';
import './FindPeople.css';

const MATCHED_USERS = [
  { id: 1, name: "Alex Chen", role: "Full Stack Dev", overlap: "92%", tags: ["React", "Node.js"] },
  { id: 2, name: "Priya Sharma", role: "AI Enthusiast", overlap: "85%", tags: ["Python", "TensorFlow"] },
  { id: 3, name: "Jordan Lee", role: "UI/UX Designer", overlap: "78%", tags: ["Figma", "CSS"] },
  { id: 4, name: "Taylor Swift", role: "Backend Eng", overlap: "65%", tags: ["Django", "PostgreSQL"] }
];

const INTEREST_FILTERS = ["All", "Hackathons", "Web Dev", "AI/ML", "Open Source"];

export default function FindPeople() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="page-container">
      <div className="background-blobs">
        <div className="blob blob-primary"></div>
        <div className="blob blob-secondary"></div>
        <div className="blob blob-tertiary"></div>
      </div>

      <main className="glass-interface">
        <section className="controls-section">
          <div className="search-bar">
            <input type="text" placeholder="Search by keyword or interest..." className="search-input" />
            {/* 2. Replace emoji with Lucide Search icon */}
            <button className="search-btn">
              <Search size={18} color="currentColor" />
            </button>
          </div>
          
          <div className="filter-tags">
            {INTEREST_FILTERS.map(filter => (
              <button 
                key={filter}
                className={`filter-tag ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className="content-section">
          <h2 className="section-title">Matching Interests</h2>
          <div className="matches-grid">
            {MATCHED_USERS.map(user => (
              <article key={user.id} className="match-card">
                <div className="avatar-placeholder"></div>
                <h3 className="user-name">{user.name}</h3>
                <p className="user-role">{user.role}</p>
                <div className="overlap-indicator">
                  <span className="overlap-text">{user.overlap} Match</span>
                  <div className="tags-container">
                    {user.tags.map(tag => (
                      <span key={tag} className="small-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <button className="connect-btn">Connect</button>
              </article>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
}