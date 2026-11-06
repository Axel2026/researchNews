export type BookmarkButtonStatus =
  'pending' | 'anonymous' | 'saved' | 'unsaved';

export type BookmarkButtonViewProps = {
  status: BookmarkButtonStatus;
  nextPath: string;
  busy?: boolean;
  onToggle?: () => void;
  copy: {
    add: string;
    remove: string;
    signIn: string;
    loading: string;
  };
};
