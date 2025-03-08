import {
  Inter,
  Roboto_Mono,
  Source_Sans_3,
  Work_Sans,
  Space_Grotesk,
  JetBrains_Mono,
  Fira_Code,
} from "next/font/google";

// ======= SANS-SERIF FONTS =======

// OPTION 1: Inter - Clean, modern sans-serif similar to Geist
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// OPTION 2: Work Sans - Friendly, slightly more character than Inter
export const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
});

// OPTION 3: Source Sans 3 - Adobe's open source font, extremely readable
export const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
});

// OPTION 4: Space Grotesk - Modern with distinctive characters, good for branding
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

// ======= MONOSPACE FONTS =======

// OPTION 1: Roboto Mono - Clean monospace
export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

// OPTION 2: JetBrains Mono - Designed for code, excellent readability
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

// OPTION 3: Fira Code - Includes coding ligatures
export const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

// ======= ACTIVE FONTS =======
// Change these exports to switch which fonts are active in your application

// Active sans-serif font
export const activeSans = inter;

// Active monospace font
export const activeMono = jetbrainsMono;
