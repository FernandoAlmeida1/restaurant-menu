import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { t } = useTranslation(); 
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={t('search_placeholder')} 
      />
    </div>
  );
};

export default SearchBar;
