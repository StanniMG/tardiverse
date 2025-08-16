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
const completedLabel = document.getElementById("completedLabel");
const howToPlay = document.getElementById("howToPlay");


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


// Perms
const bBucksLabel = document.getElementById("bBucksLabel");

// Opret lydobjekter
const clickSounds = [
    new Audio("lyde/klik/klik_1.wav"),
    new Audio("lyde/klik/klik_2.wav")
];

// Find alle knapper med klassen "upgrade" og tilføj event listeners
const upgradeButtons = document.querySelectorAll(".upgrade");

upgradeButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Vælg en tilfældig lyd og afspil den
        const randomSound = clickSounds[Math.floor(Math.random() * clickSounds.length)];
        randomSound.play();
    });
});




// Variables
let count = 200;
let countPerSec = 3;
let formeringCost = 50;
let plusIncreasePerSec = 1;

let baseCountdown = 30
let countdown = baseCountdown; // Tid i sekunder
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
let start = false;
let completed = false;
// Upgrades

const tooltip = document.getElementById("tooltip");

// Celledeling
let celledelingActive = false;
let celledelingActive2 = false;
let celledelingActive3 = false;
let celledelingCost = 100;
let celledelingCost2 = 200;
let celledelingCost3 = 5000;

// Skjold
let skjoldActive = false;
let skjoldActive2 = false;
let skjoldActive3 = false;
let skjoldCost = 75;
let skjoldCost2 = 150;
let skjoldCost3 = 300;
let skjoldDefense1 = 40;
let skjoldDefense2 = 150;
let skjoldDefense3 = 400

// Medicin
let medicinActive1 = false;
let medicinActive2 = false;
let medicinActive3 = false;
let medicinCost1 = 200;
let medicinCost2 = 500;
let medicinCost3 = 8000;

// Forsinkelse
let katastrofeCost = 100;
let katastrofeCost2 = 400;
let katastrofeCost3 = 2000; 
let katastrofeUpActive = false; 
let katastrofeUpActive2 = false;
let katastrofeUpActive3 = false;
let katastrofeDelay1 = 10
let katastrofeDelay2 = 15
let katastrofeDelay3 = 20

// Perms
let bBucks = 0;

// Helper function to format numbers with a dot every three zeros


function updateUI() {
    if (gameOver){
        formeringUp.textContent = "Genstart";
        formeringUp.classList.add("purchased");
        return
    }
    else {
        formeringUp.classList.remove("purchased");
    }
    checkGameOver()
    complete()
    bBucksLabel.textContent = `B-Bucks: ${bBucks}`;
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
    warLossPreviewLabel.textContent = `Tab ved næste krig: ${Math.round(adjustedWarLoss)}`;

    // Medicin: Beregn den justerede procentvise tab ved næste sygdom
    let adjustedSygdomsLoss = baseSygdomsLoss; // starter med 50% (0.5)
    upgradeLoss = baseUpgradeLoss;
    if (medicinActive1) {
        if (medicinActive2) {
            if (medicinActive3) {
                adjustedSygdomsLoss = 0.05; // Ingen tab, hvis alle tre er opgraderet
            } else {
                adjustedSygdomsLoss = 0.15;
            }
        } else {
            adjustedSygdomsLoss = 0.3;
        }
    } else {
        adjustedSygdomsLoss = baseSygdomsLoss;
    }
    if (upgradeLoss < 0){
        upgradeLoss = 0;
    }
    if (level >= 3) {
        sygdomsLossPreviewLabel.textContent = `Tab ved næste Sygdom: ${adjustedSygdomsLoss * 100}%, og 1 random upgrade`;
    }
    else {
        sygdomsLossPreviewLabel.textContent = `Tab ved næste Sygdom: ${adjustedSygdomsLoss * 100}%, men ingen random upgrades`;
    }

    if (!start){
        formeringUp.classList.add("purchased");
        formeringUp.textContent = `Start`;
        return
    }

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

let celledelingTimer = null; // Gem timer-ID'et globalt

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

    baseUpgradeLoss = 1;
    upgradeLoss = baseUpgradeLoss;
    countPerSec = 2;
    countdown = baseCountdown;
    gameOver = false;
    start = true;
    baseWarLoss = 100;
    baseSygdomsLoss = 0.5;
    level = 0;
    nextCatastrophe = "Krig";
    completed = false;
    gameOverLabel.style.display = "none";
    completedLabel.style.display = "none";
    celledelingCountdownLabel.style.display = "none";
    katastrofeLabel.style.display = "none";

    document.body.style.backgroundColor = "hsl(0, 0%, 95%)";

    // Ryd gammel celledeling-timer
    if (celledelingTimer) {
        clearInterval(celledelingTimer);
        celledelingTimer = null;
    }

    updateUI();
}

// Fælles funktion til at starte celledeling-timeren
function startCelledelingTimer() {
    if (celledelingTimer) {
        clearInterval(celledelingTimer);
    }

    celledelingTimer = setInterval(() => {
        if (gameOver) return;

        if (celledelingActive || celledelingActive2 || celledelingActive3) {
            if (newCelledelingCountdown > 1) {    
                newCelledelingCountdown--;
            } else {
                if (celledelingActive3) {
                    const bonus = Math.round(count * 0.3);
                    count += bonus;
                    showChangeLabel(bonus);
                    newCelledelingCountdown = celledelingCountdown;
                }
                else if (celledelingActive2) {
                    const bonus = Math.round(count * 0.2);
                    count += bonus;
                    showChangeLabel(bonus);
                    newCelledelingCountdown = celledelingCountdown;
                }
                else {
                    const bonus = Math.round(count * 0.1);
                    count += bonus;
                    showChangeLabel(bonus);
                    newCelledelingCountdown = celledelingCountdown;
                }
                

            }
            updateUI();
        }
    }, 1000);
}

// Celledeling-knap
celledelingUp.onclick = function () {
    if (!start || gameOver) return;

    if (count >= celledelingCost && !celledelingActive) {
        showChangeLabel(-celledelingCost);
        celledelingActive = true;
        count -= celledelingCost;
        celledelingCountdownLabel.style.display = "inline-block";
        newCelledelingCountdown = celledelingCountdown;
        updateUI();
        startCelledelingTimer(); // Start timeren
    }
};

celledelingUp2.onclick = function () {
    if (!start || gameOver) return;

    if (count >= celledelingCost2 && celledelingActive && !celledelingActive2) {
        showChangeLabel(-celledelingCost2);
        celledelingActive2 = true;
        count -= celledelingCost2;
        updateUI();
        startCelledelingTimer(); // Sikrer, at timeren kun kører én gang
    }
};

celledelingUp3.onclick = function () {
    if (!start || gameOver) return;

    if (count >= celledelingCost3 && celledelingActive2 && !celledelingActive3) {
        showChangeLabel(-celledelingCost3);
        celledelingActive3 = true;
        count -= celledelingCost3;
        updateUI();
        startCelledelingTimer(); // Sikrer, at timeren kun kører én gang
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
            tooltip.textContent = `Medicin: Reducerer sygdom til 30%. Koster ${medicinCost1} bjørnedyr.`;
        } else if (event.target === medicinUp2) {
            tooltip.textContent = `Medicin 2: Reducerer sygdom til 15%. Koster ${medicinCost2} bjørnedyr.`;
        } else if (event.target === medicinUp3) {
            tooltip.textContent = `Medicin 3: Reducerer sygdom til 5%. Koster ${medicinCost3} bjørnedyr.`;
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
let gameTimer = setInterval(function () {
    if (!start) return;
    if (!gameOver) {
        count += countPerSec;
        if (countdown > 1) {
            countdown--;
            countdownLabel.textContent = `Tid til ${nextCatastrophe}: ${countdown} sekunder`;
        } else {
            handlePointLoss();
        }
        updateUI();
    }
}, 1000);



// Hjælpefunktion til at give et pænt navn for opgraderinger
function upgradeName(name) {
    switch(name) {
        case "celledelingActive": return "Celledeling 1";
        case "celledelingActive2": return "Celledeling 2";
        case "celledelingActive3": return "Celledeling 3";
        case "skjoldActive": return "Skjold 1";
        case "skjoldActive2": return "Skjold 2";
        case "skjoldActive3": return "Skjold 3";
        case "medicinActive1": return "Medicin 1";
        case "medicinActive2": return "Medicin 2";
        case "medicinActive3": return "Medicin 3";
        default: return name;
    }
}

function handlePointLoss() { 
    if (gameOver) return;
    if (!start) return;
    
    if (nextCatastrophe === "Krig") {
        let warLoss = baseWarLoss;
        if (skjoldActive) {
            if (skjoldActive2) {
                if (skjoldActive3) {
                    warLoss -= skjoldDefense3;
                } else {
                    warLoss -= skjoldDefense2;
                }
            } else {
                warLoss -= skjoldDefense1;
            }
        }
        if (warLoss < 0) warLoss = 0;
        count -= Math.round(warLoss);
        if (warLoss === 0) {
            katastrofeLabel.textContent = "Krig: Du har ikke mistet nogen bjørnedyr.";
        } else {
            katastrofeLabel.textContent = `Krig: Du har mistet ${Math.round(warLoss)} bjørnedyr.`;
        }
        showChangeLabel(Math.round(-warLoss));
        baseWarLoss *= 1.5;
        
    } else if (nextCatastrophe === "Sygdom") {
        let sygdomsLoss = 0.5;
        if (medicinActive1) {
            if (medicinActive2) {
                if (medicinActive3) {
                    sygdomsLoss = 0.05;
                } else {
                    sygdomsLoss = 0.15;
                }
            } else {
                sygdomsLoss = 0.3;
            }
        }
        count = Math.round(count * (1 - sygdomsLoss));


        // Saml alle aktive opgraderinger (kun én pr. type – vi antager, at højeste niveau er aktivt, hvis det er sandt)
        let upgrades = [];
        if (celledelingActive3) upgrades.push("celledelingActive3");
        else if (celledelingActive2) upgrades.push("celledelingActive2");
        else if (celledelingActive) upgrades.push("celledelingActive");
        
        if (skjoldActive3) upgrades.push("skjoldActive3");
        else if (skjoldActive2) upgrades.push("skjoldActive2");
        else if (skjoldActive) upgrades.push("skjoldActive");
        
        if (medicinActive3) upgrades.push("medicinActive3");
        else if (medicinActive2) upgrades.push("medicinActive2");
        else if (medicinActive1) upgrades.push("medicinActive1");
         
        if (level >= 3 && upgrades.length > 0) {
            let randomUpgrade = upgrades[Math.floor(Math.random() * upgrades.length)];
            // Brug switch-case for at sætte den korrekte opgradering til false
            switch(randomUpgrade) {
                case "celledelingActive3":
                    celledelingActive3 = false;
                    break;
                case "celledelingActive2":
                    celledelingActive2 = false;
                    break;
                case "celledelingActive":
                    celledelingActive = false;
                    break;
                case "skjoldActive3":
                    skjoldActive3 = false;
                    break;
                case "skjoldActive2":
                    skjoldActive2 = false;
                    break;
                case "skjoldActive":
                    skjoldActive = false;
                    break;
                case "medicinActive3":
                    medicinActive3 = false;
                    break;
                case "medicinActive2":
                    medicinActive2 = false;
                    break;
                case "medicinActive1":
                    medicinActive1 = false;
                    break;
                default:
                    break;
            }
            let upgradeDisplay = upgradeName(randomUpgrade);
            katastrofeLabel.textContent = `Sygdom: Du har mistet ${Math.round(sygdomsLoss * 100)}% af dine bjørnedyr og opgraderingen ${upgradeDisplay}.`;
        } else {
            katastrofeLabel.textContent = `Sygdom: Du har mistet ${Math.round(sygdomsLoss * 100)}% af dine bjørnedyr, men ingen opgraderinger.`;
        }
        
        showChangeLabel(Math.round(-sygdomsLoss * count));
    }
    
    level++;
    updateUI();
    
    katastrofeLabel.style.display = "block";
    setTimeout(() => {
        katastrofeLabel.style.display = "none";
    }, 5000);
    nextCatastrophe = nextCatastrophe === "Krig" ? "Sygdom" : "Krig";
    countdown = baseCountdown;
}

function complete() {
    if (!start) return;
    if (gameOver) return;
    if (completed) return;
    if (level >= 1) {
        bBucks += 1;
        saveLeaderboardData(playerUsername, count, bBucks);
        completedLabel.textContent = "Du har vundet spillet!";
        completedLabel.style.display = "block";
        document.body.style.backgroundColor = "hsl(110, 100%, 50%)";
        completed = true;
        gameOver = true; 
        updateUI();
    }
}

// Check if the game is over
function checkGameOver() {
    if (!start) return;
    if (count < 0) {
        gameOver = true;
        gameOverLabel.textContent = "Du har tabt spillet!";
        gameOverLabel.style.display = "block";
        document.body.style.backgroundColor = "hsl(0, 0.00%, 36.90%)";
        saveLeaderboardData(playerUsername, count, bBucks);

        updateUI();
    }
}




const howToPlayLabel = document.getElementById("howToPlayLabel")

let howToPlayText = false;
howToPlay.onclick = function () {
    if (howToPlayText) {
        howToPlayLabel.style.display = "none"
        howToPlay.textContent = "📜 Sådan spiller du"
        howToPlayText = false;
    } else {
        howToPlayLabel.style.display = "block"
        howToPlay.textContent = "Luk"
        howToPlayText = true;
    }
}











// Firebase-konfiguration og initialisering
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, updateDoc, doc, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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
// Vi bruger "count" som score (default starter vi med 200)

// Lyt efter login-status (efter auth er initialiseret!)
auth.onAuthStateChanged(async (user) => {
    if (user) {
        console.log("✅ Bruger logget ind:", user.displayName);
        document.getElementById("username").innerText = `Logget ind som: ${user.displayName}`;
        logInd.style.display = "none";
        logUd.style.display = "inline-block";
        playerUsername = user.displayName;

        // Hent bBucks for brugeren og sæt startværdien
        bBucks = await loadBBucksForUser(playerUsername);
        bBucksLabel.textContent = `B-Bucks: ${bBucks}`; // <-- Opdater label med det samme!
        console.log(`🔄 Indlæst bBucks for ${playerUsername}: ${bBucks}`);
    } else {
        console.log("❌ Ingen bruger logget ind");
        document.getElementById("username").innerText = "Ikke logget ind";
        logUd.style.display = "none";
        logInd.style.display = "inline-block";
        bBucks = 0; // Nulstil bBucks hvis ingen bruger er logget ind
        bBucksLabel.textContent = `B-Bucks: ${bBucks}`; // <-- Opdater label med det samme!
    }
});

// Funktion til at logge ind med Google
async function loginWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("✅ Logget ind som:", user.displayName);
        
        if (!playerUsername) {
            playerUsername = user.displayName;
            document.getElementById("username").innerText = `Logget ind som: ${playerUsername}`;
        }

        console.log("📌 Kalder saveLeaderboardData for:", playerUsername);
        
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
const bannedWords = ["lukas granum", "lucas granum med k", "ligma", "balls", "deez", "nuts", "admin", "grim", "ugly", "nigger", "nigga", "niga", "neger", "negger", "negga", "sligma", "sut", "slikma", "menneske", "mennesker", "bozo", "bøsse", "gay", "homo", "dum", "transkønnet", "trans", "transformer", "pik", "cock", "penis", "dick", "tissemand", "kønsdele"];

// Funktion til at validere brugernavnet
function isValidUsername(username) {
    username = username.toLowerCase().trim(); // Fjern mellemrum og gør det småt

    // Tjek længde (min 2, max 30 tegn)
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

// Funktion til at hente bBucks for en bruger fra leaderboard
async function loadBBucksForUser(username) {
    try {
        const leaderboardRef = collection(db, "leaderboard");
        const q = query(leaderboardRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].data();
            return data.bBucks ?? 0;
        }
    } catch (error) {
        console.error("🚨 Fejl ved hentning af bBucks:", error);
    }
    return 0;
}

// Event listener for playWithoutLogin-knappen
playWithoutLoginBtn.addEventListener("click", async function () {
    const inputName = usernameInput.value.trim();
    const validationResult = isValidUsername(inputName);
    if (validationResult === true && inputName) {
        playerUsername = inputName;
        document.getElementById("username").innerText = `Spiller: ${playerUsername}`;
        // Hent bBucks for brugeren og sæt startværdien
        bBucks = await loadBBucksForUser(playerUsername);
        bBucksLabel.textContent = `B-Bucks: ${bBucks}`; // <-- Opdater label med det samme!
        console.log(`🔄 Indlæst bBucks for ${playerUsername}: ${bBucks}`);
        // Her kan du starte spillet
    } else {
        alert(validationResult);
    }
});

// Hent og vis leaderboard
async function fetchLeaderboard() {
    try {
        const leaderboardRef = collection(db, "leaderboard");
        // Sorter efter "count" i stedet for "level"
        const q = query(leaderboardRef, orderBy("count", "desc"));
        const querySnapshot = await getDocs(q);
        const leaderboardData = new Map();

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.username && data.username.trim() !== "") {
                // Kun tilføj eller opdater data, hvis brugerens count er højere
                if (!leaderboardData.has(data.username) || data.count > leaderboardData.get(data.username).count) {
                    leaderboardData.set(data.username, data);
                }
            }
        });

        // Konverter Map til en array og sorter efter count
        const uniqueLeaderboard = Array.from(leaderboardData.values()).sort((a, b) => b.count - a.count);

        // Vis kun de 10 bedste spillere
        displayLeaderboard(uniqueLeaderboard.slice(0, 10));
    } catch (error) {
        console.error("🚨 Fejl ved hentning af leaderboard:", error);
    }
}

// Funktion til at vise leaderboard
function displayLeaderboard(leaderboardData) {
    const leaderboardContainer = document.getElementById("leaderboard");
    leaderboardContainer.innerHTML = `
        <div id="leaderboardHeader">
            <h3>Leaderboard</h3> 
            <button id="toggleLeaderboard">v</button>
        </div>
        <div id="leaderboardContent"></div>
    `;

    const contentContainer = document.getElementById("leaderboardContent");
    if (leaderboardData.length === 0) {
        contentContainer.innerHTML = "<p>Ingen spillere på leaderboardet endnu.</p>";
    } else {
        leaderboardData.forEach(entry => {
            // ✅ Viser kun username og score (ikke bBucks)
            contentContainer.innerHTML += `<p>${entry.username}: Score ${entry.count}</p>`;
        });
    }

    document.getElementById("toggleLeaderboard").addEventListener("click", toggleLeaderboard);
}


// Funktion til at skjule/vise leaderboardet
function toggleLeaderboard() {
    const contentContainer = document.getElementById("leaderboardContent");
    const toggleLeaderboardBtn = document.getElementById("toggleLeaderboard");
    if (contentContainer.style.display === "none") {
        contentContainer.style.display = "block"; // Vis leaderboard
        toggleLeaderboardBtn.textContent = "v";
    } else {
        contentContainer.style.display = "none"; // Skjul leaderboard
        toggleLeaderboardBtn.textContent = ">";
    }
}

async function saveLeaderboardData(username, count, bBucks) {
    const validationResult = isValidUsername(username);
    if (validationResult !== true) {
        console.error("Ugyldigt brugernavn, data bliver ikke gemt:", validationResult);
        return;
    }
    try {
        console.log(`📌 Forsøger at gemme data: username=${username}, count=${count}, bBucks=${bBucks}`);

        const leaderboardRef = collection(db, "leaderboard");
        const q = query(leaderboardRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            const data = docSnap.data();
            const existingCount = data.count ?? 0;

            if (existingCount < count) {
                // ✅ Opdater kun count i leaderboard, men behold bBucks separat
                await updateDoc(doc(db, "leaderboard", docSnap.id), { count: count });
            }

            // ✅ Opdater bBucks UDEN at det påvirker leaderboard-sorteringen
            await updateDoc(doc(db, "leaderboard", docSnap.id), { bBucks: bBucks });

        } else {
            // ✅ Ny spiller - gemmer med count og bBucks (men bBucks vises ikke i leaderboard)
            await addDoc(leaderboardRef, { username: username, count: count, bBucks: bBucks });
        }

        console.log("✅ Data gemt/opdateret!");
        fetchLeaderboard();
    } catch (error) {
        console.error("🚨 Fejl ved gemning af data:", error);
    }
}




// Sørg for at funktioner er tilgængelige globalt
window.onload = () => {
    fetchLeaderboard();
};
