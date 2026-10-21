import { useEffect, useState } from 'react';
import { toast } from 'sonner';
interface InstallEvent extends Event { prompt:()=>Promise<void>;userChoice:Promise<{outcome:string}>; }
export function usePwa(){const [event,setEvent]=useState<InstallEvent|null>(null);useEffect(()=>{const handler=(e:Event)=>{e.preventDefault();setEvent(e as InstallEvent);};window.addEventListener('beforeinstallprompt',handler);return()=>window.removeEventListener('beforeinstallprompt',handler);},[]);const install=()=>{if(event){event.prompt().then(()=>event.userChoice).then(choice=>{if(choice.outcome==='accepted')toast.success('MINE STUDIO installed');setEvent(null);});}else toast.info('To install, open your published app and use your browser’s “Install app” or “Add to Home Screen” menu.');};return {install};}
