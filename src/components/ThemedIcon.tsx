import React, { useEffect, useState } from "react";

type ThemedIconProps = {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  className?: string;
};

export default function ThemedIcon({ Icon, className }: ThemedIconProps) {
  const [isDark, setIsDark] = useState(
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const color = isDark ? "var(--color-washedwhite)" : "var(--color-deepblue)";

  // Appliquer la même couleur à fill et stroke
  return <Icon className={className} fill={color} stroke={color} />;
}