export interface Category {
    id: number;
    category_name: string;
    slug: string;
    description?: string;
    image_url?: string;
    parent?: Category | null;
    children: Category[];
}

export interface ProductImage {
    id: number;
    image_url: string;
}

export interface Product {
    id: number;
    product_name: string;
    description: string;
    price: string;
    stock: number;
    weight_in_kilograms: number;
    primary_image: ProductImage | null;
    category?: Category;
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
