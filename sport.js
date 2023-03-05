const searchAllData = (Id) => {
  document.getElementById('single-player-details').innerHTML="";
  document.getElementById('male').classList.add('d-none');
  document.getElementById('female').classList.add('d-none');
  document.getElementById('spinner').classList.remove('d-none');
  const inputValue = document.getElementById("search-value").value;
 const searchId=Id||inputValue;
  const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchId}`;
  fetch(url)
   .then(res=>res.json())
    .then((players) =>{
      showPlayers(players.player);
      document.getElementById('spinner').classList.add('d-none');
    });
};

const showPlayers = (players) => {


  const playerInfo=document.getElementById('player-info');
  playerInfo.innerHTML=''
  players.forEach((player) => {
    // console.log(player)
    const div = document.createElement("div");
    div.classList.add('col');
    div.innerHTML = `
  <div class="card">
      <img src="${player.strThumb?player.strThumb:'https://source.unsplash.com/user/c_v_r'}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${player.strPlayer?player.strPlayer:'No Name'}</h5>
        <p class="card-text">${player.strDescriptionIT?player.strDescriptionIT:"No description Here"}</p>
        <button type="button" class="btn btn-success" onclick="playerDetails('${player.idPlayer}')">Details</button>
      </div>
    </div>
  `;
  playerInfo.appendChild(div)
  });
};


const playerDetails=(code)=>{
 const url=`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${code}`;
 fetch(url)
 .then(res=>res.json())
 .then(info=>eachPlayerInfo(info.players[0]))
}
const eachPlayerInfo=info=>{
  console.log(info)
  const singlePlayerDetails=document.getElementById('single-player-details');
  const div=document.createElement('div');
  if(info.strGender=='Male')
  {

    document.getElementById('male').classList.remove('d-none');
  }
  else{
    document.getElementById('female').classList.remove('d-none');

 
  }

  div.innerHTML=`
  <div class="card mb-3 w-100 h-100">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${info.strThumb?info.strThumb:"https://source.unsplash.com/user/c_v_r"}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${info.strPlayer}</h5>
        <p class="card-text">${info.strDescriptionIT.slice(0,200)+".."}</p>
      
      </div>
    </div>
  </div>
</div>
  `;
  singlePlayerDetails.appendChild(div)


}

searchAllData();

const passData = () => {
  const inputValue = document.getElementById("search-value").value;
  if(inputValue=='')
  {
    alert("Enter valid name")
  }
  else{
    searchAllData("messi");
    document.getElementById("search-value").value='';
  }
};
