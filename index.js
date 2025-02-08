// Labels
const talLabel = document.getElementById("talLabel");
const bonusLabel = document.getElementById("bonusLabel"); // Ny label til bonus
const increasePerSecLabel = document.getElementById("increasePerSecLabel");
const countdownLabel = document.getElementById("countdownLabel");
const gameOverLabel = document.getElementById("gameOverLabel");
const katastrofeLabel = document.getElementById("katastrofeLabel");
const celledelingCountdownLabel = document.getElementById("celledelingCountdownLabel");
const levelLabel = document.getElementById("levelLabel");
const warLossPreviewLabel = document.getElementById("warLossPreviewLabel");
const sygdomsLossPreviewLabel = document.getElementById("sygdomsLossPreviewLabel");


// Upgrade buttons
const celledelingUp = document.getElementById("celledelingUp");
const celledelingUp2 = document.getElementById("celledelingUp2");
const celledelingUp3 = document.getElementById("celledelingUp3");
const skjoldUp = document.getElementById("skjoldUp");
const skjoldUp2 = document.getElementById("skjoldUp2");
const skjoldUp3 = document.getElementById("skjoldUp3");
const medicinUp1 = document.getElementById("medicinUp1");
const medicinUp2 = document.getElementById("medicinUp2");
const medicinUp3 = document.getElementById("medicinUp3");
const katastrofeUp = document.getElementById("katastrofeUp");
const katastrofeUp2 = document.getElementById("katastrofeUp2");
const katastrofeUp3 = document.getElementById("katastrofeUp3");
const formeringUp = document.getElementById("formeringUp");



// Variables
let count = 200;
let countPerSec = 2;
let formeringCost = 50;
let plusIncreasePerSec = 1;

let countdown = 20; // Tid i sekunder
let gameOver = false;
let celledelingCountdown = 7; // Tid til celledeling-bonus
let newCelledelingCountdown = celledelingCountdown;
let level = 0; // Start-level
let baseWarLoss = 100;
let nextCatastrophe = "Krig"; // Starter med Krig eller Sygdom
let baseUpgradeLoss = 1;
let baseSygdomsLoss = 0.5;
let sygdomsLoss = baseSygdomsLoss;
let upgradeLoss = baseUpgradeLoss;
let start = false
// Upgrades

const tooltip = document.getElementById("tooltip");

// Celledeling
let celledelingActive = false;
let celledelingActive2 = false;
let celledelingActive3 = false;
let celledelingCost = 60;
let celledelingCost2 = 150;
let celledelingCost3 = 300;

// Skjold
let skjoldActive = false;
let skjoldActive2 = false;
let skjoldActive3 = false;
let skjoldCost = 75;
let skjoldCost2 = 150;
let skjoldCost3 = 300;
let skjoldDefense1 = 70
let skjoldDefense2 = 300
let skjoldDefense3 = 700

// Medicin
let medicinActive1 = false;
let medicinActive2 = false;
let medicinActive3 = false;
let medicinCost1 = 50;
let medicinCost2 = 100;
let medicinCost3 = 200;

// Forsinkelse
let katastrofeCost = 75;
let katastrofeCost2 = 150;
let katastrofeCost3 = 200; 
let katastrofeUpActive = false; 
let katastrofeUpActive2 = false;
let katastrofeUpActive3 = false;
let katastrofeDelay1 = 10
let katastrofeDelay2 = 15
let katastrofeDelay3 = 20



// Helper function to format numbers with a dot every three zeros


function updateUI() {
    if (!start){
        formeringUp.classList.add("purchased");
        countdownLabel.textContent = "Tid til Krig: 20 sekunder";
        return
    }
    else if (gameOver){
        formeringUp.textContent = "Genstart";
        formeringUp.classList.add("purchased");
        return
    }
    else {
        formeringUp.classList.remove("purchased");
    }
    checkGameOver()
    talLabel.textContent = `${(count)}`;
    increasePerSecLabel.textContent = `${(countPerSec)} bjørnedyr per sekund`;
    levelLabel.textContent = `Level: ${level}`;
    formeringUp.textContent = `Formering (${formeringCost})`;
    celledelingUp.textContent = `Celledeling 1 (${celledelingCost})`;
    celledelingUp2.textContent = `Celledeling 2 (${celledelingCost2})`
    celledelingUp3.textContent = `Celledeling 3 (${celledelingCost3})`
    skjoldUp.textContent = `Skjold 1 (${skjoldCost})`;
    skjoldUp2.textContent = `Skjold 2 (${skjoldCost2})`;
    skjoldUp3.textContent = `Skjold 3 (${skjoldCost3})`;
    medicinUp1.textContent = `Medicin 1 (${medicinCost1})`;
    medicinUp2.textContent = `Medicin 2 (${medicinCost2})`;
    medicinUp3.textContent = `Medicin 3 (${medicinCost3})`;
    katastrofeUp.textContent = `Forsinkelse 1 (${katastrofeCost})`;
    katastrofeUp2.textContent = `Forsinkelse 2 (${katastrofeCost2})`;
    katastrofeUp3.textContent = `Forsinkelse 3 (${katastrofeCost3})`;
    let adjustedWarLoss = baseWarLoss; // Brug kun baseWarLoss
    if (skjoldActive) {
        if (skjoldActive2){
            if (skjoldActive3){
                adjustedWarLoss -= skjoldDefense3; // Reducer tabene, hvis skjold er aktivt
            }
            else{
                adjustedWarLoss -= skjoldDefense2;
            }
        }
        else{
            adjustedWarLoss -= skjoldDefense1;
        }
        if(adjustedWarLoss < 0){
            adjustedWarLoss = 0
        }
    }
    warLossPreviewLabel.textContent = `Tab ved næste krig: ${(adjustedWarLoss)}`;

// Medicin: Beregn den justerede procentvise tab ved næste sygdom
let adjustedSygdomsLoss = baseSygdomsLoss; // starter med 50% (0.5)
if (medicinActive1) {
    if (medicinActive2) {
        if (medicinActive3) {
            adjustedSygdomsLoss = 0; // Ingen tab, hvis alle tre er opgraderet
        } else {
            adjustedSygdomsLoss = 0.15;
        }
    } else {
        adjustedSygdomsLoss = 0.3;
    }
} else {
    adjustedSygdomsLoss = baseSygdomsLoss;
}
sygdomsLossPreviewLabel.textContent = `Tab ved næste Sygdom: ${adjustedSygdomsLoss * 100}%, og ${baseUpgradeLoss} formering upgrades.`;


    // Celledeling-status
    if (celledelingActive) {
        celledelingUp.classList.remove("can-buy");
        celledelingUp.classList.add("purchased");
        celledelingUp.textContent = `Celledeling 1`;
        celledelingCountdownLabel.textContent = `Tid til Celledeling: ${newCelledelingCountdown} sekunder`;
    }
    else if (count >= celledelingCost) {
        celledelingUp.classList.add("can-buy");
        celledelingUp.classList.remove("purchased");
    }
    else {
        celledelingUp.classList.remove("can-buy", "purchased");
        celledelingCountdownLabel.display = "block";
    }


    if (celledelingActive2) {
        celledelingUp2.classList.remove("can-buy");
        celledelingUp2.classList.add("purchased");
        celledelingUp2.textContent = `Celledeling 2`;
        celledelingCountdownLabel.textContent = `Tid til Celledeling 2: ${newCelledelingCountdown} sekunder`;
    }
    else if (count >= celledelingCost2 && celledelingActive) {
        celledelingUp2.classList.add("can-buy");
        celledelingUp2.classList.remove("purchased");
    }
    else {
        celledelingUp2.classList.remove("can-buy", "purchased");
        celledelingCountdownLabel.display = "block";
    }
    
    if (celledelingActive3) {
        celledelingUp3.classList.remove("can-buy");
        celledelingUp3.classList.add("purchased");
        celledelingUp3.textContent = `Celledeling 3`;
        celledelingCountdownLabel.textContent = `Tid til Celledeling 3: ${newCelledelingCountdown} sekunder`;
    }
    else if (count >= celledelingCost3 && celledelingActive2) {
        celledelingUp3.classList.add("can-buy");
        celledelingUp3.classList.remove("purchased");
    }
    else {
        celledelingUp3.classList.remove("can-buy", "purchased");
        celledelingCountdownLabel.display = "block";
    }

    // Skjold-status
    if (skjoldActive) {
        skjoldUp.classList.remove("can-buy");
        skjoldUp.classList.add("purchased");
        skjoldUp.textContent = `Skjold 1`;
    } else if (count >= skjoldCost) {
        skjoldUp.classList.add("can-buy");
        skjoldUp.classList.remove("purchased");
    } else {
        skjoldUp.classList.remove("can-buy", "purchased");
    }

    if (skjoldActive2) {
        skjoldUp2.classList.remove("can-buy");
        skjoldUp2.classList.add("purchased");
        skjoldUp2.textContent = `Skjold 2`;
    }
    else if (count >= skjoldCost2 && skjoldActive) {
        skjoldUp2.classList.add("can-buy");
        skjoldUp2.classList.remove("purchased");
    }
    else {
        skjoldUp2.classList.remove("can-buy", "purchased");
    }
    
    if (skjoldActive3) {
        skjoldUp3.classList.remove("can-buy");
        skjoldUp3.classList.add("purchased");
        skjoldUp3.textContent = `Skjold 3`;
    }
    else if (count >= skjoldCost3 && skjoldActive2) {
        skjoldUp3.classList.add("can-buy");
        skjoldUp3.classList.remove("purchased");
    }
    else {
        skjoldUp3.classList.remove("can-buy", "purchased");
    }
    // Medicin
    if (medicinActive1) {
        medicinUp1.classList.remove("can-buy");
        medicinUp1.classList.add("purchased");
        medicinUp1.textContent = `Medicin 1`;
    } else if (count >= medicinCost1) {
        medicinUp1.classList.add("can-buy");
        medicinUp1.classList.remove("purchased");
    } else {
        medicinUp1.classList.remove("can-buy", "purchased");
    }
    
    if (medicinActive2) {
        medicinUp2.classList.remove("can-buy");
        medicinUp2.classList.add("purchased");
        medicinUp2.textContent = `Medicin 2`;
    }
    else if (count >= medicinCost2 && medicinActive1) {
        medicinUp2.classList.add("can-buy");
        medicinUp2.classList.remove("purchased");
    }
    else {
        medicinUp2.classList.remove("can-buy", "purchased");
    }
    
    if (medicinActive3) {
        medicinUp3.classList.remove("can-buy");
        medicinUp3.classList.add("purchased");
        medicinUp3.textContent = `Medicin 3`;
    }
    else if (count >= medicinCost3 && medicinActive2) {
        medicinUp3.classList.add("can-buy");
        medicinUp3.classList.remove("purchased");
    }
    else {
        medicinUp3.classList.remove("can-buy", "purchased");
    }

        // Katastrofe Forsinkelse-status
    if (katastrofeUpActive) {
        katastrofeUp.classList.remove("can-buy");
        katastrofeUp.classList.add("purchased");
        katastrofeUp.textContent = `Forsinkelse 1`;
    } else if (count >= katastrofeCost) {
        katastrofeUp.classList.add("can-buy");
        katastrofeUp.classList.remove("purchased");
    } else {
        katastrofeUp.classList.remove("can-buy", "purchased");
    }


    if (katastrofeUpActive2) {
        katastrofeUp2.classList.remove("can-buy");
        katastrofeUp2.classList.add("purchased");
        katastrofeUp2.textContent = `Forsinkelse 2`;
    }
    else if (count >= katastrofeCost2 && katastrofeUpActive) {
        katastrofeUp2.classList.add("can-buy");
        katastrofeUp2.classList.remove("purchased");
    }
    else {
        katastrofeUp2.classList.remove("can-buy", "purchased");
    }
    

    if (katastrofeUpActive3) {
        katastrofeUp3.classList.remove("can-buy");
        katastrofeUp3.classList.add("purchased");
        katastrofeUp3.textContent = `Forsinkelse 3`;
    }
    else if (count >= katastrofeCost3 && katastrofeUpActive2) {
        katastrofeUp3.classList.add("can-buy");
        katastrofeUp3.classList.remove("purchased");
    }
    else {
        katastrofeUp3.classList.remove("can-buy", "purchased");
    }

    //Formering
    if (count >= formeringCost){
        formeringUp.classList.add("can-buy");
    }
    else {
        formeringUp.classList.remove("can-buy");
    }
}
// Initial UI setup
updateUI();

function showChangeLabel(amount) {
    // Hvis amount er positivt, vises et grønt tal med et + foran,
    // hvis det er negativt, vises tallet i rødt.
    if (amount > 0) {
        bonusLabel.textContent = `+${(amount)}`;
        bonusLabel.style.color = "hsl(120, 100%, 40%)";
    } else if (amount < 0) {
        bonusLabel.textContent = `${(amount)}`;
        bonusLabel.style.color = "hsl(10, 100.00%, 50.00%)";
    } else {
        bonusLabel.textContent = "0";
        bonusLabel.style.color = "black";
    }
    bonusLabel.style.opacity = 1;
    // Skjul labelen efter 1 sekund
    setTimeout(() => {
        bonusLabel.style.opacity = 0;
    }, 1000);
}

function restart() {
    // Nulstil variabler
    count = 200;
    celledelingActive = false;
    celledelingActive2 = false;
    celledelingActive3 = false;
    skjoldActive = false;
    skjoldActive2 = false;
    skjoldActive3 = false;
    medicinActive1 = false;
    medicinActive2 = false;
    medicinActive3 = false;
    katastrofeUpActive = false;
    katastrofeUpActive2 = false;
    katastrofeUpActive3 = false;

    baseSygdomsLoss = 1;
    sygdomsLoss = baseSygdomsLoss;
    countPerSec = 2;
    countdown = 20;
    gameOver = false;
    start = true;
    baseWarLoss = 100;
    baseSygdomsLoss = 0.5;
    level = 0;
    nextCatastrophe = "Krig";
    gameOverLabel.style.display = "none";
    celledelingCountdownLabel.style.display = "none";
    katastrofeLabel.style.display = "none";
    
    document.body.style.backgroundColor = "hsl(0, 0%, 95%)";
    

    // Ryd den gamle timer, hvis den kører
    clearInterval(gameTimer);

    // Start en ny timer for katastrofe-nedtælling
    gameTimer = setInterval(function () {
        if (gameOver) return;
        if (!start) return;
        if (countdown > 1) {
            countdown--;
            countdownLabel.textContent = `Tid til ${nextCatastrophe}: ${countdown} sekunder`;
        } else {
            handlePointLoss();
        }
    }, 1000);

    updateUI();
}



// Celledeling-knap
celledelingUp.onclick = function () {
    if (!start){
        return
    }
    
    if (count >= celledelingCost && !celledelingActive) {
        showChangeLabel(-celledelingCost);
        celledelingActive = true;
        count -= celledelingCost;
        celledelingCountdownLabel.style.display = "inline-block";
        newCelledelingCountdown = celledelingCountdown;
        updateUI();

        setInterval(() => {
            if (celledelingActive && !celledelingActive2 && !gameOver) {
                if (newCelledelingCountdown > 1) {
                    newCelledelingCountdown--;
                } else {
                    const bonus = Math.floor(count * 0.1);
                    count += bonus;
                    showChangeLabel(bonus);

                    newCelledelingCountdown = celledelingCountdown;
                }
                updateUI();
            }
        }, 1000);
    }
};

celledelingUp2.onclick = function () {
    if (!start){
        return
    }
    if (count >= celledelingCost2 && celledelingActive && !celledelingActive2) {
        showChangeLabel(-celledelingCost);
        celledelingActive2 = true;
        count -= celledelingCost2;
        updateUI();

        setInterval(() => {
            if (celledelingActive2 && !celledelingActive3 && !gameOver) {
                if (newCelledelingCountdown > 1) {
                    newCelledelingCountdown--;
                } else {
                    const bonus = Math.floor(count * 0.1);
                    count += bonus;
                    showChangeLabel(bonus);

                    newCelledelingCountdown = celledelingCountdown;
                }
                updateUI();
            }
        }, 1000);
    }
};

celledelingUp3.onclick = function () {
    if (!start){
        return
    }
    if (count >= celledelingCost3 && celledelingActive2 && !celledelingActive3) {
        showChangeLabel(-celledelingCost3);
        celledelingActive3 = true;
        count -= celledelingCost3;
        updateUI();

        setInterval(() => {
            if (celledelingActive3 && !gameOver) {
                if (newCelledelingCountdown > 1) {
                    newCelledelingCountdown--;
                } else {
                    const bonus = Math.floor(count * 0.1);
                    count += bonus;
                    showChangeLabel(bonus);

                    newCelledelingCountdown = celledelingCountdown;
                }
                updateUI();
            }
        }, 1000);
    }
};

// Skjold-knap
skjoldUp.onclick = function () {
    if (!start){
        return
    }
    if (count >= skjoldCost && !skjoldActive) {
        showChangeLabel(-skjoldCost);
        skjoldActive = true;
        count -= skjoldCost;
        updateUI();
    }
};

skjoldUp2.onclick = function () {
    if (!start){
        return
    }
    if (count >= skjoldCost2 && skjoldActive && !skjoldActive2) {
        showChangeLabel(-skjoldCost2);
        skjoldActive2 = true;
        count -= skjoldCost2;
        updateUI();
    }
};

skjoldUp3.onclick = function () {
    if (!start){
        return
    }
    if (count >= skjoldCost3 && skjoldActive2 && !skjoldActive3) {
        showChangeLabel(-skjoldCost3);
        skjoldActive3 = true;
        count -= skjoldCost3;
        updateUI();
    }
};

// Medicin-knap
medicinUp1.onclick = function () {
    if (!start){
        return
    }
    if (count >= medicinCost1 && !medicinActive1) {
        showChangeLabel(-medicinCost1);
        medicinActive1 = true;
        count -= medicinCost1;
        updateUI();
    }
};

medicinUp2.onclick = function () {
    if (!start){
        return
    }
    if (count >= medicinCost2 && medicinActive1 && !medicinActive2) {
        showChangeLabel(-medicinCost2);
        medicinActive2 = true;
        count -= medicinCost2;
        updateUI();
    }
};

medicinUp3.onclick = function () {
    if (!start){
        return
    }
    if (count >= medicinCost3 && medicinActive2 && !medicinActive3) {
        showChangeLabel(-medicinCost3);
        medicinActive3 = true;
        count -= medicinCost3;
        updateUI();
    }
};

// Opgraderingsknap til katastrofe-forsinkelse
katastrofeUp.onclick = function () {
    if (!start){
        return
    }
    if (count >= katastrofeCost && !katastrofeUpActive) {
        showChangeLabel(-katastrofeCost);
        count -= katastrofeCost;
        katastrofeUpActive = true;
        countdown += katastrofeDelay1;
        updateUI();
    }
};

katastrofeUp2.onclick = function () {
    if (!start){
        return
    }
    if (count >= katastrofeCost2 && katastrofeUpActive && !katastrofeUpActive2) {
        showChangeLabel(-katastrofeCost2);
        count -= katastrofeCost2;
        katastrofeUpActive2 = true;
        countdown += katastrofeDelay2;
        updateUI();
    }
};

katastrofeUp3.onclick = function () {
    if (!start){
        return
    }
    if (count >= katastrofeCost3 && katastrofeUpActive2 && !katastrofeUpActive3) {
        showChangeLabel(-katastrofeCost3);
        count -= katastrofeCost3;
        katastrofeUpActive3 = true;
        countdown += katastrofeDelay3;
        updateUI();
    }
};

// Tooltip-håndtering
[formeringUp, celledelingUp, celledelingUp2, celledelingUp3, skjoldUp, skjoldUp2, skjoldUp3, medicinUp1, medicinUp2, medicinUp3, katastrofeUp, katastrofeUp2, katastrofeUp3].forEach(button => {
    button.addEventListener("mouseover", (event) => {
        tooltip.style.display = "block";
        tooltip.style.left = `${event.target.getBoundingClientRect().left}px`;
        tooltip.style.top = `${event.target.getBoundingClientRect().top - tooltip.offsetHeight - 10}px`;

        if (event.target === celledelingUp) {
            tooltip.textContent = `Celledeling: Giver 10% af dine bjørnedyr hvert ${celledelingCountdown}. sekund. Koster ${celledelingCost} bjørnedyr.`;
        } else if (event.target === celledelingUp2) {
            tooltip.textContent = `Celledeling 2: Giver 20% af dine bjørnedyr hvert ${celledelingCountdown}. sekund. Koster ${celledelingCost2} bjørnedyr.`;
        } else if (event.target === celledelingUp3) {
            tooltip.textContent = `Celledeling 3: Giver 30% af dine bjørnedyr hvert ${celledelingCountdown}. sekund. Koster ${celledelingCost3} bjørnedyr.`;
        }
        else if (event.target === skjoldUp) {
            tooltip.textContent = `Skjold: Reducerer krigstab med ${skjoldDefense1}. Koster ${skjoldCost} bjørnedyr.`;
        } else if (event.target === skjoldUp2) {
            tooltip.textContent = `Skjold 2: Reducerer krigstab med ${skjoldDefense2 - skjoldDefense1} ekstra / ${skjoldDefense2} i alt. Koster ${skjoldCost2} bjørnedyr.`;
        } else if (event.target === skjoldUp3) {
            tooltip.textContent = `Skjold 3: Reducerer krigstab med ${skjoldDefense3 - skjoldDefense2} ekstra / ${skjoldDefense3} i alt. Koster ${skjoldCost3} bjørnedyr.`;
        }
        else if (event.target === medicinUp1) {
            tooltip.textContent = `Medicin: Reducerer sygdom til 30%, og reducerer formerings tabet med 1. Koster ${medicinCost1} bjørnedyr.`;
        } else if (event.target === medicinUp2) {
            tooltip.textContent = `Medicin 2: Reducerer sygdom til 10%, og reducerer formerings tabet med 2. Koster ${medicinCost2} bjørnedyr.`;
        } else if (event.target === medicinUp3) {
            tooltip.textContent = `Medicin 3: Reducerer sygdom til 0%, og reducerer formerings tabet med 3. Koster ${medicinCost3} bjørnedyr.`;
        }
        else if (event.target === katastrofeUp) {
            tooltip.textContent = `Forsinkelse: Forsink den næste katastrofe med ${katastrofeDelay1} sekunder. Koster ${katastrofeCost} bjørnedyr.`;
        } else if (event.target === katastrofeUp2) {
            tooltip.textContent = `Forsinkelse 2: Forsink den næste katastrofe med ${katastrofeDelay2} sekunder. Koster ${katastrofeCost2} bjørnedyr.`;
        } else if (event.target === katastrofeUp3) {
            tooltip.textContent = `Forsinkelse 3: Forsink den næste katastrofe med ${katastrofeDelay3} sekunder. Koster ${katastrofeCost3} bjørnedyr.`;
        }
        else if (event.target === formeringUp) {
            tooltip.textContent = `Formering: Bjørnedyr per sekund +1. Koster ${formeringCost} bjørnedyr.`;
        }
    });

    button.addEventListener("mouseout", () => {
        tooltip.style.display = "none";
    });
});


// Buy more points per second
formeringUp.onclick = function () {
    if (!start){
        start = true;
        updateUI()
        return
    }
    if(gameOver){
        restart()
        updateUI()
        return
    }
    if (count >= formeringCost) {
        count -= formeringCost;
        showChangeLabel(-formeringCost);
        countPerSec += plusIncreasePerSec;
        updateUI();
    }
};

// Auto-increment points per second
setInterval(function () {
    if (!start) return;
    if (!gameOver) {
        count += countPerSec;
        updateUI();
    }
}, 1000);


function handlePointLoss() {
    if (gameOver) return;
    if (!start) return;
    if (nextCatastrophe === "Krig") {
        let warLoss = baseWarLoss; // Brug den aktuelle baseWarLoss
        if (skjoldActive) {
            if (skjoldActive2){
                if (skjoldActive3){
                    warLoss -= skjoldDefense3; // Reducer tabene, hvis skjold er aktivt
                }
                else{
                    warLoss -= skjoldDefense2;
                }
            }
            else{
                warLoss -= skjoldDefense1;
            }
        }
        if (warLoss < 0){
            warLoss = 0;
        }

        count -= warLoss;
        if (warLoss == 0) {
            katastrofeLabel.textContent = `Krig: Du har ikke mistet nogen bjørnedyr.`;
        }
        else {
            katastrofeLabel.textContent = `Krig: Du har mistet ${warLoss} bjørnedyr.`;
            showChangeLabel(-warLoss);
        }

        baseWarLoss *= 2; // Fordobl kun efter en krig
    } else if (nextCatastrophe === "Sygdom") {
        if (medicinActive1) {
            if (medicinActive2) {
                if (medicinActive3) {
                    sygdomsLoss = 0
                    upgradeLoss -= 3
                }
                else {
                    sygdomsLoss = 0.15;
                    count = Math.round(count * sygdomsLoss);
                    upgradeLoss -= 2
                }
            }
            else {
                sygdomsLoss = 0.3;
                count = Math.round(count * sygdomsLoss);
                upgradeLoss -= 1
            }
        }
        else {
            count = Math.round(count * sygdomsLoss); // Sygdom: Tab 50 %
        }
        
        if (upgradeLoss < 0) {
            upgradeLoss = 0;
        }
        
        if (sygdomsLoss == 0) {
            katastrofeLabel.textContent = `Sygdom: Du har ikke mistet nogen af dine bjørnedyr.`;
        }
        else {
        katastrofeLabel.textContent = `Sygdom: Du har mistet ${sygdomsLoss*100}% / ${Math.round(sygdomsLoss*count)} af dine bjørnedyr , og ${upgradeLoss} formering upgrades.`;
        showChangeLabel(Math.round(-sygdomsLoss*count));
        }
        countPerSec -= upgradeLoss;
        baseUpgradeLoss *= 2;
    }

    level++; // Øg level efter hver katastrofe
    updateUI();

    katastrofeLabel.style.display = "block";
    setTimeout(() => {
        katastrofeLabel.style.display = "none";
    }, 5000);
    nextCatastrophe = nextCatastrophe === "Krig" ? "Sygdom" : "Krig";
    checkGameOver();
    countdown = 20 //+ katastrofeDelay; // Tilføj forsinkelse
}

// Katastrofe-nedtælling med forsinkelse
let gameTimer = setInterval(function () {
    if (gameOver) return;
    if (!start) return;
    if (countdown > 1) {
        countdown--;
        countdownLabel.textContent = `Tid til ${nextCatastrophe}: ${countdown} sekunder`;
    } else {
        handlePointLoss();
    }
}, 1000);
updateUI();


// Check if the game is over
function checkGameOver() {
    if (!start) return;
    if (count < 0) {
        gameOver = true;
        gameOverLabel.textContent = "Du har tabt spillet!";
        gameOverLabel.style.display = "block";
        document.body.style.backgroundColor = "hsl(0, 0.00%, 36.90%)";
        clearInterval(gameTimer);
        saveLeaderboardData(playerUsername, level);
        updateUI();
    }
}














// Firebase-konfiguration og initialisering
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, where, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA0XYJjI3E6eiHMidBRVsXcF-JE8OWiAPY",
    authDomain: "bjoernedyrspil.firebaseapp.com",
    projectId: "bjoernedyrspil",
    storageBucket: "bjoernedyrspil.appspot.com",
    messagingSenderId: "35589893674",
    appId: "1:35589893674:web:28d63dbff568f8fe111d53",
    measurementId: "G-270N6Y6DV1"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const logInd = document.getElementById("logInd");
const logUd = document.getElementById("logUd");

// Elementer til playWithoutLogin
const playWithoutLoginBtn = document.getElementById("playWithoutLogin");
const usernameInput = document.getElementById("usernameInput");

let playerUsername = "";
let playerLevel = 1; // Starter med level 1 som default

// Lyt efter login-status (efter auth er initialiseret!)
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("✅ Bruger logget ind:", user.displayName);
        document.getElementById("username").innerText = `Logget ind som: ${user.displayName}`;
        logInd.style.display = "none";
        logUd.style.display = "inline-block";

        playerUsername = user.displayName;
    } else {
        console.log("❌ Ingen bruger logget ind");
        document.getElementById("username").innerText = "Ikke logget ind";
        logUd.style.display = "none";
        logInd.style.display = "inline-block";
    }
});

// Funktion til at logge ind med Google
async function loginWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("✅ Logget ind som:", user.displayName);

        if (!playerUsername) { // Kun start spillet hvis det ikke allerede er startet
            playerUsername = user.displayName;
            document.getElementById("username").innerText = `Logget ind som: ${playerUsername}`;
            startGame();
        }
    } catch (error) {
        console.error("🚨 Fejl ved login:", error);
    }
}

window.loginWithGoogle = loginWithGoogle;

// Funktion til at logge ud
async function logout() {
    try {
        await signOut(auth);
        console.log("✅ Logget ud");
        document.getElementById("username").innerText = "Ikke logget ind";
    } catch (error) {
        console.error("🚨 Fejl ved logout:", error);
    }
}
window.logout = logout;

// Liste over forbudte ord (kan udvides)
const bannedWords = ["lukas granum", "ligma", "balls", "deez", "nuts", "admin", "grim", "ugly", "nigger", "nigga", "niga", "neger", "negger", "negga", "sligma", "sut", "slikma", "menneske", "mennesker", "bozo", "bøsse", "gay", "homo", "dum", "transkønnet", "trans", "transformer", "pik", "cock", "penis", "dick", "tissemand", "kønsdele"];

// Funktion til at validere brugernavnet

function isValidUsername(username) {
    username = username.toLowerCase().trim(); // Fjern mellemrum og gør det småt

    // Tjek længde (min 3, max 15 tegn)
    if (username.length < 2 || username.length > 30) {
        return "Brugernavn skal være mellem 2 og 30 tegn.";
    }

    // Tjek for forbudte ord
    for (const word of bannedWords) {
        if (username.includes(word)) {
            return "Ugyldigt brugernavn.";
        }
    }

    return true; // Godkendt brugernavn
}

// Event listener for knappen
document.getElementById("playWithoutLogin").addEventListener("click", function () {
    const usernameInput = document.getElementById("usernameInput").value;
    const validationMessage = isValidUsername(usernameInput);

    if (validationMessage === true) {
        playerUsername = usernameInput; // Gem gyldigt brugernavn
        startGame(); // Start spillet
    } else {
        alert(validationMessage); // Vis fejlmeddelelse
    }
});


// Tilføj event listener til playWithoutLogin-knappen
playWithoutLoginBtn.addEventListener("click", () => {
    const inputName = usernameInput.value.trim();
    const validationResult = isValidUsername(inputName);
    if (validationResult !== true) {
        return;
}
    if (!inputName) {
        return;
    }
    
    playerUsername = inputName;
    document.getElementById("username").innerText = `Spiller: ${playerUsername}`;
    startGame();
});

// Hent og vis leaderboard
// Hent og vis leaderboard
async function fetchLeaderboard() {
    try {
        const leaderboardRef = collection(db, "leaderboard");
        const q = query(leaderboardRef, orderBy("level", "desc"));
        const querySnapshot = await getDocs(q);
        const leaderboardData = new Map();

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.username && data.username.trim() !== "") {
                // Kun tilføj eller opdater data, hvis brugerens level er højere
                if (!leaderboardData.has(data.username) || data.level > leaderboardData.get(data.username).level) {
                    leaderboardData.set(data.username, data);
                }
            }
        });

        // Konverter Map til en array og sorter efter level
        const uniqueLeaderboard = Array.from(leaderboardData.values()).sort((a, b) => b.level - a.level);

        // Vis kun de 10 bedste spillere
        displayLeaderboard(uniqueLeaderboard.slice(0, 10));
    } catch (error) {
        console.error("🚨 Fejl ved hentning af leaderboard:", error);
    }
}





// Funktion til at vise leaderboard
function displayLeaderboard(leaderboardData) {
    const leaderboardContainer = document.getElementById("leaderboard");
    leaderboardContainer.innerHTML = "<h3>Leaderboard</h3>";
    if (leaderboardData.length === 0) {
        leaderboardContainer.innerHTML += "<p>Ingen spillere på leaderboardet endnu.</p>";
    }
    leaderboardData.forEach(entry => {
        leaderboardContainer.innerHTML += `<p>${entry.username}: Level ${entry.level}</p>`;
    });
}

// Funktion til at gemme brugerens data på leaderboardet
async function saveLeaderboardData(username, level, count) {
    const validationResult = isValidUsername(username);
    if (validationResult !== true) {
        console.error("Ugyldigt brugernavn, data bliver ikke gemt:", validationResult);
        return;
    }
    try {
        const leaderboardRef = collection(db, "leaderboard");
        const q = query(leaderboardRef);
        const querySnapshot = await getDocs(q);

        let existingDoc = null;
        
        // Tjek om spilleren allerede er i databasen
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (data.username === username) { // Sørg for, at brugernavnet matcher
                if (!existingDoc || data.level < level) {
                    existingDoc = docSnap;
                }
            }
        });

        if (existingDoc) {
            // Opdater eksisterende dokument, hvis spilleren har en højere score
            if (existingDoc.data().level < level) {
                await updateDoc(doc(db, "leaderboard", existingDoc.id), {
                    level: level
                });
                console.log("✅ Opdateret score for:", username);
            }
        } else {
            // Ellers tilføj en ny post
            await addDoc(collection(db, "leaderboard"), {
                username: username,
                level: level
            });
            console.log("✅ Data gemt på leaderboard:", username, level);
        }

        fetchLeaderboard();
    } catch (error) {
        console.error("🚨 Fejl ved gemning af data:", error);
    }
}



// Start spillet
function startGame() {

    if (!playerUsername) {
        console.log("❌ Du skal have et brugernavn for at spille!");
        return;
    }
    // Her kan du starte dit spil
}

// Funktion, som kaldes når spilleren dør, så gemmes data
if (typeof window.gameOver === "undefined") {
  async function gameOver() {
      console.log(`Spiller ${playerUsername} er død på level ${playerLevel}`);
      // Gem data først når man dør
      await saveLeaderboardData(playerUsername, playerLevel);
      // Eventuelt vis en "Game Over"-skærm eller genstart spillet
  }
  window.gameOver = gameOver;
}

// Sørg for at funktioner er tilgængelige globalt
window.onload = () => {
    fetchLeaderboard();
};
