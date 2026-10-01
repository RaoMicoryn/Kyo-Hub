"use client";
import { ConfigProvider, App, theme as antdTheme } from "antd";
import SmoothScroll from "./SmoothScroll";

const theme = {
  algorithm: antdTheme.darkAlgorithm,
  token: { colorPrimary: "#ffffff", colorBgBase: "#0a0a0a", colorBgElevated: "#141414", borderRadius: 12, fontFamily: "var(--font-inter), system-ui, sans-serif" },
  components: { Button: { primaryColor: "#000", colorTextLightSolid: "#000" } },
};

export default function Providers({ children }) {
  return (
    <ConfigProvider theme={theme}>
      <App>
        <SmoothScroll>{children}</SmoothScroll>
      </App>
    </ConfigProvider>
  );
}
