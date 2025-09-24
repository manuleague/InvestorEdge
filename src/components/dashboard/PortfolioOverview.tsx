import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react";

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
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Portfolio Overview</h2>
        <p className="text-muted-foreground">Your investment performance at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Portfolio Value"
          value="$127,450.23"
          change="+12.5% ($14,234)"
          isPositive={true}
          icon={<DollarSign className="w-5 h-5" />}
        />
        
        <MetricCard
          title="Today's Return"
          value="$2,345.67"
          change="+1.87%"
          isPositive={true}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        
        <MetricCard
          title="Total Return"
          value="$23,450.23"
          change="+22.5%"
          isPositive={true}
          icon={<Percent className="w-5 h-5" />}
        />
        
        <MetricCard
          title="Cash Available"
          value="$8,234.50"
          change="-5.2%"
          isPositive={false}
          icon={<DollarSign className="w-5 h-5" />}
        />
      </div>

      {/* Quick Stats */}
      <Card className="p-6 bg-gradient-card border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Portfolio Allocation</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary font-trading">65%</p>
            <p className="text-sm text-muted-foreground">Stocks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success font-trading">20%</p>
            <p className="text-sm text-muted-foreground">ETFs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning font-trading">10%</p>
            <p className="text-sm text-muted-foreground">Commodities</p>
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