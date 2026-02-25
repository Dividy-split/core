'use client';

import { useState, useMemo } from 'react';
import PlatformCard from '@/components/features/platforms/PlatformCard';
import CategoryFilter from '@/components/features/platforms/CategoryFilter';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockPlatforms, categories } from '@/data/mockPlatforms';
import { Grid3X3, SearchIcon, Tag } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-2xl border bg-card/80 p-6 backdrop-blur-sm md:p-8">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">Plateformes disponibles</h1>
            <p className="mx-auto max-w-3xl text-base text-muted-foreground md:text-lg">
              Trouvez rapidement un abonnement à partager et comparez les plateformes les plus demandées.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border bg-background p-4">
              <p className="mb-1 text-xs text-muted-foreground">Total plateformes</p>
              <p className="flex items-center gap-2 text-2xl font-semibold">
                <Grid3X3 className="h-5 w-5" />
                {mockPlatforms.length}
              </p>
            </div>
            <div className="rounded-xl border bg-background p-4">
              <p className="mb-1 text-xs text-muted-foreground">Catégories</p>
              <p className="flex items-center gap-2 text-2xl font-semibold">
                <Tag className="h-5 w-5" />
                {categories.length}
              </p>
            </div>
            <div className="rounded-xl border bg-background p-4">
              <p className="mb-1 text-xs text-muted-foreground">Résultats actuels</p>
              <p className="text-2xl font-semibold">{totalPlatforms}</p>
            </div>
          </div>

          <div className="mx-auto mb-6 max-w-xl">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher une plateforme..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 rounded-xl pl-10"
              />
            </div>
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </section>

        <div className="mb-6 flex justify-center">
          <Badge variant="secondary" className="rounded-full px-4 py-2 text-base">
            {totalPlatforms} plateforme{totalPlatforms > 1 ? 's' : ''} trouvée{totalPlatforms > 1 ? 's' : ''}
          </Badge>
        </div>

        {filteredPlatforms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlatforms.map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border bg-card p-10 text-center">
            <p className="text-lg text-muted-foreground">
              Aucune plateforme trouvée
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
