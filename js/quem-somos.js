/* ========================================
   QUEM SOMOS - S@I PARA APAEs
   JavaScript para efeitos interativos
   ======================================== */

// Tilt/parallax effect no portal card
(function initPortalTilt() {
    const area = document.getElementById("tiltArea");
    const card = document.getElementById("portal");
  
    if (!area || !card) return;
  
    // Função helper para limitar valores
    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  
    // Evento de movimento do mouse
    area.addEventListener("mousemove", (e) => {
      const rect = area.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
  
      // Calcula rotação baseada na posição do mouse
      const rotateX = clamp((0.5 - y) * 10, -8, 8);
      const rotateY = clamp((x - 0.5) * 12, -10, 10);
  
      // Aplica transformação
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });
  
    // Reseta transformação ao sair
    area.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  })();