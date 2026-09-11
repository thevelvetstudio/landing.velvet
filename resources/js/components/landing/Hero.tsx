import { Link } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { applyUrl, intranetUrl } from '../../config/modules';
import MetalBackground from './MetalBackground';

export default function Hero() {
    const content = useRef<HTMLDivElement>(null);
    const section = useRef<HTMLElement>(null);
    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        let frame = 0;
        const update = () => {
            frame = 0;
            if (!content.current || !section.current) return;
            const progress = media.matches ? 0 : Math.min(window.scrollY / section.current.offsetHeight, 1);
            content.current.style.opacity = String(1 - progress * 0.85);
            content.current.style.transform = `translateY(${progress * 35}px) scale(${1 - progress * 0.025})`;
        };
        const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
        update();
        media.addEventListener('change', schedule);
        window.addEventListener('scroll', schedule, { passive: true });
        return () => { window.cancelAnimationFrame(frame); media.removeEventListener('change', schedule); window.removeEventListener('scroll', schedule); };
    }, []);
    return <section ref={section} aria-label="Welcome to VELVET" className="hero relative flex min-h-svh items-center justify-center overflow-hidden">
        <MetalBackground />
        <div ref={content} className="relative z-10 w-full px-6 pb-4 text-center">

            <h1 className="hero-logo">
                <img src="/assets/LOGO.svg" alt="VELVET" width="1920" height="1080" fetchPriority="high" decoding="async" />
            </h1>
           
        </div>
        <div className="shell absolute inset-x-0 bottom-9 z-10 flex items-end justify-between">
            <Link href={intranetUrl} className="micro flex min-h-11 items-center text-neutral-400 uppercase transition-colors hover:text-white">Intranet</Link>
            <Link href={applyUrl} className="group flex min-h-11 items-center gap-5 text-[10px] tracking-[0.19em] text-neutral-400 uppercase transition-colors hover:text-white">Aplicar ahora <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-base transition-transform group-hover:translate-x-1">&rarr;</span></Link>
        </div>
    </section>;
}
