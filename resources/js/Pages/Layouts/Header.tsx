import React, { useState } from 'react';
import { ShoppingCart, User, Menu, LogOut } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import CartDrawer from "@/Components/CartDrawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from '@/Components/ui/button';

interface Category {
  id: number;
  category_name: string;
  slug: string;
  children: Category[];
}

export default function Header() {
  const { auth, navigationCategories, cart } = usePage<PageProps>().props;
  const user = auth.user;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = cart?.length || 0;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <LogoPlants className="h-12 w-12 text-[#50AE4E]" />
                <span className="text-xl font-bold text-gray-900">Yestera</span>
              </Link>
            </div>

            {/* ✅ Menu Tengah */}
            <div className="flex-1 flex justify-center">
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-m px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
                    >
                      Home
                    </NavigationMenuLink>
                  </NavigationMenuItem>
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
                      className="group inline-flex h-10 w-max items-center justify-center rounded-m px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
                    >
                      About Us
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* ✅ Icon kanan */}
            <div className="flex items-center space-x-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user.name?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={route('profile.edit')} className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={route('logout')} method="post" as="button" className="w-full flex items-center">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild variant="ghost">
                  <Link href={route('login')}>
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              )}

              {/* 🛒 Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 relative hover:bg-gray-100"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
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

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart || []}
      />
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
