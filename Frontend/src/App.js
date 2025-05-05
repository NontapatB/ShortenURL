import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetchAllUrls();
  }, []);

  const fetchAllUrls = () => {
    fetch('http://localhost:3001/allurls')
      .then(response => response.json())
      .then(data => setUrls(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ longUrl }),
    })
      .then(response => response.json())
      .then(data => {
        setShortUrl(data.shortUrl);
        fetchAllUrls(); // ทำการดึงข้อมูลทั้งหมดอีกครั้งหลังจากที่ shortUrl ถูกสร้าง
      })
      .catch(error => console.error('Error posting data:', error));
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Long URL:
          <input type="text" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} />
        </label>
        <button type="submit">Shorten URL</button>
      </form>

      <h2>All URLs</h2>
      <table>
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Long URL</th>
          </tr>
        </thead>
        <tbody>
          {urls.map(url => (
            <tr key={url.shortUrl}>
              <td><a href={`http://localhost:3001/${url.shortUrl}`} target="_blank" rel="noopener noreferrer">{`http://localhost:3001/${url.shortUrl}`}</a></td>
              <td>{url.longUrl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
