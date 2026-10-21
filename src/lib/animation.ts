import type { Keyframe, SceneObject } from '@/types/studio';
export function sampleAnimation(objects:SceneObject[], frames:Keyframe[], time:number):SceneObject[] {
 return objects.map(object=>{
  const track=frames.filter(k=>k.objectId===object.id).sort((a,b)=>a.time-b.time);
  if(!track.length) return object;
  const previous=[...track].reverse().find(k=>k.time<=time) || track[0];
  const next=track.find(k=>k.time>time) || previous;
  let t=next.time===previous.time?0:Math.max(0,Math.min(1,(time-previous.time)/(next.time-previous.time)));
  if(previous.easing==='Smooth') t=t*t*(3-2*t); else if(previous.easing==='Ease in') t=t*t; else if(previous.easing==='Ease out') t=1-(1-t)*(1-t);
  const blend=(a:[number,number,number],b:[number,number,number]):[number,number,number]=>a.map((v,i)=>v+(b[i]-v)*t) as [number,number,number];
  return {...object,position:blend(previous.position,next.position),rotation:blend(previous.rotation,next.rotation),pose:t<.5?previous.pose:next.pose};
 });
}
export function downloadBlob(blob:Blob,name:string) { const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=name; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); }
