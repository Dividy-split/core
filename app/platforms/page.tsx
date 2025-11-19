'use client';

import { useState, useMemo } from 'react';
import PlatformCard from '@/components/features/platforms/PlatformCard';
import CategoryFilter from '@/components/features/platforms/CategoryFilter';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockPlatforms, categories } from '@/data/mockPlatforms';
import { SearchIcon } from 'lucide-react';

export default function PlatformsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlatforms = useMemo(() => {
    return mockPlatforms.filter(platform => {
      const matchesCategory = selectedCategory === 'all' || platform.category === selectedCategory;
      const matchesSearch = platform.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const totalPlatforms = filteredPlatforms.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Plateformes Supportées
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez toutes les plateformes disponibles et vérifiez si vos abonnements actuels sont pris en charge
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher une plateforme..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Results Counter */}
        <div className="mb-6 flex justify-center">
          <Badge variant="secondary" className="text-base px-4 py-2">
            {totalPlatforms} plateforme{totalPlatforms > 1 ? 's' : ''} trouvée{totalPlatforms > 1 ? 's' : ''}
          </Badge>
        </div>

        {/* Platforms Grid */}
        {filteredPlatforms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlatforms.map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Aucune plateforme trouvée
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
