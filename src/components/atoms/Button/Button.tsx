import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import styles from './Button.module.css';

type AppHref = ComponentProps<typeof Link>['href'];

type ButtonVariant = 'primary' | 'secondary';

type CommonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: AppHref;
  newWindowHint?: string;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  'aria-pressed'?: boolean;
  'aria-busy'?: boolean;
};

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonAsLink | ButtonAsButton) {
  const classNames = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  if ('href' in props && props.href) {
    const hint = 'newWindowHint' in props ? props.newWindowHint : undefined;
    const hintText = hint ? (
      <span className={styles.visuallyHidden}>{hint}</span>
    ) : null;

    if (typeof props.href === 'string' && /^https?:\/\//i.test(props.href)) {
      return (
        <a
          href={props.href}
          className={classNames}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
          {hintText}
        </a>
      );
    }

    return (
      <Link href={props.href} className={classNames}>
        {children}
      </Link>
    );
  }

  const type = 'type' in props && props.type ? props.type : 'button';
  const disabled = 'disabled' in props ? props.disabled : undefined;
  const onClick = 'onClick' in props ? props.onClick : undefined;
  const pressed = 'aria-pressed' in props ? props['aria-pressed'] : undefined;
  const busy = 'aria-busy' in props ? props['aria-busy'] : undefined;

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      aria-pressed={pressed}
      aria-busy={busy}
    >
      {children}
    </button>
  );
}
