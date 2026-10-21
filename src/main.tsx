import { createRoot } from 'react-dom/client';
import App from '@/App';
import '@/index.css';
createRoot(document.getElementById('root')!).render(<App/>);
if(import.meta.env.PROD&&'serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').then(()=>console.log('MINE STUDIO offline cache ready')).catch(error=>console.error('Offline setup failed',error));});}
