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
const pauseBtn = document.getElementById("pauseBtn");


// Perms
const bBucksLabel = document.getElementById("bBucksLabel");

// Opret lydobjekter
const clickSounds = [
    new Audio("assets/lyde/klik/klik_1.wav"),
    new Audio("assets/lyde/klik/klik_2.wav")
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


// Gamemode config
const gamemodes = {
    jorden: {
        tid: 1000,
        count: 200,
        countPerSec: 3,
        baseCountdown: 30,
        baseWarLoss: 100,
        nextCatastrophe: "Krig",
        baseUpgradeLoss: 1,
        formeringCost: 50,
        celledelingCost: 100,
        celledelingCost2: 200,
        celledelingCost3: 5000,
        celledelingMultiplier: 0.1,
        celledelingMultiplier2: 0.2,
        celledelingMultiplier3: 0.3,
        skjoldCost: 75,
        skjoldCost2: 150,
        skjoldCost3: 300,
        skjoldDefense1: 40,
        skjoldDefense2: 150,
        skjoldDefense3: 400,
        medicinCost1: 200,
        medicinCost2: 500,
        medicinCost3: 8000,
        katastrofeCost: 100,
        katastrofeCost2: 400,
        katastrofeCost3: 2000,
        katastrofeDelay1: 10,
        katastrofeDelay2: 15,
        katastrofeDelay3: 20
    },
    venus: {
        tid: 500,
        count: 300,
        countPerSec: 10,
        baseCountdown: 20,
        baseWarLoss: 150,
        nextCatastrophe: "Sygdom",
        baseUpgradeLoss: 1,
        formeringCost: 75,
        celledelingCost: 200,
        celledelingCost2: 700,
        celledelingCost3: 8000,
        celledelingMultiplier: 0.15,
        celledelingMultiplier2: 0.3,
        celledelingMultiplier3: 0.4,
        skjoldCost: 60,
        skjoldCost2: 100,
        skjoldCost3: 300,
        skjoldDefense1: 45,
        skjoldDefense2: 150,
        skjoldDefense3: 600,
        medicinCost1: 200,
        medicinCost2: 500,
        medicinCost3: 8000,
        katastrofeCost: 100,
        katastrofeCost2: 400,
        katastrofeCost3: 2000,
        katastrofeDelay1: 10,
        katastrofeDelay2: 15,
        katastrofeDelay3: 20
    },
    infinite: {
        tid: 100,
        count: 200,
        countPerSec: 3,
        baseCountdown: 30,
        baseWarLoss: 100,
        nextCatastrophe: "Krig",
        baseUpgradeLoss: 1,
        formeringCost: 50,
        celledelingCost: 100,
        celledelingCost2: 200,
        celledelingCost3: 5000,
        celledelingMultiplier: 0.1,
        celledelingMultiplier2: 0.2,
        celledelingMultiplier3: 0.3,
        skjoldCost: 75,
        skjoldCost2: 150,
        skjoldCost3: 300,
        skjoldDefense1: 40,
        skjoldDefense2: 150,
        skjoldDefense3: 400,
        medicinCost1: 200,
        medicinCost2: 500,
        medicinCost3: 8000,
        katastrofeCost: 100,
        katastrofeCost2: 400,
        katastrofeCost3: 2000,
        katastrofeDelay1: 10,
        katastrofeDelay2: 15,
        katastrofeDelay3: 20
    }
};
let gamemode = null;

// Globale variabler til spillet
let count, countPerSec, formeringCost, plusIncreasePerSec, tid, baseCountdown, countdown, celledelingCountdown, newCelledelingCountdown, level, baseWarLoss, nextCatastrophe, baseUpgradeLoss, baseSygdomsLoss, sygdomsLoss, upgradeLoss, completed;
let celledelingActive, celledelingActive2, celledelingActive3, celledelingCost, celledelingCost2, celledelingCost3, celledelingMultiplier, celledelingMultiplier2, celledelingMultiplier3;
let skjoldActive, skjoldActive2, skjoldActive3, skjoldCost, skjoldCost2, skjoldCost3, skjoldDefense1, skjoldDefense2, skjoldDefense3;
let medicinActive1, medicinActive2, medicinActive3, medicinCost1, medicinCost2, medicinCost3;
let katastrofeCost, katastrofeCost2, katastrofeCost3, katastrofeUpActive, katastrofeUpActive2, katastrofeUpActive3, katastrofeDelay1, katastrofeDelay2, katastrofeDelay3;

let timer = false;
// Start spillet med valgt gamemode
function startGame(selectedMode) {
    gamemode = selectedMode;
    let mode = gamemodes[gamemode];
    

    // Init alle variabler
    tid = mode.tid;
    count = mode.count;
    countPerSec = mode.countPerSec;
    formeringCost = mode.formeringCost;
    plusIncreasePerSec = 1;
    baseCountdown = mode.baseCountdown;
    countdown = baseCountdown;
    celledelingCountdown = 7;
    newCelledelingCountdown = celledelingCountdown;
    level = 0;
    baseWarLoss = mode.baseWarLoss;
    nextCatastrophe = mode.nextCatastrophe;
    baseUpgradeLoss = mode.baseUpgradeLoss;
    baseSygdomsLoss = 0.5;
    sygdomsLoss = baseSygdomsLoss;
    upgradeLoss = baseUpgradeLoss;
    completed = false;

    // Upgrades
    celledelingActive = false;
    celledelingActive2 = false;
    celledelingActive3 = false;
    celledelingCost = mode.celledelingCost;
    celledelingCost2 = mode.celledelingCost2;
    celledelingCost3 = mode.celledelingCost3;
    celledelingMultiplier = mode.celledelingMultiplier;
    celledelingMultiplier2 = mode.celledelingMultiplier2;
    celledelingMultiplier3 = mode.celledelingMultiplier3;

    skjoldActive = false;
    skjoldActive2 = false;
    skjoldActive3 = false;
    skjoldCost = mode.skjoldCost;
    skjoldCost2 = mode.skjoldCost2;
    skjoldCost3 = mode.skjoldCost3;
    skjoldDefense1 = mode.skjoldDefense1;
    skjoldDefense2 = mode.skjoldDefense2;
    skjoldDefense3 = mode.skjoldDefense3;

    medicinActive1 = false;
    medicinActive2 = false;
    medicinActive3 = false;
    medicinCost1 = mode.medicinCost1;
    medicinCost2 = mode.medicinCost2;
    medicinCost3 = mode.medicinCost3;

    katastrofeCost = mode.katastrofeCost;
    katastrofeCost2 = mode.katastrofeCost2;
    katastrofeCost3 = mode.katastrofeCost3;
    katastrofeUpActive = false;
    katastrofeUpActive2 = false;
    katastrofeUpActive3 = false;
    katastrofeDelay1 = mode.katastrofeDelay1;
    katastrofeDelay2 = mode.katastrofeDelay2;
    katastrofeDelay3 = mode.katastrofeDelay3;

    gameOver = false;
    start = false;
    xpInLevel = 0;
    render();
    completed = false;

    countdownLabel.textContent = `Tid til ${nextCatastrophe}: ${countdown} år`;

    // Skjul/vis relevante elementer
    document.getElementById("gameOverLabel").style.display = "none";
    document.getElementById("completedLabel").style.display = "none";
    document.getElementById("celledelingCountdownLabel").style.display = "none";
    document.getElementById("katastrofeLabel").style.visibility = "hidden";

    gameOverLabel.style.display = "none";
    completedLabel.style.display = "none";
    celledelingCountdownLabel.style.display = "none";
    //katastrofeLabel.style.display = "none";
    katastrofeLabel.style.visibility = "hidden";
    if (gamemode == "infinite") {
        pauseBtn.style.visibility = "visible";
    }
    else {
        pauseBtn.style.visibility = "hidden";
    }

    document.body.style.backgroundColor = "hsl(0, 0%, 95%)";
    // Auto-increment points per second
    if (!timer) {
        let gameTimer = setInterval(function () {
            timer = true;
            if (!start) return;
            if (!gameOver) {
                if (pause) return;
                count += countPerSec;
                if (countdown > 1) {
                    countdown--;
                    countdownLabel.textContent = `Tid til ${nextCatastrophe}: ${countdown} år`;
                } else {
                    handlePointLoss();
                }
                updateUI();

            }
        }, tid);
    }

    updateUI();
}

let gameOver = false;
let start = false;
// Perms
let bBucks = 0;
let donation = 0;
let unlockedPlanets = ["jorden"];
let venusCost = 3;
let infiniteCost = 5;
let pause = false


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
    talLabel.textContent = `${count.toLocaleString("da-DK")}`;
    increasePerSecLabel.textContent = `${(countPerSec)} bjørnedyr per år`;
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
        celledelingCountdownLabel.textContent = `Tid til Celledeling: ${newCelledelingCountdown} år`;
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
        celledelingCountdownLabel.textContent = `Tid til Celledeling 2: ${newCelledelingCountdown} år`;
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
        celledelingCountdownLabel.textContent = `Tid til Celledeling 3: ${newCelledelingCountdown} år`;
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
    // Skjul labelen efter 1 år
    setTimeout(() => {
        bonusLabel.style.opacity = 0;
    }, tid); // Den skal være på 1000 
}

let celledelingTimer = null; // Gem timer-ID'et globalt


// Fælles funktion til at starte celledeling-timeren
function startCelledelingTimer() {
    if (celledelingTimer) {
        clearInterval(celledelingTimer);
    }

    celledelingTimer = setInterval(() => {
        if (gameOver) return;
        if (pause) return;
        if (celledelingActive || celledelingActive2 || celledelingActive3) {
            if (newCelledelingCountdown > 1) {    
                newCelledelingCountdown--;
            } else {
                if (celledelingActive3) {
                    const bonus = Math.round(count * celledelingMultiplier3);
                    count += bonus;
                    showChangeLabel(bonus);
                    newCelledelingCountdown = celledelingCountdown;
                }
                else if (celledelingActive2) {
                    const bonus = Math.round(count * celledelingMultiplier2);
                    count += bonus;
                    showChangeLabel(bonus);
                    newCelledelingCountdown = celledelingCountdown;
                }
                else {
                    const bonus = Math.round(count * celledelingMultiplier);
                    count += bonus;
                    showChangeLabel(bonus);
                    newCelledelingCountdown = celledelingCountdown;
                }
                

            }
            updateUI();
        }
    }, tid); // 1000
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




// Tooltip-håndtering (skal bruge globale variabler)
[formeringUp, celledelingUp, celledelingUp2, celledelingUp3, skjoldUp, skjoldUp2, skjoldUp3, medicinUp1, medicinUp2, medicinUp3, katastrofeUp, katastrofeUp2, katastrofeUp3].forEach(button => {
    button.addEventListener("mouseover", (event) => {
        tooltip.style.display = "block";
        tooltip.style.left = `${event.target.getBoundingClientRect().left}px`;
        tooltip.style.top = `${event.target.getBoundingClientRect().top - tooltip.offsetHeight - 10}px`;

        if (event.target === celledelingUp) {
            tooltip.textContent = `Celledeling: Giver ${celledelingMultiplier * 100}% af dine bjørnedyr hvert ${celledelingCountdown}. år. Koster ${celledelingCost} bjørnedyr.`;
        } else if (event.target === celledelingUp2) {
            tooltip.textContent = `Celledeling 2: Giver ${celledelingMultiplier2 * 100}% af dine bjørnedyr hvert ${celledelingCountdown}. år. Koster ${celledelingCost2} bjørnedyr.`;
        } else if (event.target === celledelingUp3) {
            tooltip.textContent = `Celledeling 3: Giver ${celledelingMultiplier3 * 100}% af dine bjørnedyr hvert ${celledelingCountdown}. år. Koster ${celledelingCost3} bjørnedyr.`;
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
            tooltip.textContent = `Forsinkelse: Forsink den næste katastrofe med ${katastrofeDelay1} år. Koster ${katastrofeCost} bjørnedyr.`;
        } else if (event.target === katastrofeUp2) {
            tooltip.textContent = `Forsinkelse 2: Forsink den næste katastrofe med ${katastrofeDelay2} år. Koster ${katastrofeCost2} bjørnedyr.`;
        } else if (event.target === katastrofeUp3) {
            tooltip.textContent = `Forsinkelse 3: Forsink den næste katastrofe med ${katastrofeDelay3} år. Koster ${katastrofeCost3} bjørnedyr.`;
        }
        else if (event.target === formeringUp) {
            tooltip.textContent = `Formering: Bjørnedyr per år +1. Koster ${formeringCost} bjørnedyr.`;
        }
    });

    button.addEventListener("mouseout", () => {
        tooltip.style.display = "none";
    });
});

let ekstra_point = 0
// Buy more points per second
formeringUp.onclick = function () {
    if (!start){
        start = true;
        updateUI()
        return
    }
    if(gameOver){
        startGame(gamemode)
        updateUI()
        return
    }
    if (count >= formeringCost) {
        count -= formeringCost;
        showChangeLabel(-formeringCost);
        countPerSec += plusIncreasePerSec;
        ekstra_point += 1;
        if (ekstra_point == 5) {
            window.open("https://www.youtube.com/watch?v=xvFZjo5PgG0", "_blank");
        }
        updateUI();
    }
};

pauseBtn.onclick = function () {
    if (pause) {
        pause = false
        pauseBtn.style.backgroundColor = "aqua";
        pauseBtn.style.color = "black";
        pauseBtn.textContent = "Pause";
    }
    else {
        pause = true
        pauseBtn.style.backgroundColor = "blue";
        pauseBtn.style.color = "white";
        pauseBtn.textContent = "Start";
    }
}



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
        if (level >= 10 && gamemode == "infinite") {
            baseWarLoss *= 2;
        }
        else {
            baseWarLoss *= 1.5;
        }

        
    } else if (nextCatastrophe === "Sygdom") {
        sygdomsLoss = baseSygdomsLoss;
        if (medicinActive1) {
            if (medicinActive2) {
                if (medicinActive3) {
                    sygdomsLoss = baseSygdomsLoss - 0.45;
                } else {
                    sygdomsLoss = baseSygdomsLoss - 0.35;
                }
            } else {
                sygdomsLoss = baseSygdomsLoss - 0.2;
            }
        }
        count = Math.round(count * (1 - sygdomsLoss));
        if (gamemode == "infinite") {
            if (medicinActive1) {
                if (medicinActive2) {
                    if (medicinActive3) {
                        baseSygdomsLoss += 0.01;
                    } else {
                        baseSygdomsLoss += 0.03;
                    }
                } else {
                    baseSygdomsLoss += 0.05;
                }
            }
        }

        console.log(baseSygdomsLoss)
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
    addLevel(1);
    updateUI();
    
    //katastrofeLabel.style.display = "block";
    katastrofeLabel.style.visibility = "visible";
    setTimeout(() => {
        //katastrofeLabel.style.display = "none";
        katastrofeLabel.style.visibility = "hidden";
    }, tid * 5);
    nextCatastrophe = nextCatastrophe === "Krig" ? "Sygdom" : "Krig";
    countdown = baseCountdown;
}

function complete() {
    if (!start) return;
    if (gameOver) return;
    if (completed) return;
    if (level >= 10 && gamemode != "infinite") { // level skal være >= 10
        bBucks += 1;
        saveLeaderboardData(playerUsername, count, level, bBucks, donation, gamemode);
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
        if (gamemode == "infinite") {
            bBucks += Math.floor(level / 5);
        }
        saveLeaderboardData(playerUsername, count, level, bBucks, donation, gamemode);

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




// Konfiguration
const SEGMENTS_PER_LEVEL = 10;

// State

let xpInLevel = 0;
const xpBar = document.getElementById('xpBar');

// Lav 10 segmenter
const segments = [];
for (let i = 0; i < SEGMENTS_PER_LEVEL; i++) {
    const seg = document.createElement('div');
    seg.className = 'seg';
    xpBar.appendChild(seg);
    segments.push(seg);
}

function render() {
    // Opdater segmenternes fyldning
    segments.forEach((seg, i) => {
      if (i < xpInLevel) seg.classList.add('filled');
      else seg.classList.remove('filled');
    });
}

function addLevel(amount = 1) {
    xpInLevel += amount;
    render();
}





















// Firebase-konfiguration og initialisering
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, updateDoc, doc, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA0XYJjI3E6eiHMidBRVsXcF-JE8OWiAPY",
    authDomain: "bjoernedyrspil.firebaseapp.com",
    projectId: "bjoernedyrspil",
    storageBucket: "bjoernedyrspil.appspot.com",
    messagingSenderId: "35589893674",
    appId: "1:35589893674:web:28d63dbff568f8fe111d53",
    measurementId: "G-270N6Y6DV1"
};


async function ensureAuth() {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
    console.log("🔐 Anonymt logget ind til Firestore.");
  }
}

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
const usernamePasswordInput = document.getElementById("usernamePasswordInput");

let playerUsername = "";
// Vi bruger "count" som score (default starter vi med 200)

// Lyt efter login-status (efter auth er initialiseret!)
auth.onAuthStateChanged(async (user) => {
    if (user) {
        document.getElementById("username").innerText = `Logget ind som: ${user.displayName}`;
        logInd.style.display = "none";
        logUd.style.display = "inline-block";
        playerUsername = user.displayName;

        // Hent bBucks for brugeren og sæt startværdien
        bBucks = await loadBBucksForUser(playerUsername);
        donation = await loadDonationForUser(playerUsername);
        //unlockedPlanets = await loadPlanetsForUser(playerUsername);
        applyVIPBackground();
        bBucksLabel.textContent = `B-Bucks: ${bBucks}`; // <-- Opdater label med det samme!
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

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        let username;
        if (!querySnapshot.empty) {
            username = querySnapshot.docs[0].data().username;
            bBucks = querySnapshot.docs[0].data().bBucks ?? 0;
            donation = querySnapshot.docs[0].data().donation ?? 0;
        } else {
            username = user.displayName || user.email;
            bBucks = 0;
            await addDoc(usersRef, { email: user.email, username: username, bBucks: bBucks, donation: donation });
        }

        playerUsername = username;
        document.getElementById("username").innerText = `Logget ind som: ${playerUsername}`;
        logInd.style.display = "none";
        logUd.style.display = "inline-block";
        bBucksLabel.textContent = `B-Bucks: ${bBucks}`;
        // Gem bBucks og donation til brugeren i Firestore users collection
        await saveBBucksForUser(playerUsername, bBucks, donation, unlockedPlanets);
        console.log("✅ Logget ind som:", playerUsername);

    } catch (error) {
        console.error("🚨 Fejl ved login:", error);
    }
}
window.loginWithGoogle = loginWithGoogle;

const newUsernameInput = document.getElementById("newUsername");
const newPasswordInput = document.getElementById("newPassword");
const createAccountBtn = document.getElementById("createAccountBtn");

const loginUsernameInput = document.getElementById("loginUsername");
const loginPasswordInput = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");

// Funktion til simpel hashing (kan udskiftes med bedre løsning)
function simpleHash(str) {
    return str.split("").reduce((hash, char) => {
        return hash + char.charCodeAt(0);
    }, 0);
}

// ✅ Opret ny konto
createAccountBtn.addEventListener("click", async () => {
  await ensureAuth();
  const username = newUsernameInput.value.trim();
  const password = newPasswordInput.value.trim();
  if (!username || !password) { alert("Indtast brugernavn og kodeord"); return; }

  const hashedPassword = simpleHash(password);

  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) { alert("Brugernavnet findes allerede!"); return; }
    await addDoc(usersRef, {
        username: username,
        password: hashedPassword,
        bBucks: 0,
        donation: 0,
        unlockedPlanets: ["jorden"] // Tilføj denne linje
    });

    playerUsername = username;
    document.getElementById("username").innerText = `Logget ind som: ${playerUsername}`;
    bBucks = 0;
    bBucksLabel.textContent = `B-Bucks: ${bBucks}`;
    applyVIPBackground()
    alert("Konto oprettet!");
});

// Ved login med username/password
loginBtn.addEventListener("click", async () => {
  await ensureAuth();
  const username = loginUsernameInput.value.trim();
  const password = loginPasswordInput.value.trim();
  if (!username || !password) { alert("Indtast brugernavn og kodeord"); return; }

  const hashedPassword = simpleHash(password);

  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) { loginMessage.textContent = "Brugernavnet findes ikke!"; return; }

  const userData = querySnapshot.docs[0].data();
  if (userData.password === hashedPassword) {
    loginMessage.textContent = "✅ Login succesfuld!";
    playerUsername = username;
    bBucks = userData.bBucks ?? 0;
    donation = userData.donation ?? 0;
    
    // HENT unlockedPlanets FØRST!
    unlockedPlanets = await loadPlanetsForUser(playerUsername);
    
    bBucksLabel.textContent = `B-Bucks: ${bBucks}`;
    document.getElementById("username").innerText = `Logget ind som: ${playerUsername}`;
    applyVIPBackground();
    
    console.log(`🔄 Indlæst B-Bucks for ${playerUsername}: ${bBucks}`);
    console.log(`🔄 Indlæst donation for ${playerUsername}: ${donation}`);
    console.log(`🔄 Indlæst unlockedPlanets for ${playerUsername}: ${JSON.stringify(unlockedPlanets)}`);
  } else {
    loginMessage.textContent = "❌ Forkert kodeord!";
  }
});


const radioButtons = document.querySelectorAll('input[name="authMode"]');
const registerSection = document.getElementById("registerSection");
const loginSection = document.getElementById("loginSection");

radioButtons.forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.value === "login") {
            loginSection.style.display = "block";
            registerSection.style.display = "none";
        } else {
            loginSection.style.display = "none";
            registerSection.style.display = "block";
        }
    });
});



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

// Funktion til at hente bBucks for en bruger fra users collection
async function loadBBucksForUser(username) {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
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

async function loadDonationForUser(username) {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].data();
            return data.donation ?? 0;
        }
    } catch (error) {
        console.error("🚨 Fejl ved hentning af donation:", error);
    }
    return 0;
}


async function loadPlanetsForUser(username) {
  await ensureAuth();
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const snap = await getDocs(q);
    
    if (snap.empty) {
      console.warn("Ingen user-doc. Returnerer default planets.");
      return ["jorden"];
    }

    const docSnap = snap.docs[0];
    const data = docSnap.data() || {};
    let planets = data.unlockedPlanets;

    // Håndter alle mulige tilfælde af manglende eller ugyldig data
    if (!Array.isArray(planets)) {
      if (typeof planets === "string") {
        // Hvis det er en string, prøv at konvertere til array
        planets = planets.split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
      } else {
        // Hvis det er noget andet, brug default
        planets = ["jorden"];
      }
      
      // Opdater databasen med det korrekte array
      await updateDoc(docSnap.ref, { unlockedPlanets: planets });
    }
    
    // Sikr at "jorden" altid er inkluderet
    if (!planets.includes("jorden")) {
      planets.push("jorden");
      await updateDoc(docSnap.ref, { unlockedPlanets: planets });
    }
    
    console.log(`🔄 Indlæst unlockedPlanets for ${username}: ${JSON.stringify(planets)}`);
    return planets;
    
  } catch (err) {
    console.error("🚨 Fejl ved hentning af unlockedPlanets:", err);
    return ["jorden"];
  }
}



function applyVIPBackground() {
    const gameContainer = document.getElementById("gameContainer");

    if (donation >= 150) {
        gameContainer.style.backgroundImage = "url('assets/Baggrunde/Episk Bjørnedyr.png')";
    }
    else if (donation >= 5) {
        gameContainer.style.backgroundImage = "url('assets/Baggrunde/Bjørnedyr_i_kamp_i_rummet.png')";
    } 
    else {
        //gameContainer.style.backgroundImage = "none"; // Eller en standardbaggrund
        sygdomsLossPreviewLabel.style.color = "black";
        warLossPreviewLabel.style.color = "black";
        return;
    }
    gameContainer.style.height = "100vh";
    gameContainer.style.backgroundSize = "cover";
    gameContainer.style.backgroundPosition = "center";
    gameContainer.style.color =  "white";
    sygdomsLossPreviewLabel.style.color = "white";
    warLossPreviewLabel.style.color = "white";
    celledelingCountdownLabel.style.color = "white";
    console.log("🎉 Du har VIP-baggrund!");
}


// Funktion til at gemme bBucks og donation for en bruger i Firestore users collection
async function saveBBucksForUser(username, bBucks, donation = 0, unlockedPlanets) {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            // Sikrer at unlockedPlanets altid er et array
            const planets = Array.isArray(unlockedPlanets) ? unlockedPlanets : ["jorden"];
            await updateDoc(doc(db, "users", docSnap.id), { 
                bBucks: bBucks, 
                donation: donation, 
                unlockedPlanets: planets 
            });
            console.log(`✅ bBucks og donation gemt for ${username}: ${bBucks}, donation: ${donation}, unlockedPlanets: ${JSON.stringify(planets)}`);
        }
    } catch (error) {
        console.error("🚨 Fejl ved gemning af bBucks/donation:", error);
    }
}


// Event listener for playWithoutLogin-knappen
playWithoutLoginBtn.addEventListener("click", async function () {
    const inputName = usernameInput.value.trim();
    const inputPassword = usernamePasswordInput.value.trim();
    const validationResult = isValidUsername(inputName);
    if (validationResult === true && inputName) {
        playerUsername = inputName;
        document.getElementById("username").innerText = `Spiller: ${playerUsername}`;
        bBucks = await loadBBucksForUser(playerUsername);
        donation = await loadDonationForUser(playerUsername);
        //unlockedPlanets = await loadPlanetsForUser(playerUsername); // <-- load og opdater først!
        applyVIPBackground();
        bBucksLabel.textContent = `B-Bucks: ${bBucks}`;
        console.log(`🔄 Indlæst bBucks for ${playerUsername}: ${bBucks}`);
        //console.log(`🔄 Indlæst 112345678unlockedPlanets for ${playerUsername}: ${JSON.stringify(unlockedPlanets)}`);
    } else {
        alert(validationResult);
    }
});


let collectionName;  
collectionName = "leaderboard";
// Hent og vis leaderboard
async function fetchLeaderboard() {
    try {
        // Vælg metrik baseret på hvilken leaderboard-collection der er aktiv
        const metric = (collectionName && collectionName.includes("infinite")) ? "level" : "count";

        const leaderboardRef = collection(db, collectionName);
        const q = query(leaderboardRef, orderBy(metric, "desc"));
        const querySnapshot = await getDocs(q);
        const leaderboardData = new Map();

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (data.username && data.username.trim() !== "") {
                // Brug dynamisk metrik til at vælge den bedste post per username
                const val = data[metric] ?? 0;
                if (!leaderboardData.has(data.username) || val > (leaderboardData.get(data.username)[metric] ?? 0)) {
                    leaderboardData.set(data.username, data);
                }
            }
        });

        // Konverter Map til en array og sorter efter valgt metrik
        const uniqueLeaderboard = Array.from(leaderboardData.values()).sort((a, b) => (b[metric] ?? 0) - (a[metric] ?? 0));

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
            // Hvis vi er i infinite-leaderboardet vises username + level
            if (collectionName && collectionName.includes("infinite")) {
                contentContainer.innerHTML += `<p>${entry.username}: Level ${entry.level ?? 0}</p>`;
            } else {
                // Standard: username + count (score)
                contentContainer.innerHTML += `<p>${entry.username}: Score ${entry.count ?? 0}</p>`;
            }
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

async function saveLeaderboardData(username, count, level, bBucks, donation, gamemode) {
    const validationResult = isValidUsername(username);
    if (validationResult !== true) {
        console.error("Ugyldigt brugernavn, data bliver ikke gemt:", validationResult);
        return;
    }
    try {
        console.log(`📌 Gemmer leaderboard: username=${username}, count=${count}, level=${level}, gamemode=${gamemode}`);

        const collectionNameLocal =
            gamemode === "venus"
                ? "leaderboard_venus"
                : gamemode === "infinite"
                    ? "leaderboard_infinite"
                    : "leaderboard_jorden";

        const leaderboardRef = collection(db, collectionNameLocal);
        const q = query(leaderboardRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            const data = docSnap.data();

            if (collectionNameLocal === "leaderboard_infinite") {
                // For infinite leaderboards sammenlign og opdater level
                const existingLevel = data.level ?? 0;
                if (existingLevel < level) {
                    await updateDoc(doc(db, collectionNameLocal, docSnap.id), { level: level });
                }
            } else {
                // For normale leaderboards sammenlign og opdater count
                const existingCount = data.count ?? 0;
                if (existingCount < count) {
                    await updateDoc(doc(db, collectionNameLocal, docSnap.id), { count: count });
                }
                // Opdater level hvis højere (valgfrit/ny info)
                const existingLevel = data.level ?? 0;
                if (existingLevel < level) {
                    await updateDoc(doc(db, collectionNameLocal, docSnap.id), { level: level });
                }
            }
        } else {
            // Opret ny entry med både count og level (level bruges af infinite)
            await addDoc(leaderboardRef, { username: username, count: count, level: level, donation: donation, gamemode: gamemode });
        }

        console.log("✅ Leaderboard opdateret!");
        fetchLeaderboard();

        // ✅ Gem bBucks og donation i users-collection
        await saveBBucksForUser(username, bBucks, donation, unlockedPlanets);

    } catch (error) {
        console.error("🚨 Fejl ved gemning af leaderboard:", error);
    }
}





// Sørg for at funktioner er tilgængelige globalt
window.onload = () => {
    fetchLeaderboard();
};

const startBtn = document.getElementById("startGameBtn");
const mainMenu = document.getElementById("mainMenu");
const gameContainer = document.getElementById("gameContainer");
const gamemodeMenu = document.getElementById("gamemodeMenu");
const jordenModeBtn = document.getElementById("jordenModeBtn");
const venusModeBtn = document.getElementById("venusModeBtn");
const infiniteModeBtn = document.getElementById("infiniteModeBtn");

startBtn.addEventListener("click", () => {
    mainMenu.style.display = "none";
    gamemodeMenu.style.display = "block";
    jordenModeBtn.classList.add("unlocked");
    if (unlockedPlanets.includes("venus")) {
        venusModeBtn.textContent = `Venus`;
        venusModeBtn.classList.add("unlocked");
        venusModeBtn.classList.remove("locked");
    } else {
        venusModeBtn.classList.add("locked");
        venusModeBtn.classList.remove("unlocked");
    }
    if (unlockedPlanets.includes("infinite")) {
        infiniteModeBtn.textContent = `Uendelig`;
        infiniteModeBtn.classList.add("unlocked");
        infiniteModeBtn.classList.remove("locked");
    } else {
        infiniteModeBtn.classList.add("locked");
        infiniteModeBtn.classList.remove("unlocked");
    }
});

jordenModeBtn.addEventListener("click", () => {
    gamemodeMenu.style.display = "none";
    gameContainer.style.display = "block";
    collectionName = "leaderboard";
    fetchLeaderboard();
    startGame("jorden");
});

venusModeBtn.addEventListener("click", async () => {
    // Hent den seneste version af unlockedPlanets fra databasen
    const currentPlanets = await loadPlanetsForUser(playerUsername);
    
    if (bBucks >= venusCost && !currentPlanets.includes("venus")) {
        bBucks -= venusCost;
        currentPlanets.push("venus");
        unlockedPlanets = currentPlanets; // Opdater den globale variabel
        
        bBucksLabel.textContent = `B-Bucks: ${bBucks}`;
        await saveBBucksForUser(playerUsername, bBucks, donation, unlockedPlanets);
        
        gamemodeMenu.style.display = "none";
        gameContainer.style.display = "block";
        collectionName = "leaderboard_venus";
        fetchLeaderboard();
        startGame("venus");
    } else if (currentPlanets.includes("venus")) {
        gamemodeMenu.style.display = "none";
        gameContainer.style.display = "block";
        collectionName = "leaderboard_venus";
        fetchLeaderboard();
        startGame("venus");
    } 
});


venusModeBtn.addEventListener("mouseover", (event) => {
    tooltip.style.display = "block";
    tooltip.style.left = `${event.target.getBoundingClientRect().left}px`;
    tooltip.style.top = `${event.target.getBoundingClientRect().top - tooltip.offsetHeight - 10}px`;

    if (event.target === venusModeBtn && !unlockedPlanets.includes("venus")) {
        tooltip.textContent = `Venus: Lås op for ${venusCost} B-Bucks.`;
    }
    else {
        tooltip.style.display = "none";
    }
});

venusModeBtn.addEventListener("mouseout", () => {
    tooltip.style.display = "none";
});

infiniteModeBtn.addEventListener("click", async () => {
    // Hent den seneste version af unlockedPlanets fra databasen
    const currentPlanets = await loadPlanetsForUser(playerUsername);
    
    if (bBucks >= infiniteCost && !currentPlanets.includes("infinite")) {
        bBucks -= infiniteCost;
        currentPlanets.push("infinite");
        unlockedPlanets = currentPlanets; // Opdater den globale variabel
        
        bBucksLabel.textContent = `B-Bucks: ${bBucks}`;
        await saveBBucksForUser(playerUsername, bBucks, donation, unlockedPlanets);
        
        gamemodeMenu.style.display = "none";
        gameContainer.style.display = "block";
        collectionName = "leaderboard_infinite";
        fetchLeaderboard();
        startGame("infinite");
    } else if (currentPlanets.includes("infinite")) {
        gamemodeMenu.style.display = "none";
        gameContainer.style.display = "block";
        collectionName = "leaderboard_infinite";
        fetchLeaderboard();
        startGame("infinite");
    } 
});

infiniteModeBtn.addEventListener("mouseover", (event) => {
    tooltip.style.display = "block";
    tooltip.style.left = `${event.target.getBoundingClientRect().left}px`;
    tooltip.style.top = `${event.target.getBoundingClientRect().top - tooltip.offsetHeight - 10}px`;

    if (event.target === infiniteModeBtn && !unlockedPlanets.includes("infinite")) {
        tooltip.textContent = `Uendelig: Lås op for ${infiniteCost} B-Bucks.`;
    }
    else {
        tooltip.style.display = "none";
    }
});

infiniteModeBtn.addEventListener("mouseout", () => {
    tooltip.style.display = "none";
});
