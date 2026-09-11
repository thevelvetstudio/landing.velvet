import type { VelvetModule } from '../../types/module';
import Arrow from '../ui/Arrow';
import ModuleLink from '../ui/ModuleLink';

export default function ModulePortal({ module }: { module: VelvetModule }) {
    return <article className="portal group relative flex min-w-0 flex-col overflow-hidden border border-white/10 px-7 py-8 transition-all duration-500 hover:border-white/25 sm:px-9 sm:py-10">
        <span aria-hidden="true" className="portal-number absolute right-3 top-9 select-none text-[150px] font-light leading-none tracking-[-0.08em] text-white/[0.035] lg:text-[175px]">{module.index}</span>
        <div className="relative flex items-center justify-between"><span className="micro text-neutral-400">/ {module.index}</span><span className="portal-mark" aria-hidden="true">+</span></div>
        <div className={`portal-art portal-art-${module.id}`} aria-hidden="true"><i /><i /><i /></div>
        <div className="mt-auto">
            <p className="micro mb-4 text-neutral-500">{module.layer}</p>
            <h3 className="text-[clamp(2rem,3.2vw,3.6rem)] font-medium tracking-[-0.045em] transition-transform duration-300 group-hover:translate-x-1">{module.name}</h3>
            <p className="mt-5 min-h-20 max-w-72 text-[13px] leading-6 text-neutral-400">{module.description}</p>
            <ModuleLink href={module.href} className="mt-9 flex min-h-12 items-center justify-between border-t border-white/15 pt-6 text-xs tracking-wide after:absolute after:inset-0 after:content-[''] focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-white">{module.cta}<Arrow className="transition-transform duration-300 group-hover:translate-x-1" /></ModuleLink>
        </div>
    </article>;
}
