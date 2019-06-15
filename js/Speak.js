
//intialise the speak api of window 
let synth = window.speechSynthesis
let news_body = document.getElementById('news-body')
//DOM elements
let category = document.getElementById('category')
let country = document.getElementById('country')
let voice_select = document.getElementById('voice-select')


//variables 
let description_list = []
let voices = []
//checking whether the browser is chrome or firefox
let is_firefox = typeof InstallTrigger !== 'undefined'
let is_chrome = !!window.chrome

const getVoices = () => {
    voices = synth.getVoices()
    voices.forEach(voice => {
        const option = document.createElement('option')
        option.textContent = `${voice.name}(${voice.lang})`
        //setting attributes which would be used when user selects a language
        option.setAttribute('data-lang', voice.lang)
        option.setAttribute('data-name', voice.name)
        voice_select.appendChild(option)
    })

}
if (is_firefox) {
    getVoices()
}
if (is_chrome) {
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = getVoices
    }
}



const newsBody = (articles) => {
    let news_html = ''
    description_list = []
    articles.forEach((article, index) => {
        description_list.push(article['description'])
        news_html += `<div class="col-3 mx-0 d-flex">
                    <div class="card">
                        <img src= ${article['urlToImage']} class="card-img-top" alt="..." height="200" width="20">
                        <div class="card-body">
                            <h5 class="card-title  lead">${article['title']}</h5>
                            <button value= ${index} type="button" class="read-news btn btn-secondary btn-lg btn-block btn-dark" onClick="speak(description_list[this.value])" >Read the news</button>
                        </div>
                    </div>
                </div>`

    })
    news_body.innerHTML = news_html
    return ' '
}


const getNews = (country, category) => {
    axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=YourKeyValue`)
        .then(res => newsBody(res.data['articles']))
        .catch(err => console.log(err.data))
}

//speak function 
const speak = (text) => {

    if (text !== '') {
        const speakText = new SpeechSynthesisUtterance(text)
        const selected_voice = voice_select.selectedOptions[0].getAttribute('data-name')
        console.log(selected_voice)
        voices.forEach(voice => {
            if (voice.name === selected_voice) {
                speakText.voice = voice
            }
        })
        //add neccessary method of synth object 
        if (synth.speaking) {
            synth.cancel()
        }
        speakText.onend = e => (console.log('Speaking is done'))
        speakText.onerror = e => (console.log('something went wrong'))
        synth.speak(speakText)
    }
}

getNews(country.value, category.value)


//adding event listners for select option tags
category.addEventListener('change', e => getNews(country.value, e.target.value))
country.addEventListener('change', e => getNews(e.target.value, category.value))
console.log(voice_select.options[0])