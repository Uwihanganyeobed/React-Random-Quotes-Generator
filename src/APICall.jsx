// Import necessary modules from React and Axios
import  { useState, useEffect } from 'react'
import axios from 'axios'

// Functional component for making API calls and rendering the UI
const APICall = () => {
  // State variables for storing quote data, background color, and a random quote
  const [quoteData, setQuoteData] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState('#368023');
  const [randomQuote, setRandomQuote] = useState({});

  // Fetch data from the provided API when the component mounts
  useEffect(() => {
    axios
      .get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(response => response.data)
      .then(data => setQuoteData(data.quotes))
      .catch(error => console.error('Error fetching data:', error));
  
    }, []);

  // Helper function to generate a random index for selecting a random quote
  const getRandomIndex = () => Math.floor(Math.random() * quoteData.length);

  // Helper function to get a random quote using the random index
  const getRandomQuote = () => {
    const randomIndex = getRandomIndex();
    return quoteData[randomIndex];
  };

  // Event handler for button click - changes background color and updates random quote
  const handleButtonClick = () => {
    setBackgroundColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    const newRandomQuote = getRandomQuote();
    setRandomQuote(newRandomQuote);
    console.log(`Random Quote: ${newRandomQuote.quote} - ${newRandomQuote.author}`);
  };

  
  // Update background color and transition delay of the body
  document.body.style.backgroundColor =  backgroundColor;
  // document.body.style.opacity = '0'
  // document.body.style.transition =  "opacity 1s ease-in-out 5s"
  

  // JSX for rendering the UI
  return (
    <div id="wrapper">
      <div id="quote-box" style={{ color: backgroundColor }}>
        <div className="quote-text">
          <i className="fa fa-quote-left"></i>
          <span id="text">{randomQuote.quote || ''}</span>
        </div>
        <div className="quote-author">
          <span id="author">{randomQuote.author || ''}</span>
        </div>

        <div className="buttons">
          {/* Tweet and Tumblr links */}
          <a className="button" id="tweet-quote" style={{ backgroundColor: backgroundColor }} title="Tweet this quote!" target="_top" href='https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22If%20you%20want%20to%20lift%20yourself%20up%2C%20lift%20up%20someone%20else.%22%20Booker%20T.%20Washington'>
            <i className="fa fa-twitter"></i>
          </a>
          <a className="button" id="tumblr-quote" style={{ backgroundColor: backgroundColor }} title="Post this quote on tumblr!" target="_bottom" href='https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=Booker%20T.%20Washington&content=If%20you%20want%20to%20lift%20yourself%20up%2C%20lift%20up%20someone%20else.&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'>
            <i className="fa fa-tumblr"></i>
          </a>
          <button className="button button-test" style={{ backgroundColor: backgroundColor }} id="new-quote" onClick={handleButtonClick}>
            New quote
          </button>
        </div>
      </div>
      <div className="footer">Designed and Deployed by <a href="https://github.com/Uwihanganyeobed">Uwihanganye Obed</a></div>
      {/* External script dependencies */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js"></script>
      <script src="script.js"></script>
    </div>
  );
};

// Export the component for use in other parts of the application
export default APICall;


