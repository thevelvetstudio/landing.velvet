// Adapted from React Bits SplitText (TypeScript/Tailwind); see THIRD_PARTY_NOTICES.md.
import { gsap } from 'gsap';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(GSAPSplitText);

export default function SplitText({ text, className = '' }: { text: string; className?: string }) {
    const ref = useRef<HTMLHeadingElement>(null);
    useEffect(() => {
        const media = gsap.matchMedia();
        media.add('(prefers-reduced-motion: no-preference)', () => {
            if (!ref.current) return;
            const split = new GSAPSplitText(ref.current, { type: 'chars', charsClass: 'split-char', aria: 'auto' });
            gsap.fromTo(split.chars, { opacity: 0, y: 12, filter: 'blur(6px)' }, {
                opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1,
                stagger: 0.075, ease: 'power3.out', onComplete: () => { split.revert(); },
            });
            return () => split.revert();
        });
        return () => media.revert();
    }, [text]);
    return <h1 ref={ref} className={className}>{text}</h1>;
}
