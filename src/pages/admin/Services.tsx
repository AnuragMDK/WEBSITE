import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, GripVertical, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  order_index: number;
  is_active: boolean;
}

export default function ServicesAdminPage() {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    is_active: true,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        description: service.description || "",
        icon: service.icon || "",
        is_active: service.is_active,
      });
    } else {
      setEditingService(null);
      setFormData({
        title: "",
        description: "",
        icon: "",
        is_active: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingService) {
        const { error } = await supabase
          .from("services")
          .update({
            title: formData.title,
            description: formData.description,
            icon: formData.icon,
            is_active: formData.is_active,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingService.id);

        if (error) throw error;

        setServices(services.map((s) =>
          s.id === editingService.id
            ? { ...s, ...formData }
            : s
        ));

        toast({
          title: "Service Updated",
          description: "The service has been updated successfully.",
        });
      } else {
        const { data, error } = await supabase
          .from("services")
          .insert({
            title: formData.title,
            description: formData.description,
            icon: formData.icon,
            is_active: formData.is_active,
            order_index: services.length,
          })
          .select()
          .single();

        if (error) throw error;

        setServices([...services, data]);

        toast({
          title: "Service Created",
          description: "The new service has been added.",
        });
      }

      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save service. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (service: Service) => {
    try {
      const { error } = await supabase
        .from("services")
        .update({ is_active: !service.is_active })
        .eq("id", service.id);

      if (error) throw error;

      setServices(services.map((s) =>
        s.id === service.id ? { ...s, is_active: !s.is_active } : s
      ));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update service status.",
        variant: "destructive",
      });
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;

      setServices(services.filter((s) => s.id !== id));
      toast({
        title: "Service Deleted",
        description: "The service has been removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete service.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-muted rounded w-48" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Services</h1>
          <p className="text-muted-foreground">
            Manage the services displayed on your website
          </p>
        </div>
        <Button onClick={() => openDialog()} className="btn-cyber">
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={`glass-card p-6 flex items-center gap-4 ${
              !service.is_active ? "opacity-50" : ""
            }`}
          >
            <div className="cursor-move text-muted-foreground">
              <GripVertical className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <h3 className="font-heading font-bold">{service.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {service.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Active</span>
                <Switch
                  checked={service.is_active}
                  onCheckedChange={() => toggleActive(service)}
                />
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => openDialog(service)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteService(service.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="glass-card p-12 text-center">
            <p className="text-muted-foreground mb-4">No services yet.</p>
            <Button onClick={() => openDialog()} className="btn-cyber">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Service
            </Button>
          </div>
        )}
      </div>

      {/* Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass-card max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {editingService ? "Edit Service" : "Add New Service"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Service Title *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Cyber Security Solutions"
                className="bg-muted/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the service..."
                rows={4}
                className="bg-muted/50 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Icon Name
              </label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="e.g., Shield, Camera, Wifi"
                className="bg-muted/50"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use Lucide icon names (Shield, Camera, Lock, etc.)
              </p>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Active</label>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 btn-cyber">
                <Save className="w-4 h-4 mr-2" />
                {editingService ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
