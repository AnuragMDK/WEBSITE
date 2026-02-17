import { useEffect, useState } from "react";
import { Upload, Trash2, Image as ImageIcon, File } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string | null;
  size: number | null;
  created_at: string;
}

export default function MediaPage() {
  const { toast } = useToast();
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase
        .from("media")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from("media")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from("media")
          .getPublicUrl(filePath);

        // Save to media table
        const { data: mediaRecord, error: dbError } = await supabase
          .from("media")
          .insert({
            name: file.name,
            url: publicUrl,
            type: file.type,
            size: file.size,
          })
          .select()
          .single();

        if (dbError) throw dbError;

        setMedia((prev) => [mediaRecord, ...prev]);
      }

      toast({
        title: "Upload Complete",
        description: `${files.length} file(s) uploaded successfully.`,
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload file(s). Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const deleteMedia = async (item: MediaFile) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      // Extract path from URL
      const urlParts = item.url.split("/media/");
      if (urlParts.length > 1) {
        await supabase.storage.from("media").remove([urlParts[1]]);
      }

      // Delete from database
      const { error } = await supabase.from("media").delete().eq("id", item.id);
      if (error) throw error;

      setMedia(media.filter((m) => m.id !== item.id));

      toast({
        title: "File Deleted",
        description: "The file has been removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete file.",
        variant: "destructive",
      });
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied",
      description: "The file URL has been copied to clipboard.",
    });
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "-";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-muted rounded w-48" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-muted rounded-lg" />
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
          <h1 className="text-3xl font-heading font-bold">Media Library</h1>
          <p className="text-muted-foreground">
            Upload and manage images and files
          </p>
        </div>
        <div className="relative">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          <Button className="btn-cyber" disabled={isUploading}>
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? "Uploading..." : "Upload Files"}
          </Button>
        </div>
      </div>

      {/* Media Grid */}
      {media.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">No media files yet.</p>
          <div className="relative inline-block">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Button className="btn-cyber">
              <Upload className="w-4 h-4 mr-2" />
              Upload Your First File
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="glass-card p-2 group relative cursor-pointer"
              onClick={() => copyUrl(item.url)}
            >
              {item.type?.startsWith("image/") ? (
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                  <File className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
              
              <div className="mt-2">
                <p className="text-xs font-medium truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(item.size)}
                </p>
              </div>

              {/* Delete Button */}
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMedia(item);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
