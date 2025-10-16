import React, { useState } from 'react';
import { ShoppingCart, User, Menu } from 'lucide-react';
import LogoPlants from "@/Components/Logo";
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/Components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import CartDrawer from "@/Components/CartDrawer"; // ✅ import drawer baru

interface Category {
  id: number;
  category_name: string;
  slug: string;
  children: Category[];
}

export default function Header() {
  const { auth, navigationCategories } = usePage<PageProps>().props;
  const user = auth.user;

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center">
            {/* ✅ Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <LogoPlants className="h-12 w-12 text-[#50AE4E]" />
                <span className="text-xl font-bold text-gray-900">Plants</span>
              </Link>
            </div>

            {/* ✅ Menu Tengah */}
            <div className="flex-1 flex justify-center">
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[800px] p-4 md:grid-cols-3 lg:w-[900px]">
                        <ul className="row-span-3">
                          <li className="h-full">
                            <NavigationMenuLink asChild>
                              <Link
                                style={{ backgroundImage: "url('/images/hero/halo.jpg')" }}
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-600 to-green-700 p-6 no-underline outline-none focus:shadow-md"
                                href="/shop"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium text-white">
                                  All Products
                                </div>
                                <p className="text-sm leading-tight text-white">
                                  Explore our entire collection of indoor and outdoor plants.
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>

                        {navigationCategories.map((parentCategory) => (
                          <ul key={parentCategory.id} className="flex flex-col space-y-1 p-2">
                            <li className="mb-2">
                              <h3 className="text-lg font-medium text-gray-900 px-3">
                                {parentCategory.category_name}
                              </h3>
                              <p className="text-sm text-gray-500 px-3">
                                Plants for your {parentCategory.category_name.toLowerCase()}.
                              </p>
                            </li>
                            {parentCategory.children.map((childCategory) => (
                              <ListItem
                                key={childCategory.id}
                                href={route('category.show', {
                                  parent_slug: parentCategory.slug,
                                  child_slug: childCategory.slug
                                })}
                                title={childCategory.category_name}
                              />
                            ))}
                          </ul>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/about"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    >
                      About Us
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/detailproduct"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                    >
                      Detail Product
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* ✅ Icon kanan */}
            <div className="flex items-center space-x-4">
              {user ? (
                <Link
                  className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 hover:bg-gray-100"
                  aria-label="Profile"
                  href={route('profile.edit')}
                >
                  <User className="h-5 w-5" />
                </Link>
              ) : (
                <Link
                  className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 hover:bg-gray-100"
                  aria-label="Profile"
                  href={route('login')}
                >
                  <User className="h-5 w-5" />
                </Link>
              )}

              {/* 🛒 Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 relative hover:bg-gray-100"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  3
                </span>
              </button>

              <button
                className="inline-flex md:hidden items-center justify-center rounded-md text-sm font-medium h-10 w-10 hover:bg-gray-100"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
