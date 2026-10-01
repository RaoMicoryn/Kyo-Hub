"use client";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function Header({ onAdd }) {
  return (
    <header className="sticky top-4 z-40 mx-4 flex md:mx-12 lg:mx-20 items-center justify-between gap-4 rounded-full border border-white/10 bg-black/50 py-2 pl-3 pr-2 backdrop-blur-xl">
      <a href="#top" className="flex items-center gap-2 text-white no-underline">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm font-bold text-black">MH</span>
        <span className="font-semibold tracking-tight">Movies Hub</span>
      </a>
      <nav className="hidden items-center gap-8 text-sm md:flex">
        {[["Home", "#top"], ["Category", "#categories"], ["About", "#about"]].map(([label, href]) => (
          <a key={label} href={href} className="text-neutral-400 no-underline transition hover:text-white">{label}</a>
        ))}
      </nav>
      <Button shape="round" type="primary" icon={<PlusOutlined />} onClick={onAdd}>Add movie</Button>
    </header>
  );
}
