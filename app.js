const calculLeft = new Array(16).fill(false);
const calculRight = new Array(16).fill(false);
const calculUp = new Array(16).fill(false);
const calculDown = new Array(16).fill(false);
var score = document.querySelector("#score");
var meilleurScore = document.querySelector("#meilleurScore");
var tableauComparateur = [];
var partieFinie = false;

const afficheEcran = (jeu) => {
  for (let i = 0; i < 16; i++) {
    if (jeu[i] == 0) {
      document.querySelector("#cell" + (i + 1)).textContent = null;
      document.getElementById("cell" + (i + 1)).style.backgroundColor =
        "#d0c5ba";
    } else {
      document.querySelector("#cell" + (i + 1)).textContent = jeu[i];
      if (jeu[i] == 2) {
        document.getElementById("cell" + (i + 1)).style.backgroundColor =
          "#eee4da";
        document.getElementById("cell" + (i + 1)).style.color = "#776e65";
      } else if (jeu[i] == 4) {
        document.getElementById("cell" + (i + 1)).style.backgroundColor =
          "#ede0c8";
        document.getElementById("cell" + (i + 1)).style.color = "#776e65";
      } else if (jeu[i] == 8) {
        document.getElementById("cell" + (i + 1)).style.backgroundColor =
          "#f2b179";
        document.getElementById("cell" + (i + 1)).style.color = "#f9f6f2";
      } else if (jeu[i] == 16) {
        document.getElementById("cell" + (i + 1)).style.backgroundColor =
          "#f59563";
        document.getElementById("cell" + (i + 1)).style.color = "#f9f6f2";
      } else if (jeu[i] == 32) {
        document.getElementById("cell" + (i + 1)).style.backgroundColor =
          "#f67c5f";
        document.getElementById("cell" + (i + 1)).style.color = "#f9f6f2";
      } else if (jeu[i] == 64) {
        document.getElementById("cell" + (i + 1)).style.backgroundColor =
          "#f65e3b";
        document.getElementById("cell" + (i + 1)).style.color = "#f9f6f2";
      } else if (jeu[i] == 128) {
        document.getElementById("cell" + (i + 1)).style.backgroundColor =
          "#edcf72";
        document.getElementById("cell" + (i + 1)).style.color = "#f9f6f2";
      } else if (jeu[i] == 256) {
        document.getElementById("cell" + (i + 1)).style.backgroundColor =
          "#edcc61";
        document.getElementById("cell" + (i + 1)).style.color = "#f9f6f2";
      } else if (jeu[i] == 512) {
        document.getElementById("cell" + (i + 1)).style.backgroundColor =
          "#edc850";
        document.getElementById("cell" + (i + 1)).style.color = "#f9f6f2";
      } else if (jeu[i] == 1024) {
        document.getElementById("cell" + (i + 1)).style.backgroundColor =
          "#edc53f";
        document.getElementById("cell" + (i + 1)).style.color = "#f9f6f2";
      } else if (jeu[i] == 2048) {
        document.getElementById("cell" + (i + 1)).style.backgroundColor =
          "#edc22e";
        document.getElementById("cell" + (i + 1)).style.color = "#f9f6f2";
      } else {
        document.getElementById("cell" + (i + 1)).style.backgroundColor =
          "#3c3a32";
        document.getElementById("cell" + (i + 1)).style.color = "#f9f6f2";
      }
    }
  }
  document.querySelector("#score").textContent = jeuScore;
  if (jeuScore >= jeuMeilleurScore) {
    document.querySelector("#meilleurScore").textContent = jeuScore;
  } else {
    document.querySelector("#meilleurScore").textContent = jeuMeilleurScore;
  }
};

const resetPlateau = (jeu) => {
  for (let i = 0; i < 16; i++) {
    jeu[i] = 0;
  }
};

const rand2or4 = (jeu) => {
  let aleatoire = Math.floor(Math.random() * 4 + 1);
  let cellAleatoire = Math.floor(Math.random() * 16);

  while (jeu[cellAleatoire] != 0) {
    cellAleatoire = Math.floor(Math.random() * 16);
  }

  if (aleatoire == 1 || aleatoire == 2 || aleatoire == 3) {
    jeu[cellAleatoire] = 2;
    afficheEcran(jeu);
  } else {
    jeu[cellAleatoire] = 4;
    afficheEcran(jeu);
  }
};

if (typeof jeu == "undefined") {
  var jeu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  rand2or4(jeu);
  rand2or4(jeu);
  var jeuScore = 0;
  var jeuMeilleurScore = 0;
  afficheEcran(jeu);
}

document.querySelector(".reset").addEventListener("click", () => {
  partieFinie = false;
  resetPlateau(jeu);
  rand2or4(jeu);
  rand2or4(jeu);
  jeuScore = 0;
  afficheEcran(jeu);
});

const resetTableau = (tableau) => {
  for (let i = 0; i < tableau.length; i++) {
    tableau[i] = false;
  }
};

function compareTableau(tableau1, tableau2) {
  for (let i = 0; i < 16; i++) {
    if (tableau1[i] != tableau2[i]) {
      return 0;
    }
  }
  return 1;
}

const goToLeft = (jeu, numeroCase, limite) => {
  if (numeroCase > limite) {
    if (jeu[numeroCase - 1] == 0) {
      jeu[numeroCase - 1] = jeu[numeroCase];
      jeu[numeroCase] = 0;
      goToLeft(jeu, numeroCase - 1, limite);
    } else if (
      jeu[numeroCase - 1] == jeu[numeroCase] &&
      calculLeft[numeroCase - 1] == false &&
      calculLeft[numeroCase] == false
    ) {
      jeu[numeroCase - 1] *= 2;
      jeuScore += jeu[numeroCase - 1];
      jeu[numeroCase] = 0;
      calculLeft[numeroCase - 1] = true;
      goToLeft(jeu, numeroCase - 1, limite);
    }
  }
};

const goToRight = (jeu, numeroCase, limite) => {
  if (numeroCase < limite) {
    if (jeu[numeroCase + 1] == 0) {
      jeu[numeroCase + 1] = jeu[numeroCase];
      jeu[numeroCase] = 0;
      goToRight(jeu, numeroCase + 1, limite);
    } else if (
      jeu[numeroCase + 1] == jeu[numeroCase] &&
      calculRight[numeroCase + 1] == false &&
      calculRight[numeroCase] == false
    ) {
      jeu[numeroCase + 1] *= 2;
      jeuScore += jeu[numeroCase + 1];
      jeu[numeroCase] = 0;
      calculRight[numeroCase + 1] = true;
      goToRight(jeu, numeroCase + 1, limite);
    }
  }
};

const goToUp = (jeu, numeroCase, limite) => {
  if (numeroCase > limite) {
    if (jeu[numeroCase - 4] == 0) {
      jeu[numeroCase - 4] = jeu[numeroCase];
      jeu[numeroCase] = 0;
      goToUp(jeu, numeroCase - 4, limite);
    } else if (
      jeu[numeroCase - 4] == jeu[numeroCase] &&
      calculUp[numeroCase - 4] == false &&
      calculUp[numeroCase] == false
    ) {
      jeu[numeroCase - 4] *= 2;
      jeuScore += jeu[numeroCase - 4];
      jeu[numeroCase] = 0;
      calculUp[numeroCase - 4] = true;
      goToUp(jeu, numeroCase - 4, limite);
    }
  }
};

const goToDown = (jeu, numeroCase, limite) => {
  if (numeroCase < limite) {
    if (jeu[numeroCase + 4] == 0) {
      jeu[numeroCase + 4] = jeu[numeroCase];
      jeu[numeroCase] = 0;
      goToDown(jeu, numeroCase + 4, limite);
    } else if (
      jeu[numeroCase + 4] == jeu[numeroCase] &&
      calculDown[numeroCase + 4] == false &&
      calculDown[numeroCase] == false
    ) {
      jeu[numeroCase + 4] *= 2;
      jeuScore += jeu[numeroCase + 4];
      jeu[numeroCase] = 0;
      calculDown[numeroCase + 4] = true;
      goToDown(jeu, numeroCase + 4, limite);
    }
  }
};

function isPlein(jeu) {
  for (let i = 0; i < 16; i++) {
    if (jeu[i] == 0) {
      return 0;
    }
  }
  return 1;
}

function perdu(jeu) {
  if (isPlein(jeu) == 0) {
    return 0;
  } else {
    for (let i = 0; i < 16; i++) {
      if (i == 3 || i == 7 || i == 11) {
        if (jeu[i + 4] == jeu[i]) {
          return 0;
        }
      } else if (i == 12 || i == 13 || i == 14) {
        if (jeu[i + 1] == jeu[i]) {
          return 0;
        }
      } else if (i != 15) {
        if (jeu[i + 1] == jeu[i] || jeu[i + 4] == jeu[i]) {
          return 0;
        }
      }
    }
    return 1;
  }
}

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 37 && partieFinie == false) {
    // left
    resetPlateau(tableauComparateur);
    tableauComparateur = [].concat(jeu);
    resetTableau(calculLeft);
    let changementLigne = 0;
    let limite = 0;
    for (let i = 1; i <= 4; i++) {
      for (let j = changementLigne; j < changementLigne + 3; j++) {
        goToLeft(jeu, i + j, limite);
      }
      changementLigne += 3;
      limite += 4;
    }

    afficheEcran(jeu);
    if (compareTableau(tableauComparateur, jeu) === 0) {
      rand2or4(jeu);
      afficheEcran(jeu);
    }
    if (perdu(jeu) === 1) {
      partieFinie = true;
      setTimeout(function () {
        window.alert("Vous avez perdu !");
      }, 1000);
    }
  }
  if (event.keyCode === 38 && partieFinie == false) {
    // up
    resetPlateau(tableauComparateur);
    tableauComparateur = [].concat(jeu);
    resetTableau(calculUp);
    let limite = 0;
    for (let i = 1; i <= 4; i++) {
      for (let j = 3; j < 12; j += 4) {
        goToUp(jeu, i + j, limite);
      }
      limite++;
    }
    afficheEcran(jeu);
    if (compareTableau(tableauComparateur, jeu) === 0) {
      rand2or4(jeu);
      afficheEcran(jeu);
    }
    if (perdu(jeu) == 1) {
      partieFinie = true;
      resetPlateau(jeu);
      setTimeout(function () {
        window.alert("Vous avez perdu !");
      }, 1000);
    }
  }
  if (event.keyCode === 39 && partieFinie == false) {
    // right
    resetPlateau(tableauComparateur);
    tableauComparateur = [].concat(jeu);
    resetTableau(calculRight);
    let changementLigne = 11;
    let limite = 15;
    for (let i = 3; i >= 0; i--) {
      for (let j = changementLigne; j > changementLigne - 3; j--) {
        goToRight(jeu, i + j, limite);
      }
      changementLigne -= 3;
      limite -= 4;
    }
    afficheEcran(jeu);
    if (compareTableau(tableauComparateur, jeu) === 0) {
      rand2or4(jeu);
      afficheEcran(jeu);
    }
    if (perdu(jeu) == 1) {
      partieFinie = true;
      resetPlateau(jeu);
      setTimeout(function () {
        window.alert("Vous avez perdu !");
      }, 1000);
    }
  }
  if (event.keyCode === 40 && partieFinie == false) {
    // down
    resetPlateau(tableauComparateur);
    tableauComparateur = [].concat(jeu);
    resetTableau(calculDown);
    let limite = 12;
    for (let i = 0; i <= 3; i++) {
      for (let j = 8; j >= 0; j -= 4) {
        goToDown(jeu, i + j, limite);
      }
      limite++;
    }
    afficheEcran(jeu);
    if (compareTableau(tableauComparateur, jeu) === 0) {
      rand2or4(jeu);
      afficheEcran(jeu);
    }
    if (perdu(jeu) == 1) {
      partieFinie = true;
      resetPlateau(jeu);
      setTimeout(function () {
        window.alert("Vous avez perdu !");
      }, 1000);
    }
  }
});
