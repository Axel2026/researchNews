'use client';
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { Modal } from '@/components/atoms/Modal/Modal';
import styles from './Dropdown.module.css';
import type { DropdownProps } from './Dropdown.types';
import {
  isMobile,
  mobileQuery,
  notMobile,
  panelStyle,
  subscribeMobile,
  subscribeNoop,
} from './Dropdown.utils';

export function Dropdown({
  label,
  triggerClassName,
  panelClassName,
  rootClassName,
  align = 'end',
  ariaLabel,
  icon = false,
  size = 'default',
  children,
  mobileAsModal: mobileAsModalProp,
  title,
  closeLabel,
}: DropdownProps) {
  const mobileAsModal = Boolean(mobileAsModalProp);
  const reactId = useId();
  const buttonId = `${reactId}-button`;
  const listId = `${reactId}-list`;
  const dialogId = `${reactId}-dialog`;
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const pendingFocus = useRef<'first' | 'last' | null>(null);
  const [open, setOpen] = useState(false);
  const [listStyle, setListStyle] = useState<CSSProperties>();
  const mobile = useSyncExternalStore(
    mobileAsModal ? (onChange) => subscribeMobile({ onChange }) : subscribeNoop,
    mobileAsModal ? isMobile : notMobile,
    notMobile,
  );
  const useModal = mobileAsModal && mobile;

  function items() {
    return [
      ...(listRef.current?.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])',
      ) ?? []),
    ];
  }

  useEffect(() => {
    if (!mobileAsModal) {
      return;
    }

    const media = window.matchMedia(mobileQuery);

    function onChange() {
      setOpen(false);
    }

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [mobileAsModal]);

  useLayoutEffect(() => {
    const list = listRef.current;
    const button = buttonRef.current;

    if (!list || useModal) {
      return;
    }

    function updatePosition() {
      if (!buttonRef.current) {
        return;
      }

      setListStyle(panelStyle({ button: buttonRef.current, align }));
    }

    if (open && button) {
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

    if (list.matches(':popover-open')) {
      list.hidePopover();
    }

    return undefined;
  }, [align, open, useModal]);

  useEffect(() => {
    if (!open || useModal) {
      return;
    }

    const focusTarget = pendingFocus.current;
    const focusable = items();
    if (focusTarget === 'last') {
      focusable[focusable.length - 1]?.focus();
    } else if (focusTarget === 'first') {
      focusable[0]?.focus();
    }
    pendingFocus.current = null;

    function onPointerDown(event: PointerEvent) {
      const path = event.composedPath();
      if (
        path.includes(rootRef.current as EventTarget) ||
        path.includes(listRef.current as EventTarget)
      ) {
        return;
      }

      setOpen(false);
    }

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open, useModal]);

  function close(restoreFocus = false) {
    setOpen(false);
    if (restoreFocus) {
      buttonRef.current?.focus();
    }
  }

  function onButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      pendingFocus.current = event.key === 'ArrowUp' ? 'last' : 'first';
      setOpen(true);
      return;
    }

    if (event.key === 'Escape' && open) {
      event.preventDefault();
      close(true);
    }
  }

  function onListKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const focusable = items();
    const index = focusable.findIndex(
      (item) => item === document.activeElement,
    );

    if (event.key === 'Escape') {
      event.preventDefault();
      close(true);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      focusable[0]?.focus();
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      focusable[focusable.length - 1]?.focus();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusable[(index + 1) % focusable.length]?.focus();
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusable[(index - 1 + focusable.length) % focusable.length]?.focus();
    }
  }

  function onBlur(event: FocusEvent<HTMLDivElement>) {
    if (useModal) {
      return;
    }

    const next = event.relatedTarget;
    if (
      !(next instanceof Node) ||
      rootRef.current?.contains(next) ||
      listRef.current?.contains(next)
    ) {
      return;
    }

    setOpen(false);
  }

  function onListClick(event: MouseEvent<HTMLUListElement>) {
    const target = event.target;
    if (target instanceof Element && target.closest('a, button')) {
      setOpen(false);
    }
  }

  const triggerClass = [icon ? styles.iconTrigger : undefined, triggerClassName]
    .filter(Boolean)
    .join(' ');

  const listClass = [
    styles.list,
    size === 'compact' ? styles.compact : undefined,
    panelClassName,
  ]
    .filter(Boolean)
    .join(' ');
  const controlsId = useModal ? dialogId : listId;
  const popupType = useModal ? 'dialog' : true;
  const listPosition = open ? listStyle : undefined;

  function toggleOpen() {
    setOpen((value) => !value);
  }

  function closeAndReturnFocus() {
    close(true);
  }

  function keepListOpen(event: ReactPointerEvent<HTMLUListElement>) {
    event.stopPropagation();
  }

  return (
    <div
      className={[styles.root, rootClassName].filter(Boolean).join(' ')}
      ref={rootRef}
      onBlur={onBlur}
    >
      <button
        ref={buttonRef}
        id={buttonId}
        className={triggerClass}
        type="button"
        aria-expanded={open}
        aria-controls={controlsId}
        aria-haspopup={popupType}
        aria-label={ariaLabel}
        onClick={toggleOpen}
        onKeyDown={onButtonKeyDown}
      >
        {label}
      </button>
      {useModal && title && closeLabel ? (
        <Modal
          id={dialogId}
          open={open}
          onClose={closeAndReturnFocus}
          title={title}
          closeLabel={closeLabel}
        >
          <ul className={styles.modalList} role="list" onClick={onListClick}>
            {children}
          </ul>
        </Modal>
      ) : (
        <ul
          ref={listRef}
          id={listId}
          className={listClass}
          popover="manual"
          role="list"
          aria-labelledby={buttonId}
          style={listPosition}
          onKeyDown={onListKeyDown}
          onPointerDown={keepListOpen}
          onClick={onListClick}
        >
          {children}
        </ul>
      )}
    </div>
  );
}
