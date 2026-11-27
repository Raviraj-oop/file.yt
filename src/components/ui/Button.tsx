import React from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outlineLight';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  to?: string;
  href?: string;
  external?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  'aria-label'?: string;
}

const base =
  'group inline-flex select-none items-center justify-center gap-2 min-w-0 max-w-full rounded-xl text-center leading-tight font-semibold transition duration-200 active:scale-[.98] disabled:pointer-events-none disabled:opacity-45';

const variants: Record<Variant, string> = {
  primary: 'action-primary bg-brand-700 text-white shadow-brand hover:-translate-y-0.5',
  secondary: 'border border-ink-300 bg-white text-ink-900 shadow-sm hover:border-ink-400 hover:bg-ink-50 hover:-translate-y-0.5',
  ghost: 'text-ink-700 hover:bg-ink-100 hover:text-ink-900',
  light: 'bg-white text-ink-900 hover:bg-brand-50 hover:-translate-y-0.5',
  outlineLight: 'border border-white/25 text-white hover:bg-white/10 hover:-translate-y-0.5',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'min-h-11 px-4 py-2 text-base sm:px-5',
};

const Button = ({ children, variant = 'primary', size = 'md', to, href, external, type = 'button', className = '', ...rest }: ButtonProps) => {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (to) return <Link to={to} className={cls} onClick={rest.onClick} aria-label={rest['aria-label']}>{children}</Link>;
  if (href) {
    const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return <a href={href} className={cls} onClick={rest.onClick} aria-label={rest['aria-label']} {...ext}>{children}</a>;
  }
  return <button type={type} className={cls} {...rest}>{children}</button>;
};

export default Button;
