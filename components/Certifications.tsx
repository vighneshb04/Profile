"use client";
import { SectionHeader } from "./Reveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const certs = [
  { abbr:"AWS", name:"AWS Solutions Architect — Associate", issuer:"Amazon Web Services", year:"2026", href:"https://www.credly.com/badges/a8ec4e47-2885-45a1-8d42-325b1cbfce38/public_url" },
  { abbr:"AWS", name:"AWS Certified Cloud Practitioner", issuer:"Amazon Web Services", year:"2025", href:"https://www.credly.com/badges/c2b04326-78b8-46e5-b8cd-ace7a0502533/public_url" },
  { abbr:"ORC", name:"Oracle Java Programming Certification", issuer:"Oracle", year:"2024", href:"https://drive.google.com/file/d/192rHt83cNyYXZqaUFck_f5wLxUvJZIac/view?usp=sharing" },
  { abbr:"ORC", name:"Oracle Java Fundamentals Certification", issuer:"Oracle", year:"2024", href:null },
];

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <SectionHeader index="07" title="CERTIFICATIONS" />
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}} className="cert-grid">
        {certs.map((c,i)=>{
          const ref = useRef(null);
          const inView = useInView(ref,{once:true,margin:"-50px"});
          return (
            <motion.div key={c.name} ref={ref} style={{border:"1px solid var(--border)",padding:32,display:"flex",alignItems:"center",gap:24,position:"relative",overflow:"hidden",background:"transparent"}} initial={{opacity:0,x:i%2===0?-40:40}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.85,delay:i*0.1,ease:[0.16,1,0.3,1]}} whileHover={{borderColor:"var(--border-light)",background:"var(--card)"}}>
              {/* Left accent bar */}
              <div style={{position:"absolute",left:0,top:0,bottom:0,width:1,overflow:"hidden"}}>
                <motion.div style={{width:"100%",height:"100%",background:"var(--accent)",originY:0}} initial={{scaleY:0}} whileHover={{scaleY:1}} transition={{duration:0.4,ease:[0.76,0,0.24,1]}} />
              </div>
              <div style={{fontFamily:"var(--font-display)",fontSize:40,lineHeight:1,letterSpacing:"0.06em",color:"var(--accent)",flexShrink:0,width:90}}>{c.abbr}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"var(--font-sans)",fontWeight:600,fontSize:15,lineHeight:1.3,color:"var(--white)",marginBottom:4}}>{c.name}</div>
                <div style={{fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:"0.18em",textTransform:"uppercase",color:"var(--muted)"}}>{c.issuer}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:16,flexShrink:0}}>
                <div style={{fontFamily:"var(--font-display)",fontSize:24,lineHeight:1,color:"var(--border)"}}>{c.year.slice(2)}</div>
                {c.href && (
                  <motion.a href={c.href} target="_blank" rel="noreferrer" style={{fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:"0.18em",textTransform:"uppercase",border:"1px solid var(--border)",padding:"6px 12px",color:"var(--muted)",textDecoration:"none"}} whileHover={{borderColor:"var(--accent)",color:"var(--accent)"}} transition={{duration:0.2}}>Verify ↗</motion.a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      <style>{`@media(max-width:768px){.cert-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
