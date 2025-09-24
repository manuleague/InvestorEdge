import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  BarChart3, 
  Search,
  Shield,
  Zap,
  DollarSign,
  FileText,
  Activity
} from "lucide-react";

interface AIToolProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  status: "Available" | "Premium" | "Coming Soon";
  onClick: () => void;
}

function AIToolCard({ title, description, icon, category, status, onClick }: AIToolProps) {
  const statusColors = {
    "Available": "bg-success text-success-foreground",
    "Premium": "bg-warning text-warning-foreground",
    "Coming Soon": "bg-muted text-muted-foreground"
  };

  return (
    <Card className="p-6 bg-gradient-card border border-border hover:shadow-elevated transition-smooth cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          {icon}
        </div>
        <Badge className={statusColors[status]}>{status}</Badge>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        <div className="pt-2">
          <span className="text-xs text-primary font-medium">{category}</span>
        </div>
      </div>
    </Card>
  );
}

export function AIToolsGrid() {
  const aiTools = [
    {
      title: "Peter Lynch Analysis",
      description: "Identify growth stocks using Lynch's proven methodology. Find companies growing faster than their P/E ratio.",
      icon: <Target className="w-6 h-6 text-primary" />,
      category: "Growth Investing",
      status: "Available" as const,
      onClick: () => console.log("Peter Lynch Analysis")
    },
    {
      title: "Warren Buffett Screener", 
      description: "Value investing principles applied to find undervalued companies with strong competitive moats.",
      icon: <Shield className="w-6 h-6 text-primary" />,
      category: "Value Investing",
      status: "Available" as const,
      onClick: () => console.log("Warren Buffett Screener")
    },
    {
      title: "Ray Dalio Macro Analysis",
      description: "Economic cycle analysis and portfolio positioning based on macroeconomic principles.",
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
      category: "Macro Strategy",
      status: "Premium" as const,
      onClick: () => console.log("Ray Dalio Macro")
    },
    {
      title: "Zacks Stock Evaluation",
      description: "Professional-grade stock research combining earnings revisions and momentum indicators.",
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      category: "Stock Research",
      status: "Available" as const,
      onClick: () => console.log("Zacks Evaluation")
    },
    {
      title: "AI Stock Health Radar",
      description: "Real-time assessment of stock health using 50+ financial and technical indicators.",
      icon: <Activity className="w-6 h-6 text-primary" />,
      category: "Risk Assessment",
      status: "Available" as const,
      onClick: () => console.log("Stock Health Radar")
    },
    {
      title: "AI Fair Value Calculator",
      description: "Intrinsic value calculation using multiple valuation models and AI-enhanced predictions.",
      icon: <DollarSign className="w-6 h-6 text-primary" />,
      category: "Valuation",
      status: "Premium" as const,
      onClick: () => console.log("Fair Value Calculator")
    },
    {
      title: "Momentum Analysis Engine",
      description: "Advanced momentum indicators for short-term trading opportunities and trend identification.",
      icon: <Zap className="w-6 h-6 text-primary" />,
      category: "Technical Analysis",
      status: "Available" as const,
      onClick: () => console.log("Momentum Analysis")
    },
    {
      title: "13F Filing Analyzer",
      description: "Track institutional investor movements and identify smart money flows in real-time.",
      icon: <FileText className="w-6 h-6 text-primary" />,
      category: "Institutional Analysis",
      status: "Premium" as const,
      onClick: () => console.log("13F Analyzer")
    },
    {
      title: "AI Chat Assistant",
      description: "Conversational AI for market analysis, portfolio advice, and investment strategy guidance.",
      icon: <Brain className="w-6 h-6 text-primary" />,
      category: "AI Assistant",
      status: "Available" as const,
      onClick: () => console.log("AI Chat")
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">AI Analysis Tools</h2>
        <p className="text-muted-foreground">Legendary investment strategies powered by artificial intelligence</p>
      </div>

      {/* Quick Stats */}
      <Card className="p-6 bg-gradient-primary border border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-foreground font-trading">9</p>
            <p className="text-sm text-primary-foreground/80">AI Tools Available</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-foreground font-trading">847</p>
            <p className="text-sm text-primary-foreground/80">Analyses This Month</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-foreground font-trading">92%</p>
            <p className="text-sm text-primary-foreground/80">Accuracy Rate</p>
          </div>
        </div>
      </Card>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiTools.map((tool, index) => (
          <AIToolCard key={index} {...tool} />
        ))}
      </div>
    </div>
  );
}