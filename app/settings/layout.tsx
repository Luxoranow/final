'use client';

import { ReactNode } from 'react';
import DashboardLayout from '../dashboard/layout';

interface SettingsLayoutProps {
  children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 