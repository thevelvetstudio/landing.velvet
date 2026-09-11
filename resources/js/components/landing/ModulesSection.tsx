import { useEffect, useRef } from 'react';
import { velvetModules } from '../../config/modules';
import ModulePortal from './ModulePortal';

export default function ModulesSection() {
    const grid = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const element = grid.current;
        if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        element.classList.add('reveal-pending');
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { element.classList.remove('reveal-pending'); observer.disconnect(); }
        }, { threshold: 0.08 });
        observer.observe(element);
        return () => { observer.disconnect(); element.classList.remove('reveal-pending'); };
    }, []);
    return <section id="system" aria-labelledby="system-heading" className="shell scroll-mt-24 py-24 sm:py-32">
        <div className="mb-14 flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <div><p className="micro mb-6 text-neutral-500">THE VELVET SYSTEM</p><h2 id="system-heading" className="text-3xl font-light leading-tight tracking-[-0.035em] sm:text-5xl">Three dimensions.<br /><span className="text-neutral-500">One connected vision.</span></h2></div>
            <p className="max-w-56 text-xs leading-6 text-neutral-400">A unified ecosystem.<br />Choose your point of entry.</p>
        </div>
        <div ref={grid} className="portal-grid grid grid-cols-1 gap-3 md:grid-cols-3">{velvetModules.map(module => <ModulePortal key={module.id} module={module} />)}</div>
        <div className="mt-7 flex justify-between gap-6"><p className="micro text-neutral-500">INDEPENDENT DIMENSIONS. SHARED DNA.</p><span className="micro hidden text-neutral-500 sm:block">VELVET / ECOSYSTEM</span></div>
    </section>;
}
