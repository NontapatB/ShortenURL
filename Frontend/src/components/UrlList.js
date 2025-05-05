import React, { useEffect, useState } from 'react';

const UrlList = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/urls');
        const data = await response.json();
        setUrls(Object.entries(data));
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Short URL</th>
          <th>Long URL</th>
        </tr>
      </thead>
      <tbody>
        {urls.map(([shortUrl, longUrl]) => (
          <tr key={shortUrl}>
            <td>{shortUrl}</td>
            <td>{longUrl}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UrlList;
