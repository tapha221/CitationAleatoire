import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const colors = [
  "#FF5733", "#33FF57", "#3357FF", "#F39C12", "#9B59B6",
  "#1ABC9C", "#E74C3C", "#8E44AD", "#3498DB", "#2ECC71"
];

function App() {
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [bgColor, setBgColor] = useState('#ffffff'); // Using useState properly

  const fetchNewQuote = async () => {
    try {
      const response = await fetch('/quotes/random');
      const data = await response.json();
      setQuote({
        text: data[0].q, 
        author: data[0].a 
      });

      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setBgColor(randomColor);
      
      document.body.style.backgroundColor = randomColor;

    } catch (error) {
      console.error('Erreur lors de la récupération de la citation :', error);
    }
  };

  useEffect(() => {
    fetchNewQuote();
  }, []);

  return (
    <div id="quote-box"
      className="container text-center p-4 border rounded shadow bg-light"
    >
      <p id="text" className="h3 mb-4">{quote.text || 'Chargement de la citation...'}</p>
      <p id="author" className="h5 mb-4">{quote.author || 'Auteur inconnu'}</p>
      <div className="row gx-5">
        <div className="col">
          <a id="tweet-quote" className="p-3 btn btn-info" target="_blank" href={`https://twitter.com/intent/tweet?text="${quote.text}"%20-%20${quote.author}`}>
            <i className="fab fa-twitter"></i>
          </a>
          <a id="tumblr-quote" className="p-3 btn btn-info" target="_blank" href={`https://www.tumblr.com/share/link?url=${encodeURIComponent(window.location.href)}&name=${quote.text}&description=${quote.author}`}>
            <i className="fab fa-tumblr"></i>
          </a>
        </div>
        <div className="col">
          <button id="new-quote" className="p-3 btn btn-primary" onClick={fetchNewQuote}>
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}

// Use ReactDOM.createRoot instead of ReactDOM.render for React 18 and later
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);