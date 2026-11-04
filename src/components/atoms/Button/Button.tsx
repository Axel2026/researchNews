import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary';

type CommonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  newWindowHint?: string;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
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

    if (/^https?:\/\//i.test(props.href)) {
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

  return (
    <button type={type} className={classNames} disabled={disabled}>
      {children}
    </button>
  );
}
