let cards = [];


// โหลดข้อมูลการ์ด
fetch("cards.json")
.then(response => response.json())
.then(data => {

    cards = data;

    console.log("โหลดข้อมูลแล้ว", cards);

});



// เลือกการ์ด 3 ใบ
const chooseCards = document.querySelectorAll(".choose-card");



chooseCards.forEach(card => {


    card.addEventListener("click",()=>{


        // กันกรณีข้อมูลยังไม่โหลด
        if(cards.length === 0){

            alert("กำลังโหลดข้อมูล...");
            return;

        }



        // สุ่มการ์ด
        let randomIndex =
        Math.floor(Math.random()*cards.length);



        let randomCard =
        cards[randomIndex];



        console.log(randomCard);



        // แสดงการ์ดตัวละคร
        document.getElementById("characterCard").src =
        randomCard.character;



        // แสดงการ์ดข้อความ
        document.getElementById("textCard").src =
        randomCard.text;



        // ซ่อนการ์ด 3 ใบ
        document.querySelector(".cards").style.display="none";



        // แสดงผลลัพธ์
        document.getElementById("result").style.display="flex";


    });


});