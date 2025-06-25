export const SIZES = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
} as const;
export type Size = keyof typeof SIZES;