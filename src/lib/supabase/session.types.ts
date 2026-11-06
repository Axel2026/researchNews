import { type NextResponse } from 'next/server';

export type PendingCookie = {
  name: string;
  value: string;
  options: Parameters<NextResponse['cookies']['set']>[2];
};
