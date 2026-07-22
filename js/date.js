// =====================
// วันที่ (แบบไทย) + คำทักทายตามช่วงเวลา
// ไฟล์นี้แยกต่างหาก ไม่เกี่ยวข้องกับ logic ของการ์ด
// =====================

const thaiDays = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

function updateDateAndGreeting() {

    const now = new Date();

    // วันที่แบบไทย เช่น "วันพุธที่ 22 เดือนกรกฎาคม พ.ศ. 2569"
    const dayName = thaiDays[now.getDay()];
    const dateNum = now.getDate();
    const monthName = thaiMonths[now.getMonth()];
    const buddhistYear = now.getFullYear() + 543;

    const dateEl = document.getElementById("todayDate");
    if (dateEl) {
        dateEl.textContent = `วัน${dayName}ที่ ${dateNum} เดือน${monthName} พ.ศ. ${buddhistYear}`;
    }

    // คำทักทายตามช่วงเวลาปัจจุบัน
    const hour = now.getHours();
    let greeting = "";

    if (hour >= 5 && hour < 12) {
        greeting = "สวัสดีตอนเช้า!!";
    } else if (hour >= 12 && hour < 17) {
        greeting = "สวัสดีตอนบ่าย!!";
    } else if (hour >= 17 && hour < 20) {
        greeting = "สวัสดีตอนเย็น!!";
    } else {
        greeting = "สวัสดีตอนดึก!!";
    }

    const greetingEl = document.getElementById("greetingText");
    if (greetingEl) {
        greetingEl.textContent = greeting;
    }
}

updateDateAndGreeting();