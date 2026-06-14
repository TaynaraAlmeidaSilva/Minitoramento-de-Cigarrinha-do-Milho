/* ==========================================================
   script.js
   Funções da página inicial.
   - Saudação dinâmica por horário
   - Curiosidades rotativas
   - Modo escuro com localStorage
   ========================================================== */

const greetingMessage = document.querySelector("#greetingMessage");
const themeButton = document.querySelector("#themeButton");

const curiosidades = {
  manha: [
    "Bom dia! O monitoramento cedo ajuda a acompanhar mudanças no campo desde o início do dia.",
    "Bom dia! Dados bem registrados ajudam o produtor a agir com mais segurança."
  ],
  tarde: [
    "Boa tarde! No Paraná, plataformas digitais já apoiam o monitoramento da cigarrinha-do-milho.",
    "Boa tarde! Uma armadilha observada com frequência pode revelar sinais importantes da lavoura."
  ],
  noite: [
    "Boa noite! Enquanto o campo descansa, os dados continuam contando a história da lavoura.",
    "Boa noite! Tecnologia no agro também é prevenção, cuidado e sustentabilidade."
  ]
};

function escolherSaudacao() {
  const hora = new Date().getHours();
  let periodo = "noite";

  if (hora >= 6 && hora < 12) {
    periodo = "manha";
  } else if (hora >= 12 && hora < 18) {
    periodo = "tarde";
  }

  const lista = curiosidades[periodo];
  const indice = Math.floor(Math.random() * lista.length);
  greetingMessage.textContent = lista[indice];
}

function aplicarTemaSalvo() {
  const temaSalvo = localStorage.getItem("tema-monitor-cigarrinha");

  if (temaSalvo === "escuro") {
    document.body.classList.add("dark");
    themeButton.textContent = "Modo claro";
  }
}

function alternarTema() {
  document.body.classList.toggle("dark");

  const modoEscuroAtivo = document.body.classList.contains("dark");
  localStorage.setItem("tema-monitor-cigarrinha", modoEscuroAtivo ? "escuro" : "claro");
  themeButton.textContent = modoEscuroAtivo ? "Modo claro" : "Modo escuro";
}

escolherSaudacao();
aplicarTemaSalvo();
themeButton.addEventListener("click", alternarTema);
