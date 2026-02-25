// components/ui/PlatformLogo.tsx
import { IconType } from 'react-icons';
import * as SimpleIcons from 'react-icons/si';

interface PlatformLogoProps {
  iconName: string;
  color?: string;
  size?: number;
  className?: string;
  fallbackLabel?: string;
}

function getInitials(label: string): string {
  const words = label
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(' ')
    .filter(Boolean);

  if (words.length === 0) {
    return 'PL';
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

export default function PlatformLogo({ 
  iconName, 
  color = '#000000', 
  size = 48,
  className = '',
  fallbackLabel,
}: PlatformLogoProps) {
  // Récupérer le composant d'icône dynamiquement depuis react-icons/si
  const IconComponent = (SimpleIcons as any)[iconName] as IconType;

  if (!IconComponent) {
    const initials = getInitials(fallbackLabel || iconName.replace(/^Si/, ''));
    return (
      <div 
        className={`flex items-center justify-center rounded-md border bg-muted font-semibold text-muted-foreground ${className}`}
        style={{ width: size, height: size }}
      >
        <span style={{ fontSize: Math.max(10, Math.floor(size * 0.33)) }}>{initials}</span>
      </div>
    );
  }

  return (
    <IconComponent 
      color={color} 
      size={size} 
      className={className}
    />
  );
}
