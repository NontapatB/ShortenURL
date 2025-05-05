import React, { useState } from 'react';

const UrlShortenerForm = ({ onShorten }) => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortUrl(data.shortUrl);
      } else {
        console.error('Error shortening URL');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Long URL:</label>
        <input
          type="text"
          className="form-control"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Shorten URL
      </button>

      {shortUrl && (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Long URL</th>
              <th>Short URL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href={longUrl} target="_blank" rel="noopener noreferrer">
                  {longUrl}
                </a>
              </td>
              <td>
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                  {shortUrl}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </form>
  );
};

export default UrlShortenerForm;
