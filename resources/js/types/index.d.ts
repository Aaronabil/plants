export interface Category {
    id: number;
    category_name: string;
    slug: string;
    children: Category[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    navigationCategories: Category[];
};
