// =====================
// พื้นหลังดวงดาว (สร้างครั้งเดียวตอนโหลดหน้า)
// =====================
const starfield = document.getElementById("starfield");
const STAR_COUNT = 120;

for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement("div");
    star.className = "star-bg";

    const size = Math.random() * 2 + 1; // 1px - 3px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    star.style.animationDuration = `${1.5 + Math.random() * 3}s`;
    star.style.animationDelay = `${Math.random() * 3}s`;

    starfield.appendChild(star);
}

// =====================
// ฝนดาวตก (สุ่มสร้างดาวตกเรื่อยๆ)
// =====================
const meteorLayer = document.getElementById("meteor-layer");

function createMeteor() {

    const meteor = document.createElement("div");
    meteor.className = "meteor";

    // มุมพุ่งของดาวตก (องศา) สุ่มให้ดูเป็นธรรมชาติ
    const angleDeg = 20 + Math.random() * 20; // 20-40 องศา
    const angleRad = angleDeg * (Math.PI / 180);

    const distance = 600 + Math.random() * 400;
    const distX = Math.cos(angleRad) * distance;
    const distY = Math.sin(angleRad) * distance;

    meteor.style.setProperty("--angle", `${angleDeg}deg`);
    meteor.style.setProperty("--distX", `${distX}px`);
    meteor.style.setProperty("--distY", `${distY}px`);

    // จุดเริ่มต้นสุ่มบนขอบบน/ซ้ายของจอ
    meteor.style.left = `${Math.random() * 80}%`;
    meteor.style.top = `${Math.random() * 30}%`;

    meteor.style.transform = `rotate(${angleDeg}deg)`;
    meteor.style.animationDuration = `${1 + Math.random() * 1.2}s`;

    meteorLayer.appendChild(meteor);

    setTimeout(() => {
        meteor.remove();
    }, 2500);
}

// สร้างดาวตกเป็นระยะแบบสุ่มช่วงเวลา
function scheduleMeteor() {
    const delay = 800 + Math.random() * 2500; // 0.8 - 3.3 วินาที
    setTimeout(() => {
        createMeteor();
        scheduleMeteor();
    }, delay);
}

scheduleMeteor();


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
// ขยายการ์ดผลลัพธ์ (Lightbox)
// =====================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

[characterCard, textCard].forEach(img => {
    img.addEventListener("click", (e) => {
        e.stopPropagation();
        openLightbox(img.src);
    });
});

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add("show");
}

function closeLightbox() {
    lightbox.classList.remove("show");
}

// ปุ่มปิด
lightboxClose.addEventListener("click", closeLightbox);

// คลิกพื้นที่มืดรอบนอก (นอกรูป) เพื่อปิด
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// กด Esc เพื่อปิดด้วย
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeLightbox();
    }
});


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