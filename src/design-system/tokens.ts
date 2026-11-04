export const colors = [
  { name: 'Background', variable: '--color-bg', value: '#f6f1e8' },
  { name: 'Ink', variable: '--color-ink', value: '#3a291c' },
  { name: 'Muted', variable: '--color-muted', value: '#655445' },
  { name: 'Line', variable: '--color-line', value: '#e4ddd2' },
  { name: 'Rule', variable: '--color-rule', value: '#b9ab96' },
  { name: 'Accent', variable: '--color-accent', value: '#a84c1e' },
  { name: 'Accent hover', variable: '--color-accent-hover', value: '#7f3a15' },
  { name: 'Surface', variable: '--color-surface', value: '#fffdf8' },
  { name: 'Peach', variable: '--color-peach', value: '#f3d5c0' },
  { name: 'Hero', variable: '--color-hero', value: '#ece4d6' },
  { name: 'Chip border', variable: '--color-chip-border', value: '#d8d0c4' },
  {
    name: 'Control border',
    variable: '--color-control-border',
    value: '#7d6b5a',
  },
] as const;

export const fonts = [
  {
    name: 'Serif',
    variable: '--font-serif',
    value: 'Newsreader, Georgia, serif',
    sample: 'Research papers, plain language.',
  },
  {
    name: 'Sans',
    variable: '--font-sans',
    value: 'Source Sans 3, system-ui, sans-serif',
    sample: 'Scientific jargon, closer.',
  },
] as const;

export const fontSizes = [
  { name: 'XS', variable: '--text-xs', value: '0.72rem', sample: 'Kicker' },
  { name: 'SM', variable: '--text-sm', value: '0.78rem', sample: 'Chip' },
  { name: 'MD', variable: '--text-md', value: '0.88rem', sample: 'Button' },
  { name: 'Base', variable: '--text-base', value: '1.05rem', sample: 'Body' },
  { name: 'LG', variable: '--text-lg', value: '1.15rem', sample: 'Dek' },
  { name: 'XL', variable: '--text-xl', value: '1.45rem', sample: 'Brand' },
  { name: '2XL', variable: '--text-2xl', value: '1.65rem', sample: 'Section' },
  {
    name: 'Display',
    variable: '--text-display',
    value: 'clamp(2.1rem, 5vw, 3.5rem)',
    sample: 'Headline',
  },
] as const;

export const fontWeights = [
  { name: 'Regular', variable: '--weight-regular', value: '400' },
  { name: 'Semibold', variable: '--weight-semibold', value: '600' },
  { name: 'Bold', variable: '--weight-bold', value: '700' },
] as const;

export const lineHeights = [
  { name: 'Tight', variable: '--leading-tight', value: '1.08' },
  { name: 'Snug', variable: '--leading-snug', value: '1.2' },
  { name: 'Normal', variable: '--leading-normal', value: '1.55' },
  { name: 'Relaxed', variable: '--leading-relaxed', value: '1.75' },
] as const;

export const letterSpacings = [
  { name: 'Tight', variable: '--tracking-tight', value: '-0.035em' },
  { name: 'Display', variable: '--tracking-display', value: '-0.03em' },
  { name: 'Wide', variable: '--tracking-wide', value: '0.14em' },
] as const;

export const spacing = [
  { name: '1', variable: '--space-1', value: '0.25rem' },
  { name: '2', variable: '--space-2', value: '0.5rem' },
  { name: '3', variable: '--space-3', value: '0.75rem' },
  { name: '4', variable: '--space-4', value: '1rem' },
  { name: '5', variable: '--space-5', value: '1.25rem' },
  { name: '6', variable: '--space-6', value: '1.5rem' },
  { name: '8', variable: '--space-8', value: '2rem' },
  { name: '10', variable: '--space-10', value: '2.5rem' },
  { name: '12', variable: '--space-12', value: '3rem' },
  { name: '16', variable: '--space-16', value: '4rem' },
] as const;

export const radii = [
  { name: 'Small', variable: '--radius-sm', value: '4px' },
  { name: 'Medium', variable: '--radius-md', value: '10px' },
  { name: 'Pill', variable: '--radius-pill', value: '999px' },
] as const;

export const borders = [
  { name: 'Width', variable: '--border-width', value: '1px' },
  { name: 'Rule', variable: '--border-rule', value: '3px' },
  { name: 'Line color', variable: '--color-line', value: '#e4ddd2' },
  { name: 'Rule color', variable: '--color-rule', value: '#b9ab96' },
  { name: 'Chip border', variable: '--color-chip-border', value: '#d8d0c4' },
] as const;

export const breakpoints = [
  {
    name: 'Large',
    variable: '--breakpoint-lg',
    value: '64rem',
    media: '(min-width: 64rem)',
    use: 'Four-column article grid, featured story split, and article sidebar.',
  },
] as const;

export const mediaMinLg = breakpoints[0].media;

export const zIndexes = [
  {
    name: 'Base',
    variable: '--z-base',
    value: '0',
    use: 'Decorative layers behind content, such as paper grain.',
  },
  {
    name: 'Content',
    variable: '--z-content',
    value: '1',
    use: 'Default in-flow page sections and local overlays inside a card.',
  },
  {
    name: 'Raised',
    variable: '--z-raised',
    value: '2',
    use: 'Chrome that must overlay sibling content, such as the page header.',
  },
  {
    name: 'Dropdown',
    variable: '--z-dropdown',
    value: '20',
    use: 'Menus and disclosure panels. Popover top layer keeps them above page content.',
  },
  {
    name: 'Skip',
    variable: '--z-skip',
    value: '30',
    use: 'Skip link. Keep this the top layer in the document.',
  },
] as const;
