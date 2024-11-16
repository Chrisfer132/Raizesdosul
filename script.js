  // Substitua pela sua API Key do WeatherAPI
  const API_KEY = "2401b9f9d39744ffb53182901241611";
  const CITY = "Porto Alegre"; // Substitua pela cidade desejada

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
            message = "É ótimo para podar sem risco de queimadura solar! ";
            break;
          case "chuvoso":
            message = "Está chovendo, cuidado ao sair e proteja as plantas!";
            break;
          case "chuvoso com trovoadas":
            message = "Aproveita para reutilizar a água da chuva para regar suas plantas! !";
            break;
          case "nevoeiro":
            message = "Evite molhar as folhas diretamente para prevenir os fungos! ";
            break;
          case "tempestade":
            message = "Proteja as mudas pequenas e recolha as frágeis! ";
            break;
          case "Vento Forte":
            message = "Reforce o suporte das novas mudas!";
            break;
          case "parcialmente nublado":
            message = "Bom para o plantio e ajuste nas mudas !";
            break;
            default:
            message = "Condição climática indefinida, verifique o tempo!";
        break;
    }

    // Exibe a mensagem personalizada
    messageElement.textContent = message;
}


  // Função para normalizar a condição do tempo
  function normalizeCondition(condition) {
    if (condition.toLowerCase().includes("chovendo")) {
      return "chuvoso";
    } else if (condition.toLowerCase().includes("parcialmente nublado")) {
      return "parcialmente nublado";
    } else if (condition.toLowerCase().includes("nublado")) {
      return "nublado";
    } else if (condition.toLowerCase().includes("ensolarado") || condition.toLowerCase().includes("sol")) {
      return "ensolarado";
    } else if (condition.toLowerCase().includes("tempestade")) {
      return "tempestade";
    } else {
      return "indefinido";
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
      default:
        return "unknown.png"; // Ícone padrão para condições indefinidas
    }
  }

  fetchWeather();
