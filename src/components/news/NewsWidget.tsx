import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, AlertTriangle, Zap } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  category: "Market" | "FDA" | "Earnings" | "Insider" | "Federal Reserve" | "IPO";
  impact: "High" | "Medium" | "Low";
  relatedSymbols?: string[];
}

const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Federal Reserve Signals Potential Rate Cut in March",
    summary: "Fed officials hint at 0.25% reduction following inflation data showing continued moderation...",
    source: "Federal Reserve",
    timestamp: "2 minutes ago",
    category: "Federal Reserve",
    impact: "High",
    relatedSymbols: ["SPY", "QQQ"]
  },
  {
    id: "2", 
    title: "NVDA Options Activity Surges Before Earnings",
    summary: "Unusual call option volume detected with $1,000 strike price for March expiration...",
    source: "Options Flow",
    timestamp: "5 minutes ago",
    category: "Earnings",
    impact: "High",
    relatedSymbols: ["NVDA"]
  },
  {
    id: "3",
    title: "Berkshire Hathaway 13F Filing Shows New Apple Position",
    summary: "Warren Buffett's conglomerate increases AAPL stake by 15% in Q4, signals continued confidence...",
    source: "SEC Filing",
    timestamp: "12 minutes ago", 
    category: "Insider",
    impact: "Medium",
    relatedSymbols: ["AAPL", "BRK.B"]
  }
];

function NewsCard({ item }: { item: NewsItem }) {
  const categoryColors = {
    "Market": "bg-primary text-primary-foreground",
    "FDA": "bg-success text-success-foreground", 
    "Earnings": "bg-warning text-warning-foreground",
    "Insider": "bg-purple-500 text-white",
    "Federal Reserve": "bg-destructive text-destructive-foreground",
    "IPO": "bg-blue-500 text-white"
  };

  const impactIcons = {
    High: <AlertTriangle className="w-4 h-4" />,
    Medium: <TrendingUp className="w-4 h-4" />,
    Low: <Zap className="w-4 h-4" />
  };

  return (
    <Card className="p-4 bg-gradient-card border border-border hover:shadow-elevated transition-smooth cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Badge className={categoryColors[item.category]}>{item.category}</Badge>
          <div className="flex items-center gap-1 text-muted-foreground">
            {impactIcons[item.impact]}
            <span className="text-xs">{item.impact}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span className="text-xs">{item.timestamp}</span>
        </div>
      </div>
      
      <h3 className="text-sm font-semibold text-foreground mb-2 leading-tight">{item.title}</h3>
      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{item.summary}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{item.source}</span>
        {item.relatedSymbols && (
          <div className="flex gap-1">
            {item.relatedSymbols.map((symbol) => (
              <Badge key={symbol} variant="outline" className="text-xs">
                {symbol}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

export function NewsWidget() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Market News Feed</h3>
        <div className="flex items-center gap-2 text-success">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs">Live</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {newsItems.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}