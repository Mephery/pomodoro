// ==============================
// LE GRAND CASTING DE MON DOM 
// ==============================
const affichageTemps = document.getElementById('sablier-infernal');
const affichageMode = document.getElementById('oracle-du-destin');
const btnAction = document.getElementById('btn-action');
const btnReset = document.getElementById('btn-amnesie-totale');
const texteSessions = document.getElementById('texte-sessions');
const conteneurOs = document.getElementById('conteneur-os');
const cercleRemplissage = document.querySelector('.cercle-remplissage');
const boitePivot = document.getElementById('boite-pivot-animal');
const inputTravail = document.getElementById('input-travail');
const inputPause = document.getElementById('input-pause');

// Le doux son de la victoire !
const sonNotif = new Audio('./sounds/notif.mp3');

// Mon mode Valérie Damidot pour changer les fonds, parce qu'on aime quand c'est joli <3
const selectFond = document.getElementById('select-fond');

selectFond.addEventListener('change', function(event) {
    const choix = event.target.value;
    
    if (choix === 'nuit') {
        document.body.style.backgroundImage = "url('./images/fond1.jpg')"; 
    } else if (choix === 'jour') {
        document.body.style.backgroundImage = "url('./images/fond2.jpg')";
    } else if (choix === 'crépuscule') {
        document.body.style.backgroundImage = "url('./images/fond3.jpg')";
    }
});

// ==================
// L'ÉTAT GLOBAL 
// ==================

let dureeTravail = 25;
let dureePause = 5;
let modeActuel = "Travail";
let timerSillonne;
let estEnMarche = false;
let nombreDeSessions = 0;

let minutes = dureeTravail;
let secondes = 0;

// ===============================
// LE MOTEUR DU CHRONOMÈTRE 
// ===============================

// Met à jour l'UI textuelle et déclenche le rendu visuel
function mettreAJourAffichage() {
    const minAffichees = minutes < 10 ? '0' + minutes : minutes;
    const secAffichees = secondes < 10 ? '0' + secondes : secondes;

    affichageTemps.textContent = `${minAffichees}:${secAffichees}`;
    affichageMode.textContent = modeActuel;

    mettreAJourProgression();
}

// Initialisation au premier chargement de la page
mettreAJourAffichage();

// Le cœur du réacteur, appelé chaque seconde par le setInterval
function faireTicTac() {
    if (secondes === 0) {
        if (minutes === 0) {
            basculerDeMode();
            return; 
        }
        
        minutes--;
        secondes = 59;
        
    } else {
        secondes--;
    }

    mettreAJourAffichage();
}

// ==========================
// LES BOUTONS D'ACTION 
// ==========================

// J'ai choisi le même bouton pour start et pause, comme sur la vidéo qui était sur discord en exemple
btnAction.addEventListener('click', function() {
    if (!estEnMarche) {
        estEnMarche = true;
        timerSillonne = setInterval(faireTicTac, 1000);
        affichageTemps.classList.add('en-pulsation');
        
        btnAction.textContent = "Pause"; 
        
        // J'ai essayé de mettre une notif mais ça ne marche pas encore, je ne sais pas encore pourquoi
        if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
            Notification.requestPermission();
        }
    } else {
        estEnMarche = false;
        clearInterval(timerSillonne);
        affichageTemps.classList.remove('en-pulsation');

        btnAction.textContent = "Start"; 
    }
});

btnReset.addEventListener('click', function() {
    estEnMarche = false;
    clearInterval(timerSillonne);

    document.body.classList.remove('mode-pause');
    affichageTemps.classList.remove('en-pulsation');
    btnAction.textContent = "Start";
    
    if (modeActuel === "Travail") {
        minutes = dureeTravail;
    } else {
        minutes = dureePause;
    }
    secondes = 0;
    
    mettreAJourAffichage();
});

// =====================================
// LOGIQUE MÉTIER & ANIMATIONS
// =====================================

// Génère visuellement le butin de ma douce Perli selon le nombre de sessions
function mettreAJourOs() {
    conteneurOs.innerHTML = '';
    for (let i = 0; i < nombreDeSessions; i++) {
        const nouvelOs = document.createElement('img');
        nouvelOs.src = './images/os.png';
        nouvelOs.alt = 'Biscuit os';
        nouvelOs.classList.add('os-recompense');
        conteneurOs.appendChild(nouvelOs);
    }
}

// Gère la transition entre les cycles et balance les alertes
function basculerDeMode() {
    affichageTemps.classList.remove('en-pulsation');
    sonNotif.play();

    if ("Notification" in window && Notification.permission === "granted") {
        const titreNotif = modeActuel === "Travail" ? "C'est l'heure de la pause !" : "Au charbon !";
        const texteNotif = modeActuel === "Travail" ? "Bien joué, voici un os 🦴" : "La récréation est terminée.";

        new Notification(titreNotif, {
            body: texteNotif,
            icon: "./images/husky.png"
        });
    }

    document.body.classList.toggle('mode-pause');

    // On recharge le barillet avec les bonnes munitions selon le mode
    if (modeActuel === "Travail") {
        modeActuel = "Pause";
        minutes = dureePause; 
        nombreDeSessions++;
        texteSessions.textContent = `${nombreDeSessions} session(s)`;
        mettreAJourOs();
    } else {
        modeActuel = "Travail";
        minutes = dureeTravail;
    }
    
    secondes = 0;
    mettreAJourAffichage();
}

// Calcule la géométrie du SVG et anime le chemin de Perle
function mettreAJourProgression() {
    const tempsTotal = modeActuel === "Travail" ? dureeTravail * 60 : dureePause * 60; 
    const tempsRestant = minutes * 60 + secondes;
    const pourcentageEcoule = 1 - (tempsRestant / tempsTotal);

    const degres = pourcentageEcoule * 360;
    boitePivot.style.transform = `rotate(${degres}deg)`;

    const offset = pourcentageEcoule * 785;
    cercleRemplissage.style.strokeDashoffset = -offset;
}

inputTravail.addEventListener('input', function() {
    dureeTravail = parseInt(inputTravail.value) || 25; 
    
    if (!estEnMarche && modeActuel === "Travail") {
        minutes = dureeTravail;
        secondes = 0;
        mettreAJourAffichage();
    }
});

inputPause.addEventListener('input', function() {
    dureePause = parseInt(inputPause.value) || 5;

    if (!estEnMarche && modeActuel === "Pause") {
        minutes = dureePause;
        secondes = 0;
        mettreAJourAffichage();
    }
});