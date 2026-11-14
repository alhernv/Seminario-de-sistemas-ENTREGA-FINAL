"use strict";

const LETTERS = "A-Za-zÁÉÍÓÚÜÑáéíóúüñ";
const WORD_PATTERN = new RegExp(`[${LETTERS}]+`, "g");
const VOWEL_PATTERN = /[aeiouüáéíóú]/gi;
const CONSONANT_PATTERN = /[bcdfghjklmnñpqrstvwxyz]/gi;
const statusMessage = document.querySelector("#status");

const resultElements = {
  words: document.querySelector("#words-result"),
  vowels: document.querySelector("#vowels-result"),
  consonants: document.querySelector("#consonants-result"),
  lazaro: document.querySelector("#lazaro-result"),
  ciego: document.querySelector("#ciego-result"),
  clerigo: document.querySelector("#clerigo-result"),
  arcipreste: document.querySelector("#arcipreste-result"),
  mujer: document.querySelector("#mujer-result")
};

function countMatches(text, pattern) {
  return text.match(pattern)?.length ?? 0;
}

function countName(text, namePattern) {
  const pattern = new RegExp(
    `(^|[^${LETTERS}])${namePattern}(?=$|[^${LETTERS}])`,
    "gi"
  );
  return countMatches(text, pattern);
}

function analyzeText(text) {
  return {
    words: countMatches(text, WORD_PATTERN),
    vowels: countMatches(text, VOWEL_PATTERN),
    consonants: countMatches(text, CONSONANT_PATTERN),
    lazaro: countName(text, "lázaro"),
    ciego: countName(text, "ciego"),
    clerigo: countName(text, "clérigo"),
    arcipreste: countName(text, "arcipreste"),
    mujer: countName(text, "mi\\s+mujer")
  };
}

function showResults(results) {
  for (const [key, value] of Object.entries(results)) {
    resultElements[key].textContent = value.toLocaleString("es");
  }
}

async function loadAndAnalyzeText() {
  statusMessage.textContent = "Cargando y analizando el texto…";

  try {
    const response = await fetch("./lazarillo_limpio.txt");
    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    const text = await response.text();
    showResults(analyzeText(text));
    statusMessage.textContent = "Análisis completado.";
  } catch (error) {
    statusMessage.textContent =
      "No se pudo cargar lazarillo_limpio.txt. Comprueba que esté publicado junto a la web.";
    console.error("Error al cargar o analizar el texto:", error);
  }
}

void loadAndAnalyzeText();
