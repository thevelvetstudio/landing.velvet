import { Head } from '@inertiajs/react';
import Hero from '../components/landing/Hero';
import Navbar from '../components/landing/Navbar';

export default function Landing() {
    return <><Head title="VELVET" /><a href="#main" className="skip-link">Skip to content</a><Navbar /><main id="main"><Hero /></main></>;
}
