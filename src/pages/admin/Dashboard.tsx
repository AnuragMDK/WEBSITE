import { useEffect, useState } from "react";
import { Users, FileText, MessageSquare, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    totalServices: 0,
    activeServices: 0,
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch leads count
      const { count: totalLeads } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true });

      const { count: newLeads } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");

      // Fetch services count
      const { count: totalServices } = await supabase
        .from("services")
        .select("*", { count: "exact", head: true });

      const { count: activeServices } = await supabase
        .from("services")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      // Fetch recent leads
      const { data: leads } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      setStats({
        totalLeads: totalLeads || 0,
        newLeads: newLeads || 0,
        totalServices: totalServices || 0,
        activeServices: activeServices || 0,
      });
      setRecentLeads(leads || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Leads",
      value: stats.totalLeads,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "New Leads",
      value: stats.newLeads,
      icon: MessageSquare,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Active Services",
      value: stats.activeServices,
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Services",
      value: stats.totalServices,
      icon: TrendingUp,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-muted rounded w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the CyberVision admin panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="glass-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-heading font-bold">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Leads */}
      <div className="glass-card p-6">
        <h2 className="font-heading font-bold text-xl mb-4">Recent Leads</h2>
        {recentLeads.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No leads yet. They will appear here when submitted.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-border/50">
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Email</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Service</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border/30">
                    <td className="py-4">{lead.name}</td>
                    <td className="py-4 text-muted-foreground">{lead.email}</td>
                    <td className="py-4 text-muted-foreground">
                      {lead.service_interest || "-"}
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lead.status === "new"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-4 text-muted-foreground text-sm">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
