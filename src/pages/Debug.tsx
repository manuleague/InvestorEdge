import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function DatabaseDebug() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [testEmail, setTestEmail] = useState('');
  const [testPassword, setTestPassword] = useState('');
  const [testResult, setTestResult] = useState('');

  const handleClearDatabase = async () => {
    try {
      setLoading(true);
      setTestResult('Starting database cleanup...');

      // Delete all portfolios
      const { error: portfoliosError } = await supabase
        .from('portfolios')
        .delete()
        .neq('id', '0'); // Using neq to ensure we delete all records

      if (portfoliosError) {
        throw new Error(`Error deleting portfolios: ${portfoliosError.message}`);
      }

      // Delete all profiles
      const { error: profilesError } = await supabase
        .from('profiles')
        .delete()
        .neq('id', '0'); // Using neq to ensure we delete all records

      if (profilesError) {
        throw new Error(`Error deleting profiles: ${profilesError.message}`);
      }

      // Delete all users from auth
      const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();
      if (usersError) {
        throw new Error(`Error listing users: ${usersError.message}`);
      }

      for (const user of users || []) {
        const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
        if (deleteError) {
          console.error(`Error deleting user ${user.id}:`, deleteError);
        }
      }

      setTestResult('Database cleaned successfully! You can now create new accounts.');
      
      // Refresh the data
      fetchData();
    } catch (error) {
      setTestResult(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [{ data: profilesData }, { data: portfoliosData }] = await Promise.all([
        supabase.from('profiles').select(),
        supabase.from('portfolios').select()
      ]);

      setProfiles(profilesData || []);
      setPortfolios(portfoliosData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetEmail = async (email: string) => {
    try {
      // First check if user exists
      const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();
      
      if (usersError) {
        setTestResult('Error checking user: ' + usersError.message);
        return;
      }

      const user = users?.find(u => u.email === email);
      
      if (!user) {
        // If user doesn't exist, try to delete any partial data
        const { error: deleteError } = await supabase
          .from('profiles')
          .delete()
          .eq('email', email);
          
        if (deleteError) {
          setTestResult('Error cleaning up: ' + deleteError.message);
          return;
        }
        
        setTestResult('Email cleaned up. You can try registering again.');
      } else {
        // If user exists, try to resend confirmation email
        const { error: resendError } = await supabase.auth.resend({
          type: 'signup',
          email: email,
          options: {
            emailRedirectTo: `${window.location.origin}/login?confirmed=true`
          }
        });

        if (resendError) {
          setTestResult('Error resending email: ' + resendError.message);
          return;
        }

        setTestResult('Confirmation email resent. Please check your inbox and spam folder.');
      }
    } catch (error) {
      setTestResult('Error: ' + (error as Error).message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // First, let's check the current auth state
        const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser();
        console.log('Current auth state:', { currentUser, authError });

        // Get all users from auth.users (this will show if your account exists)
        const { data: authUsers, error: authUsersError } = await supabase.auth.admin.listUsers();
        console.log('Auth users:', { authUsers, authUsersError });

        // Fetch profiles
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('*');
        console.log('Profiles data:', { profilesData, profilesError });
        
        if (profilesError) throw profilesError;
        setProfiles(profilesData || []);

        // Fetch portfolios
        const { data: portfoliosData, error: portfoliosError } = await supabase
          .from('portfolios')
          .select('*');
        console.log('Portfolios data:', { portfoliosData, portfoliosError });
        
        if (portfoliosError) throw portfoliosError;
        setPortfolios(portfoliosData || []);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading database contents...</div>;
  }

  const testLogin = async () => {
    try {
      setTestResult('Testing login...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });

      if (error) {
        setTestResult(`Login Error: ${error.message}`);
        console.error('Test login error:', error);
      } else {
        setTestResult(`Login Successful! User ID: ${data.user?.id}`);
        console.log('Test login success:', data);
      }
    } catch (err) {
      setTestResult(`Test Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('Test error:', err);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Test Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-zinc-200">Email</label>
              <Input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-200">Password</label>
              <Input
                type="password"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white mt-1"
              />
            </div>
            <Button onClick={testLogin} className="w-full bg-emerald-600 hover:bg-emerald-700">
              Test Login
            </Button>
            {testResult && (
              <div className="mt-4 p-4 rounded bg-zinc-800 text-white">
                {testResult}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profiles Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-mono">{profile.id}</TableCell>
                  <TableCell>{profile.full_name}</TableCell>
                  <TableCell>{new Date(profile.created_at).toLocaleString()}</TableCell>
                  <TableCell>{new Date(profile.updated_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
              {profiles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No profiles found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Portfolios Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Stock Symbol</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Average Price</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolios.map((portfolio) => (
                <TableRow key={portfolio.id}>
                  <TableCell className="font-mono">{portfolio.id}</TableCell>
                  <TableCell className="font-mono">{portfolio.user_id}</TableCell>
                  <TableCell>{portfolio.stock_symbol}</TableCell>
                  <TableCell>{portfolio.quantity}</TableCell>
                  <TableCell>${portfolio.average_price.toFixed(2)}</TableCell>
                  <TableCell>{new Date(portfolio.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
              {portfolios.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No portfolios found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}