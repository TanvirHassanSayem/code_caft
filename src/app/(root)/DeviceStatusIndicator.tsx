"use client";

import { memo, useEffect, useState } from "react";

const DeviceStatusIndicator = memo(() => {
  const [deviceType, setDeviceType] = useState("Loading...");

  function getDeviceType() {
    const width = window.innerWidth;
    if (width < 640) return "Mobile";
    if (width < 1024) return "Tablet";
    return "Desktop";
  }

  useEffect(() => {
    function handleResize() {
      setDeviceType(getDeviceType());
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const icon = {
    Mobile: "📱",
    Tablet: "🧭",
    Desktop: "💻",
  }[deviceType] || "❓";

  return (
    <div className="flex items-center gap-2 mt-1 select-none">
      <span className="text-sm font-semibold text-purple-400">{icon}</span>
      <span className="text-xs font-light text-slate-400">
        Device:{" "}
        <span className="font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 px-2 py-0.5 rounded-full shadow-lg animate-pulse">
          {deviceType}
        </span>
      </span>
    </div>
  );
});

export default DeviceStatusIndicator;
