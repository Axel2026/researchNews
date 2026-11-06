'use client';

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import styles from './field.module.css';

export type SelectOption = {
  value: string;
  label: string;
};

export function Select({
  label,
  value,
  options,
  onChange,
  error,
  describedBy,
  invalid,
  className,
  disabled,
  id,
}: {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  error?: string;
  describedBy?: string;
  invalid?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
}) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const labelId = `${fieldId}-label`;
  const listId = `${fieldId}-list`;
  const errorId = `${fieldId}-error`;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchRef = useRef('');
  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const [open, setOpen] = useState(false);
  const [listStyle, setListStyle] = useState<CSSProperties>();
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const selected = options[selectedIndex] ?? options[0];
  const showError = Boolean(error);
  const isInvalid = showError || Boolean(invalid);
  const described = [describedBy, showError ? errorId : undefined]
    .filter(Boolean)
    .join(' ');

  useLayoutEffect(() => {
    const list = listRef.current;
    const button = buttonRef.current;

    function updatePosition() {
      if (!buttonRef.current) {
        return;
      }

      const box = buttonRef.current.getBoundingClientRect();
      setListStyle({
        top: box.bottom,
        left: box.left,
        width: box.width,
      });
    }

    if (open && button && list) {
      updatePosition();
      if (!list.matches(':popover-open')) {
        list.showPopover();
      }
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }

    if (list?.matches(':popover-open')) {
      list.hidePopover();
    }

    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onPointerDown(event: PointerEvent) {
      const path = event.composedPath();
      if (
        path.includes(buttonRef.current as EventTarget) ||
        path.includes(listRef.current as EventTarget)
      ) {
        return;
      }

      setOpen(false);
    }

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open]);

  function close() {
    setOpen(false);
  }

  function choose(index: number) {
    const option = options[index];
    if (!option) {
      return;
    }

    onChange(option.value);
    close();
  }

  function move(next: number) {
    if (options.length === 0) {
      return;
    }

    setActiveIndex((next + options.length) % options.length);
  }

  function search(key: string) {
    window.clearTimeout(searchTimer.current);
    searchRef.current += key.toLowerCase();
    const query = searchRef.current;
    const index = options.findIndex((option) =>
      option.label.toLowerCase().startsWith(query),
    );
    const match = options[index];
    if (match) {
      if (open) {
        setActiveIndex(index);
      } else {
        onChange(match.value);
      }
    }

    searchTimer.current = setTimeout(() => {
      searchRef.current = '';
    }, 500);
  }

  function onButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setActiveIndex(selectedIndex);
        return;
      }
      move(activeIndex + 1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setActiveIndex(selectedIndex);
        return;
      }
      move(activeIndex - 1);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (open) {
        choose(activeIndex);
        return;
      }
      setOpen(true);
      return;
    }

    if (event.key === 'Escape' && open) {
      event.preventDefault();
      close();
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(options.length - 1);
      return;
    }

    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
      search(event.key);
    }
  }

  const activeId = `${fieldId}-option-${activeIndex}`;

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label className={styles.label} htmlFor={fieldId} id={labelId}>
        {label}
      </label>
      <button
        ref={buttonRef}
        id={fieldId}
        type="button"
        className={`${styles.control} ${styles.trigger}`}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? activeId : undefined}
        aria-invalid={isInvalid || undefined}
        aria-describedby={described || undefined}
        role="combobox"
        aria-autocomplete="none"
        onClick={() => {
          if (!open) {
            setActiveIndex(selectedIndex);
          }
          setOpen((current) => !current);
        }}
        onKeyDown={onButtonKeyDown}
      >
        <span className={styles.value}>{selected?.label}</span>
        <svg
          className={styles.chevron}
          viewBox="0 0 12 12"
          width="12"
          height="12"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M2.2 4.2 6 8l3.8-3.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <ul
        ref={listRef}
        id={listId}
        className={styles.list}
        popover="manual"
        role="listbox"
        aria-labelledby={labelId}
        style={open ? listStyle : undefined}
        onPointerDown={(event) => event.stopPropagation()}
      >
        {options.map((option, index) => {
          const isActive = index === activeIndex;
          const isSelected = option.value === value;

          return (
            <li
              key={`${option.value}-${index}`}
              id={`${fieldId}-option-${index}`}
              role="option"
              className={[
                styles.option,
                isSelected ? styles.selected : undefined,
                isActive ? styles.active : undefined,
              ]
                .filter(Boolean)
                .join(' ')}
              aria-selected={isSelected}
              data-active={isActive || undefined}
              onClick={() => choose(index)}
            >
              {option.label}
            </li>
          );
        })}
      </ul>
      {showError ? (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
