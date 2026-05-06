let siteActive = true; // ✅ allow instant usage

const CURRENT_VERSION = 1;
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours


// =======================
// 🔐 STATUS CHECK (RUNS IN BACKGROUND)
// =======================
fetch("status.json?v=" + Date.now())
    .then(res => res.json())
    .then(data => {
        if (!data.active || (data.version && data.version !== CURRENT_VERSION)) {
            siteActive = false;
            document.body.innerHTML = `
                <h2 style='text-align:center;margin-top:50px;'>
                    ${data.message || "This tool is no longer available."}
                </h2>`;
        }
    })
    .catch(() => {
        console.warn("Status check failed. Allowing usage.");
        siteActive = true; // ✅ never block on error
    });


// =======================
// ⏳ SESSION MANAGEMENT (24 HOURS)
// =======================
function initSession() {
    let expiry = localStorage.getItem("expiryTime");

    if (!expiry) {
        expiry = Date.now() + SESSION_DURATION;
        localStorage.setItem("expiryTime", expiry);
    }
}

function checkSession() {
    const expiry = localStorage.getItem("expiryTime");

    if (expiry && Date.now() > parseInt(expiry)) {
        // ✅ Ask instead of forcing
        const reloadNow = confirm("Session expired. Reload now for fresh data?");
        
        if (reloadNow) {
            localStorage.removeItem("expiryTime");
            location.reload();
        } else {
            // extend session slightly (avoid spam popup)
            const newExpiry = Date.now() + (10 * 60 * 1000); // +10 mins
            localStorage.setItem("expiryTime", newExpiry);
        }
    }
}


// =======================
// 🧮 CALCULATOR FUNCTION
// =======================
function calc() {

    if (!siteActive) {
        alert("This tool is disabled.");
        return;
    }
    
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

    if (!siteActive) return;
    
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


// =======================
// 🚀 INIT
// =======================
initSession();
setInterval(checkSession, 60000); // every 1 min
