// src/pages/Home.js
import React from 'react';
import UrlShortenerForm from '../components/UrlShortenerForm';
import UrlList from '../components/UrlList';

const Home = ({ onShorten }) => {
  return (
    <div>
      <h1>URL Shortener</h1>
      <UrlShortenerForm onShorten={onShorten} />
      <h2>URL List</h2>
      <UrlList />
    </div>
  );
};

export default Home;
