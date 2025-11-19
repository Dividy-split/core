import { Platform } from '@/types/platform';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PlatformLogo from '@/components/ui/platformLogo';

interface PlatformCardProps {
  platform: Platform;
}

export default function PlatformCard({ platform }: PlatformCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Logo Container */}
      <CardHeader className="relative pb-4">
        <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-6">
          <div className="transition-transform duration-300 group-hover:scale-110">
            <PlatformLogo 
              iconName={platform.logo} 
              color={platform.logoColor || 'default'}
              size={64}
            />
          </div>
        </div>
        
        {platform.isNew && (
          <Badge 
            variant="default" 
            className="absolute right-6 top-6 bg-green-500 hover:bg-green-600"
          >
            Nouveau
          </Badge>
        )}

        <CardTitle className="text-xl">{platform.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {platform.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-4">
        {/* Active Groups Counter */}
        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <span className="text-sm font-semibold text-blue-600">
              {platform.activeGroups}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            groupe{platform.activeGroups > 1 ? 's' : ''} actif{platform.activeGroups > 1 ? 's' : ''}
          </span>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4">
        <Badge variant="secondary" className={getCategoryVariant(platform.category)}>
          {getCategoryLabel(platform.category)}
        </Badge>
      </CardFooter>
    </Card>
  );
}

function getCategoryVariant(category: string): string {
  const variants: Record<string, string> = {
    streaming: 'bg-red-100 text-red-700 hover:bg-red-200',
    music: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    gaming: 'bg-green-100 text-green-700 hover:bg-green-200',
    fitness: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
    cloud: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    elearning: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
  };
  return variants[category] || 'bg-gray-100 text-gray-700 hover:bg-gray-200';
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    streaming: 'Streaming Vidéo',
    music: 'Musique',
    gaming: 'Gaming',
    fitness: 'Fitness',
    cloud: 'Cloud & Stockage',
    elearning: 'E-Learning',
  };
  return labels[category] || category;
}
