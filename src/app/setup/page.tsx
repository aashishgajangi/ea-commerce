'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, AlertCircle, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import type { DiagnosticsResponse, DiagnosticResult } from '@/app/api/setup/diagnostics/route';

type SetupStep = 1 | 2 | 3 | 4;

export default function SetupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<SetupStep>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [diagnostics, setDiagnostics] = useState<DiagnosticsResponse | null>(null);
  const [error, setError] = useState<string>('');

  // Form state
  const [adminData, setAdminData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const [siteData, setSiteData] = useState({
    siteName: 'My Store',
    siteDescription: 'Your amazing online store',
    currency: 'USD',
    timezone: 'UTC'
  });

  // Load diagnostics on mount
  useEffect(() => {
    loadDiagnostics();
  }, []);

  const loadDiagnostics = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/setup/diagnostics');
      const data = await response.json();
      setDiagnostics(data);
    } catch {
      setError('Failed to load system diagnostics');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    setError('');
    
    if (currentStep === 1) {
      // Check if there are any FAIL status (critical errors)
      const hasCriticalErrors = diagnostics?.results.some(r => r.status === 'fail');
      if (hasCriticalErrors) {
        setError('Please fix critical errors (FAIL status) before continuing. Warnings are OK.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate admin data
      if (!adminData.email || !adminData.password || !adminData.name) {
        setError('All fields are required');
        return;
      }
      if (adminData.password !== adminData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (adminData.password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Validate site data
      if (!siteData.siteName) {
        setError('Site name is required');
        return;
      }
      setCurrentStep(4);
    } else if (currentStep === 4) {
      // Complete setup
      await completeSetup();
    }
  };

  const handleBack = () => {
    setError('');
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as SetupStep);
    }
  };

  const completeSetup = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Create admin user
      const adminResponse = await fetch('/api/setup/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminData)
      });

      if (!adminResponse.ok) {
        const adminResult = await adminResponse.json();
        throw new Error(adminResult.error || 'Failed to create admin user');
      }

      // Save site settings
      const settingsResponse = await fetch('/api/setup/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteData)
      });

      if (!settingsResponse.ok) {
        throw new Error('Failed to save settings');
      }

      // Mark setup as complete
      const completeResponse = await fetch('/api/setup/complete', {
        method: 'POST'
      });

      if (!completeResponse.ok) {
        throw new Error('Failed to complete setup');
      }

      // Redirect to admin
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Setup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>System Diagnostics</CardTitle>
              <CardDescription>
                Checking your system configuration and requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
                </div>
              )}
              
              {!isLoading && diagnostics && (
                <div className="space-y-3">
                  {diagnostics.results.map((result, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg border bg-slate-50 dark:bg-slate-900"
                    >
                      <div className="mt-0.5">{getStatusIcon(result.status)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-slate-900 dark:text-white">
                            {result.name}
                          </h4>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              result.status === 'pass'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                : result.status === 'fail'
                                ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                            }`}
                          >
                            {result.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {result.message}
                        </p>
                        {result.details && (
                          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                            {result.details}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!isLoading && diagnostics && !diagnostics.success && (
                <Alert variant="destructive">
                  <AlertDescription>
                    Some critical checks failed. Please fix the errors before continuing.
                  </AlertDescription>
                </Alert>
              )}

              {!isLoading && diagnostics && diagnostics.success && (
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    All checks passed! Your system is ready for setup.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={loadDiagnostics}
                variant="outline"
                disabled={isLoading}
                className="mr-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  'Re-run Tests'
                )}
              </Button>
            </CardFooter>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Create Admin Account</CardTitle>
              <CardDescription>
                Set up your administrator account to manage the store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={adminData.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAdminData({ ...adminData, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={adminData.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAdminData({ ...adminData, email: e.target.value })}
                  placeholder="admin@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={adminData.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAdminData({ ...adminData, password: e.target.value })}
                  placeholder="••••••••"
                />
                <p className="text-xs text-slate-500">Minimum 8 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={adminData.confirmPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAdminData({ ...adminData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Basic Settings</CardTitle>
              <CardDescription>
                Configure your store&apos;s basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Store Name</Label>
                <Input
                  id="siteName"
                  value={siteData.siteName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSiteData({ ...siteData, siteName: e.target.value })}
                  placeholder="My Awesome Store"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Store Description</Label>
                <Input
                  id="siteDescription"
                  value={siteData.siteDescription}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSiteData({ ...siteData, siteDescription: e.target.value })}
                  placeholder="Best products at great prices"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <select
                    id="currency"
                    value={siteData.currency}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setSiteData({ ...siteData, currency: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="INR">INR - Indian Rupee</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    value={siteData.timezone}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setSiteData({ ...siteData, timezone: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                    <option value="Europe/London">London</option>
                    <option value="Asia/Kolkata">India</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Ready to Launch!</CardTitle>
              <CardDescription>
                Review your setup and complete the installation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border">
                  <h4 className="font-medium mb-2">Admin Account</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Name: {adminData.name}<br />
                    Email: {adminData.email}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border">
                  <h4 className="font-medium mb-2">Store Settings</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Name: {siteData.siteName}<br />
                    Currency: {siteData.currency}<br />
                    Timezone: {siteData.timezone}
                  </p>
                </div>
              </div>

              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  Click &quot;Complete Setup&quot; to finish the installation and access your admin dashboard.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : step < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
              }`}
            >
              {step < currentStep ? <CheckCircle2 className="h-4 w-4" /> : step}
            </div>
            {step < 4 && (
              <div
                className={`w-12 h-0.5 ${
                  step < currentStep
                    ? 'bg-green-500'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {renderStep()}

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1 || isLoading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button
          onClick={handleNext}
          disabled={isLoading || (currentStep === 1 && diagnostics?.results.some(r => r.status === 'fail'))}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : currentStep === 4 ? (
            'Complete Setup'
          ) : (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}