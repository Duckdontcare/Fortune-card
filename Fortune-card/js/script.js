let cards=[];

fetch("../cards.json")
.then(res=>res.json())
.then(data=>{

cards=data;

});

const chooseCards=document.querySelectorAll(".choose-card");

chooseCards.forEach(card=>{

card.onclick=()=>{

}

});

let randomIndex=Math.floor(Math.random()*cards.length);

let randomCard=cards[randomIndex];

document.getElementById("cardImage").src=randomCard.image;

document.getElementById("cardText").innerHTML=

"<h2>"+randomCard.title+"</h2>"+

"<p>"+randomCard.message+"</p>";

document.querySelector(".cards").style.display="none";

document.getElementById("result").style.display="block";