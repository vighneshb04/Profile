"use client";
import { motion } from "framer-motion";
export default function Footer() {
  return (
    <footer style={{position:"relative",zIndex:10,padding:"40px 64px",borderTop:"1px solid var(--border)",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:16}}>
      <div style={{display:"flex",alignItems:"center",gap:24}}>
        <span style={{fontFamily:"var(--font-display)",fontSize:22,letterSpacing:"0.3em",color:"var(--white)"}}>VB</span>
        <span className="label">Vighnesh B · {new Date().getFullYear()}</span>
      </div>
      <div style={{display:"flex",gap:24}}>
        {[{l:"GitHub",h:"https://github.com/vighneshb04"},{l:"LinkedIn",h:"https://linkedin.com/in/vighneshb04"},{l:"Resume",h:"/resume.pdf"}].map(link=>(
          <motion.a key={link.l} href={link.h} target={link.h.startsWith("http")?"_blank":undefined} rel="noreferrer" download={link.l==="Resume"?true:undefined}
            className="label" style={{textDecoration:"none",transition:"color 0.2s"}}
            whileHover={{color:"var(--off)"}} transition={{duration:0.2}}>{link.l}</motion.a>
        ))}
      </div>
      <span className="label" style={{color:"var(--border-light)"}}>Built with Next.js</span>
    </footer>
  );
}
