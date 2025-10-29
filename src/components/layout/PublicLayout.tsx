import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface PublicLayoutProps {
  children: ReactNode;
}

export default async function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}