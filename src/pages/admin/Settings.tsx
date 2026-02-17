import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Settings {
  [key: string]: string;
}

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");

      if (error) throw error;

      const settingsObj: Settings = {};
      data?.forEach((item) => {
        settingsObj[item.key] = item.value || "";
      });
      setSettings(settingsObj);
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      for (const [key, value] of Object.entries(settings)) {
        const { error } = await supabase
          .from("site_settings")
          .upsert(
            { key, value, updated_at: new Date().toISOString() },
            { onConflict: "key" }
          );

        if (error) throw error;
      }

      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-muted rounded w-48" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
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
          <h1 className="text-3xl font-heading font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage contact information and SEO settings
          </p>
        </div>
        <Button onClick={handleSave} className="btn-cyber" disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Contact Information */}
      <div className="glass-card p-6 md:p-8">
        <h2 className="font-heading font-bold text-xl mb-6">
          Contact Information
        </h2>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                WhatsApp Number
              </label>
              <Input
                value={settings.whatsapp_number || ""}
                onChange={(e) => updateSetting("whatsapp_number", e.target.value)}
                placeholder="971508033776"
                className="bg-muted/50"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Without + or spaces (e.g., 971508033776)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={settings.email || ""}
                onChange={(e) => updateSetting("email", e.target.value)}
                placeholder="info@cybervision.ae"
                className="bg-muted/50"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <Input
                value={settings.phone || ""}
                onChange={(e) => updateSetting("phone", e.target.value)}
                placeholder="+971 50 803 3776"
                className="bg-muted/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Address
              </label>
              <Input
                value={settings.address || ""}
                onChange={(e) => updateSetting("address", e.target.value)}
                placeholder="Dubai, United Arab Emirates"
                className="bg-muted/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Settings */}
      <div className="glass-card p-6 md:p-8">
        <h2 className="font-heading font-bold text-xl mb-6">
          SEO & Metadata
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Page Title
            </label>
            <Input
              value={settings.meta_title || ""}
              onChange={(e) => updateSetting("meta_title", e.target.value)}
              placeholder="CyberVision.ae - Advanced Cybersecurity Solutions"
              className="bg-muted/50"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Recommended: 50-60 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Meta Description
            </label>
            <Textarea
              value={settings.meta_description || ""}
              onChange={(e) => updateSetting("meta_description", e.target.value)}
              placeholder="Leading provider of cybersecurity, surveillance, and network infrastructure solutions..."
              rows={3}
              className="bg-muted/50 resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Recommended: 150-160 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Google Analytics ID
            </label>
            <Input
              value={settings.google_analytics_id || ""}
              onChange={(e) => updateSetting("google_analytics_id", e.target.value)}
              placeholder="G-XXXXXXXXXX"
              className="bg-muted/50"
            />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="glass-card p-6 md:p-8">
        <h2 className="font-heading font-bold text-xl mb-6">
          Social Media Links
        </h2>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                LinkedIn URL
              </label>
              <Input
                value={settings.linkedin_url || ""}
                onChange={(e) => updateSetting("linkedin_url", e.target.value)}
                placeholder="https://linkedin.com/company/..."
                className="bg-muted/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Twitter URL
              </label>
              <Input
                value={settings.twitter_url || ""}
                onChange={(e) => updateSetting("twitter_url", e.target.value)}
                placeholder="https://twitter.com/..."
                className="bg-muted/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Facebook URL
              </label>
              <Input
                value={settings.facebook_url || ""}
                onChange={(e) => updateSetting("facebook_url", e.target.value)}
                placeholder="https://facebook.com/..."
                className="bg-muted/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button (Mobile) */}
      <div className="md:hidden">
        <Button onClick={handleSave} className="btn-cyber w-full" disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
