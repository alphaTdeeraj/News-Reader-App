//intialise the speak api of window 
let synth = window.speechSynthesis
const test_string = 'testing passed '

//DOM elements
let category = document.getElementById('category')
let country = document.getElementById('country')



//speak function 
const speak = (text) => {

    if (text !== '') {
        const speakText = new SpeechSynthesisUtterance(text)
        //add neccessary method of synth object 
        if (synth.speaking) {
            console.log('window is already speaking')
        }
        speakText.onend = e => (console.log('Speaking is done'))
        speakText.onerror = e => (console.log('something went wrong'))
        synth.speak(speakText)
    }
}



const getNews = (category = 'technology', country = 'in') => {
    let news = []
    axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=yourapikey2688`)
        .then(res => {
            news = res.data['articles']
            console.log(res.data['totalResults'])
            console.log(news[1])
        })
        .catch(err => console.log(err.data))
}

getNews()
