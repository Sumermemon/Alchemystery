'use client';

import * as React from 'react';
import { createClient } from '@/lib/supabase/client';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

interface ImageUploadProps {
  bucket: string;
  value?: string | null;
  onChange: (url: string) => void;
  onRemove: () => void;
  className?: string;
}

export function ImageUpload({
  bucket,
  value,
  onChange,
  onRemove,
  className,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File must be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      onChange(data.publicUrl);
    } catch (err: any) {
      setError(err.message || 'Error uploading file');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className={cn('space-y-4 w-full', className)}>
      {value ? (
        <div
          className="relative group w-full aspect-video rounded-xl overflow-hidden border"
          style={{
            borderColor: 'var(--admin-input-border, rgba(255,255,255,0.12))',
            background: 'var(--admin-upload-bg, rgba(255,255,255,0.02))',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Uploaded preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={onRemove}
              className="gap-2"
            >
              <X size={16} />
              Remove Image
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <label
            className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200"
            style={{
              borderColor: 'var(--admin-upload-border, rgba(255,255,255,0.15))',
              background: 'var(--admin-upload-bg, rgba(255,255,255,0.02))',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--admin-upload-bg-hover, rgba(255,255,255,0.05))';
              e.currentTarget.style.borderColor = 'var(--color-gold)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--admin-upload-bg, rgba(255,255,255,0.02))';
              e.currentTarget.style.borderColor = 'var(--admin-upload-border, rgba(255,255,255,0.15))';
            }}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isUploading ? (
                <Loader2 className="w-8 h-8 mb-3 text-[var(--color-gold)] animate-spin" />
              ) : (
                <UploadCloud className="w-8 h-8 mb-3" style={{ color: 'var(--color-gold)' }} />
              )}
              <p className="mb-1 text-sm font-sans" style={{ color: 'var(--admin-text)' }}>
                <span className="font-semibold text-[var(--color-gold)]">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs font-sans" style={{ color: 'var(--admin-muted)' }}>
                JPEG, PNG, WEBP (MAX. 5MB)
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>
      )}
      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
    </div>
  );
}
