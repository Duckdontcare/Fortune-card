// =====================
// โหลดข้อมูลการ์ดจาก cards.json
// =====================
let cardsData = [];

fetch("cards.json")
    .then(res => res.json())
    .then(data => {
        cardsData = data;
    })
    .catch(err => console.error("โหลด cards.json ไม่สำเร็จ:", err));

// =====================
// ดักคลิกการ์ด
// =====================
const chooseCards = document.querySelectorAll(".choose-card");
const cardsContainer = document.querySelector(".cards");
const resultBox = document.getElementById("result");
const characterCard = document.getElementById("characterCard");
const textCard = document.getElementById("textCard");

chooseCards.forEach(card => {
    card.addEventListener("click", () => {

        if (card.classList.contains("clicked")) return; // กันกดซ้ำ

        card.classList.add("clicked");

        // รอ animation กดจบ (.35s ตามที่ตั้งใน CSS)
        setTimeout(() => {
            showResult();
        }, 350);
    });
});

function showResult() {

    if (cardsData.length === 0) {
        console.error("ยังไม่มีข้อมูลการ์ด (cards.json โหลดไม่สำเร็จหรือว่างเปล่า)");
        return;
    }

    // สุ่มการ์ด 1 ใบจาก cards.json
    const randomIndex = Math.floor(Math.random() * cardsData.length);
    const picked = cardsData[randomIndex];

    characterCard.src = picked.character;
    textCard.src = picked.text;

    // ซ่อนการ์ดที่เลือก แสดงผลลัพธ์
    cardsContainer.style.display = "none";
    resultBox.style.display = "flex";
    resultBox.classList.add("show-result");
}

// =====================
// ดาววิ่งรอบการ์ด (sparkle)
// =====================
const wrappers = document.querySelectorAll(".card-wrapper");

wrappers.forEach(wrapper => {
    setInterval(() => {
        createSparkle(wrapper);
    }, 1200 + Math.random() * 2000);
});

function createSparkle(wrapper) {

    const star = document.createElement("div");
    star.className = "sparkle";
    star.textContent = "✨"; // ใช้ตัวอักษรแทนรูป จะได้ไม่ต้องมีไฟล์ star.png

    wrapper.appendChild(star);

    // สุ่มมุม
    const angle = Math.random() * Math.PI * 2;
    const radius = 140;

    const startX = Math.cos(angle) * radius;
    const startY = Math.sin(angle) * radius;

    const endX = Math.cos(angle + 0.5) * radius;
    const endY = Math.sin(angle + 0.5) * radius;

    star.style.left = "50%";
    star.style.top = "50%";
    star.style.setProperty("--moveX", `${endX}px`);
    star.style.setProperty("--moveY", `${endY}px`);
    star.style.transform = `translate(${startX}px, ${startY}px)`;

    star.animate(
        [
            { opacity: 0, transform: `translate(${startX}px,${startY}px) scale(.3)` },
            { opacity: 1, offset: 0.2 },
            { opacity: 0, transform: `translate(${endX}px,${endY}px) scale(1.2)` }
        ],
        {
            duration: 1500 + Math.random() * 1000,
            easing: "ease-out"
        }
    );

    setTimeout(() => {
        star.remove();
    }, 2500);
}