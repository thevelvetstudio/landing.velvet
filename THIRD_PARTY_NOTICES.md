# React Bits

## Molten Metal

`resources/js/components/ui/MoltenMetal.tsx` is the official TypeScript/Tailwind Molten Metal background by David Haz, integrated using OGL.

- Component: https://reactbits.dev/backgrounds/molten-metal
- Source: https://github.com/DavidHDev/react-bits/blob/main/src/ts-tailwind/Backgrounds/MoltenMetal/MoltenMetal.tsx
- License: [REACT_BITS_LICENSE.md](REACT_BITS_LICENSE.md).

Local adjustments: cap pixel ratio at 1.25, check WebGL2 support before mounting, synchronize lightMode. The landing wrapper uses the logo's #d6263b red with burgundy and pale highlights, a dark contrast overlay, lazy loading, and a static CSS fallback for reduced motion or unsupported WebGL2. The original visibility-based rendering pause and cleanup are preserved.

## SplitText (retained, not used by the current SVG hero)

The hero component `resources/js/components/ui/SplitText.tsx` is a focused adaptation of React Bits SplitText (TypeScript + Tailwind), by David Haz.

- Component: https://reactbits.dev/text-animations/split-text
- Installation: https://reactbits.dev/get-started/installation
- Original source: https://github.com/DavidHDev/react-bits/blob/main/src/ts-tailwind/TextAnimations/SplitText/SplitText.tsx
- License: see [REACT_BITS_LICENSE.md](REACT_BITS_LICENSE.md), downloaded with the component.

Installed manually from the official source, following the copy-and-customize component model. The adaptation retains GSAP SplitText and staggered character animation, removes unused configuration and ScrollTrigger, and uses a React effect with GSAP context cleanup instead of the additional @gsap/react wrapper. It adds live reduced-motion support and reverts to plain heading text after the entrance finishes. GSAP is the only animation dependency; Motion / Framer Motion is not installed.
