"use client";
import { useEffect, useRef, useState } from "react";
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered,setHovered] = useState(false);
  const [clicking,setClicking] = useState(false);
  const pos = useRef({x:-100,y:-100});
  const ring = useRef({x:-100,y:-100});
  const raf = useRef<number>(0);
  useEffect(()=>{
    const onMove=(e:MouseEvent)=>{pos.current={x:e.clientX,y:e.clientY};};
    const onDown=()=>setClicking(true);
    const onUp=()=>setClicking(false);
    const onHover=(e:MouseEvent)=>setHovered(!!(e.target as HTMLElement).closest("a,button,[data-hover]"));
    document.addEventListener("mousemove",onMove);
    document.addEventListener("mousemove",onHover);
    document.addEventListener("mousedown",onDown);
    document.addEventListener("mouseup",onUp);
    const animate=()=>{
      ring.current.x+=(pos.current.x-ring.current.x)*0.09;
      ring.current.y+=(pos.current.y-ring.current.y)*0.09;
      if(dotRef.current) dotRef.current.style.transform=`translate(${pos.current.x-3}px,${pos.current.y-3}px)`;
      if(ringRef.current){
        const scale=clicking?0.7:hovered?1.6:1;
        ringRef.current.style.transform=`translate(${ring.current.x-18}px,${ring.current.y-18}px) scale(${scale})`;
        ringRef.current.style.borderColor=hovered?"var(--accent)":"rgba(255,255,255,0.35)";
        ringRef.current.style.opacity=hovered?"1":"0.5";
      }
      raf.current=requestAnimationFrame(animate);
    };
    animate();
    return()=>{document.removeEventListener("mousemove",onMove);document.removeEventListener("mousemove",onHover);document.removeEventListener("mousedown",onDown);document.removeEventListener("mouseup",onUp);cancelAnimationFrame(raf.current);};
  },[clicking,hovered]);
  return (
    <>
      <div ref={dotRef} style={{position:"fixed",top:0,left:0,width:6,height:6,borderRadius:"50%",background:"var(--accent)",pointerEvents:"none",zIndex:9999,willChange:"transform"}} />
      <div ref={ringRef} style={{position:"fixed",top:0,left:0,width:36,height:36,borderRadius:"50%",border:"1px solid",pointerEvents:"none",zIndex:9999,willChange:"transform",transition:"border-color 0.2s,opacity 0.2s,transform 0.15s"}} />
    </>
  );
}
