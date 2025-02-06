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
let level = 0; // Start-level
let baseWarLoss = 100;
let nextCatastrophe = "Krig"; // Starter med krig
let baseSygdomsLoss = 0.5;
let start = false
// Upgrades

const tooltip = document.getElementById("tooltip");

let celledelingActive = false;
let celledelingActive2 = false;
let celledelingActive3 = false;
let celledelingCost = 100;
let celledelingCost2 = 200;
let celledelingCost3 = 400;

let skjoldActive = false;
let skjoldActive2 = false;
let skjoldActive3 = false;
let skjoldCost = 100;
let skjoldCost2 = 200;
let skjoldCost3 = 400;

let medicinActive1 = false;
let medicinActive2 = false;
let medicinActive3 = false;
let medicinCost1 = 100;
let medicinCost2 = 200;
let medicinCost3 = 400;

let katastrofeCost = 200;
let katastrofeCost2 = 300;
let katastrofeCost3 = 400; // Pris for opgraderingen
let katastrofeDelay = 0; // Forsinkelse af katastrofer
let katastrofeUpActive = false; // Status for opgraderingen
let katastrofeUpActive2 = false;
let katastrofeUpActive3 = false;



// Helper function to format numbers with a dot every three zeros
function formatNumber(number) {
    return number.toLocaleString('da-DK');
}

function updateUI() {
    if (!start){
        formeringUp.classList.add("purchased");
        return
    }
    else {
        formeringUp.classList.remove("purchased");
    }
    talLabel.textContent = `${formatNumber(count)}`;
    increasePerSecLabel.textContent = `${formatNumber(countPerSec)} bjørnedyr per sekund`;
    levelLabel.textContent = `Level: ${level}`;
    formeringUp.textContent = `Formering (${formatNumber(formeringCost)})`;
    celledelingUp.textContent = `Celledeling 1 (${formatNumber(celledelingCost)})`;
    celledelingUp2.textContent = `Celledeling 2 (${formatNumber(celledelingCost2)})`
    celledelingUp3.textContent = `Celledeling 3 (${formatNumber(celledelingCost3)})`
    skjoldUp.textContent = `Skjold 1 (${formatNumber(skjoldCost)})`;
    skjoldUp2.textContent = `Skjold 2 (${formatNumber(skjoldCost2)})`;
    skjoldUp3.textContent = `Skjold 3 (${formatNumber(skjoldCost3)})`;
    medicinUp1.textContent = `Medicin 1 (${formatNumber(medicinCost1)})`;
    medicinUp2.textContent = `Medicin 2 (${formatNumber(medicinCost2)})`;
    medicinUp3.textContent = `Medicin 3 (${formatNumber(medicinCost3)})`;
    katastrofeUp.textContent = `Forsinkelse 1 (${formatNumber(katastrofeCost)})`;
    katastrofeUp2.textContent = `Forsinkelse 2 (${formatNumber(katastrofeCost2)})`;
    katastrofeUp3.textContent = `Forsinkelse 3 (${formatNumber(katastrofeCost3)})`;
    let adjustedWarLoss = baseWarLoss; // Brug kun baseWarLoss
    if (skjoldActive) {
        if (skjoldActive2){
            if (skjoldActive3){
                adjustedWarLoss -= 800; // Reducer tabene, hvis skjold er aktivt
            }
            else{
                adjustedWarLoss -= 250;
            }
        }
        else{
            adjustedWarLoss -= 80;
        }
        if(adjustedWarLoss < 0){
            adjustedWarLoss = 0
        }
    }
    warLossPreviewLabel.textContent = `Tab ved næste krig: ${formatNumber(adjustedWarLoss)}`;

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
sygdomsLossPreviewLabel.textContent = `Tab ved næste Sygdom: ${formatNumber(adjustedSygdomsLoss * 100)}%`;


    // Celledeling-status
    if (celledelingActive) {
        celledelingUp.classList.remove("can-buy");
        celledelingUp.classList.add("purchased");
        celledelingUp.textContent = `Celledeling 1`;
        celledelingCountdownLabel.textContent = `Tid til Celledeling: ${celledelingCountdown} sekunder`;
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
        celledelingCountdownLabel.textContent = `Tid til Celledeling 2: ${celledelingCountdown} sekunder`;
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
        celledelingCountdownLabel.textContent = `Tid til Celledeling 3: ${celledelingCountdown} sekunder`;
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

// Celledeling-knap
celledelingUp.onclick = function () {
    if (!start){
        return
    }
    
    if (count >= celledelingCost && !celledelingActive) {
        celledelingActive = true;
        count -= celledelingCost;
        celledelingCountdownLabel.style.display = "inline-block";
        let newCelledelingCountdown = celledelingCountdown;
        updateUI();

        setInterval(() => {
            if (celledelingActive && !celledelingActive2 && !gameOver) {
                if (newCelledelingCountdown > 1) {
                    newCelledelingCountdown--;
                } else {
                    const bonus = Math.floor(count * 0.1); // 10% af bjørnedyr
                    count += bonus;

                    bonusLabel.textContent = `+${formatNumber(bonus)}`;
                    bonusLabel.style.opacity = 1;

                    setTimeout(() => {
                        bonusLabel.style.opacity = 0;
                    }, 1000);

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
        celledelingActive2 = true;
        count -= celledelingCost2;
        updateUI();

        setInterval(() => {
            if (celledelingActive2 && !celledelingActive3 && !gameOver) {
                if (celledelingCountdown > 1) {
                    celledelingCountdown--;
                } else {
                    const bonus = Math.floor(count * 0.2); // 10% af bjørnedyr
                    count += bonus;

                    bonusLabel.textContent = `+${formatNumber(bonus)}`;
                    bonusLabel.style.opacity = 1;

                    setTimeout(() => {
                        bonusLabel.style.opacity = 0;
                    }, 1000);

                    celledelingCountdown = 10;
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
        celledelingActive3 = true;
        count -= celledelingCost3;
        updateUI();

        setInterval(() => {
            if (celledelingActive3 && !gameOver) {
                if (celledelingCountdown > 1) {
                    celledelingCountdown--;
                } else {
                    const bonus = Math.floor(count * 0.4); // 10% af bjørnedyr
                    count += bonus;

                    bonusLabel.textContent = `+${formatNumber(bonus)}`;
                    bonusLabel.style.opacity = 1;

                    setTimeout(() => {
                        bonusLabel.style.opacity = 0;
                    }, 1000);

                    celledelingCountdown = 10;
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
        count -= katastrofeCost;
        katastrofeUpActive = true;
        katastrofeDelay = 10; // Forsink katastrofer med 10 sekunder
        countdown += katastrofeDelay;
        updateUI();
    }
};

katastrofeUp2.onclick = function () {
    if (!start){
        return
    }
    if (count >= katastrofeCost2 && katastrofeUpActive && !katastrofeUpActive2) {
        count -= katastrofeCost2;
        katastrofeUpActive2 = true;
        katastrofeDelay = 15; // Forsink katastrofer med 15 sekunder
        countdown += katastrofeDelay;
        updateUI();
    }
};

katastrofeUp3.onclick = function () {
    if (!start){
        return
    }
    if (count >= katastrofeCost3 && katastrofeUpActive2 && !katastrofeUpActive3) {
        count -= katastrofeCost3;
        katastrofeUpActive3 = true;
        katastrofeDelay = 20; // Forsink katastrofer med 20 sekunder
        countdown += katastrofeDelay;
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
            tooltip.textContent = `Celledeling: Giver 10% af dine bjørnedyr hvert ${formatNumber(celledelingCountdown)}. sekund. Koster ${formatNumber(celledelingCost)} bjørnedyr.`;
        } else if (event.target === celledelingUp2) {
            tooltip.textContent = `Celledeling 2: Giver 20% af dine bjørnedyr hvert ${formatNumber(celledelingCountdown)}. sekund. Koster ${formatNumber(celledelingCost2)} bjørnedyr.`;
        } else if (event.target === celledelingUp3) {
            tooltip.textContent = `Celledeling 3: Giver 30% af dine bjørnedyr hvert ${formatNumber(celledelingCountdown)}. sekund. Koster ${formatNumber(celledelingCost3)} bjørnedyr.`;
        }
        else if (event.target === skjoldUp) {
            tooltip.textContent = `Skjold: Reducerer krigstab med 80. Koster ${formatNumber(skjoldCost)} bjørnedyr.`;
        } else if (event.target === skjoldUp2) {
            tooltip.textContent = `Skjold 2: Reducerer krigstab med 250. Koster ${formatNumber(skjoldCost2)} bjørnedyr.`;
        } else if (event.target === skjoldUp3) {
            tooltip.textContent = `Skjold 3: Reducerer krigstab med 800. Koster ${formatNumber(skjoldCost3)} bjørnedyr.`;
        }
        else if (event.target === medicinUp1) {
            tooltip.textContent = `Medicin: Reducerer sygdom til 30%. Koster ${formatNumber(medicinCost1)} bjørnedyr.`;
        } else if (event.target === medicinUp2) {
            tooltip.textContent = `Medicin 2: Reducerer sygdom til 10%. Koster ${formatNumber(medicinCost2)} bjørnedyr.`;
        } else if (event.target === medicinUp3) {
            tooltip.textContent = `Medicin 3: Reducerer sygdom til 0%. Koster ${formatNumber(medicinCost3)} bjørnedyr.`;
        }
        else if (event.target === katastrofeUp) {
            tooltip.textContent = `Forsinkelse: Forsink katastrofer med 10 sekunder. Koster ${formatNumber(katastrofeCost)} bjørnedyr.`;
        } else if (event.target === katastrofeUp2) {
            tooltip.textContent = `Forsinkelse 2: Forsink katastrofer med 15 sekunder. Koster ${formatNumber(katastrofeCost2)} bjørnedyr.`;
        } else if (event.target === katastrofeUp3) {
            tooltip.textContent = `Forsinkelse 3: Forsink katastrofer med 20 sekunder. Koster ${formatNumber(katastrofeCost3)} bjørnedyr.`;
        }
        else if (event.target === formeringUp) {
            tooltip.textContent = `Formering: Bjørnedyr per sekund +1. Koster ${formatNumber(formeringCost)} bjørnedyr.`;
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
        return
    }
    if (count >= formeringCost) {
        count -= formeringCost;
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
                    warLoss -= 800; // Reducer tabene, hvis skjold er aktivt
                }
                else{
                    warLoss -= 250;
                }
            }
            else{
                warLoss -= 80;
            }
        }
        if (warLoss < 0){
            warLoss = 0;
        }
        count -= warLoss;
        katastrofeLabel.textContent = `Krig: Du har mistet ${formatNumber(warLoss)} bjørnedyr.`;

        baseWarLoss *= 2; // Fordobl kun efter en krig
    } else if (nextCatastrophe === "Sygdom") {
        let sygdomsLoss = baseSygdomsLoss;
        if (medicinActive1) {
            if (medicinActive2) {
                if (medicinActive3) {
                    sygdomsLoss = 0
                }
                else {
                    sygdomsLoss = 0.15;
                    count = Math.floor(count * sygdomsLoss);
                }
            }
            else {
                sygdomsLoss = 0.3;
                count = Math.floor(count * sygdomsLoss);
            }
        }
        else {
            count = Math.floor(count * sygdomsLoss); // Sygdom: Tab 50 %
        }
        
        
        katastrofeLabel.textContent = `Sygdom: Du har mistet ${formatNumber(sygdomsLoss*100)}% bjørnedyr.`;
    }

    level++; // Øg level efter hver katastrofe
    updateUI();

    katastrofeLabel.style.display = "block";
    setTimeout(() => {
        katastrofeLabel.style.display = "none";
    }, 10000);
    nextCatastrophe = nextCatastrophe === "Krig" ? "Sygdom" : "Krig";
    checkGameOver();
    countdown = 20 + katastrofeDelay; // Tilføj forsinkelse
}

// Katastrofe-nedtælling med forsinkelse
const gameTimer = setInterval(function () {
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
        clearInterval(gameTimer);
        saveLeaderboardData(playerUsername, level);
    }
}




















// Firebase-konfiguration og initialisering
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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

        playerUsername = user.displayName;
        document.getElementById("username").innerText = `Logget ind som: ${playerUsername}`;

        startGame(); // Start spillet efter login
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
const bannedWords = ["ligma", "balls", "deez", "nuts", "admin", "grim", "ugly"];

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
async function fetchLeaderboard() {
    try {
        const leaderboardRef = collection(db, "leaderboard");
        const q = query(leaderboardRef, orderBy("level", "desc"));
        const querySnapshot = await getDocs(q);
        const leaderboardData = {};

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.username && data.username.trim() !== "") {
                // Kun tilføj hvis brugeren ikke findes, eller hvis dette level er højere
                if (!leaderboardData[data.username] || data.level > leaderboardData[data.username].level) {
                    leaderboardData[data.username] = data;
                }
            }
        });

        // Konverter objektet til en liste og sorter det i faldende rækkefølge baseret på level
        const uniqueLeaderboard = Object.values(leaderboardData).sort((a, b) => b.level - a.level);

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
async function saveLeaderboardData(username, level) {
    const validationResult = isValidUsername(username);
    if (validationResult !== true) {
        console.error("Ugyldigt brugernavn, data bliver ikke gemt:", validationResult);
        return;
    }
    try {
        await addDoc(collection(db, "leaderboard"), {
            username: username,
            level: level
        });
        console.log("✅ Data gemt på leaderboard:", username, level);
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

