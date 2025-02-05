// Labels
const talLabel = document.getElementById("talLabel");
const bonusLabel = document.getElementById("bonusLabel"); // Ny label til bonus
const increasePerSecLabel = document.getElementById("increasePerSecLabel");
const countdownLabel = document.getElementById("countdownLabel");
const gameOverLabel = document.getElementById("gameOverLabel");
const katastrofeLabel = document.getElementById("katastrofeLabel");
const celledelingCountdownLabel = document.getElementById("celledelingCountdownLabel");
const levelLabel = document.getElementById("levelLabel");
const katastrofeTypeLabel = document.getElementById("katastrofeTypeLabel");
const warLossPreviewLabel = document.getElementById("warLossPreviewLabel");


// Upgrade buttons
const celledelingUp = document.getElementById("celledelingUp");
const celledelingUp2 = document.getElementById("celledelingUp2");
const celledelingUp3 = document.getElementById("celledelingUp3");
const skjoldUp = document.getElementById("skjoldUp");
const skjoldUp2 = document.getElementById("skjoldUp2");
const skjoldUp3 = document.getElementById("skjoldUp3");
const katastrofeUp = document.getElementById("katastrofeUp");
const katastrofeUp2 = document.getElementById("katastrofeUp2");
const katastrofeUp3 = document.getElementById("katastrofeUp3");
const formeringUp = document.getElementById("formeringUp");

// Variables
let count = 400;
//let increase = 1;
//let increaseCost = 50;
//let plusIncrease = 1;
let countPerSec = 2;
let formeringCost = 75;
let plusIncreasePerSec = 1;

let countdown = 20; // Tid i sekunder
let gameOver = false;
let celledelingCountdown = 10; // Tid til celledeling-bonus
let level = 0; // Start-level
let baseWarLoss = 100;
let nextCatastrophe = "Krig"; // Starter med krig
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

let katastrofeCost = 200;
let katastrofeCost2 = 400;
let katastrofeCost3 = 800; // Pris for opgraderingen
let katastrofeDelay = 0; // Forsinkelse af katastrofer
let katastrofeUpActive = false; // Status for opgraderingen
let katastrofeUpActive2 = false;
let katastrofeUpActive3 = false;



// Helper function to format numbers with a dot every three zeros
function formatNumber(number) {
    return number.toLocaleString('da-DK');
}

function updateUI() {
    talLabel.textContent = `${formatNumber(count)}`;
    increasePerSecLabel.textContent = `${formatNumber(countPerSec)} bjørnedyr per sekund`;
    levelLabel.textContent = `Level: ${level}`;
    celledelingUp.textContent = `Celledeling 1 (${formatNumber(celledelingCost)})`;
    celledelingUp2.textContent = `Celledeling 2 (${formatNumber(celledelingCost2)})`
    celledelingUp3.textContent = `Celledeling 3 (${formatNumber(celledelingCost3)})`
    skjoldUp.textContent = `Skjold 1 (${formatNumber(skjoldCost)})`;
    skjoldUp2.textContent = `Skjold 2 (${formatNumber(skjoldCost2)})`;
    skjoldUp3.textContent = `Skjold 3 (${formatNumber(skjoldCost3)})`;
    katastrofeUp.textContent = `Forsinkelse 1 (${formatNumber(katastrofeCost)})`;
    katastrofeUp2.textContent = `Forsinkelse 2 (${formatNumber(katastrofeCost2)})`;
    katastrofeUp3.textContent = `Forsinkelse 3 (${formatNumber(katastrofeCost3)})`;
    warLossPreviewLabel.textContent = `Tab ved næste krig: ${formatNumber(baseWarLoss)}`;
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
    if (count >= celledelingCost && !celledelingActive) {
        celledelingActive = true;
        count -= celledelingCost;
        celledelingCountdownLabel.style.display = "inline-block";
        updateUI();

        setInterval(() => {
            if (celledelingActive && !celledelingActive2 && !gameOver) {
                if (celledelingCountdown > 1) {
                    celledelingCountdown--;
                } else {
                    const bonus = Math.floor(count * 0.1); // 10% af bjørnedyr
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

celledelingUp2.onclick = function () {
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
    if (count >= skjoldCost && !skjoldActive) {
        skjoldActive = true;
        count -= skjoldCost;
        updateUI();
    }
};

skjoldUp2.onclick = function () {
    if (count >= skjoldCost2 && skjoldActive && !skjoldActive2) {
        skjoldActive2 = true;
        count -= skjoldCost2;
        updateUI();
    }
};

skjoldUp3.onclick = function () {
    if (count >= skjoldCost3 && skjoldActive2 && !skjoldActive3) {
        skjoldActive3 = true;
        count -= skjoldCost3;
        updateUI();
    }
};

// Opgraderingsknap til katastrofe-forsinkelse
katastrofeUp.onclick = function () {
    if (count >= katastrofeCost && !katastrofeUpActive) {
        count -= katastrofeCost;
        katastrofeUpActive = true;
        katastrofeDelay = 10; // Forsink katastrofer med 10 sekunder
        countdown += katastrofeDelay;
        updateUI();
    }
};

katastrofeUp2.onclick = function () {
    if (count >= katastrofeCost2 && katastrofeUpActive && !katastrofeUpActive2) {
        count -= katastrofeCost2;
        katastrofeUpActive2 = true;
        katastrofeDelay = 15; // Forsink katastrofer med 15 sekunder
        countdown += katastrofeDelay;
        updateUI();
    }
};

katastrofeUp3.onclick = function () {
    if (count >= katastrofeCost3 && katastrofeUpActive2 && !katastrofeUpActive3) {
        count -= katastrofeCost3;
        katastrofeUpActive3 = true;
        katastrofeDelay = 20; // Forsink katastrofer med 20 sekunder
        countdown += katastrofeDelay;
        updateUI();
    }
};

// Tooltip-håndtering
[formeringUp, celledelingUp, celledelingUp2, celledelingUp3, skjoldUp, skjoldUp2, skjoldUp3, katastrofeUp, katastrofeUp2, katastrofeUp3].forEach(button => {
    button.addEventListener("mouseover", (event) => {
        tooltip.style.display = "block";
        tooltip.style.left = `${event.target.getBoundingClientRect().left}px`;
        tooltip.style.top = `${event.target.getBoundingClientRect().top - tooltip.offsetHeight - 10}px`;

        if (event.target === celledelingUp) {
            tooltip.textContent = "Celledeling: Giver 10% af dine bjørnedyr hvert 10. sekund. Koster 100 bjørnedyr.";
        } else if (event.target === celledelingUp2) {
            tooltip.textContent = "Celledeling 2: Giver 20% af dine bjørnedyr hvert 10. sekund. Koster 200 bjørnedyr.";
        } else if (event.target === celledelingUp3) {
            tooltip.textContent = "Celledeling 3: Giver 30% af dine bjørnedyr hvert 10. sekund. Koster 400 bjørnedyr.";
        }
        else if (event.target === skjoldUp) {
            tooltip.textContent = "Skjold: Reducerer krigstab med 80. Koster 100 bjørnedyr.";
        } else if (event.target === skjoldUp2) {
            tooltip.textContent = "Skjold 2: Reducerer krigstab med 250. Koster 200 bjørnedyr.";
        } else if (event.target === skjoldUp3) {
            tooltip.textContent = "Skjold 3: Reducerer krigstab med 800. Koster 400 bjørnedyr.";
        }
        else if (event.target === katastrofeUp) {
            tooltip.textContent = "Forsinkelse: Forsink katastrofer med 10 sekunder. Koster 200 bjørnedyr.";
        } else if (event.target === katastrofeUp2) {
            tooltip.textContent = "Forsinkelse 2: Forsink katastrofer med 15 sekunder. Koster 400 bjørnedyr.";
        } else if (event.target === katastrofeUp3) {
            tooltip.textContent = "Forsinkelse 3: Forsink katastrofer med 20 sekunder. Koster 800 bjørnedyr.";
        }
        else if (event.target === formeringUp) {
            tooltip.textContent = "Formering: Bjørnedyr per sekund +1. Koster 75 bjørnedyr.";
        }
    });

    button.addEventListener("mouseout", () => {
        tooltip.style.display = "none";
    });
});


// Buy more points per second
formeringUp.onclick = function () {
    if (count >= formeringCost) {
        count -= formeringCost;
        countPerSec += plusIncreasePerSec;
        updateUI();
    }
};

// Auto-increment points per second
setInterval(function () {
    if (!gameOver) {
        count += countPerSec;
        updateUI();
    }
}, 1000);


function handlePointLoss() {
    if (gameOver) return;

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
        count = Math.floor(count * 0.5); // Sygdom: Tab 30 %
        katastrofeLabel.textContent = "Sygdom: Du har mistet 50% af dine bjørnedyr.";
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

let playerUsername = "";
let playerLevel = 1; // Starter med level 1 som default

// Lyt efter login-status (efter auth er initialiseret!)
auth.onAuthStateChanged(async (user) => {
    if (user) {
        console.log("✅ Bruger logget ind:", user.displayName);
        document.getElementById("username").innerText = `Logget ind som: ${user.displayName}`;
        logInd.style.display = "none";
        logUd.style.display = "inline-block";

        playerUsername = user.displayName;

        // Gem data igen ved genindlæsning
        await saveLeaderboardData(playerUsername, playerLevel);
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

        // Gem data ved login
        await saveLeaderboardData(playerUsername, playerLevel);

        startGame(); // Start spillet efter login
    } catch (error) {
        console.error("🚨 Fejl ved login:", error);
    }
}

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

// Hent og vis leaderboard
async function fetchLeaderboard() {
    try {
        const leaderboardRef = collection(db, "leaderboard");
        const q = query(leaderboardRef, orderBy("level", "desc", "username", "asc"));
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

        displayLeaderboard(uniqueLeaderboard);
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
        console.log("❌ Du skal være logget ind for at spille!");
        return;
    }
    console.log(`Spillet starter for ${playerUsername}`);
}

// Sørg for at funktioner er tilgængelige globalt
window.onload = () => {
    fetchLeaderboard();
};
window.loginWithGoogle = loginWithGoogle;
window.logout = logout;
