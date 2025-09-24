import { cn } from "@/lib/utils";
import { 
  TrendingUp, 
  PieChart, 
  Target, 
  Activity, 
  Newspaper, 
  Bot, 
  Search,
  BarChart3,
  Globe,
  Settings,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: PieChart },
  { id: 'my-picks', label: 'My Picks Channel', icon: Star },
  { id: 'portfolio', label: 'Portfolio', icon: Target },
  { id: 'screener', label: 'Stock Screener', icon: Search },
  { id: 'analysis', label: 'AI Analysis', icon: Bot },
  { id: 'technical', label: 'Technical Analysis', icon: BarChart3 },
  { id: 'news', label: 'Market News', icon: Newspaper },
  { id: 'commodities', label: 'Commodities', icon: Globe },
  { id: 'alerts', label: 'Alerts & Monitoring', icon: Activity },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-card border-r border-border flex flex-col">
      {/* Logo & Brand */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">CapitalFlow</h1>
            <p className="text-xs text-muted-foreground">Pro Trading Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-11 text-sm font-medium transition-smooth",
                  isActive && "bg-primary text-primary-foreground shadow-elevated",
                  !isActive && "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start h-11 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
          onClick={() => onViewChange('settings')}
        >
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </Button>
      </div>
    </div>
  );
}