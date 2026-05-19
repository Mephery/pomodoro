# Pomodoro Timer - Édition Pixel Husky 🐕

## Description
Cette application est un chronomètre Pomodoro interactif conçu pour optimiser les sessions de travail et de révision grâce à la technique de gestion du temps du même nom. Elle propose une interface immersive en "Glassmorphism" et Pixel Art, où un husky accompagne visuellement la progression de l'utilisateur, en hommage à Perli, mon chien. L'enchaînement automatisé des cycles de concentration et de pause permet de rester focalisé sur ses tâches de développement ou d'apprentissage sans interruption.

## Instructions de lancement
1. Clonez ce dépôt sur votre machine locale : 
   `git clone https://github.com/Mephery/pomodoro.git`
2. Ouvrez le dossier du projet dans votre éditeur de code favori (ex: VS Code).
3. **Important :** Pour profiter pleinement de toutes les fonctionnalités (notamment l'API des notifications système du navigateur), il est nécessaire de lancer le fichier `index.html` via un serveur local. Sur VS Code, vous pouvez utiliser l'extension **Live Server** (clic droit sur `index.html` > *Open with Live Server*).

## Fonctionnalités implémentées

### Fonctionnalités de base (Obligatoires)
* Chronomètre précis avec des cycles par défaut de 25 minutes (Travail) et 5 minutes (Pause).
* Affichage dynamique du temps restant au format `MM:SS`.
* Bouton central hybride "Start/Pause" pour contrôler l'écoulement du temps.
* Bouton "Reset" pour réinitialiser le cycle en cours à sa valeur initiale.
* Bascule 100 % automatique entre les modes de travail et de pause une fois le temps écoulé.

### Fonctionnalités avancées (Bonus)
* **Alerte Sonore :** Un effet sonore distinctif retentit à chaque fin de cycle pour avertir l'utilisateur.
* **Configuration du temps :** Des champs de saisie numériques permettent à l'utilisateur de personnaliser la durée exacte de ses sessions de travail et de pause.
* **Compteur de sessions visuel :** Suivi dynamique de la progression avec distribution d'une récompense visuelle (un os en pixel art) pour chaque cycle de travail complété.
* **Personnalisation UI/UX :** * Menu déroulant permettant de modifier le décor d'arrière-plan à la volée.
    * Animation SVG mathématique fluide pour la barre de progression circulaire.
    * Thème visuel adaptatif selon l'état du chronomètre (+pulsation lors de l'écoulement du temps).