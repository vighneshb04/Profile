"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
export default function Preloader() {
  const [show,setShow] = useState(true);
  const [count,setCount] = useState(0);
  useEffect(()=>{
    let c=0;
    const iv=setInterval(()=>{c+=Math.floor(Math.random()*9)+4;if(c>=100){c=100;clearInterval(iv);setTimeout(()=>setShow(false),800);}setCount(c);},38);
    return()=>clearInterval(iv);
  },[]);
  return (
    <AnimatePresence>
      {show&&(
        <motion.div exit={{opacity:0,scale:1.04}} transition={{duration:0.9,ease:[0.76,0,0.24,1]}} style={{position:"fixed",inset:0,zIndex:99999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#000",backgroundImage:"linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)",backgroundSize:"80px 80px"}}>
          <motion.div initial={{opacity:0,letterSpacing:"0.6em"}} animate={{opacity:1,letterSpacing:"0.25em"}} transition={{duration:0.8,ease:[0.16,1,0.3,1]}} style={{fontFamily:"var(--font-display)",fontSize:"clamp(60px,12vw,140px)",color:"var(--white)",lineHeight:1}}>VIGHNESH</motion.div>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}} style={{fontFamily:"var(--font-mono)",fontSize:10,letterSpacing:"0.4em",textTransform:"uppercase",color:"var(--muted)",marginTop:12}}>Portfolio</motion.div>
          <div style={{marginTop:48,width:256,height:1,position:"relative",overflow:"hidden",background:"rgba(255,255,255,0.06)"}}>
            <motion.div style={{position:"absolute",inset:"0 0 0 0",background:"linear-gradient(90deg,var(--accent-dim),var(--accent))"}} initial={{width:"0%"}} animate={{width:Math.min(count,100)+"%"}} transition={{ease:"linear",duration:0.1}} />
          </div>
          <div style={{marginTop:16,fontFamily:"var(--font-mono)",fontSize:11,letterSpacing:"0.25em",color:"var(--accent)",fontVariantNumeric:"tabular-nums"}}>{String(Math.min(count,100)).padStart(3,"0")}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
