import type { VelvetModule } from '../types/module';

export const homeUrl = '/';
export const intranetUrl = '/intranet';
export const applyUrl = '/aplicar';
export const velvetModules = [
    { id: 'app', index: '01', name: 'APP', label: 'App', layer: 'OPERATIONAL LAYER', href: '/app', description: 'The operational layer of VELVET. Tools, workflows and access to the ecosystem.', cta: 'Enter App' },
    { id: 'finance', index: '02', name: 'FINANCE', label: 'Finance', layer: 'FINANCIAL LAYER', href: 'https://finance.thevelvetstudio.co/', description: 'Capital, movements, metrics and financial control.', cta: 'Enter Finance' },
    { id: 'master', index: '03', name: 'MASTER', label: 'Master', layer: 'CONTROL LAYER', href: '/master', description: 'The control layer for infrastructure, administration and global oversight.', cta: 'Enter Master' },
] as const satisfies readonly VelvetModule[];
