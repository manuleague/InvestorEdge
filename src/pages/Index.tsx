import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { PortfolioOverview } from "@/components/dashboard/PortfolioOverview";
import { MyPicksChannel } from "@/components/mypicks/MyPicksChannel";
import { NewsWidget } from "@/components/news/NewsWidget";
import { AIToolsGrid } from "@/components/ai/AIToolsGrid";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <PortfolioOverview />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="p-6 bg-gradient-card border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button 
                      onClick={() => setActiveView('my-picks')}
                      className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg transition-smooth text-center"
                    >
                      <p className="text-sm font-medium text-primary">My Picks</p>
                    </button>
                    <button 
                      onClick={() => setActiveView('screener')}
                      className="p-4 bg-success/10 hover:bg-success/20 rounded-lg transition-smooth text-center"
                    >
                      <p className="text-sm font-medium text-success">Screener</p>
                    </button>
                    <button 
                      onClick={() => setActiveView('analysis')}
                      className="p-4 bg-warning/10 hover:bg-warning/20 rounded-lg transition-smooth text-center"
                    >
                      <p className="text-sm font-medium text-warning">AI Analysis</p>
                    </button>
                    <button 
                      onClick={() => setActiveView('news')}
                      className="p-4 bg-destructive/10 hover:bg-destructive/20 rounded-lg transition-smooth text-center"
                    >
                      <p className="text-sm font-medium text-destructive">News</p>
                    </button>
                  </div>
                </Card>
              </div>
              <div>
                <NewsWidget />
              </div>
            </div>
          </div>
        );
      case 'my-picks':
        return <MyPicksChannel />;
      case 'analysis':
        return <AIToolsGrid />;
      case 'portfolio':
        return (
          <Card className="p-8 bg-gradient-card border border-border text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Portfolio Tracker</h2>
            <p className="text-muted-foreground mb-6">Advanced portfolio management and real-time tracking coming soon.</p>
            <p className="text-sm text-muted-foreground">This feature will require Supabase integration for real-time data storage and API connections.</p>
          </Card>
        );
      case 'news':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Market News & Analysis</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <NewsWidget />
              <Card className="p-6 bg-gradient-card border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">News Categories</h3>
                <div className="space-y-2">
                  {['Market Updates', 'FDA Approvals', 'Earnings Reports', 'Insider Trading', 'Federal Reserve', 'IPO Announcements'].map((category) => (
                    <div key={category} className="p-2 bg-secondary/50 rounded text-sm">{category}</div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        );
      default:
        return (
          <Card className="p-8 bg-gradient-card border border-border text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h2>
            <p className="text-muted-foreground mb-6">This section is under development.</p>
            <p className="text-sm text-muted-foreground">Advanced features will require Supabase integration for backend functionality.</p>
          </Card>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
