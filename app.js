const btn= document.querySelector('.btn-primary');
const urlInput= document.querySelector('.long-url');
const resultDiv= document.querySelector('.result');
const shortUrlSpan= document.querySelector('.short-url');
const copyBtn= document.querySelector('.copy-btn');

btn.addEventListener('click', async() => {
    const longUrl= urlInput.value.trim();
    if(!longUrl) return;
    
    const response= await fetch('/.netlify/functions/shorten' , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: longUrl })
    });
    const data= await response.json();
    
    if(data.shortUrl) {
        shortUrlSpan.textContent= data.shortUrl;
        resultDiv.classList.remove('hidden');
    }
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(shortUrlSpan.textContent);
    copyBtn.textContent= 'Copied!';
    setTimeout(() => {
        copyBtn.textContent= 'Copy';
    }, 2000);
});