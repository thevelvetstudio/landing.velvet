import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { applyUrl, intranetUrl } from '../../config/modules';
import MetalBackground from './MetalBackground';

export default function Hero() {
    const [copyVisible, setCopyVisible] = useState(false);
    const content = useRef<HTMLDivElement>(null);
    const section = useRef<HTMLElement>(null);
    useEffect(() => {
        // The hero only mounts after age confirmation. Wait for a new interaction.
        const events = ['pointermove', 'pointerdown', 'keydown', 'wheel'] as const;
        const cleanup = () => events.forEach((event) => window.removeEventListener(event, reveal));
        const reveal = (event: Event) => {
            if (!event.isTrusted) return;
            setCopyVisible(true);
            cleanup();
        };
        events.forEach((event) => window.addEventListener(event, reveal, { passive: true }));
        return cleanup;
    }, []);
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
                <img src="/assets/LOGO.svg?v=2" alt="VELVET" width="860" height="221" fetchPriority="high" decoding="async" />
            </h1>
            <div className={`hero-copy mx-auto mt-6 max-w-xl text-center sm:mt-8${copyVisible ? ' hero-copy-visible' : ''}`}>
                <p className="text-base font-light tracking-wide text-neutral-200 sm:text-xl">Un estudio webcam diferente.</p>
                <p className="mt-3 text-xs leading-6 text-neutral-400 sm:text-sm">The Velvet Studio, plataforma de streaming para adultos.<br />Una identidad propia. Una nueva forma de conectar.</p>
                <p className="micro mt-4 text-neutral-400">EXCLUSIVAMENTE PARA MAYORES DE 18 AÑOS</p>
            </div>
           
        </div>
        <div className="shell absolute inset-x-0 bottom-9 z-10 flex items-end justify-between">
            <Link href={intranetUrl} className="micro flex min-h-11 items-center text-neutral-400 uppercase transition-colors hover:text-white">Intranet</Link>
            <Link href={applyUrl} className="group flex min-h-11 items-center gap-5 text-[10px] tracking-[0.19em] text-neutral-400 uppercase transition-colors hover:text-white">Aplicar ahora <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-base transition-transform group-hover:translate-x-1">&rarr;</span></Link>
        </div>
    </section>;
}
