import { redirect } from 'next/navigation';
import { config } from '@/lib/config';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if setup is already complete
  const isComplete = await config.isSetupComplete();
  
  if (isComplete) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome to E-Commerce Platform
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Let&apos;s set up your store in a few simple steps
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}