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
    is_primary: boolean;
}

export interface Product {
    id: number;
    product_name: string;
    description: string;
    price: string;
    stock: number;
    weight_in_kilograms: number;
    slug: string;
    primary_image: ProductImage | null;
    category?: Category;
    images: ProductImage[];
    detail_description?: string;
    created_at: string;
}

export interface ProductsProp {
    data: Product[];
    // You might want to add other pagination properties here if they exist in your backend response,
    // such as current_page, last_page, total, from, to, per_page, links, etc.
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    created_at: string;
    email_verified_at?: string;
}

export interface CartItem {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;
    product: {
        id: number;
        product_name: string;
        price: number;
        images: Array<{
            image_url: string;
            is_primary: boolean;
        }>;
        category?: {
            category_name: string;
        };
    };
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    navigationCategories: Category[];
    cart: CartItem[];
    products: ProductsProp;
};
