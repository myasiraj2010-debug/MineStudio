import * as THREE from 'three';
import { box } from '@/lib/models';
export function buildTerrain(){
 const terrain=new THREE.Group();const canvas=document.createElement('canvas');canvas.width=64;canvas.height=64;const context=canvas.getContext('2d')!;let seed=42;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};for(let y=0;y<64;y++)for(let x=0;x<64;x++){context.fillStyle=`hsl(${87+random()*15} 35% ${37+random()*9}%)`;context.fillRect(x,y,1,1);}const grass=new THREE.CanvasTexture(canvas);grass.magFilter=THREE.NearestFilter;grass.wrapS=grass.wrapT=THREE.RepeatWrapping;grass.repeat.set(14,14);grass.colorSpace=THREE.SRGBColorSpace;
 const ground=new THREE.Mesh(new THREE.BoxGeometry(30,.8,30),new THREE.MeshStandardMaterial({map:grass,roughness:1}));ground.position.y=-.42;ground.receiveShadow=true;terrain.add(ground);
 for(const [x,z,height] of [[-5,-4,3.4],[4,-6,4],[7,1,3.6],[-7,2,3],[-1,-8,3.8],[8,-8,4.2],[-9,-8,3.5]]){terrain.add(box(.6,height,.6,'#785334',x,height/2,z));terrain.add(box(2.7,1.3,2.7,'#447a37',x,height,z));terrain.add(box(2.2,1.1,2.2,'#548d3c',x,height+.8,z));terrain.add(box(1.4,.6,1.4,'#669d48',x,height+1.5,z));}
 for(let i=0;i<28;i++){const x=(random()-.5)*19,z=(random()-.5)*19;if(Math.abs(x)<3&&Math.abs(z)<3)continue;const flower=box(.08,.3,.08,'#487833',x,.15,z);terrain.add(flower);terrain.add(box(.18,.12,.18,i%3===0?'#f0cd54':'#f0e5d1',x,.34,z));}
 const clouds=new THREE.Group();for(const [x,z] of [[-12,-18],[8,-16],[18,0]]){clouds.add(box(6,.6,2,'#f0f3ef',x,10,z));clouds.add(box(3,.9,2.5,'#f0f3ef',x+1,10.4,z));}terrain.add(clouds);return terrain;
}
