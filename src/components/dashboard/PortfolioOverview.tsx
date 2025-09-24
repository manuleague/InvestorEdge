import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "../../contexts/auth-context";
import type { Database } from "@/integrations/supabase/types";

type PortfolioStock = Database['public']['Tables']['portfolios']['Row'] & {
  current_price: number;
  profit_loss: number;
  profit_loss_percentage: number;
};

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

function MetricCard({ title, value, change, isPositive, icon }: MetricCardProps) {
  return (
    <Card className="p-6 bg-gradient-card border border-border hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground font-trading">{value}</p>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-success" />
            ) : (
              <TrendingDown className="w-4 h-4 text-destructive" />
            )}
            <span className={`text-sm font-medium ${
              isPositive ? 'text-success' : 'text-destructive'
            }`}>
              {change}
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${
          isPositive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
        }`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

export function PortfolioOverview() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<PortfolioStock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const { data: portfolioData, error } = await supabase
          .from('portfolios')
          .select()
          .match({ user_id: user?.id }) as { 
            data: Database['public']['Tables']['portfolios']['Row'][] | null; 
            error: any; 
          };

        if (error) throw error;
        if (!portfolioData) return;

        // TODO: Fetch current prices from financial API
        // For now, we'll simulate current prices
        const portfolioWithPrices: PortfolioStock[] = portfolioData.map(stock => ({
          ...stock,
          current_price: stock.average_price * (1 + (Math.random() * 0.4 - 0.2)), // +/- 20%
          profit_loss: (stock.average_price * (1 + (Math.random() * 0.4 - 0.2)) - stock.average_price) * stock.quantity,
          profit_loss_percentage: ((stock.average_price * (1 + (Math.random() * 0.4 - 0.2)) - stock.average_price) / stock.average_price) * 100
        }));

        setPortfolio(portfolioWithPrices);
      } catch (error) {
        console.error('Error loading portfolio:', error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchPortfolio();
    }
  }, [user]);

  // Calculate portfolio metrics
  const totalValue = portfolio.reduce(
    (sum, stock) => sum + stock.quantity * stock.current_price,
    0
  );

  const totalCost = portfolio.reduce(
    (sum, stock) => sum + stock.quantity * stock.average_price,
    0
  );

  const totalReturn = totalValue - totalCost;
  const totalReturnPercentage = ((totalValue / totalCost) - 1) * 100;

  // Calculate daily return (simulated for now)
  const dailyReturn = totalValue * (Math.random() * 0.02 - 0.01); // +/- 1%
  const dailyReturnPercentage = (dailyReturn / totalValue) * 100;

  // Simulated cash value
  const cashAvailable = 10000;

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-zinc-800 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <h2 className="text-2xl font-bold text-foreground mb-2">Portfolio Overview</h2>
        <p className="text-muted-foreground">Your investment performance at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Portfolio Value"
          value={`$${totalValue.toFixed(2)}`}
          change={`${totalReturnPercentage >= 0 ? '+' : ''}${totalReturnPercentage.toFixed(2)}% ($${totalReturn.toFixed(2)})`}
          isPositive={totalReturnPercentage >= 0}
          icon={<DollarSign className="w-5 h-5" />}
        />
        
        <MetricCard
          title="Today's Return"
          value={`$${dailyReturn.toFixed(2)}`}
          change={`${dailyReturnPercentage >= 0 ? '+' : ''}${dailyReturnPercentage.toFixed(2)}%`}
          isPositive={dailyReturnPercentage >= 0}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        
        <MetricCard
          title="Total Return"
          value={`$${totalReturn.toFixed(2)}`}
          change={`${totalReturnPercentage >= 0 ? '+' : ''}${totalReturnPercentage.toFixed(2)}%`}
          isPositive={totalReturnPercentage >= 0}
          icon={<Percent className="w-5 h-5" />}
        />
        
        <MetricCard
          title="Cash Available"
          value={`$${cashAvailable.toFixed(2)}`}
          change="Available for trading"
          isPositive={true}
          icon={<DollarSign className="w-5 h-5" />}
        />
      </div>

      {/* Portfolio Allocation */}
      <Card className="p-6 bg-gradient-card border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Portfolio Allocation</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary font-trading">
              {((totalValue / (totalValue + cashAvailable)) * 100).toFixed(0)}%
            </p>
            <p className="text-sm text-muted-foreground">Stocks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success font-trading">
              {((cashAvailable / (totalValue + cashAvailable)) * 100).toFixed(0)}%
            </p>
            <p className="text-sm text-muted-foreground">Cash</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning font-trading">
              {portfolio.length}
            </p>
            <p className="text-sm text-muted-foreground">Total Positions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-muted-foreground font-trading">5%</p>
            <p className="text-sm text-muted-foreground">Cash</p>
          </div>
        </div>
      </Card>
    </div>
  );
}