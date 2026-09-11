import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { homeUrl } from '../../config/modules';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const update = () => setScrolled(window.scrollY > 24);
        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, []);
    return <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled ? 'border-white/10 bg-[#050505]/90 backdrop-blur-xl' : 'border-transparent'}`}>
        <div className="shell flex h-22 items-center justify-between">
            <Link href={homeUrl} aria-label="VELVET home" className="flex min-h-11 shrink-0 items-center">
                <span className="relative block aspect-[1920/520] w-36 overflow-hidden sm:w-44">
                    <img src="/assets/LOGO.svg" alt="VELVET" width="1920" height="1080" className="absolute left-0 top-[-53.8462%] h-auto w-full" />
                </span>
            </Link>
        </div>
    </header>;
}
