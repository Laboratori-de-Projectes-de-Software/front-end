import React, { useState, useEffect } from "react";

interface BotOption {
  name: string;
  botId: number;
}

interface MultiselectDropdownProps {
  options: BotOption[];
  selectedOptions: BotOption[];
  onChange: (selected: BotOption[]) => void;
  placeholder?: string;
}

const MultiselectDropdown: React.FC<MultiselectDropdownProps> = ({
  options,
  selectedOptions,
  onChange,
  placeholder = "Select bots",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: BotOption) => {
    const isSelected = selectedOptions.some((item) => item.botId === option.botId);
    let newSelection: BotOption[];
    
    if (isSelected) {
      // Remove from selection
      newSelection = selectedOptions.filter(
        (item) => item.botId !== option.botId
      );
    } else {
      // Add to selection
      newSelection = [...selectedOptions, option];
    }
    
    onChange(newSelection);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container">
      <div 
        className="dropdown-header" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length > 0 
          ? `${selectedOptions.length} bot${selectedOptions.length !== 1 ? 's' : ''} selected` 
          : placeholder}
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div className="dropdown-options">
          {options.map((option) => {
            const isSelected = selectedOptions.some(
              (item) => item.botId === option.botId
            );
            
            return (
              <div
                key={option.botId}
                className={`dropdown-option ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleOption(option)}
              >
                <input 
                  type="checkbox" 
                  checked={isSelected} 
                  onChange={() => {}} // Handled by the div click
                  id={`bot-${option.botId}`}
                />
                <label htmlFor={`bot-${option.botId}`}>{option.name}</label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiselectDropdown;