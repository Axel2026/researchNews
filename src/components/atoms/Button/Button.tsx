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
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: 'button' | 'submit' | 'reset';
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
    if (/^https?:\/\//i.test(props.href)) {
      return (
        <a
          href={props.href}
          className={classNames}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
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

  return (
    <button type={type} className={classNames}>
      {children}
    </button>
  );
}
