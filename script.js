function remove_image() {
  document.getElementById('img').remove();
}
const closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click', () => {
  document.getElementById('img').remove();
});
let source = 'bbc-news';
let apiKey = '5c118d2ce51e43c8b4146412a18a7283'
let newsAccordion = document.getElementById('newsAccordion');

const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, true);

xhr.onload = function () {
  if (this.status === 200) {
    let json = JSON.parse(this.responseText);
    let articles = json.articles;
    console.log(articles);
    let newsHtml = "";
    articles.forEach(function (element, index) {
      let news = `<div class="card">
                            <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                    aria-expanded="false" aria-controls="collapse${index}">
                                   <b>Breaking News ${index + 1}:</b> ${element["title"]}
                                </button>
                                </h2>
                            </div>

                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                                <div class="card-body"> ${element["content"]}. <a href="${element['url']}" target="_blank" >Read more here</a>  </div>
                            </div>
                        </div>`;
      newsHtml += news;
    });
    newsAccordion.innerHTML = newsHtml;
  }
  else {
    console.log("Some error occured")
  }
}

xhr.send()

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();

  let noteCards = document.getElementsByClassName('card');
  Array.from(noteCards).forEach(function (element, index) {
    let cardTxt = element.getElementsByTagName("h2")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
  })
})
