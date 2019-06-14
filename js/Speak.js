//intialise the speak api of window 
let synth = window.speechSynthesis
const test_string = 'testing passed '
let news_body = document.getElementById('news-body')
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

const newsBody = (articles) => {
    let news_html = ''
    articles.forEach(article => {
        image_url = article['urlToImage']
        news_html += `<div class="col-4 mx-0 d-flex">
                    <div class="card">
                        <img src= ${article['urlToImage']} class="card-img-top" alt="..." height="300" width="40">
                        <div class="card-body">
                            <h5 class="card-title font-italic">${article['title']}</h5>
                            <a href="#" class="mb-0 btn btn-lg btn-block btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>`

    })
    news_body.innerHTML = news_html
    return ''
}


const getNews = (category = 'technology', country = 'in') => {
    let news = []
<<<<<<< HEAD
    axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=yourkey`)
        .then(res => newsBody(res.data['articles']))
        .catch(err => console.log(err.data))
}


//calling the news functio for getting the news and injecting it to the document
=======
    axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=yourapikey2688`)
        .then(res => {
            news = res.data['articles']
            console.log(res.data['totalResults'])
            console.log(news[1])
        })
        .catch(err => console.log(err.data))
}

>>>>>>> 262794d199d667e2f660e608d66ab103e57d03a7
getNews()
