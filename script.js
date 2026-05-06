fetch("status.json?v=" + Date.now())
  .then(res => res.json())
  .then(data => {
    if (!data.active) {
      document.body.innerHTML = "<h2>Service Disabled</h2>";
    }
  });

// =======================
// 🔁 DAILY RELOAD AT 12 PM
// =======================

function scheduleDailyReload() {
    const now = new Date();

    const nextReload = new Date();
    nextReload.setHours(12, 0, 0, 0); // 12:00 PM today

    // If it's already past 12 PM, schedule for tomorrow
    if (now > nextReload) {
        nextReload.setDate(nextReload.getDate() + 1);
    }

    const timeUntilReload = nextReload - now;

    setTimeout(() => {
        location.reload();
    }, timeUntilReload);
}

// Start the timer
scheduleDailyReload();


// =======================
// 🧮 CALCULATOR FUNCTION
// =======================
function calc() {
    
    const snf = parseFloat(document.getElementById('snf').value);
    const fat = parseFloat(document.getElementById('fat').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const milk = parseFloat(document.getElementById('milk').value);
    const method = document.getElementById('method').value;

    if (isNaN(snf) || isNaN(fat) || isNaN(rate) || isNaN(milk)) {
        alert('Please enter all values');
        return;
    }

    let snfPerKg, snfPerKgRate, powderValue;
    let fatPerKg, fatPerKgRate, fatValue;
    let totalValue, avgRate;

    if (method === '60/40') {
        snfPerKg = Math.floor(milk * snf / 100 * 100) / 100;
        snfPerKgRate = Math.floor(rate * 40 / 8.5 * 100) / 100;
        powderValue = Math.floor(snfPerKg * snfPerKgRate * 100) / 100;

        fatPerKg = Math.floor(fat * milk / 100 * 100) / 100;
        fatPerKgRate = Math.floor(rate * 60 / 6.5 * 100) / 100;
        fatValue = Math.floor(fatPerKg * fatPerKgRate * 100) / 100;
    } 
    else if (method === '52/48') {
        snfPerKg = Math.floor(milk * snf / 100 * 100) / 100;
        snfPerKgRate = Math.floor(rate * 48 / 9 * 100) / 100;
        powderValue = Math.floor(snfPerKg * snfPerKgRate * 100) / 100;

        fatPerKg = Math.floor(fat * milk / 100 * 100) / 100;
        fatPerKgRate = Math.floor(rate * 52 / 6.5 * 100) / 100;
        fatValue = Math.floor(fatPerKg * fatPerKgRate * 100) / 100;
    }

    totalValue = powderValue + fatValue;

    let totalValueInteger = Math.floor(totalValue);
    avgRate = totalValueInteger / milk;

    document.getElementById('snfPerKgRate').textContent = snfPerKgRate.toFixed(2);
    document.getElementById('powderValue').textContent = powderValue.toFixed(2);
    document.getElementById('fatPerKgRate').textContent = fatPerKgRate.toFixed(2);
    document.getElementById('fatValue').textContent = fatValue.toFixed(2);
    document.getElementById('totalValue').textContent = totalValue.toFixed(2);

    let avgRateDisplay = Math.floor(avgRate * 100) / 100;
    document.getElementById('avgRate').textContent = avgRateDisplay.toFixed(2);

    document.querySelector('.result').style.display = 'block';
    document.getElementById('refreshBtn').focus();
}


// =======================
// 🔄 REFRESH FUNCTION
// =======================
function refresh() {
    const inputElements = document.querySelectorAll('.ctnt_box');
    inputElements.forEach(input => input.value = '');
    
    document.getElementById('method').value = '60/40';
    document.querySelector('.result').style.display = 'none';
    document.getElementById('milk').focus();
}


// =======================
// ⌨️ UX HELPERS
// =======================
function moveCursor(event, nextElementId) {
    if (event.key === "Enter") {
        event.preventDefault();
        const nextElement = document.getElementById(nextElementId);
        if (nextElement) nextElement.focus();
    }
}

function handleRefreshKey(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        refresh();
        document.getElementById('milk').focus();
    }
}
