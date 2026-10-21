import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import type { Asset, AudioClip, Environment, Keyframe, Project, SceneObject } from '@/types/studio';
import { DEFAULT_PROJECT } from '@/constants/assets';
import { sampleAnimation } from '@/lib/animation';
interface StudioContextValue {
 project:Project; selectedId:string; selected:SceneObject|undefined; time:number; playing:boolean; audio:AudioClip[]; saved:boolean;
 setSelectedId:(id:string)=>void; setPlaying:(playing:boolean)=>void; seek:(time:number)=>void; updateObject:(id:string,values:Partial<SceneObject>)=>void;
 addAsset:(asset:Asset)=>void; removeObject:(id:string)=>void; addKeyframe:()=>void; deleteKeyframe:(id:string)=>void; updateEasing:(value:Keyframe['easing'])=>void;
 updateEnvironment:(value:Partial<Environment>)=>void; save:()=>void; newProject:(name:string,duration:number)=>void; addAudio:(clip:AudioClip)=>void; removeAudio:(id:string)=>void; rename:(name:string)=>void;
}
const StudioContext=createContext<StudioContextValue|null>(null);
export function StudioProvider({children}:{children:ReactNode}) {
 const [project,setProject]=useState<Project>(()=>JSON.parse(localStorage.getItem('mine-studio-project') || JSON.stringify(DEFAULT_PROJECT)));
 const [selectedId,setSelectedId]=useState('steve'); const [time,setTime]=useState(0); const [playing,setPlaying]=useState(false); const [saved,setSaved]=useState(true); const [audio,setAudio]=useState<AudioClip[]>([]);
 const current=useRef(project); current.current=project;
 const change=(fn:(p:Project)=>Project)=>{setProject(fn);setSaved(false);};
 const seek=(value:number)=>{const t=Math.max(0,Math.min(current.current.duration,value));setTime(t);setProject(p=>({...p,objects:sampleAnimation(p.objects,p.keyframes,t)}));};
 useEffect(()=>{if(!playing)return; const started=performance.now(), initial=time; let frame=0; const tick=(now:number)=>{const t=initial+(now-started)/1000;seek(t);if(t>=current.current.duration){setPlaying(false);return;}frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);},[playing]);
 useEffect(()=>()=>audio.forEach(clip=>URL.revokeObjectURL(clip.url)),[]);
 const updateObject=(id:string,values:Partial<SceneObject>)=>change(p=>({...p,objects:p.objects.map(o=>o.id===id?{...o,...values}:o)}));
 const addAsset=(asset:Asset)=>{const id=crypto.randomUUID(); const object:SceneObject={id,name:asset.name,kind:asset.kind,color:asset.color,pose:'Idle',position:[0,0,0],rotation:[0,0,0],scale:[1,1,1],visible:true,...(asset.kind==='text'?{text:asset.name}:{})};change(p=>({...p,objects:[...p.objects,object]}));setSelectedId(id);toast.success(`${asset.name} added to scene`);console.log('Added scene asset',asset.name);};
 const removeObject=(id:string)=>{change(p=>({...p,objects:p.objects.filter(o=>o.id!==id),keyframes:p.keyframes.filter(k=>k.objectId!==id)}));toast.success('Object removed');};
 const addKeyframe=()=>{const object=project.objects.find(o=>o.id===selectedId);if(!object){toast.info('Select an object first');return;}const frame:Keyframe={id:crypto.randomUUID(),objectId:selectedId,time:Math.round(time*10)/10,position:[...object.position],rotation:[...object.rotation],pose:object.pose,easing:'Smooth'};change(p=>({...p,keyframes:[...p.keyframes.filter(k=>!(k.objectId===selectedId&&Math.abs(k.time-frame.time)<.05)),frame]}));toast.success(`Keyframe set at ${frame.time.toFixed(1)}s`);};
 const save=()=>{localStorage.setItem('mine-studio-project',JSON.stringify(project));setSaved(true);toast.success('Project saved on this device');console.log('Saved project',project.name);};
 const newProject=(name:string,duration:number)=>{setProject({...DEFAULT_PROJECT,name,duration,objects:[],keyframes:[]});setAudio([]);setSelectedId('');setTime(0);setPlaying(false);setSaved(false);toast.success('Your scene is ready');};
 return <StudioContext.Provider value={{project,selectedId,selected:project.objects.find(o=>o.id===selectedId),time,playing,audio,saved,setSelectedId,setPlaying,seek,updateObject,addAsset,removeObject,addKeyframe,save,newProject,addAudio:clip=>{setAudio(a=>[...a,clip]);toast.success('Audio added for this session');},removeAudio:id=>setAudio(a=>a.filter(c=>c.id!==id)),rename:name=>change(p=>({...p,name})),deleteKeyframe:id=>change(p=>({...p,keyframes:p.keyframes.filter(k=>k.id!==id)})),updateEasing:easing=>change(p=>({...p,keyframes:p.keyframes.map(k=>k.objectId===selectedId?{...k,easing}:k)})),updateEnvironment:value=>change(p=>({...p,environment:{...p.environment,...value}}))}}>{children}</StudioContext.Provider>;
}
export function useStudio(){const context=useContext(StudioContext);if(!context)throw new Error('Studio provider required');return context;}
