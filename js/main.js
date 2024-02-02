let gameDisplayDiv = document.querySelector('.gameContant')
let gameDetailsDev = document.querySelector('.details')


let x = document.querySelectorAll('.nav-link');
console.log(x);



    
    for (let i = 0; i < x.length; i++) {
        const element = x[i];
        console.log(element.getAttribute('category'));
        let y = element.getAttribute('category')
        element.addEventListener('click' , function(e){
            document.querySelector('.nav-item .active').classList.remove('active')
            e.target.classList.add('active')
            
            getGames(y)
        })
    }
    
    
   
    

//------------------------[get games fun]---------------
async function getGames(category){



    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd8dcedc4ddmsh57eb65525fe4e29p165923jsnc1fda8a85f15',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    
    
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}` , options);
    const response = await api.json();
    console.log(response);
    //----------------------------------------------

let gameBox = ''
for (let i = 0; i < response.length; i++) {
    gameBox += `<div class="col-md-4 gameCol" id="${response[i].id}">
    <div class="inner text-center">
        <figure>
            <img src="${response[i].thumbnail}" alt="" class="w-100">
        </figure>
        <div class="title d-flex align-items-center justify-content-between">
            <h2>${response[i].title}</h2>
            <button class="btn btn-primary">Free</button>
        </div>
        <div class="descrivbe my-3">
            <p class="opacity-50">${response[i].short_description}</p>
            <div class="cate d-flex align-items-center justify-content-between">
                <span class="gener">${response[i].genre}</span>
                <span class="platform">${response[i].platform}</span>
            </div>
        </div>
    </div>
</div>`


}
let row = document.querySelector('#GAME');
row.innerHTML = gameBox;
let v = document.querySelectorAll('.gameCol');
for (let i = 0; i < v.length; i++) {
    v[i].addEventListener('click' , function(){
        let idGames = v[i].getAttribute('id')
        console.log(idGames);
        gameDisplayDiv.classList.add('d-none');
        gameDetailsDev.classList.remove('d-none')

    
        getDetails(idGames);
        
    })

}

}
getGames('shooter');



//------[---------------------get details  fun]----------------------

async function getDetails(idGames){


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd8dcedc4ddmsh57eb65525fe4e29p165923jsnc1fda8a85f15',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    
    
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGames}` , options);
    const response = await api.json();
    console.log(response);

    document.querySelector('.details').innerHTML = `
    <div class="heeder d-flex justify-content-between align-items-center mx-5">
    <h1>Details Game</h1>
    <button class="btn-close btn-close-white " id="btnClose"></button>
  </div>
  <div class="game-detailes row g-4">
    <div class="col-md-4">
      <img src="${response.thumbnail}" alt="" class="w-100 ">
    </div>
    <div class="col-md-8">
      <h3>Title: ${response.title}</h3>
      
      <p>Category: <span class="bg-info rounded-1 px-1">${response.genre}</span></p>
      <p>Platform: <span class="bg-info rounded-1 px-1 my-1">${response.platform}</span></p>
      <p>Status: <span class="bg-info rounded-1 px-1">${response.status}</span></p>
      <p><small>${response.description}</small></p>
      <button class="btn btn-outline-warning"><a href="${response.game_url}" target="_blank">Show Game</a></button>
    </div>
  </div>`
  colseDetail();
    
    }
    // getDetails(425);
    //--------------------------------------------------colse button
 function colseDetail(){
    let btnX = document.getElementById('btnClose');
  
    
btnX.addEventListener('click' , function(){
    
    gameDisplayDiv.classList.remove('d-none');
        gameDetailsDev.classList.add('d-none')
})
}