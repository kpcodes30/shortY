const btn= document.querySelector('.btn-primary');
const urlInput= document.querySelector('.long-url');

btn.addEventListener('click', async() => {
    const longUrl= urlInput.value.trim();
    const response= await fetch('.netlify/functions/shorten' , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: longUrl })
    });
    const data= await response.json();
    console.log(data);
});