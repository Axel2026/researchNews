export type AccountMenuStatus = 'pending' | 'anonymous' | 'authenticated';

export type AccountMenuViewProps = {
  status: AccountMenuStatus;
  onSignOut?: () => void;
};
