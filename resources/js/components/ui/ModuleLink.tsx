import { Link } from '@inertiajs/react';
import type { ComponentProps } from 'react';

type ModuleLinkProps = Pick<ComponentProps<'a'>, 'children' | 'className' | 'aria-current'> & {
    href: string;
    onClick?: () => void;
};

export default function ModuleLink({ href, ...props }: ModuleLinkProps) {
    return /^https?:\/\//.test(href)
        ? <a href={href} {...props} />
        : <Link href={href} {...props} />;
}
