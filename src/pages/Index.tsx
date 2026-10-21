import { StudioProvider } from '@/hooks/useStudio';
import Header from '@/components/layout/Header';
import AssetLibrary from '@/components/features/AssetLibrary';
import Viewport from '@/components/features/Viewport';
import Inspector from '@/components/features/Inspector';
import Timeline from '@/components/features/Timeline';
import AudioPlayback from '@/components/features/AudioPlayback';
import StudioErrorBoundary from '@/components/features/StudioErrorBoundary';
export default function Index(){return <StudioErrorBoundary><StudioProvider><Header/><main className="editor-grid"><AssetLibrary/><Viewport/><Inspector/><Timeline/></main><AudioPlayback/><div className="fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none rounded-md bg-background/90 border px-4 py-2 text-xs text-primary hidden max-sm:portrait:block">Rotate your device for the full studio</div></StudioProvider></StudioErrorBoundary>;}
