function fetchMeme(){
    const meme_api_url = `https://meme-api.com/gimme/CorporateMemes`;
    fetch(meme_api_url)
        .then(response => response.json())
        .then(data => {
            if (data) {
                const meme = data;
                const meme_img = document.getElementById('meme_img');
                const meme_title = document.getElementById('meme_title');
                meme_title.innerHTML = meme.title;
                meme_img.src = meme.url;
                return true;
            }
        })
}

fetchMeme()
  