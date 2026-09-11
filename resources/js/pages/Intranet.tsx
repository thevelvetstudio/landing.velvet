import { Head } from '@inertiajs/react';
import ModulesSection from '../components/landing/ModulesSection';
import Navbar from '../components/landing/Navbar';

export default function Intranet() {
    return <><Head title="Intranet" /><a href="#system" className="skip-link">Skip to modules</a><Navbar /><main className="min-h-svh pt-22"><div className="shell pt-12"><h1 className="micro text-neutral-400 uppercase">Intranet</h1></div><ModulesSection /></main></>;
}
