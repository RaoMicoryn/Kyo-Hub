module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  corePlugins: { preflight: false },
  theme: { extend: { fontFamily: { sans: ["var(--font-inter)", "system-ui", "sans-serif"] } } },
  plugins: [],
};
