import { useState, useRef, useEffect } from 'react';

function MenuDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="hover:underline hover:cursor-pointer"
      >
        Menu
      </button>

      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md bg-(--primary)">
          <>
            <a href="/" className='block px-4 py-2 rounded-md text-sm hover:bg-(--secondary) hover:cursor-pointer'>View profile</a>
            <a href="/logout" className='block px-4 py-2 rounded-md text-sm hover:bg-(--secondary) hover:cursor-pointer'>Log out</a>
          </>
        </div>
      )}
    </div>
  );
}

export default MenuDropdown;