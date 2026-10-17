'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2, AlertTriangle, X } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface DeleteActionButtonProps {
  id: string;
  itemName: string;
  itemType?: string;
  onDelete: (id: string) => Promise<unknown>;
}

export function DeleteActionButton({
  id,
  itemName,
  itemType = 'item',
  onDelete,
}: DeleteActionButtonProps) {
  const router = useRouter();
  const { success: showSuccess, error: showError } = useToast();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  async function handleConfirmDelete() {
    setIsDeleting(true);
    try {
      await onDelete(id);
      showSuccess(
        'Deleted Successfully',
        `"${itemName}" has been removed from ${itemType}s.`
      );
      setIsOpen(false);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete item.';
      showError('Delete Failed', msg);
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        id={`delete-btn-${id}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
        disabled={isDeleting}
        className="inline-flex items-center justify-center p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        title={`Delete ${itemName}`}
        aria-label={`Delete ${itemName}`}
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {isOpen && mounted && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={(e) => {
            e.stopPropagation();
            if (!isDeleting) setIsOpen(false);
          }}
        >
          <div 
            className="w-full max-w-md rounded-2xl border p-6 shadow-2xl relative"
            style={{
              backgroundColor: 'var(--admin-card-bg, #0c1022)',
              borderColor: 'var(--admin-card-border, rgba(239, 68, 68, 0.3))',
              boxShadow: 'var(--admin-card-shadow, 0 20px 50px rgba(0,0,0,0.8))',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0 text-red-500 dark:text-red-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-[var(--admin-text)]">
                  Delete {itemType}?
                </h3>
                <p className="text-sm text-[var(--admin-muted)] mt-1">
                  Are you sure you want to permanently delete <span className="text-[var(--admin-text)] font-semibold">"{itemName}"</span>? This action cannot be reversed.
                </p>
              </div>
              <button
                type="button"
                onClick={() => !isDeleting && setIsOpen(false)}
                className="text-[var(--admin-muted)] hover:text-[var(--admin-text)] transition-colors"
                disabled={isDeleting}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg text-xs font-medium text-[var(--admin-muted)] hover:text-[var(--admin-text)] hover:bg-[var(--admin-surface-2)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                id={`confirm-delete-${id}`}
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-red-600 hover:bg-red-500 transition-colors shadow-lg shadow-red-900/30 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Permanently</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
