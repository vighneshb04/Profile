"use client";
import { SectionHeader } from "./Reveal";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  { num:"01", title:"SCHOOL ERP SYSTEM", desc:"Full-stack ERP centralizing academic and administrative workflows. Next.js frontend with Figma-designed UI, backed by secure database-driven services.", stack:["Next.js","PostgreSQL","REST API","Figma","Role-Based Auth"], status:"Active" },
  { num:"02", title:"FACIAL EXPRESSION RECOGNITION", desc:"Hybrid CNN + Graph Attention Network model representing facial landmarks as graph structures. Published at IEEE ICCCNT, IIT Indore 2025.", stack:["CNN","GAT","Python","PyTorch","IEEE Published"], status:"Published" },
  { num:"03", title:"ETHEREUM NFT MARKETPLACE", desc:"Decentralized marketplace with ERC-721 smart contracts and Web3-integrated frontend, enabling trustless minting, trading, and wallet-based auth.", stack:["Solidity","ERC-721","Web3.js","React","Ethereum"], status:"Complete" },
  { num:"04", title:"PROOF OF JUSTICE BLOCKCHAIN", desc:"Court judgments converted into immutable NFTs via Ethereum smart contracts with IPFS-based storage for tamper-proof legal document preservation.", stack:["Ethereum","IPFS","Solidity","Legal Tech","Smart Contracts"], status:"Complete" },
  { num:"05", title:"PRIVATE BLOCKCHAIN NETWORK", desc:"Permissioned blockchain with role-based node participation and controlled consensus for secure environments where public chains aren't suitable.", stack:["Blockchain","Permissioned","Consensus","Node.js","Go"], status:"Complete" },
  { num:"06", title:"VIDEO CAPTIONING NETWORK", desc:"Explainable Transformer-Based Attention Network for temporal relation modeling and context-aware fine-grained video captioning. Published at TQCEBT'26.", stack:["Transformer","Attention","Deep Learning","Python","IEEE"], status:"Published" },
];

const statusGlow: Record<string,string> = { Active:"rgba(100,220,150,0.12)", Published:"rgba(100,150,220,0.12)", Complete:"rgba(184,164,138,0.08)" };
const statusBg: Record<string,string> = { Active:"rgba(100,220,150,0.12)", Published:"rgba(100,150,220,0.12)", Complete:"rgba(184,164,138,0.1)" };

export default function Projects() {
  return (
    <section id="projects" className="section" style={{background:"var(--surface)"}}>
      <SectionHeader index="04" title="PROJECTS" />
      <div className="grid-3">
        {projects.map((p,i)=>{
          const ref = useRef(null);
          const inView = useInView(ref,{once:true,margin:"-60px"});
          const [hov,setHov] = useState(false);
          return (
            <motion.div key={p.num} ref={ref} style={{background:"var(--surface)",position:"relative",overflow:"hidden",minHeight:320,display:"flex",flexDirection:"column",justifyContent:"space-between",cursor:"default"}} initial={{opacity:0,y:60}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.9,delay:i*0.09,ease:[0.16,1,0.3,1]}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
              {/* Hover glow */}
              <motion.div style={{position:"absolute",inset:0,pointerEvents:"none",background:`radial-gradient(ellipse at 30% 30%,${statusGlow[p.status]},transparent 70%)`}} animate={{opacity:hov?1:0}} transition={{duration:0.4}} />
              {/* Top sweep line */}
              <div style={{position:"absolute",top:0,left:0,right:0,height:1,overflow:"hidden"}}>
                <motion.div style={{height:"100%",background:"linear-gradient(90deg,var(--accent),var(--accent-bright))",originX:0}} animate={{scaleX:hov?1:0}} transition={{duration:0.5,ease:[0.76,0,0.24,1]}} />
              </div>
              {/* Hover bg */}
              <motion.div style={{position:"absolute",inset:0,background:"var(--card)",pointerEvents:"none"}} animate={{opacity:hov?1:0}} transition={{duration:0.3}} />
              <div style={{padding:40,position:"relative",zIndex:1}}>
                {/* Arrow */}
                <motion.div style={{position:"absolute",top:32,right:32,width:36,height:36,border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:"var(--muted)"}} animate={hov?{rotate:45,borderColor:"var(--accent)",color:"var(--accent)"}:{rotate:0}} transition={{duration:0.3}}>↗</motion.div>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
                  <span style={{fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:"0.25em",textTransform:"uppercase",color:"var(--border-light)"}}>{p.num}</span>
                  <span style={{fontFamily:"var(--font-mono)",fontSize:8,letterSpacing:"0.12em",textTransform:"uppercase",padding:"3px 8px",background:statusBg[p.status],color:"var(--off)",border:"1px solid rgba(255,255,255,0.06)"}}>{p.status}</span>
                </div>
                <motion.div style={{fontFamily:"var(--font-display)",fontSize:"clamp(20px,2.2vw,28px)",lineHeight:1.15,letterSpacing:"0.04em",color:"var(--white)",marginBottom:16}} animate={hov?{y:-3}:{y:0}} transition={{duration:0.4}}>{p.title}</motion.div>
                <p style={{fontSize:13,lineHeight:1.75,color:"var(--muted)"}}>{p.desc}</p>
              </div>
              <div style={{padding:"0 40px 40px",display:"flex",flexWrap:"wrap",gap:6,position:"relative",zIndex:1}}>
                {p.stack.map((s,j)=>(
                  <motion.span key={s} style={{fontFamily:"var(--font-mono)",fontSize:8,letterSpacing:"0.12em",textTransform:"uppercase",padding:"4px 10px",border:`1px solid ${hov?"rgba(184,164,138,0.3)":"var(--border)"}`,color:hov?"var(--accent)":"var(--accent-dim)",transition:"all 0.3s",transitionDelay:`${j*0.03}s`}}>{s}</motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
