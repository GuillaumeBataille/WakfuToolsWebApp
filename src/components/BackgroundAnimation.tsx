import React, { useEffect, useRef } from "react";

// --- Typage ---
interface FloatingImage {
  img: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  opacity: number;
  reset: () => void;
}

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // --- Import dynamique des images ---
  const deepblueImages = Object.values(
    import.meta.glob("../assets/LogoClasseWakfu/deepblue/*.png", { eager: true, import: "default" })
  ) as string[];

  const washedwhiteImages = Object.values(
    import.meta.glob("../assets/LogoClasseWakfu/washedwhite/*.png", { eager: true, import: "default" })
  ) as string[];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // --- Fonction pour créer les images flottantes selon le mode ---
    const createFloatingImages = (): FloatingImage[] => {
      const isDark = document.documentElement.classList.contains("dark");
      const imageList = isDark ? washedwhiteImages : deepblueImages;

      const floatingImages: FloatingImage[] = [];

      const createFloatingImage = (src: string): FloatingImage => {
        const img = new Image();
        img.src = src;
        const width = 50 + Math.random() * 100;
        const height = width; // On garde un ratio carré pour simplifier
        const opacity = 0.2 + Math.random() * 0.7;

        const floating: FloatingImage = {
          img,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          width,
          height,
          speed: 0.1 + Math.random() * 0.1,
          opacity,
          reset() {
            console.log("Image disparue et réinitialisée");
            this.x = Math.random() * canvas.width;
            this.y = -this.height;
            this.speed = 0.1 + Math.random() * 0.1;
            this.width = 50 + Math.random() * 100;
            this.height = this.width;
            this.opacity = 0.2 + Math.random() * 0.7;
          },
        };
        console.log("Nouvelle image spawn:", src);
        return floating;
      };

      for (let i = 0; i < 10; i++) {
        const src = imageList[Math.floor(Math.random() * imageList.length)];
        floatingImages.push(createFloatingImage(src));
      }

      return floatingImages;
    };

    let floatingImages = createFloatingImages();

    // --- Animation ---
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      floatingImages.forEach((f) => {
        ctx.globalAlpha = f.opacity;
        ctx.drawImage(f.img, f.x, f.y, f.width, f.height);
        ctx.globalAlpha = 1;
        f.y += f.speed;
        if (f.y - f.height > canvas.height) f.reset();
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // --- Observer pour détecter changement de dark mode ---
    const observer = new MutationObserver(() => {
      floatingImages = createFloatingImages();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      observer.disconnect();
    };
  }, [deepblueImages, washedwhiteImages]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  );
};

export default BackgroundAnimation;
