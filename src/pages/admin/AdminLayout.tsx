import { useEffect } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  Image,
  LogOut,
  Shield,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sidebarLinks = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Leads", path: "/admin/leads", icon: Users },
  { name: "Services", path: "/admin/services", icon: FileText },
  { name: "Media", path: "/admin/media", icon: Image },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    } else if (!isLoading && user && !isAdmin) {
      navigate("/");
    }
  }, [user, isAdmin, isLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col admin-sidebar border-r border-border/50 transition-all duration-300",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border/50">
          {sidebarOpen && (
            <Link to="/" className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-heading font-bold">
                Cyber<span className="text-primary">Vision</span>
              </span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="shrink-0"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {sidebarOpen && <span className="font-medium">{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border/50">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-muted-foreground hover:text-destructive",
              !sidebarOpen && "justify-center"
            )}
            onClick={handleSignOut}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        <div className="p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
