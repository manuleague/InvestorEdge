import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Target, Clock, Brain } from "lucide-react";

interface PickCardProps {
  symbol: string;
  company: string;
  currentPrice: string;
  targetPrice: string;
  upside: string;
  confidence: "High" | "Medium" | "Low";
  strategy: string;
  analyst: string;
  reasoning: string;
}

function PickCard({ symbol, company, currentPrice, targetPrice, upside, confidence, strategy, analyst, reasoning }: PickCardProps) {
  const confidenceColor = {
    High: "bg-success text-success-foreground",
    Medium: "bg-warning text-warning-foreground", 
    Low: "bg-destructive text-destructive-foreground"
  };

  return (
    <Card className="p-6 bg-gradient-card border border-border hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-foreground font-trading">{symbol}</h3>
            <Badge className={confidenceColor[confidence]}>{confidence} Confidence</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{company}</p>
        </div>
        <Star className="w-5 h-5 text-warning fill-warning" />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Current Price</p>
          <p className="text-lg font-bold text-foreground font-trading">{currentPrice}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Target Price</p>
          <p className="text-lg font-bold text-success font-trading">{targetPrice}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Upside</p>
          <p className="text-lg font-bold text-success font-trading">{upside}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Strategy:</span>
          <span className="text-foreground font-medium">{strategy}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Brain className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">AI Analyst:</span>
          <span className="text-foreground font-medium">{analyst}</span>
        </div>

        <div className="bg-secondary/50 rounded-lg p-3 mt-4">
          <p className="text-sm text-foreground leading-relaxed">{reasoning}</p>
        </div>

        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1">
            Add to Portfolio
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            View Analysis
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function MyPicksChannel() {
  const picks = [
    {
      symbol: "MSFT",
      company: "Microsoft Corporation",
      currentPrice: "$415.23",
      targetPrice: "$485.00",
      upside: "+16.8%",
      confidence: "High" as const,
      strategy: "Warren Buffett Value",
      analyst: "AI Warren",
      reasoning: "Strong moat in cloud computing with Azure growing 25% YoY. Trading at reasonable P/E of 32x with consistent dividend growth. Strong balance sheet and management execution."
    },
    {
      symbol: "NVDA",
      company: "NVIDIA Corporation", 
      currentPrice: "$875.30",
      targetPrice: "$1,200.00",
      upside: "+37.1%",
      confidence: "High" as const,
      strategy: "Peter Lynch Growth",
      analyst: "AI Peter",
      reasoning: "AI revolution just beginning. NVDA dominates GPU market with 80%+ share. Data center revenue exploding. PEG ratio of 1.2 indicates growth at reasonable price."
    },
    {
      symbol: "JPM",
      company: "JPMorgan Chase & Co",
      currentPrice: "$185.45",
      targetPrice: "$220.00",
      upside: "+18.6%",
      confidence: "Medium" as const,
      strategy: "Ray Dalio Macro",
      analyst: "AI Ray",
      reasoning: "Benefiting from rising interest rates. Fortress balance sheet survived multiple crises. Trading below book value despite consistent ROE >15%. Economic cycle positioning favorable."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">My Picks Channel</h2>
          <p className="text-muted-foreground">AI-powered long-term investment recommendations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            View History
          </Button>
          <Button size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Performance
          </Button>
        </div>
      </div>

      {/* Strategy Overview */}
      <Card className="p-6 bg-gradient-primary border border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary-foreground/10 rounded-lg">
            <Brain className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary-foreground">AI Strategy Engine</h3>
            <p className="text-sm text-primary-foreground/80">Combining legendary investment philosophies</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xl font-bold text-primary-foreground font-trading">12</p>
            <p className="text-xs text-primary-foreground/80">Active Picks</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-primary-foreground font-trading">+24.7%</p>
            <p className="text-xs text-primary-foreground/80">YTD Performance</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-primary-foreground font-trading">87%</p>
            <p className="text-xs text-primary-foreground/80">Success Rate</p>
          </div>
        </div>
      </Card>

      {/* Picks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {picks.map((pick, index) => (
          <PickCard key={index} {...pick} />
        ))}
      </div>
    </div>
  );
}