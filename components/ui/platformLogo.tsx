// components/ui/PlatformLogo.tsx
import { IconType } from 'react-icons';
import * as SimpleIcons from 'react-icons/si';

interface PlatformLogoProps {
  iconName: string;
  color?: string;
  size?: number;
  className?: string;
}

export default function PlatformLogo({ 
  iconName, 
  color = '#000000', 
  size = 48,
  className = '' 
}: PlatformLogoProps) {
  // Récupérer le composant d'icône dynamiquement depuis react-icons/si
  const IconComponent = (SimpleIcons as any)[iconName] as IconType;

  if (!IconComponent) {
    console.warn(`Icon ${iconName} not found in react-icons/si`);
    return (
      <div 
        className={`flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-2xl">📦</span>
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
