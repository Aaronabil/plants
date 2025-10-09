import { Card, CardContent } from "@/Components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel"
import { Category } from "@/types"
import { Link } from "@inertiajs/react"

interface CategoryCarouselProps {
    categories: Category[];
}

export default function CategoryCarousel({ categories }: CategoryCarouselProps) {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full"
        >
            <CarouselContent>
                {categories.map((category) => (
                    <CarouselItem key={category.id} className="md:basis-1/4 lg:basis-1/5">
                        <div className="p-1">
                            <Link href={route('category.show', {
                                parent_slug: category.parent?.slug || 'none',
                                child_slug: category.slug,
                            })}>
                                <Card className="overflow-hidden">
                                    <CardContent className="flex aspect-square items-center justify-center p-0">
                                        <img
                                            src={category.image_url || 'https://via.placeholder.com/200'}
                                            alt={category.category_name}
                                            className="w-full h-full object-cover"
                                        />
                                    </CardContent>
                                </Card>
                                <p className="text-center text-sm font-medium mt-2">{category.category_name}</p>
                            </Link>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:inline-flex" />
            <CarouselNext className="hidden sm:inline-flex" />
        </Carousel>
    )
}