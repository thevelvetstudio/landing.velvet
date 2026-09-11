import { Head, Link } from '@inertiajs/react';
import { intranetUrl, velvetModules } from '../config/modules';
import type { VelvetModule } from '../types/module';
import Navbar from './landing/Navbar';
import Arrow from './ui/Arrow';

export default function ModulePlaceholder({ id }: { id: VelvetModule['id'] }) {
    const module = velvetModules.find(item => item.id === id)!;
    return <><Head title={module.name} /><a className="skip-link" href="#module">Skip to content</a><Navbar /><main id="module" className="shell flex min-h-svh flex-col items-start justify-center py-32"><p className="micro mb-8 text-neutral-500">{module.index} / {module.layer}</p><h1 className="text-[clamp(2.4rem,8vw,8rem)] font-light leading-none tracking-[-0.045em]">VELVET {module.name}</h1><p className="mt-8 max-w-md text-sm leading-7 text-neutral-400">{module.description}</p><p className="micro mt-10 text-neutral-500">THIS DIMENSION IS TAKING SHAPE.</p><Link className="mt-14 flex min-h-11 items-center gap-8 border-b border-white/20 pb-2 text-sm" href={intranetUrl}>Back to the system<Arrow /></Link></main></>;
}
