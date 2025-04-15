import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-(--navbar) h-20">
      <div className="flex space-x-8 content-center">
        <a href="/"><span className="text-xl font-bold">Bot Debate League</span></a>
        <ul className="flex space-x-4">
          <li><a href="/classification">Leagues</a></li>
          <li><a href="/bots">Participants</a></li>
        </ul>
      </div>
      
      <div className="flex items-center">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" className='hover:underline hover:cursor-pointer'>
            Icon
          </Dropdown.Toggle>

          <Dropdown.Menu className='flex flex-col bg-(--primary) px-4 py-2 mt-20 gap-2 rounded-lg'>
            <Dropdown.Item href="/">View profile</Dropdown.Item>
            <Dropdown.Item href="/logout">Log out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;