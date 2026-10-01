"use client";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "antd";

const LINES = ["Your movies,", "all in one place."];

function Row({ tiles, className }) {
  return (
    <div className="mask-x overflow-hidden">
      <div className={`marquee-row flex w-max gap-4 ${className}`}>
        {[...tiles, ...tiles].map((src, i) => (
          <div key={i} className="aspect-[2/3] w-36 shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-neutral-700 to-neutral-900 ring-1 ring-white/10 md:w-52 2xl:w-60">
            {src && <img src={src} alt="" onError={(e) => (e.currentTarget.style.display = "none")} className="h-full w-full object-cover grayscale transition duration-500 hover:grayscale-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero({ movies, total, average, onAdd }) {
  const root = useRef(null);
  const count = useRef(null);

  // posters for the marquee; falls back to blank tiles until movies exist
  const [rowA, rowB] = useMemo(() => {
    const imgs = movies.map((m) => m.image).filter(Boolean).slice(0, 12);
    const base = imgs.length ? imgs : Array(8).fill(null);
    const fill = (a) => { let r = [...a]; while (r.length < 8) r = [...r, ...a]; return r; };
    return [fill(base), fill([...base].reverse())];
  }, [movies]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(".hero-line", { yPercent: 110, duration: 1.1, stagger: 0.12 })
        .from(".hero-fade", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.6");

    }, root);
    return () => ctx.revert();
  }, []);

  // the signature moment: poster rows drift in opposite directions and speed up with scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray(".marquee-row");
      const tweens = rows.map((row, i) =>
        gsap.fromTo(row, { xPercent: i ? -50 : 0 }, { xPercent: i ? 0 : -50, duration: 60, ease: "none", repeat: -1 })
      );
      ScrollTrigger.create({
        onUpdate: (self) => {
          const boost = Math.min(Math.abs(self.getVelocity()) / 350, 8);
          gsap.to(tweens, { timeScale: 1 + boost, duration: 0.2, overwrite: true, onComplete: () => gsap.to(tweens, { timeScale: 1, duration: 1.2 }) });
        },
      });
    }, root);
    return () => ctx.revert();
  }, [rowA.length]);

  useEffect(() => {
    const o = { n: 0 };
    gsap.to(o, { n: total, duration: 1.2, ease: "power2.out", onUpdate: () => { if (count.current) count.current.textContent = Math.round(o.n); } });
  }, [total]);

  return (
    <section ref={root} className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden pb-16 pt-24 text-center">
      <h1 className="relative m-0 px-4 font-display text-5xl font-bold leading-[1] tracking-tighter md:text-[clamp(5rem,10.5vw,13rem)]">
        {LINES.map((l) => (
          <span key={l} className="block overflow-hidden pb-3"><span className="hero-line text-metal block">{l}</span></span>
        ))}
      </h1>
      <p className="hero-fade relative mx-auto mt-4 max-w-md px-4 text-lg text-neutral-400">Browse, add, rate and manage every movie you care about.</p>
      <div className="hero-fade relative mt-8 flex justify-center gap-3">
        <Button size="large" shape="round" type="primary" onClick={onAdd}>Add movie</Button>
        <button className="h-10 cursor-pointer rounded-full border border-white/30 bg-transparent px-6 text-base text-white transition hover:bg-white/10" onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}>Browse</button>
      </div>
      <div className="hero-fade relative mt-16 space-y-4">
        <Row tiles={rowA} className="" />
        <Row tiles={rowB} className="" />
      </div>
      <div className="hero-fade relative mx-auto mt-12 flex max-w-xs justify-center gap-16">
        <div><div ref={count} className="font-display text-5xl font-bold">0</div><div className="text-sm text-neutral-500">Movies</div></div>
        <div><div className="font-display text-5xl font-bold">{average}</div><div className="text-sm text-neutral-500">Average rating</div></div>
      </div>
    </section>
  );
}
