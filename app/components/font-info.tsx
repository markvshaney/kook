"use client";

import { useState, memo } from "react";
import {
  inter,
  workSans,
  sourceSans,
  spaceGrotesk,
  robotoMono,
  jetbrainsMono,
  firaCode,
  activeSans,
  activeMono,
} from "@/lib/fonts";

// Using memo to prevent unnecessary re-renders
const FontInfo = memo(function FontInfo() {
  const [showDetails, setShowDetails] = useState(false);

  const sansOptions = [
    { name: "Inter", font: inter },
    { name: "Work Sans", font: workSans },
    { name: "Source Sans 3", font: sourceSans },
    { name: "Space Grotesk", font: spaceGrotesk },
  ];

  const monoOptions = [
    { name: "Roboto Mono", font: robotoMono },
    { name: "JetBrains Mono", font: jetbrainsMono },
    { name: "Fira Code", font: firaCode },
  ];

  // Find the active fonts (computed once per render)
  const activeSansName =
    sansOptions.find((font) => font.font.variable === activeSans.variable)?.name || "Unknown";

  const activeMonoName =
    monoOptions.find((font) => font.font.variable === activeMono.variable)?.name || "Unknown";

  return (
    <div className="fixed bottom-2 right-2 p-3 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-sm z-50">
      <div className="flex items-center justify-between gap-2">
        <span>
          Active Fonts: <strong className={activeSans.className}>{activeSansName}</strong>
          {" / "}
          <code className={activeMono.className}>{activeMonoName}</code>
        </span>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {showDetails ? "Hide" : "Show"} Options
        </button>
      </div>

      {showDetails && (
        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <h3 className="font-bold mb-1">Sans Serif</h3>
              <ul className="space-y-1">
                {sansOptions.map((option) => (
                  <li key={option.name} className={option.font.className}>
                    {option.name} {option.name === activeSansName && "✓"}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-1">Monospace</h3>
              <ul className="space-y-1">
                {monoOptions.map((option) => (
                  <li key={option.name} className={option.font.className}>
                    {option.name} {option.name === activeMonoName && "✓"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            To change fonts, edit <code>lib/fonts.ts</code> and update the <code>activeSans</code>{" "}
            and <code>activeMono</code> exports.
          </div>
        </div>
      )}
    </div>
  );
});

export default FontInfo;
