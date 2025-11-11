import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],

  theme: {
    fontFamily: {
      sans: ['Manrope', 'system-ui', 'serif'],
    },
    extend: {
      spacing: {
        '30': '30px',
      },
      boxShadow: {
        md: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
        lg: "0 1rem 3rem rgba(0, 0, 0, 0.175)",
        "dark-md": "rgba(0, 0, 0, 0.3) 0px 0px 2px 0px, rgba(0, 0, 0, 0.02) 0px 12px 24px -4px",
        sm: "0 6px 24.2px -10px rgba(0, 0, 0, .22)",
        "btn-shadow": "box-shadow: rgba(0, 0, 0, .05) 0 9px 17.5px",
        tw: "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px",
        btnshdw: "0 17px 20px -8px rgba(1, 168, 84, 0.23)",
        elevation1: "0px 12px 30px -2px rgba(0,0,0,0.14)",
        elevation2: "0px 24px 24px -12px rgba(0,0,0,0.05)",
        elevation3: "0px 24px 24px -12px rgba(1,168,84,0.15)",
        elevation4: "0px 12px 12px -6px rgba(0,0,0,0.15)"
      },
      borderRadius: {
        sm: "6px",
        md: "9px",
        lg: "24px",
        tw: "12px",
        bb: "20px",
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        info: "var(--color-info)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        lightprimary: "var(--color-lightprimary)",
        lightsecondary: "var(--color-lightsecondary)",
        lightsuccess: "var(--color-lightsuccess)",
        lighterror: "var(--color-lighterror)",
        lightinfo: "var(--color-lightinfo)",
        lightwarning: "var(--color-lightwarning)",
        border: "var(--color-border)",
        bordergray: "var(--color-bordergray)",
        lightgray: "var(--color-lightgray)",
        muted: "var(--color-muted)",
        lighthover: "var(--color-lighthover)",
        surface: "var(--color-surface-ld)",
        sky: "var(--color-sky)",
        bodytext: "var(--color-bodytext)",
        dark: "var(--color-dark)",
        link: "var(--color-link)",
        darklink: "var(--color-darklink)",
        darkborder: "var(--color-darkborder)",
        darkgray: "var(--color-darkgray)",
        primaryemphasis: "var(--color-primary-emphasis)",
        secondaryemphasis: "var(--color-secondary-emphasis)",
        warningemphasis: "var(--color-warning-emphasis)",
        erroremphasis: "var(--color-error-emphasis)",
        successemphasis: "var(--color-success-emphasis)",
        infoemphasis: "var(--color-info-emphasis)",
        darkmuted: "var(--color-darkmuted)",
        text: "var(--text-color)",
        background: "var(--background-color)",
        placeholder: "var(--placeholder-color)",
        autofill: "var(--autofill-color)",
        scroll: "var(--scroll-color)",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
  ],
};

export default config;
