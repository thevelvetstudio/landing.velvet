import Seo from '../components/Seo';
import Hero from '../components/landing/Hero';
import Navbar from '../components/landing/Navbar';

export default function Landing() {
    return <><Seo /><a href="#main" className="skip-link">Skip to content</a><Navbar /><main id="main"><Hero /></main></>;
}
