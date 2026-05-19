"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Achievements", href: "#achievements" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.35 });
    document.querySelectorAll("section[id]").forEach(s => obs.observe(s));
    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  const go = (href: string) => { setMenuOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };

  const navStyle: React.CSSProperties = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    height: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 64px",
    borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
    background: scrolled ? "rgba(3,3,3,0.92)" : "transparent",
    backdropFilter: scrolled ? "blur(28px)" : "none",
    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
  };

  return (
    <>
      <motion.nav style={navStyle} initial={{y:-80,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.9,delay:2.3,ease:[0.16,1,0.3,1]}}>
        <motion.span
          onClick={() => window.scrollTo({top:0,behavior:"smooth"})}
          style={{fontFamily:"var(--font-display)",fontSize:22,letterSpacing:"0.3em",color:"var(--white)",cursor:"none",userSelect:"none"}}
          whileHover={{letterSpacing:"0.45em"}} transition={{duration:0.3}}
        >VB</motion.span>

        <div style={{display:"flex",alignItems:"center",gap:28}} className="desktop-nav">
          {links.map(l => (
            <button key={l.label} onClick={() => go(l.href)} style={{
              position:"relative", fontFamily:"var(--font-mono)", fontSize:14, letterSpacing:"0.18em",
              textTransform:"uppercase", color: active===l.href.slice(1) ? "var(--off)" : "var(--muted)",
              background:"none", border:"none", cursor:"none", transition:"color 0.2s",
            }}
              onMouseEnter={e=>(e.currentTarget.style.color="var(--off)")}
              onMouseLeave={e=>(e.currentTarget.style.color=active===l.href.slice(1)?"var(--off)":"var(--muted)")}
            >
              {l.label}
              {active===l.href.slice(1) && <motion.div layoutId="nav-line" style={{position:"absolute",bottom:-2,left:0,right:0,height:1,background:"var(--accent)"}} transition={{type:"spring",stiffness:300,damping:30}} />}
            </button>
          ))}
          <a href="/resume.pdf" download style={{
            fontFamily:"var(--font-mono)",fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",
            padding:"8px 20px",border:"1px solid var(--border-light)",color:"var(--off)",textDecoration:"none",transition:"all 0.2s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--accent)";e.currentTarget.style.color="var(--accent)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border-light)";e.currentTarget.style.color="var(--off)";}}
          >Resume</a>
        </div>

        <button onClick={()=>setMenuOpen(!menuOpen)} style={{display:"none",flexDirection:"column",gap:6,padding:8,background:"none",border:"none",cursor:"none"}} className="mobile-menu-btn">
          <motion.span animate={menuOpen?{rotate:45,y:5}:{rotate:0,y:0}} style={{display:"block",width:20,height:1,background:"var(--off)"}} />
          <motion.span animate={{opacity:menuOpen?0:1}} style={{display:"block",width:20,height:1,background:"var(--off)"}} />
          <motion.span animate={menuOpen?{rotate:-45,y:-5}:{rotate:0,y:0}} style={{display:"block",width:20,height:1,background:"var(--off)"}} />
        </button>
      </motion.nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        nav { padding: 0 64px; }
        @media (max-width: 768px) { nav { padding: 0 24px; } }
      `}</style>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{opacity:0,clipPath:"inset(0 0 100% 0)"}} animate={{opacity:1,clipPath:"inset(0 0 0% 0)"}} exit={{opacity:0,clipPath:"inset(0 0 100% 0)"}} transition={{duration:0.55,ease:[0.76,0,0.24,1]}}
            style={{position:"fixed",inset:0,zIndex:999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:32,background:"rgba(3,3,3,0.97)",backdropFilter:"blur(28px)"}}>
            {links.map((l,i)=>(
              <motion.button key={l.label} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:i*0.07+0.15}} onClick={()=>go(l.href)}
                style={{fontFamily:"var(--font-display)",fontSize:48,letterSpacing:"0.3em",color:"var(--off)",background:"none",border:"none",cursor:"none"}}>
                {l.label.toUpperCase()}
              </motion.button>
            ))}
            <a href="/resume.pdf" download style={{fontFamily:"var(--font-mono)",fontSize:11,letterSpacing:"0.3em",textTransform:"uppercase",color:"var(--accent)",marginTop:16,textDecoration:"none"}}>
              Download Resume ↓
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
