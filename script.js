if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(() => console.log("Service Worker registrado"))
        .catch((err) => console.log("Error registrando Service Worker", err));
}

// Detectar si la aplicación está instalada como PWA
function isPWAInstalled() {
    // Verificar si está en modo "standalone" o "fullscreen"
    if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone) {
        return true; // Está instalada como PWA
    }
    return false; // No está instalada
}

// Mostrar mensajes y animaciones según el estado
document.addEventListener("DOMContentLoaded", () => {
    const animation = document.getElementById("animation");
    const message = document.getElementById("message");

    if (isPWAInstalled()) {
        // Mostrar animación si está instalada como PWA
        animation.textContent = "🌟 Animación: Bienvenido a la PWA!";
        message.textContent = ""; // No mostrar mensaje de instalación
    } else {
        // Mostrar mensaje para invitar a instalar
        animation.textContent = "";
        message.textContent = "💡 Para aprovechar al máximo esta app, instálala como PWA.";
    }

    // Detectar si el usuario intenta instalar la app
    window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault(); // Prevenir la ventana emergente automática
        const installButton = document.getElementById("install-button");
        installButton.style.display = "block";

        installButton.addEventListener("click", () => {
            event.prompt(); // Mostrar la ventana de instalación manualmente
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
