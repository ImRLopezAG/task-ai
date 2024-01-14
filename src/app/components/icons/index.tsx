import { cn } from '@libs/utils'

interface IconsProps {
  className?: string
}

export const AtlassianIcon: React.FC<IconsProps> = ({ className }) => (
  <svg className={cn('size-5', className)} fill="none" viewBox="0 0 32 32"><path fill="url(#a)" fill-rule="evenodd" d="M11.119 14.084a.683.683 0 0 0-1.162.127L4.074 25.98a.704.704 0 0 0 .63 1.02h8.191a.678.678 0 0 0 .63-.389c1.766-3.654.695-9.21-2.406-12.527z" clip-rule="evenodd"/><path fill="#2684FF" fill-rule="evenodd" d="M15.434 3.378a15.536 15.536 0 0 0-.906 15.328l3.95 7.905a.703.703 0 0 0 .628.389h8.191a.703.703 0 0 0 .629-1.018L16.63 3.372a.664.664 0 0 0-1.196.005z" clip-rule="evenodd"/><defs><linearGradient id="a" x1="14.343" x2="6.091" y1="15.901" y2="24.759" gradientUnits="userSpaceOnUse"><stop stop-color="#0052CC"/><stop offset=".923" stop-color="#2684FF"/></linearGradient></defs></svg>
)
