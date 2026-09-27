// ======================================================
// SERVICE STATUS CHECK
// ======================================================

fetch("status.json?v=" + Date.now())
    .then(res => res.json())
    .then(data => {

        if (!data.active) {

            document.body.innerHTML =
                "<h2>Service Disabled</h2>";

        }

    })
    .catch(error => {

        console.error(
            "Status check failed:",
            error
        );

    });



// ======================================================
// DAILY RELOAD AT 12 PM
// ======================================================

function scheduleDailyReload() {

    const now = new Date();

    const nextReload = new Date();

    nextReload.setHours(
        12,
        0,
        0,
        0
    );


    if (now > nextReload) {

        nextReload.setDate(
            nextReload.getDate() + 1
        );

    }


    const timeUntilReload =
        nextReload - now;


    setTimeout(() => {

        location.reload();

    }, timeUntilReload);

}


scheduleDailyReload();



// ======================================================
// SWITCH BETWEEN DOODHIYA / THEKEDAAR
// ======================================================
//
// This function is also used by the navbar.
// The main keyboard transition is Shift.
//
// ======================================================

function showCalculator(type) {

    const doodhiyaCalculator =
        document.getElementById(
            "doodhiyaCalculator"
        );

    const thekedaarCalculator =
        document.getElementById(
            "thekedaarCalculator"
        );


    const doodhiyaNav =
        document.getElementById(
            "doodhiyaNav"
        );

    const thekedaarNav =
        document.getElementById(
            "thekedaarNav"
        );


    if (type === "doodhiya") {

        doodhiyaCalculator.style.display =
            "block";

        thekedaarCalculator.style.display =
            "none";


        doodhiyaNav.classList.add(
            "active"
        );

        thekedaarNav.classList.remove(
            "active"
        );


        document.getElementById(
            "milk"
        ).focus();

    }


    else if (type === "thekedaar") {

        doodhiyaCalculator.style.display =
            "none";

        thekedaarCalculator.style.display =
            "block";


        doodhiyaNav.classList.remove(
            "active"
        );

        thekedaarNav.classList.add(
            "active"
        );


        document.getElementById(
            "thekedaarMilk"
        ).focus();

    }

}



// ======================================================
// COMMON MILK VALUE CALCULATION
// ======================================================
//
// IMPORTANT:
// The original calculation formulas are kept exactly
// the same as your previous calculator.
//
// ======================================================

function calculateMilkValue(
    milk,
    fat,
    snf,
    rate,
    method
) {

    let snfPerKg;
    let snfPerKgRate;
    let powderValue;

    let fatPerKg;
    let fatPerKgRate;
    let fatValue;

    let totalValue;
    let avgRate;



    // ==================================================
    // 60 / 40
    // ==================================================

    if (method === "60/40") {

        snfPerKg =
            Math.floor(
                milk * snf / 100 * 100
            ) / 100;


        snfPerKgRate =
            Math.floor(
                rate * 40 / 8.5 * 100
            ) / 100;


        powderValue =
            Math.floor(
                snfPerKg *
                snfPerKgRate *
                100
            ) / 100;


        fatPerKg =
            Math.floor(
                fat * milk / 100 * 100
            ) / 100;


        fatPerKgRate =
            Math.floor(
                rate * 60 / 6.5 * 100
            ) / 100;


        fatValue =
            Math.floor(
                fatPerKg *
                fatPerKgRate *
                100
            ) / 100;

    }


    // ==================================================
    // 52 / 48
    // ==================================================

    else if (method === "52/48") {

        snfPerKg =
            Math.floor(
                milk * snf / 100 * 100
            ) / 100;


        snfPerKgRate =
            Math.floor(
                rate * 48 / 9 * 100
            ) / 100;


        powderValue =
            Math.floor(
                snfPerKg *
                snfPerKgRate *
                100
            ) / 100;


        fatPerKg =
            Math.floor(
                fat * milk / 100 * 100
            ) / 100;


        fatPerKgRate =
            Math.floor(
                rate * 52 / 6.5 * 100
            ) / 100;


        fatValue =
            Math.floor(
                fatPerKg *
                fatPerKgRate *
                100
            ) / 100;

    }



    // ==================================================
    // TOTAL VALUE
    // ==================================================

    totalValue =
        powderValue +
        fatValue;


    let totalValueInteger =
        Math.floor(
            totalValue
        );


    avgRate =
        totalValueInteger /
        milk;


    let avgRateDisplay =
        Math.floor(
            avgRate * 100
        ) / 100;



    return {

        snfPerKgRate:
            snfPerKgRate,

        fatPerKgRate:
            fatPerKgRate,

        powderValue:
            powderValue,

        fatValue:
            fatValue,

        totalValue:
            totalValue,

        avgRate:
            avgRateDisplay

    };

}



// ======================================================
// DOODHIYA CALCULATOR
// ======================================================

function calcDoodhiya() {

    const milk =
        parseFloat(
            document.getElementById(
                "milk"
            ).value
        );


    const fat =
        parseFloat(
            document.getElementById(
                "fat"
            ).value
        );


    const snf =
        parseFloat(
            document.getElementById(
                "snf"
            ).value
        );


    const rate =
        parseFloat(
            document.getElementById(
                "rate"
            ).value
        );


    const method =
        document.getElementById(
            "method"
        ).value;



    // Validate

    if (
        isNaN(milk) ||
        isNaN(fat) ||
        isNaN(snf) ||
        isNaN(rate)
    ) {

        alert(
            "Please enter all values"
        );

        return;

    }



    // Perform original calculation

    const result =
        calculateMilkValue(
            milk,
            fat,
            snf,
            rate,
            method
        );



    // ==================================================
    // DISPLAY RESULTS
    // ==================================================

    document.getElementById(
        "doodhiyaSnfPerKgRate"
    ).textContent =
        result.snfPerKgRate.toFixed(2);


    document.getElementById(
        "doodhiyaFatPerKgRate"
    ).textContent =
        result.fatPerKgRate.toFixed(2);


    document.getElementById(
        "doodhiyaPowderValue"
    ).textContent =
        result.powderValue.toFixed(2);


    document.getElementById(
        "doodhiyaFatValue"
    ).textContent =
        result.fatValue.toFixed(2);


    document.getElementById(
        "doodhiyaTotalValue"
    ).textContent =
        result.totalValue.toFixed(2);


    document.getElementById(
        "doodhiyaAvgRate"
    ).textContent =
        result.avgRate.toFixed(2);



    // Show result

    document.getElementById(
        "doodhiyaResult"
    ).style.display =
        "block";


    // Move to Refresh

    document.getElementById(
        "refreshBtn"
    ).focus();

}



// ======================================================
// DOODHIYA REFRESH
// ======================================================

function refreshDoodhiya() {

    document.getElementById(
        "milk"
    ).value = "";


    document.getElementById(
        "fat"
    ).value = "";


    document.getElementById(
        "snf"
    ).value = "";


    // Rate intentionally remains unchanged.


    document.getElementById(
        "method"
    ).value =
        "60/40";


    document.getElementById(
        "doodhiyaResult"
    ).style.display =
        "none";


    document.getElementById(
        "milk"
    ).focus();

}



// ======================================================
// DOODHIYA REFRESH ENTER
// ======================================================

function handleDoodhiyaRefreshKey(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        refreshDoodhiya();

    }

}



// ======================================================
// THEKEDAAR CALCULATOR
// ======================================================
//
// Step 1:
//
// SNF = (Fat × 0.2) + (CLR ÷ 4) + 0.14
//
// Step 2:
//
// Use that SNF in the exact same milk-value
// calculation used by Doodhiya.
//
// ======================================================

function calcThekedaar() {

    const milk =
        parseFloat(
            document.getElementById(
                "thekedaarMilk"
            ).value
        );


    const fat =
        parseFloat(
            document.getElementById(
                "thekedaarFat"
            ).value
        );


    const clr =
        parseFloat(
            document.getElementById(
                "thekedaarClr"
            ).value
        );


    const rate =
        parseFloat(
            document.getElementById(
                "thekedaarRate"
            ).value
        );


    const method =
        document.getElementById(
            "thekedaarMethod"
        ).value;



    // Validate

    if (
        isNaN(milk) ||
        isNaN(fat) ||
        isNaN(clr) ||
        isNaN(rate)
    ) {

        alert(
            "Please enter all values"
        );

        return;

    }



    // ==================================================
    // CONVERT CLR TO SNF
    // ==================================================

    const fatComponent =
        fat * 0.2;


    const clrComponent =
        clr / 4;


    const constant =
        0.14;


    const calculatedSnf =
        fatComponent +
        clrComponent +
        constant;



    // ==================================================
    // NOW USE CALCULATED SNF
    // IN THE ORIGINAL CALCULATION
    // ==================================================

    const result =
        calculateMilkValue(
            milk,
            fat,
            calculatedSnf,
            rate,
            method
        );



    // ==================================================
    // DISPLAY CALCULATED SNF
    // ==================================================

    document.getElementById(
        "thekedaarCalculatedSnf"
    ).textContent =
        calculatedSnf.toFixed(2);



    // ==================================================
    // DISPLAY COMPLETE RESULT
    // ==================================================

    document.getElementById(
        "thekedaarSnfPerKgRate"
    ).textContent =
        result.snfPerKgRate.toFixed(2);


    document.getElementById(
        "thekedaarFatPerKgRate"
    ).textContent =
        result.fatPerKgRate.toFixed(2);


    document.getElementById(
        "thekedaarPowderValue"
    ).textContent =
        result.powderValue.toFixed(2);


    document.getElementById(
        "thekedaarFatValue"
    ).textContent =
        result.fatValue.toFixed(2);


    document.getElementById(
        "thekedaarTotalValue"
    ).textContent =
        result.totalValue.toFixed(2);


    document.getElementById(
        "thekedaarAvgRate"
    ).textContent =
        result.avgRate.toFixed(2);



    // Show result

    document.getElementById(
        "thekedaarResult"
    ).style.display =
        "block";


    // Move to Refresh

    document.getElementById(
        "thekedaarRefreshBtn"
    ).focus();

}



// ======================================================
// THEKEDAAR REFRESH
// ======================================================

function refreshThekedaar() {

    // Clear Quantity
    document.getElementById(
        "thekedaarMilk"
    ).value = "";

    // Clear Fat
    document.getElementById(
        "thekedaarFat"
    ).value = "";

    // Clear CLR
    document.getElementById(
        "thekedaarClr"
    ).value = "";

    // Clear Rate
    document.getElementById(
        "thekedaarRate"
    ).value = "";

    // Reset SNF Method
    document.getElementById(
        "thekedaarMethod"
    ).value = "60/40";

    // Hide previous results
    document.getElementById(
        "thekedaarResult"
    ).style.display = "none";

    // Focus Quantity for next entry
    document.getElementById(
        "thekedaarMilk"
    ).focus();
}



// ======================================================
// THEKEDAAR REFRESH ENTER
// ======================================================

function handleThekedaarRefreshKey(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        refreshThekedaar();

    }

}



// ======================================================
// GENERAL ENTER-KEY NAVIGATION
// ======================================================

function moveCursor(
    event,
    nextElementId
) {

    if (event.key === "Enter") {

        event.preventDefault();


        const nextElement =
            document.getElementById(
                nextElementId
            );


        if (nextElement) {

            nextElement.focus();

        }

    }

}



// ======================================================
// SHIFT KEY — SWITCH CALCULATORS
// ======================================================
//
// Shift:
// Doodhiya → Thekedaar
//
// Shift again:
// Thekedaar → Doodhiya
//
// Holding Shift does not repeatedly switch.
//
// ======================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Shift" &&
            !event.repeat
        ) {

            const doodhiyaCalculator =
                document.getElementById(
                    "doodhiyaCalculator"
                );


            const isDoodhiyaVisible =
                doodhiyaCalculator.style.display !== "none";


            if (isDoodhiyaVisible) {

                showCalculator(
                    "thekedaar"
                );

            }

            else {

                showCalculator(
                    "doodhiya"
                );

            }

        }

    }
);
