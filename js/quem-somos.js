/* ========================================
   QUEM SOMOS – INTERAÇÕES PREMIUM
   ======================================== */

   (function initPortalTilt() {
    const area = document.getElementById("tiltArea");
    const card = document.getElementById("portal");
    if (!area || !card) return;
  
    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  
    let raf = null;
    let targetX = 0, targetY = 0;
    let curX = 0, curY = 0;
  
    function animate() {
      curX += (targetX - curX) * 0.12;
      curY += (targetY - curY) * 0.12;
      card.style.transform = `rotateX(${curY}deg) rotateY(${curX}deg) translateY(-2px)`;
      raf = requestAnimationFrame(animate);
    }
  
    function setFromEvent(x, y) {
      const rect = area.getBoundingClientRect();
      const nx = (x - rect.left) / rect.width;
      const ny = (y - rect.top) / rect.height;
      targetY = clamp((0.5 - ny) * 10, -7, 7);
      targetX = clamp((nx - 0.5) * 12, -9, 9);
    }
  
    area.addEventListener("mouseenter", () => {
      if (!raf) raf = requestAnimationFrame(animate);
    });
  
    area.addEventListener("mousemove", (e) => setFromEvent(e.clientX, e.clientY));
  
    area.addEventListener("touchmove", (e) => {
      const t = e.touches[0];
      if (t) setFromEvent(t.clientX, t.clientY);
    }, { passive: true });
  
    function reset() {
      targetX = 0; targetY = 0;
      card.style.transform = "";
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    }
  
    area.addEventListener("mouseleave", reset);
    area.addEventListener("touchend", reset);
  })();
  