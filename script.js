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


    // If 12 PM has already passed,
    // schedule reload for tomorrow.

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


// Start daily reload timer
scheduleDailyReload();



// ======================================================
// SWITCH BETWEEN CALCULATORS
// ======================================================

function showCalculator(type) {

    const milkCalculator =
        document.getElementById(
            "milkCalculator"
        );

    const snfCalculator =
        document.getElementById(
            "snfCalculator"
        );


    const milkNav =
        document.getElementById(
            "milkCalcNav"
        );

    const snfNav =
        document.getElementById(
            "snfCalcNav"
        );


    if (type === "milk") {

        milkCalculator.style.display =
            "block";

        snfCalculator.style.display =
            "none";


        milkNav.classList.add(
            "active"
        );

        snfNav.classList.remove(
            "active"
        );


        document.getElementById(
            "milk"
        ).focus();

    }


    else if (type === "snf") {

        milkCalculator.style.display =
            "none";

        snfCalculator.style.display =
            "block";


        milkNav.classList.remove(
            "active"
        );

        snfNav.classList.add(
            "active"
        );


        document.getElementById(
            "clrFat"
        ).focus();

    }

}



// ======================================================
// MILK VALUE CALCULATOR
// ======================================================

function calc() {

    const snf =
        parseFloat(
            document.getElementById(
                "snf"
            ).value
        );


    const fat =
        parseFloat(
            document.getElementById(
                "fat"
            ).value
        );


    const rate =
        parseFloat(
            document.getElementById(
                "rate"
            ).value
        );


    const milk =
        parseFloat(
            document.getElementById(
                "milk"
            ).value
        );


    const method =
        document.getElementById(
            "method"
        ).value;



    // Validate inputs

    if (
        isNaN(snf) ||
        isNaN(fat) ||
        isNaN(rate) ||
        isNaN(milk)
    ) {

        alert(
            "Please enter all values"
        );

        return;

    }


    let snfPerKg;
    let snfPerKgRate;
    let powderValue;

    let fatPerKg;
    let fatPerKgRate;
    let fatValue;

    let totalValue;
    let avgRate;



    // ==================================================
    // 60 / 40 METHOD
    // ==================================================

    if (method === "60/40") {

        snfPerKg =
            Math.floor(
                milk *
                snf /
                100 *
                100
            ) / 100;


        snfPerKgRate =
            Math.floor(
                rate *
                40 /
                8.5 *
                100
            ) / 100;


        powderValue =
            Math.floor(
                snfPerKg *
                snfPerKgRate *
                100
            ) / 100;


        fatPerKg =
            Math.floor(
                fat *
                milk /
                100 *
                100
            ) / 100;


        fatPerKgRate =
            Math.floor(
                rate *
                60 /
                6.5 *
                100
            ) / 100;


        fatValue =
            Math.floor(
                fatPerKg *
                fatPerKgRate *
                100
            ) / 100;

    }



    // ==================================================
    // 52 / 48 METHOD
    // ==================================================

    else if (method === "52/48") {

        snfPerKg =
            Math.floor(
                milk *
                snf /
                100 *
                100
            ) / 100;


        snfPerKgRate =
            Math.floor(
                rate *
                48 /
                9 *
                100
            ) / 100;


        powderValue =
            Math.floor(
                snfPerKg *
                snfPerKgRate *
                100
            ) / 100;


        fatPerKg =
            Math.floor(
                fat *
                milk /
                100 *
                100
            ) / 100;


        fatPerKgRate =
            Math.floor(
                rate *
                52 /
                6.5 *
                100
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


    // Existing calculation behavior preserved

    let totalValueInteger =
        Math.floor(
            totalValue
        );


    avgRate =
        totalValueInteger /
        milk;



    // ==================================================
    // DISPLAY RESULTS
    // ==================================================

    document.getElementById(
        "snfPerKgRate"
    ).textContent =
        snfPerKgRate.toFixed(2);


    document.getElementById(
        "powderValue"
    ).textContent =
        powderValue.toFixed(2);


    document.getElementById(
        "fatPerKgRate"
    ).textContent =
        fatPerKgRate.toFixed(2);


    document.getElementById(
        "fatValue"
    ).textContent =
        fatValue.toFixed(2);


    document.getElementById(
        "totalValue"
    ).textContent =
        totalValue.toFixed(2);



    let avgRateDisplay =
        Math.floor(
            avgRate *
            100
        ) / 100;


    document.getElementById(
        "avgRate"
    ).textContent =
        avgRateDisplay.toFixed(2);



    // Show result

    document.getElementById(
        "milkResult"
    ).style.display =
        "block";


    // After calculation,
    // focus Refresh

    document.getElementById(
        "refreshBtn"
    ).focus();

}



// ======================================================
// MILK CALCULATOR REFRESH
// ======================================================

function refresh() {

    // Clear Milk

    document.getElementById(
        "milk"
    ).value = "";


    // Clear Fat

    document.getElementById(
        "fat"
    ).value = "";


    // Clear SNF

    document.getElementById(
        "snf"
    ).value = "";


    // IMPORTANT:
    // Rate is intentionally NOT cleared


    // Reset SNF method

    document.getElementById(
        "method"
    ).value = "60/40";


    // Hide previous results

    document.getElementById(
        "milkResult"
    ).style.display =
        "none";


    // Focus Milk for next entry

    document.getElementById(
        "milk"
    ).focus();

}



// ======================================================
// FIND SNF USING FAT + CLR
// ======================================================
//
// Formula:
//
// SNF = (Fat × 0.2) + (CLR ÷ 4) + 0.14
//
// ======================================================

function findSNF() {

    const fat =
        parseFloat(
            document.getElementById(
                "clrFat"
            ).value
        );


    const clr =
        parseFloat(
            document.getElementById(
                "clr"
            ).value
        );



    // Validate

    if (
        isNaN(fat) ||
        isNaN(clr)
    ) {

        alert(
            "Please enter both Fat and CLR"
        );

        return;

    }



    // ==================================================
    // CALCULATION
    // ==================================================

    const fatComponent =
        fat * 0.2;


    const clrComponent =
        clr / 4;


    const constant =
        0.14;


    const snf =
        fatComponent +
        clrComponent +
        constant;



    // ==================================================
    // DISPLAY BREAKDOWN
    // ==================================================

    document.getElementById(
        "fatComponent"
    ).textContent =
        fatComponent.toFixed(2);


    document.getElementById(
        "clrComponent"
    ).textContent =
        clrComponent.toFixed(2);


    document.getElementById(
        "calculatedSnf"
    ).textContent =
        snf.toFixed(2);



    // Show result

    document.getElementById(
        "snfResult"
    ).style.display =
        "block";


    // After calculation,
    // move to Refresh button

    document.getElementById(
        "refreshSnfBtn"
    ).focus();

}



// ======================================================
// FIND SNF REFRESH
// ======================================================

function refreshSNF() {

    // Clear Fat

    document.getElementById(
        "clrFat"
    ).value = "";


    // Clear CLR

    document.getElementById(
        "clr"
    ).value = "";


    // Hide previous result

    document.getElementById(
        "snfResult"
    ).style.display =
        "none";


    // Focus Fat for next calculation

    document.getElementById(
        "clrFat"
    ).focus();

}



// ======================================================
// ENTER KEY ON MILK REFRESH
// ======================================================

function handleRefreshKey(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        refresh();

    }

}



// ======================================================
// ENTER KEY ON SNF REFRESH
// ======================================================

function handleSNFRefreshKey(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        refreshSNF();

    }

}



// ======================================================
// ENTER KEY NAVIGATION
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
// SHIFT KEY TOGGLE
// ======================================================
//
// Press Shift once:
// Milk Calculator → Find SNF
//
// Press Shift again:
// Find SNF → Milk Calculator
//
// Holding Shift does NOT repeatedly toggle.
// ======================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Shift" &&
            !event.repeat
        ) {

            const milkCalculator =
                document.getElementById(
                    "milkCalculator"
                );


            const isMilkCalculatorVisible =
                milkCalculator.style.display !== "none";


            if (
                isMilkCalculatorVisible
            ) {

                showCalculator("snf");

            }

            else {

                showCalculator("milk");

            }

        }

    }
);
