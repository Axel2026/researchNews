import { type NextRequest, type NextResponse } from 'next/server';

export type PendingCookie = {
  name: string;
  value: string;
  options: Parameters<NextResponse['cookies']['set']>[2];
};

export type ApplySessionParams = {
  request: NextRequest;
};
