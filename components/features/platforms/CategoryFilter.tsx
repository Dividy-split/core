// components/features/platforms/CategoryFilter.tsx
import { Category } from "@/types/platform";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory("all")}
          className={
            selectedCategory === "all"
              ? "rounded-full bg-green-600 text-white hover:bg-green-700"
              : "rounded-full border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
          }
        >
          Toutes
          <Badge
            variant="secondary"
            className={
              selectedCategory === "all"
                ? "ml-2 bg-white/20 text-white"
                : "ml-2 bg-zinc-100 text-zinc-700"
            }
          >
            {totalCount}
          </Badge>
        </Button>

        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectCategory(category.id)}
            className={
              selectedCategory === category.id
                ? "rounded-full bg-green-600 text-white hover:bg-green-700"
                : "rounded-full border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
            }
          >
            <span className="mr-2 text-base">{category.icon}</span>
            {category.name}
            <Badge
              variant="secondary"
              className={
                selectedCategory === category.id
                  ? "ml-2 bg-white/20 text-white"
                  : "ml-2 bg-zinc-100 text-zinc-700"
              }
            >
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
}
