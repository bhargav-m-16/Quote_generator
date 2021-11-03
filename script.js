const quoteCantainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loading
function loading(){
    loader.hidden = false;
    quoteCantainer.hidden = true;
}

// Hide loading
function complete(){
    if(!loader.hidden){
        quoteCantainer.hidden = false;
        loader.hidden = true;

    }
}

// get quote from api
async function getQuote(){
    loading();
    const apiUrl = "https://api.quotable.io/random";
    const response = await fetch(apiUrl);
    const data = await response.json();
    authorText.innerText = data.author;
    if (data.content.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.content;
    complete();
}

// Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

// Event Listeners
twitterBtn.addEventListener('click',tweetQuote);
newQuoteBtn.addEventListener('click',getQuote);

// On Load
getQuote();
