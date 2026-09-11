import Seo from '../components/Seo';
import ModulesSection from '../components/landing/ModulesSection';
import Navbar from '../components/landing/Navbar';

export default function Intranet() {
    return <><Seo /><a href="#system" className="skip-link">Skip to modules</a><Navbar /><main className="min-h-svh pt-22"><div className="shell pt-12"><h1 className="micro text-neutral-400 uppercase">Intranet</h1></div><ModulesSection /></main></>;
}
