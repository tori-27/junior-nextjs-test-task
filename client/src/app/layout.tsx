'use client';

import './globals.css';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/layout/Header';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
        <QueryClientProvider client={queryClient}>
            <Header />
            <main>{children}</main>
        </QueryClientProvider>
        </body>
        </html>
    );
}
