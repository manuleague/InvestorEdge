import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../contexts/auth-context';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  totalPortfolioValue: number;
  totalPositions: number;
}

interface ChartData {
  name: string;
  value: number;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalPortfolioValue: 0,
    totalPositions: 0,
  });
  const [users, setUsers] = useState<Database['public']['Tables']['profiles']['Row'][]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Check if user is admin
  const isAdmin = user?.email === 'admin@example.com'; // TODO: Replace with proper admin check

  useEffect(() => {
    async function fetchAdminData() {
      if (!isAdmin) return;

      try {
        // Fetch users
        const { data: usersData } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        // Fetch portfolios
        const { data: portfoliosData } = await supabase
          .from('portfolios')
          .select() as { data: Database['public']['Tables']['portfolios']['Row'][] | null };

        if (usersData && portfoliosData) {
          // Calculate statistics
          const activeUserIds = new Set(portfoliosData.map(p => p.user_id));
          const totalPortfolioValue = portfoliosData.reduce(
            (sum, p) => sum + (p.quantity || 0) * (p.average_price || 0),
            0
          );

          setStats({
            totalUsers: usersData.length,
            activeUsers: activeUserIds.size,
            totalPortfolioValue,
            totalPositions: portfoliosData.length,
          });

          setUsers(usersData);

          // Prepare chart data
          const portfoliosByMonth = portfoliosData.reduce((acc: { [key: string]: number }, p) => {
            const month = new Date(p.created_at).toLocaleString('default', { month: 'short' });
            acc[month] = (acc[month] || 0) + 1;
            return acc;
          }, {});

          setChartData(
            Object.entries(portfoliosByMonth).map(([name, value]) => ({
              name,
              value,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAdminData();
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-destructive">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-zinc-800 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-zinc-800 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Admin Dashboard</h2>
        <p className="text-muted-foreground">Platform statistics and user management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Total Users</CardTitle>
            <CardDescription>Platform registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Active Users</CardTitle>
            <CardDescription>Users with portfolios</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.activeUsers}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Total Portfolio Value</CardTitle>
            <CardDescription>All users combined</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${stats.totalPortfolioValue.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Total Positions</CardTitle>
            <CardDescription>Active investments</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalPositions}</p>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Growth Chart */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle>Portfolio Growth</CardTitle>
          <CardDescription>Number of new positions per month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                dataKey="value"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Users */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
          <CardDescription>Latest registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.slice(0, 5).map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.full_name || 'N/A'}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-500">
                      Active
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}