
const API_KEY = "2401b9f9d39744ffb53182901241611";
const CITY = "Cristal do Sul,RS"; 

async function fetchWeather() {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&aqi=no&lang=pt`
  );
  const data = await response.json();
  displayWeather(data);
}

function displayWeather(data) {
  let temperature = data.current.temp_c; // Temperatura em Celsius
  const condition = data.current.condition.text; // Condição do clima
  const tempElement = document.getElementById("temperature");
  const conditionIcon = document.getElementById("condition-icon");
  const messageElement = document.getElementById("message");

  // Arredonda a temperatura para o inteiro mais próximo
  temperature = Math.round(temperature);

  // Exibe a temperatura
  tempElement.textContent = `${temperature}°C`;

  // Normaliza a condição do tempo
  const normalizedCondition = normalizeCondition(condition);

  // Define o ícone apropriado baseado na condição
  const iconPath = getIconPath(normalizedCondition);
  conditionIcon.src = iconPath; // Define o caminho da imagem no <img>
  conditionIcon.alt = `Ícone do tempo: ${normalizedCondition}`; // Texto alternativo descritivo

  // Define a mensagem baseada na condição do tempo
  let message = "";
  switch (normalizedCondition.toLowerCase()) {
    case "ensolarado":
      message = "Regue as plantas pela manhã ou à noite para evitar estresse térmico!";
      break;
    case "nublado":
      message = "É ótimo para podar sem risco de queimadura solar!";
      break;
    case "chuvoso":
      message = "Está chovendo, cuidado ao sair e proteja as plantas!";
      break;
    case "chuvoso com trovoadas":
      message = "Aproveita para reutilizar a água da chuva para regar suas plantas!";
      break;
    case "nevoeiro":
      message = "Evite molhar as folhas diretamente para prevenir os fungos!";
      break;
    case "tempestade":
      message = "Proteja as mudas pequenas e recolha as frágeis!";
      break;
    case "vento forte":
      message = "Reforce o suporte das novas mudas!";
      break;
    case "parcialmente nublado":
      message = "Bom para o plantio e ajuste nas mudas!";
      break;
    default:
      message = "As condições estão indefinidas, mas tome cuidado com o clima!";
      break;
  }

  // Exibe a mensagem personalizada
  messageElement.textContent = message;
}

// Função para normalizar a condição do tempo
function normalizeCondition(condition) {
  condition = condition.toLowerCase();

  // Mapeia as condições para um valor genérico que esteja no código
  if (condition.includes("chuvoso") || condition.includes("chuva")) {
    return "chuvoso";
  } else if (condition.includes("parcialmente nublado")) {
    return "parcialmente nublado";
  } else if (condition.includes("nublado")) {
    return "nublado";
  } else if (condition.includes("ensolarado") || condition.includes("sol")) {
    return "ensolarado";
  } else if (condition.includes("tempestade")) {
    return "tempestade";
  } else if (condition.includes("nevoeiro")) {
    return "nevoeiro";
  } else if (condition.includes("vento")) {
    return "vento forte";
  } else {
    return "nublado"; // Padrão caso não se encaixe em nenhuma das condições previstas
  }
}

// Função para mapear condições a caminhos de ícones
function getIconPath(condition) {
  switch (condition.toLowerCase()) {
    case "ensolarado":
      return "sunny.webp";
    case "nublado":
      return "cloudy.png";
    case "chuvoso":
      return "rainy.png";
    case "nevoeiro":
      return "foggy.png";
    case "tempestade":
      return "stormy.png";
    case "parcialmente nublado":
      return "partly_cloudy.png";
    case "vento forte":
      return "windy.png"; 
    default:
      return "night.png"; // Ícone padrão para condições indefinidas
  }
}

fetchWeather();


document.addEventListener("DOMContentLoaded", function () {
  const curiosidades = [
      "Sabia que as agroflorestas ajudam a restaurar solos degradados, tornando-os mais férteis sem a necessidade de produtos químicos?",
      "Você sabia que algumas árvores nativas, como o ipê, têm raízes profundas que ajudam a manter o solo estável e evitar deslizamentos?",
      "A fauna local, como os morcegos, é fundamental para a polinização de várias plantas, além de controlarem insetos nocivos.",
      "As raízes das plantas em solos arenosos podem ajudar a segurar a terra, evitando a erosão causada pela chuva.",
      "Sabia que em sistemas agroflorestais, as plantas não só produzem alimentos, mas também oferecem sombra e abrigo para diversos animais?",
      "Você sabia que a diversidade de fauna e flora em um ecossistema saudável é crucial para o equilíbrio natural e para a saúde dos solos?",
      "Você sabia? A erva-mate é uma planta que ajuda a manter o solo úmido, combatendo a erosão!",
      "Arestas de árvores nativas fornecem abrigo para muitas espécies de fauna local.",
      "Sabia que as árvores em áreas urbanas ajudam a reduzir a temperatura local, criando um microclima mais ameno e agradável?",
      "Sabia que a vegetação de cobertura, como gramíneas e arbustos, pode reduzir a erosão e melhorar a qualidade do solo ao proteger sua superfície?",
      "A fauna de uma floresta tropical é tão diversa que, em alguns lugares, pode haver mais de 100 espécies de insetos por metro quadrado!",
      "Você sabia que a decomposição das folhas no solo das florestas tropicais libera nutrientes essenciais para o crescimento de novas plantas?",
      "Algumas sementes precisam passar por um processo de escarificação antes do plantio; nesse processo, elas são machucadas para que consigam brotar."
  ];

  // Obtém a data atual
  const hoje = new Date();
  const diaDoAno = Math.floor(
      (hoje - new Date(hoje.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );

  // Seleciona uma curiosidade com base no dia do ano
  const curiosidadeIndex = diaDoAno % curiosidades.length;
  const curiosidadeDoDia = curiosidades[curiosidadeIndex];

  // Exibe a curiosidade na página
  const curiosidadeElemento = document.getElementById('curiosidade-texto');
  curiosidadeElemento.textContent = curiosidadeDoDia;
});
