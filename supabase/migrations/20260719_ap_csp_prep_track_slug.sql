-- Allow Advanced AI + AP CSP Prep track entitlements (family sub already unlocks all TRACKS in app).
alter table public.track_entitlements
  drop constraint if exists track_entitlements_slug_check;

alter table public.track_entitlements
  add constraint track_entitlements_slug_check check (
    track_slug in (
      'financial-literacy',
      'digital-literacy',
      'ai-literacy',
      'advanced-ai',
      'ap-csp-prep',
      'ai-python',
      'cybersecurity',
      'data-analyst'
    )
  );
