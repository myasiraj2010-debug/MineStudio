import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
interface Props {children:ReactNode;}
interface State {failed:boolean;}
export default class StudioErrorBoundary extends Component<Props,State>{state:State={failed:false};static getDerivedStateFromError(){return {failed:true};}componentDidCatch(error:Error,info:ErrorInfo){console.error('Studio rendering error',error,info);}render(){return this.state.failed?<main className="min-h-screen flex flex-col gap-4 items-center justify-center p-8 text-center"><h1 className="font-display text-2xl">The studio could not open</h1><p className="text-muted-foreground">Your saved project is still on this device. Try reopening the studio.</p><button className="primary-button" onClick={()=>{localStorage.removeItem('mine-studio-project');this.setState({failed:false});}}>Reset workspace</button><p className="text-xs text-muted-foreground">Reset removes only the locally saved project.</p></main>:this.props.children;}}
