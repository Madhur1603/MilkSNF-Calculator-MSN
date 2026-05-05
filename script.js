let siteActive = true;

const CURRENT_VERSION = 1;

// Fetch status.json
fetch("status.json")
    .then(res => res.json())
    .then(data => {
        if (!data.active || (data.version && data.version !== CURRENT_VERSION)) {
            siteActive = false;
            document.body.innerHTML = "<h2 style='text-align:center;margin-top:50px;'>This tool is no longer available.</h2>";
        }
    })
    .catch(() => {
        siteActive = false;
        document.body.innerHTML = "<h2 style='text-align:center;margin-top:50px;'>Error loading site.</h2>";
    });

// Auto expire after 2 minutes

setTimeout(() => {
    siteActive = false;
    document.body.innerHTML = "<h2 style='text-align:center;margin-top:50px;'>Session expired. Please reload.</h2>";
}, 120000);

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

    // Total Value
    totalValue = powderValue + fatValue;

    // Remove decimal part from total value
    let totalValueInteger = Math.floor(totalValue);

    // Average rate calculation
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

function refresh() {

    if (!siteActive) return;
    
    const inputElements = document.querySelectorAll('.ctnt_box');
    inputElements.forEach(input => {
        input.value = '';
    });
    
    document.getElementById('method').value = '60/40';
    document.querySelector('.result').style.display = 'none';
    document.getElementById('milk').focus();
}



function moveCursor(event, nextElementId) {
    if (event.key === "Enter") {
        event.preventDefault();
        const nextElement = document.getElementById(nextElementId);
        if (nextElement) {
            nextElement.focus();
        }
    }
}

function handleRefreshKey(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        refresh();
        document.getElementById('milk').focus();
    }
}
