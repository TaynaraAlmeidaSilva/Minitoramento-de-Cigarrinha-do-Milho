/* ==========================================================
   dashboard.js
   Painel interativo sem bibliotecas externas.
   Demonstra:
   - Uso de variáveis e objetos
   - Manipulação do DOM
   - Atualização de classes CSS
   - Gráfico com Canvas API
   - Alternância entre cenários simulados
   ========================================================== */

const LIMITE_ALERTA = 20;

const cenarios = {
  normal: {
    nome: "Monitoramento normal",
    descricao: "As três armadilhas apresentam baixa contagem de cigarrinhas. O sistema indica acompanhamento normal.",
    dados: [
      { id: "A", local: "Armadilha A", regiao: "Talhão Norte", quantidade: 4 },
      { id: "B", local: "Armadilha B", regiao: "Talhão Central", quantidade: 7 },
      { id: "C", local: "Armadilha C", regiao: "Talhão Sul", quantidade: 6 }
    ]
  },
  alerta: {
    nome: "Área infestada detectada",
    descricao: "A Armadilha B ultrapassou o limite didático de segurança. O painel destaca a área para tomada de decisão.",
    dados: [
      { id: "A", local: "Armadilha A", regiao: "Talhão Norte", quantidade: 5 },
      { id: "B", local: "Armadilha B", regiao: "Talhão Central", quantidade: 31 },
      { id: "C", local: "Armadilha C", regiao: "Talhão Sul", quantidade: 8 }
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
  return quantidade > LIMITE_ALERTA;
}

function criarCard(armadilha) {
  const estaEmAlerta = verificarAlerta(armadilha.quantidade);
  const card = document.createElement("article");

  card.className = estaEmAlerta ? "monitor-card alerta" : "monitor-card";
  card.innerHTML = `
    <h3>${armadilha.local}</h3>
    <p>${armadilha.regiao}</p>
    <div class="valor">${armadilha.quantidade}</div>
    <span class="label-status">${estaEmAlerta ? "Alerta de infestação" : "Monitoramento normal"}</span>
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
  const existeAlerta = dados.some((armadilha) => verificarAlerta(armadilha.quantidade));
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
      ? "exige atenção"
      : "permanece estável";

    item.textContent = `${horario} - ${armadilha.local}, ${armadilha.regiao}: ${armadilha.quantidade} cigarrinhas, ${situacao}.`;
    logList.appendChild(item);
  });
}

function limparCanvas(contexto, largura, altura) {
  contexto.clearRect(0, 0, largura, altura);
}

function desenharGrafico(dados) {
  const contexto = chartCanvas.getContext("2d");
  const largura = chartCanvas.width;
  const altura = chartCanvas.height;
  const margem = 58;
  const larguraBarra = 110;
  const espaco = 115;
  const valorMaximo = 35;

  limparCanvas(contexto, largura, altura);

  contexto.font = "18px Arial";
  contexto.fillStyle = "#1a1a2e";
  contexto.fillText("Cigarrinhas por armadilha", margem, 32);

  contexto.strokeStyle = "#d1d5db";
  contexto.lineWidth = 2;
  contexto.beginPath();
  contexto.moveTo(margem, altura - margem);
  contexto.lineTo(largura - margem, altura - margem);
  contexto.stroke();

  dados.forEach((armadilha, indice) => {
    const alturaBarra = (armadilha.quantidade / valorMaximo) * 260;
    const x = margem + 60 + indice * (larguraBarra + espaco);
    const y = altura - margem - alturaBarra;
    const estaEmAlerta = verificarAlerta(armadilha.quantidade);

    contexto.fillStyle = estaEmAlerta ? "#c1121f" : "#2d6a4f";
    contexto.fillRect(x, y, larguraBarra, alturaBarra);

    contexto.fillStyle = "#1a1a2e";
    contexto.font = "bold 22px Arial";
    contexto.fillText(armadilha.quantidade, x + 38, y - 12);

    contexto.font = "16px Arial";
    contexto.fillText(armadilha.id, x + 48, altura - 22);
  });

  contexto.fillStyle = "#c1121f";
  contexto.font = "14px Arial";
  const yLimite = altura - margem - (LIMITE_ALERTA / valorMaximo) * 260;
  contexto.fillText("Limite didático de alerta", largura - 250, yLimite - 8);

  contexto.strokeStyle = "#c1121f";
  contexto.setLineDash([8, 8]);
  contexto.beginPath();
  contexto.moveTo(margem, yLimite);
  contexto.lineTo(largura - margem, yLimite);
  contexto.stroke();
  contexto.setLineDash([]);
}

function aplicarCenario(nomeDoCenario) {
  const cenario = cenarios[nomeDoCenario];

  scenarioDescription.textContent = cenario.descricao;
  atualizarCards(cenario.dados);
  atualizarAlerta(cenario.dados);
  desenharGrafico(cenario.dados);
  atualizarHistorico(cenario);
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

normalButton.addEventListener("click", () => aplicarCenario("normal"));
alertButton.addEventListener("click", () => aplicarCenario("alerta"));
themeButton.addEventListener("click", alternarTema);

aplicarTemaSalvo();
aplicarCenario("normal");
