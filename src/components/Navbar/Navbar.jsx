import React from 'react';
import './Navbar.css'; // Updated CSS file for new design
import { useParams } from '../../context/context';

export default function NewNavbar() {
  const { mode, setmode, algo, setalgo, setres, setrun } = useParams();

  return (
    <nav className="new-navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="/">Shortest PathFinding Visualizer</a> {/* Example logo or title */}
        </div>
        <div className="nav-items">
          <button 
            className={`nav-button ${mode === 'setstart' ? 'active' : ''}`}
            onClick={() => setmode(mode === 'setstart' ? null : 'setstart')}>
            Current Location
          </button>
          <button 
            className={`nav-button ${mode === 'settarget' ? 'active' : ''}`}
            onClick={() => setmode(mode === 'settarget' ? null : 'settarget')}>
            Destination
          </button>
          <button 
            className={`nav-button ${mode === 'addbricks' ? 'active' : ''}`}
            onClick={() => setmode(mode === 'addbricks' ? null : 'addbricks')}>
            Wall
          </button>
          <button className="nav-button" onClick={() => setres(old => !old)}>
            Reset
          </button>
          <button className="nav-button" onClick={() => setrun(old => !old)}>
            Run
          </button>
          <div className="nav-select">
            <select 
              className="custom-select" 
              value={algo} 
              onChange={(e) => setalgo(e.target.value)}>
              <option value="">Choose Algorithm</option>
              <option value="Dijkstra's">Dijkstra's</option>
              <option value="A*">A*</option>
              <option value="BFS">BFS</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}
