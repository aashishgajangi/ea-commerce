"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Search, Trash2, Image as ImageIcon, X, Edit2, Save } from "lucide-react";

interface Media {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  alt: string | null;
  title: string | null;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  } | null;
}

interface MediaListResponse {
  media: Media[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAlt, setEditAlt] = useState("");
  const [editTitle, setEditTitle] = useState("");

  // Fetch media
  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });

      if (search) {
        params.append("search", search);
      }

      const response = await fetch(`/api/admin/media?${params}`);
      if (!response.ok) throw new Error("Failed to fetch media");

      const data: MediaListResponse = await response.json();
      setMedia(data.media);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch media");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedMedia) {
        setSelectedMedia(null);
        setIsEditing(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedMedia]);

  // Handle file upload
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/admin/media", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Upload failed");
        }
      }

      setSuccess(`Successfully uploaded ${files.length} file(s)`);
      fetchMedia();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media?")) return;

    try {
      const response = await fetch(`/api/admin/media/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete media");

      setSuccess("Media deleted successfully");
      fetchMedia();
      setSelectedMedia(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete media");
    }
  };

  // Handle edit mode
  const handleEdit = () => {
    if (selectedMedia) {
      setEditName(selectedMedia.originalName);
      setEditAlt(selectedMedia.alt || "");
      setEditTitle(selectedMedia.title || "");
      setIsEditing(true);
    }
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    if (!selectedMedia) return;

    try {
      const response = await fetch(`/api/admin/media/${selectedMedia.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalName: editName,
          alt: editAlt,
          title: editTitle,
        }),
      });

      if (!response.ok) throw new Error("Failed to update media");

      setSuccess("Media updated successfully");
      setIsEditing(false);
      fetchMedia();
      // Update selected media
      const updatedMedia = await response.json();
      setSelectedMedia(updatedMedia);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update media");
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditName("");
    setEditAlt("");
    setEditTitle("");
  };

  // Format file size
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Media Library</h1>
        <div className="flex gap-2">
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button disabled={uploading} asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? "Uploading..." : "Upload Media"}
              </span>
            </Button>
          </label>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search media..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {loading && !media.length ? (
        <div className="text-center py-12">Loading media...</div>
      ) : media.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-4">No media files yet</p>
            <label htmlFor="file-upload">
              <Button asChild>
                <span>Upload your first file</span>
              </Button>
            </label>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {media.map((item) => (
              <Card
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedMedia(item)}
              >
                <CardContent className="p-2">
                  <div className="aspect-square bg-gray-100 rounded flex items-center justify-center overflow-hidden relative">
                    {item.mimeType.startsWith("image/") ? (
                      <Image
                        src={item.path}
                        alt={item.alt || item.originalName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div className="mt-2 text-xs">
                    <p className="truncate font-medium">{item.originalName}</p>
                    <p className="text-gray-500">{formatSize(item.size)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="py-2 px-4">
                Page {page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
                disabled={page === pagination.totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Media Details Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedMedia(null);
              setIsEditing(false);
            }
          }}
        >
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>Media Details</CardTitle>
                <div className="flex gap-2">
                  {!isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEdit}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedMedia(null);
                      setIsEditing(false);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-100 rounded p-4 flex items-center justify-center relative min-h-[200px]">
                {selectedMedia.mimeType.startsWith("image/") ? (
                  <Image
                    src={selectedMedia.path}
                    alt={selectedMedia.alt || selectedMedia.originalName}
                    width={800}
                    height={600}
                    className="max-w-full max-h-96 object-contain"
                  />
                ) : (
                  <ImageIcon className="w-24 h-24 text-gray-400" />
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">File Name</label>
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Enter file name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Alt Text (for SEO)</label>
                    <Input
                      value={editAlt}
                      onChange={(e) => setEditAlt(e.target.value)}
                      placeholder="Describe the image"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Title</label>
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Enter title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Filename (System)</label>
                    <p className="text-sm text-gray-600">{selectedMedia.filename}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">File Size</label>
                    <p className="text-sm text-gray-600">{formatSize(selectedMedia.size)}</p>
                  </div>
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      onClick={handleSaveEdit}
                      className="flex-1"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm font-medium">File Name</label>
                      <p className="text-sm text-gray-600">{selectedMedia.originalName}</p>
                    </div>
                    {selectedMedia.alt && (
                      <div>
                        <label className="text-sm font-medium">Alt Text</label>
                        <p className="text-sm text-gray-600">{selectedMedia.alt}</p>
                      </div>
                    )}
                    {selectedMedia.title && (
                      <div>
                        <label className="text-sm font-medium">Title</label>
                        <p className="text-sm text-gray-600">{selectedMedia.title}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium">Filename (System)</label>
                      <p className="text-sm text-gray-600">{selectedMedia.filename}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">File Size</label>
                      <p className="text-sm text-gray-600">{formatSize(selectedMedia.size)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">URL</label>
                      <p className="text-sm text-gray-600 break-all">{selectedMedia.path}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Uploaded</label>
                      <p className="text-sm text-gray-600">
                        {new Date(selectedMedia.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(selectedMedia.id)}
                      className="flex-1"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
          )}
        </div>
      </div>
    </div>
  );
}