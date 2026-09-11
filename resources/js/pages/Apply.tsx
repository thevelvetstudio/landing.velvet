import { Head, Link } from '@inertiajs/react';
import Navbar from '../components/landing/Navbar';
import Arrow from '../components/ui/Arrow';
import { homeUrl } from '../config/modules';

export default function Apply() {
    return <><Head title="Aplicar ahora" /><a href="#application" className="skip-link">Skip to content</a><Navbar /><main id="application" lang="es" className="shell flex min-h-svh flex-col items-start justify-center py-32"><p className="micro mb-8 text-neutral-500">VELVET</p><h1 className="text-[clamp(2.4rem,8vw,8rem)] font-light leading-none tracking-[-0.045em]">Aplicar ahora</h1><p className="mt-8 max-w-md text-sm leading-7 text-neutral-400">Próximamente podrás enviar tu solicitud para formar parte de VELVET.</p><Link href={homeUrl} className="mt-14 flex min-h-11 items-center gap-8 border-b border-white/20 pb-2 text-sm">Volver al inicio<Arrow /></Link></main></>;
}
