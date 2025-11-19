import { Category } from '@/types/platform';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const totalCount = categories.reduce((acc, cat) => acc + cat.count, 0);

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* Bouton "Toutes" */}
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="lg"
          onClick={() => onSelectCategory('all')}
          className="transition-all duration-200 hover:scale-105"
        >
          Toutes
          <Badge 
            variant="secondary" 
            className="ml-2 bg-background/20 text-foreground"
          >
            {totalCount}
          </Badge>
        </Button>

        {/* Boutons de catégories */}
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="lg"
            onClick={() => onSelectCategory(category.id)}
            className="transition-all duration-200 hover:scale-105"
          >
            <span className="mr-2 text-xl">{category.icon}</span>
            {category.name}
            <Badge 
              variant="secondary" 
              className="ml-2 bg-background/20 text-foreground"
            >
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
}