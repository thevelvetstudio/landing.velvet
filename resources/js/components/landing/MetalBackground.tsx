import { lazy, Suspense, useSyncExternalStore } from 'react';

const MoltenMetal = lazy(() => import('../ui/MoltenMetal'));
const motionQuery = '(prefers-reduced-motion: reduce)';
const subscribe = (callback: () => void) => {
    const media = window.matchMedia(motionQuery);
    media.addEventListener('change', callback);
    return () => media.removeEventListener('change', callback);
};

export default function MetalBackground() {
    const reducedMotion = useSyncExternalStore(subscribe, () => window.matchMedia(motionQuery).matches, () => true);

    return <div aria-hidden="true" className="hero-metal pointer-events-none absolute inset-0">
        {!reducedMotion && <Suspense fallback={null}>
            <MoltenMetal
                color1="#3a0052"
                color2="#b400ff"
                color3="#f1d7ff"
                speed={0.18}
                scale={3.5}
                detail={3}
                glow={1.6}
                coreSize={0.13}
                swirl={1}
                fold={-0.2}
                blackPoint={0.04}
                brightness={1.25}
                grainIntensity={0.025}
                mouseInteraction={false}
                opacity={0.8}
            />
        </Suspense>}
        <div className="hero-metal-shade absolute inset-0" />
    </div>;
}
