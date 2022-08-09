const localTime = document.getElementById("local-time");
const now = new Date().toLocaleString('es-CO', { hour: "2-digit", minute: "2-digit", hour12: true })
setInterval(() => localTime.innerHTML = now + " (Colombia)", 1000);