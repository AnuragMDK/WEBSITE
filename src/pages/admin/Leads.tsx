import { useEffect, useState } from "react";
import { Download, Search, Trash2, Eye, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  service_interest: string | null;
  status: string;
  created_at: string;
}

export default function LeadsPage() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast({
        title: "Error",
        description: "Failed to fetch leads",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateLeadStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      setLeads(leads.map((lead) =>
        lead.id === id ? { ...lead, status } : lead
      ));

      toast({
        title: "Status Updated",
        description: `Lead status changed to ${status}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    try {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;

      setLeads(leads.filter((lead) => lead.id !== id));
      toast({
        title: "Lead Deleted",
        description: "The lead has been removed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete lead",
        variant: "destructive",
      });
    }
  };

  const exportLeads = () => {
    const filteredLeads = getFilteredLeads();
    const csv = [
      ["Name", "Email", "Phone", "Company", "Service", "Status", "Message", "Date"],
      ...filteredLeads.map((lead) => [
        lead.name,
        lead.email,
        lead.phone || "",
        lead.company || "",
        lead.service_interest || "",
        lead.status,
        lead.message || "",
        new Date(lead.created_at).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const getFilteredLeads = () => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  };

  const filteredLeads = getFilteredLeads();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-muted rounded w-48" />
        <div className="h-96 bg-muted rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Leads</h1>
          <p className="text-muted-foreground">
            Manage customer enquiries and leads
          </p>
        </div>
        <Button onClick={exportLeads} className="btn-cyber-outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-40 bg-muted/50">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Leads Table */}
      <div className="glass-card p-6 overflow-x-auto">
        {filteredLeads.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            {leads.length === 0
              ? "No leads yet. They will appear here when customers submit enquiries."
              : "No leads match your search criteria."}
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-border/50">
                <th className="pb-3 text-sm font-medium text-muted-foreground">Name</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">Email</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">Service</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">Date</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-border/30 hover:bg-muted/20">
                  <td className="py-4 font-medium">{lead.name}</td>
                  <td className="py-4 text-muted-foreground">{lead.email}</td>
                  <td className="py-4 text-muted-foreground text-sm">
                    {lead.service_interest || "-"}
                  </td>
                  <td className="py-4">
                    <Select
                      value={lead.status}
                      onValueChange={(value) => updateLeadStatus(lead.id, value)}
                    >
                      <SelectTrigger className="w-28 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="py-4 text-muted-foreground text-sm">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <a href={`mailto:${lead.email}`}>
                        <Button variant="ghost" size="icon">
                          <Mail className="w-4 h-4" />
                        </Button>
                      </a>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteLead(lead.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Lead Detail Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="glass-card max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading">Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Name</label>
                  <p className="font-medium">{selectedLead.name}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <p className="font-medium">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Phone</label>
                  <p className="font-medium">{selectedLead.phone || "-"}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Company</label>
                  <p className="font-medium">{selectedLead.company || "-"}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Service Interest</label>
                <p className="font-medium">{selectedLead.service_interest || "-"}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Message</label>
                <p className="font-medium bg-muted/50 p-3 rounded-lg mt-1">
                  {selectedLead.message || "No message provided"}
                </p>
              </div>
              <div className="flex gap-2 pt-4">
                <a href={`mailto:${selectedLead.email}`} className="flex-1">
                  <Button className="w-full btn-cyber">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </a>
                {selectedLead.phone && (
                  <a href={`https://wa.me/${selectedLead.phone.replace(/\D/g, "")}`} target="_blank" className="flex-1">
                    <Button className="w-full btn-cyber-outline">
                      WhatsApp
                    </Button>
                  </a>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
