export type AssetKind = 'character' | 'mob' | 'block' | 'item' | 'vehicle' | 'text' | 'particle';
export interface SceneObject { id:string; name:string; kind:AssetKind; position:[number,number,number]; rotation:[number,number,number]; scale:[number,number,number]; color:string; pose:string; visible:boolean; skin?:string; text?:string; }
export interface Keyframe { id:string; objectId:string; time:number; position:[number,number,number]; rotation:[number,number,number]; pose:string; easing:'Linear'|'Smooth'|'Ease in'|'Ease out'; }
export interface Environment { time:number; fog:number; shadows:boolean; sky:string; lightColor:string; lightType:'Directional'|'Point'|'Spot'; intensity:number; fov:number; bloom:number; dof:number; }
export interface AudioClip { id:string; name:string; url:string; duration:number; start:number; }
export interface Project { name:string; objects:SceneObject[]; keyframes:Keyframe[]; environment:Environment; duration:number; }
export interface Asset { name:string; kind:AssetKind; color:string; emoji:string; }
