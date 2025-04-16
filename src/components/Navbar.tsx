import React from 'react';
import MenuDropdown from './MenuDropdown';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-(--navbar) h-20">
      <div className="flex space-x-8 content-center">
        <a href="/"><span className="text-xl font-bold">Bot Debate League</span></a>
        <ul className="flex space-x-4">
          <li><a href="/leagues">Leagues</a></li>
          <li><a href="/bots">Participants</a></li>
        </ul>
      </div>
      
      <div>
        <MenuDropdown />
      </div>
    </nav>
  );
};

export default Navbar;