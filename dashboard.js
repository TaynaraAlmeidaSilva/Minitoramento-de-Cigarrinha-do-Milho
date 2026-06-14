/* ==========================================================
   dashboard.js
   Painel interativo sem bibliotecas externas.
   ========================================================== */

const LIMITE_ALERTA = 5;
const FAIXA_ALERTA_TEXTO = "5 a 10 cigarrinhas";

let cenarioAtual = "normal";

const cenarios = {
  normal: {
    nome: "Monitoramento normal",
    descricao:
      "As três armadilhas apresentam contagem abaixo da faixa de alta pressão. O sistema indica acompanhamento normal.",
    dados: [
      { id: "A", local: "Armadilha A", regiao: "Talhão Norte", quantidade: 1 },
      { id: "B", local: "Armadilha B", regiao: "Talhão Central", quantidade: 3 },
      { id: "C", local: "Armadilha C", regiao: "Talhão Sul", quantidade: 2 }
    ]
  },

  alerta: {
    nome: "Área com alta pressão detectada",
    descricao:
      "A Armadilha B entrou na faixa de 5 a 10 cigarrinhas, indicando alta pressão da praga e risco de infestação severa.",
    dados: [
      { id: "A", local: "Armadilha A", regiao: "Talhão Norte", quantidade: 3 },
      { id: "B", local: "Armadilha B", regiao: "Talhão Central", quantidade: 8 },
      { id: "C", local: "Armadilha C", regiao: "Talhão Sul", quantidade: 4 }
    ]
  }
};

const cardsContainer = document.querySelector("#cardsContainer");
const scenarioDescription = document.querySelector("#scenarioDescription");
const statusAlert = document.querySelector("#statusAlert");
const normalButton = document.querySelector("#normalButton");
const alertButton = document.querySelector("#alertButton");
const chartCanvas = document.querySelector("#chartCanvas");
const logList = document.querySelector("#logList");
const themeButton = document.querySelector("#themeButton");

function verificarAlerta(quantidade) {
  return quantidade >= LIMITE_ALERTA;
}

function modoEscuroAtivo() {
  return document.body.classList.contains("dark");
}

function obterCoresDoGrafico() {
  const escuro = modoEscuroAtivo();

  return {
    texto: escuro ? "#ffffff" : "#0f172a",
    textoSuave: escuro ? "#e5e7eb" : "#334155",
    eixo: escuro ? "#cbd5e1" : "#475569",
    grade: escuro ? "rgba(255, 255, 255, 0.24)" : "rgba(15, 23, 42, 0.22)",
    verde: "#2d6a4f",
    alerta: "#c1121f",
    fundoEtiqueta: escuro ? "rgba(15, 23, 42, 0.88)" : "rgba(255, 255, 255, 0.96)",
    sombraTexto: escuro ? "rgba(0, 0, 0, 0.88)" : "rgba(255, 255, 255, 0.95)"
  };
}

function criarCard(armadilha) {
  const estaEmAlerta = verificarAlerta(armadilha.quantidade);
  const card = document.createElement("article");

  card.className = estaEmAlerta ? "monitor-card alerta" : "monitor-card";
  card.innerHTML = `
    <h3>${armadilha.local}</h3>
    <p>${armadilha.regiao}</p>
    <div class="valor">${armadilha.quantidade}</div>
    <span class="label-status">
      ${estaEmAlerta ? "Alta pressão detectada" : "Monitoramento normal"}
    </span>
  `;

  return card;
}

function atualizarCards(dados) {
  cardsContainer.innerHTML = "";

  dados.forEach((armadilha) => {
    const card = criarCard(armadilha);
    cardsContainer.appendChild(card);
  });
}

function atualizarAlerta(dados) {
  const existeAlerta = dados.some((armadilha) =>
    verificarAlerta(armadilha.quantidade)
  );

  statusAlert.textContent =
    `Alerta: contagem na faixa de ${FAIXA_ALERTA_TEXTO} por armadilha ` +
    "adesiva amarela indica alta pressão da praga e risco de infestação severa na lavoura.";

  statusAlert.classList.toggle("show", existeAlerta);
}

function atualizarHistorico(cenario) {
  const data = new Date();
  const horario = data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  logList.innerHTML = "";

  cenario.dados.forEach((armadilha) => {
    const item = document.createElement("li");
    const situacao = verificarAlerta(armadilha.quantidade)
      ? "indica alta pressão da praga"
      : "permanece abaixo da faixa de alerta";

    item.textContent =
      `${horario} - ${armadilha.local}, ${armadilha.regiao}: ` +
      `${armadilha.quantidade} cigarrinhas, ${situacao}.`;

    logList.appendChild(item);
  });
}

function limparCanvas(contexto, largura, altura) {
  contexto.clearRect(0, 0, largura, altura);
}

function escreverTextoComContorno(contexto, texto, x, y, corTexto, corContorno) {
  contexto.strokeStyle = corContorno;
  contexto.lineWidth = 5;
  contexto.lineJoin = "round";
  contexto.strokeText(texto, x, y);

  contexto.fillStyle = corTexto;
  contexto.fillText(texto, x, y);
}

function desenharEtiqueta(contexto, texto, x, y, corTexto, corFundo) {
  const medidas = contexto.measureText(texto);
  const larguraCaixa = medidas.width + 16;
  const alturaCaixa = 26;

  contexto.fillStyle = corFundo;
  contexto.fillRect(x - 8, y - 20, larguraCaixa, alturaCaixa);

  contexto.fillStyle = corTexto;
  contexto.fillText(texto, x, y);
}

function desenharGrafico(dados) {
  const contexto = chartCanvas.getContext("2d");
  const largura = chartCanvas.width;
  const altura = chartCanvas.height;
  const margem = 70;
  const larguraBarra = 110;
  const espaco = 115;
  const valorMaximo = 10;
  const cores = obterCoresDoGrafico();

  limparCanvas(contexto, largura, altura);

  contexto.font = "bold 20px Arial";
  contexto.fillStyle = cores.texto;
  contexto.fillText("Cigarrinhas por armadilha", margem, 34);

  contexto.font = "15px Arial";
  contexto.fillStyle = cores.textoSuave;
  contexto.fillText(
    "Faixa de atenção: 5 a 10 cigarrinhas por armadilha adesiva amarela",
    margem,
    60
  );

  contexto.strokeStyle = cores.grade;
  contexto.lineWidth = 2;
  contexto.beginPath();
  contexto.moveTo(margem, altura - margem);
  contexto.lineTo(largura - margem, altura - margem);
  contexto.stroke();

  dados.forEach((armadilha, indice) => {
    const alturaBarra = (armadilha.quantidade / valorMaximo) * 250;
    const x = margem + 60 + indice * (larguraBarra + espaco);
    const y = altura - margem - alturaBarra;
    const estaEmAlerta = verificarAlerta(armadilha.quantidade);

    contexto.fillStyle = estaEmAlerta ? cores.alerta : cores.verde;
    contexto.fillRect(x, y, larguraBarra, alturaBarra);

    contexto.font = "bold 22px Arial";
    escreverTextoComContorno(
      contexto,
      String(armadilha.quantidade),
      x + 43,
      y - 12,
      "#ffffff",
      "rgba(0, 0, 0, 0.85)"
    );

    contexto.font = "bold 18px Arial";
    escreverTextoComContorno(
      contexto,
      armadilha.id,
      x + 48,
      altura - 28,
      cores.texto,
      cores.sombraTexto
    );
  });

  const yLimite = altura - margem - (LIMITE_ALERTA / valorMaximo) * 250;

  contexto.strokeStyle = cores.alerta;
  contexto.lineWidth = 2;
  contexto.setLineDash([8, 8]);
  contexto.beginPath();
  contexto.moveTo(margem, yLimite);
  contexto.lineTo(largura - margem, yLimite);
  contexto.stroke();
  contexto.setLineDash([]);

  contexto.font = "bold 14px Arial";
  desenharEtiqueta(
    contexto,
    "Início da faixa de atenção",
    largura - 270,
    yLimite - 8,
    cores.alerta,
    cores.fundoEtiqueta
  );
}

function aplicarCenario(nomeDoCenario) {
  cenarioAtual = nomeDoCenario;
  const cenario = cenarios[nomeDoCenario];

  scenarioDescription.textContent = cenario.descricao;
  atualizarCards(cenario.dados);
  atualizarAlerta(cenario.dados);
  desenharGrafico(cenario.dados);
  atualizarHistorico(cenario);
}

function redesenharGraficoAtual() {
  desenharGrafico(cenarios[cenarioAtual].dados);
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

  const escuroAtivo = modoEscuroAtivo();
  localStorage.setItem("tema-monitor-cigarrinha", escuroAtivo ? "escuro" : "claro");
  themeButton.textContent = escuroAtivo ? "Modo claro" : "Modo escuro";

  redesenharGraficoAtual();
}

normalButton.addEventListener("click", () => aplicarCenario("normal"));
alertButton.addEventListener("click", () => aplicarCenario("alerta"));
themeButton.addEventListener("click", alternarTema);

aplicarTemaSalvo();
aplicarCenario("normal");