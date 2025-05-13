function populateTimeSelects() {
  const hourSelect = document.getElementById("startHour");
  const minuteSelect = document.getElementById("startMinute");

  if (!hourSelect || !minuteSelect) {
    console.error("Error: Hour or Minute select element not found.");
    return;
  }

  // สร้างตัวเลือกชั่วโมง (0-23)
  for (let i = 0; i <= 23; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i.toString().padStart(2, '0');
    hourSelect.appendChild(option);
  }

  // สร้างตัวเลือกนาที (0-59) -- แก้ไขตรงนี้
  for (let i = 0; i <= 59; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i.toString().padStart(2, '0'); // แสดงเป็น 00, 01, ..., 59
    minuteSelect.appendChild(option);
  }

  // ตั้งค่าเวลาเริ่มต้น (เช่น 06:00)
  hourSelect.value = "00";
  minuteSelect.value = "0"; // ถ้าอยากให้ค่าเริ่มต้นเป็นนาทีอื่น สามารถเปลี่ยนตรงนี้ได้
}

function calculateTimeSlots() {
  const startHourElement = document.getElementById("startHour");
  const startMinuteElement = document.getElementById("startMinute");
  const slotsElement = document.getElementById("slots");
  const resultList = document.getElementById("result");
  const resultsArea = document.getElementById("results-area");

  if (!startHourElement || !startMinuteElement || !slotsElement || !resultList || !resultsArea) {
    console.error("Error: One or more required elements not found in calculateTimeSlots.");
    alert("เกิดข้อผิดพลาดในการโหลดส่วนประกอบหน้าเว็บ กรุณาลองใหม่อีกครั้ง");
    return;
  }

  const startHour = parseInt(startHourElement.value);
  const startMinute = parseInt(startMinuteElement.value);
  const slots = parseInt(slotsElement.value);
  
  resultList.innerHTML = ""; // เคลียร์ผลลัพธ์เก่า

  if (isNaN(slots) || slots < 1 || slots > 120) {
    alert("กรุณากรอกจำนวนช่วงที่ต้องการแบ่งให้ถูกต้อง (ระหว่าง 1 ถึง 120 ช่วง)");
    resultsArea.style.display = "none";
    return;
  }

  const totalDurationMinutes = 120; // 2 ชั่วโมง
  const slotDurationMinutes = totalDurationMinutes / slots;

  let currentTime = new Date();
  currentTime.setHours(startHour, startMinute, 0, 0);

  for (let i = 0; i < slots; i++) {
    const slotStart = new Date(currentTime);

    currentTime.setTime(currentTime.getTime() + (slotDurationMinutes * 60 * 1000));
    const slotEnd = new Date(currentTime);

    const formatTime = (dateObj) => {
      const h = dateObj.getHours();
      const m = dateObj.getMinutes().toString().padStart(2, '0');
      return `${h}.${m}`;
    };

    const listItem = document.createElement("li");
    listItem.classList.add("result-item");
    listItem.textContent = `${formatTime(slotStart)} - ${formatTime(slotEnd)}`;
    resultList.appendChild(listItem);
  }

  resultsArea.style.display = "block";
  resultsArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', populateTimeSelects);