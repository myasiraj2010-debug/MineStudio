import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
const Index=lazy(()=>import('@/pages/Index'));
const NotFound=lazy(()=>import('@/pages/NotFound'));
export default function App(){return <BrowserRouter><Toaster theme="dark" position="top-center" toastOptions={{style:{background:'hsl(var(--card))',border:'1px solid hsl(var(--border))',color:'hsl(var(--foreground))'}}}/><Suspense fallback={<div className="min-h-screen flex items-center justify-center font-display text-primary tracking-widest">MINE STUDIO</div>}><Routes><Route path="/" element={<Index/>}/><Route path="*" element={<NotFound/>}/></Routes></Suspense></BrowserRouter>;}
