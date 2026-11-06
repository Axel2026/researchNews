import styles from './Loader.module.css';

export function Loader({ label }: { label: string }) {
  return (
    <div className={styles.root} role="status">
      <svg
        className={styles.spinner}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeDasharray="42"
          strokeLinecap="round"
        />
      </svg>
      <span className={styles.visuallyHidden}>{label}</span>
    </div>
  );
}
