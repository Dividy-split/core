import * as SimpleIcons from '@icons-pack/react-simple-icons';

interface PlatformLogoProps {
  iconName: string;
  color?: string;
  size?: number;
  className?: string;
}

export default function PlatformLogo({ 
  iconName, 
  color = 'default', 
  size = 48,
  className = '' 
}: PlatformLogoProps) {
  // Récupérer le composant d'icône dynamiquement
  const IconComponent = (SimpleIcons as any)[iconName];

  if (!IconComponent) {
    console.warn(`Icon ${iconName} not found`);
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
