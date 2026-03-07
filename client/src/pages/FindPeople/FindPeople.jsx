import React, { useEffect, useState } from 'react';
// 1. Import the specific icons you need
import { Search, Home, PenTool, FileText, Settings, Github, Linkedin, Filter } from 'lucide-react';
import './FindPeople.css';
import FilterTags from './FilterTags';
import ContentSection from './ContentSection';

const MATCHED_USERS = [
  { id: 1, name: "Alex Chen", role: "Full Stack Dev", overlap: "92%", tags: ["React", "Node.js"] },
  { id: 2, name: "Priya Sharma", role: "AI Enthusiast", overlap: "85%", tags: ["Python", "TensorFlow"] },
  { id: 3, name: "Jordan Lee", role: "UI/UX Designer", overlap: "78%", tags: ["Figma", "CSS"] },
  { id: 4, name: "Taylor Swift", role: "Backend Eng", overlap: "65%", tags: ["Django", "PostgreSQL"] }
];



export default function FindPeople() {
  const [interests, setinterests] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);


  const fetchInterestList = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/interests/');
      const data = await response.json();
      data.forEach(item => {
        setinterests(prev => [...prev, item.name])
      })

      console.log("Fetched Interests:", data);
    } catch (error) {
      console.error("Error fetching interests:", error);
    }

  }

  const fetchMatchedUsers = async () => {
    //incase no filters are active, we can skip the API call and just clear the matched users
    if (activeFilters.length === 0) {
      return;
    }
    // Make API call to fetch matched users based on active filters
    try {
      const reponse = await fetch('http://127.0.0.1:8000/api/match/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ interests: activeFilters })
      })
      const data = await reponse.json();
      setMatchedUsers(data);
      console.log("Matched Users:", data);
    } catch (error) {
      console.error("Error fetching matched users:", error);
    }

  }

useEffect(() => {
  fetchInterestList();
}, [])

useEffect(() => {
  fetchMatchedUsers();
}, [activeFilters]);

return (
  <div className="page-container">
    <div className="background-blobs">
      <div className="blob blob-primary"></div>
      <div className="blob blob-secondary"></div>
      <div className="blob blob-tertiary"></div>
    </div>

    <main className="glass-interface">

      <FilterTags interests={interests} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />


      {/* <section className="content-section">
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
        </section> */}

      <ContentSection matchedUsers={matchedUsers} />
    </main>

  </div>
);
}