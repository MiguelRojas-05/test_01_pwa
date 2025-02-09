if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(() => console.log("Service Worker registrado"))
        .catch((err) => console.log("Error registrando Service Worker", err));
}

// Detectar si la aplicación está instalada como PWA
function isPWAInstalled() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
}

// Crear corazones animados
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    document.getElementById("animation").appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Mostrar animación de San Valentín
function showValentineAnimation() {
    const animation = document.getElementById("animation");
    animation.innerHTML = "💖 ¡Feliz San Valentín! 💖";

    setInterval(createHeart, 500);
}

// Mostrar mensajes y animaciones según el estado
document.addEventListener("DOMContentLoaded", () => {
    const animation = document.getElementById("animation");
    const message = document.getElementById("message");
    const installButton = document.getElementById("install-button");

    if (isPWAInstalled()) {
        showValentineAnimation();
        message.textContent = "";
    } else {
        animation.textContent = "";
        message.textContent = "💡 Para aprovechar al máximo esta app, instálala como PWA.";
    }

    // Detectar si el usuario intenta instalar la app
    window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        installButton.style.display = "block";

        installButton.addEventListener("click", () => {
            event.prompt();
            event.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("El usuario instaló la app.");
                    installButton.style.display = "none";
                } else {
                    console.log("El usuario canceló la instalación.");
                }
            });
        });
    });
});
