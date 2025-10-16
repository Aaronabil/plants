import { Link } from '@inertiajs/react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
} from '@/Components/ui/pagination';
import { buttonVariants } from '@/Components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
}

export default function ShadcnPagination({ links }: PaginationProps) {
    if (links.length <= 3) return null;

    const prevLink = links[0];
    const nextLink = links[links.length - 1];

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Link
                        href={prevLink.url || '#'}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            !prevLink.url && "opacity-50 cursor-not-allowed"
                        )}
                        as="button"
                        disabled={!prevLink.url}
                    >
                        Previous
                    </Link>
                </PaginationItem>
                {links.slice(1, -1).map((link, index) => {
                    if (link.label.includes('...')) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }
                    return (
                        <PaginationItem key={index}>
                            <Link
                                href={link.url!}
                                className={cn(
                                    buttonVariants({ variant: "ghost", size: "icon" }),
                                    link.active && "bg-green-500 dark:bg-green-200"
                                )}
                            >
                                {link.label}
                            </Link>
                        </PaginationItem>
                    );
                })}
                <PaginationItem>
                    <Link
                        href={nextLink.url || '#'}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            !nextLink.url && "opacity-50 cursor-not-allowed"
                        )}
                        as="button"
                        disabled={!nextLink.url}
                    >
                        Next
                    </Link>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}