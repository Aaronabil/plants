import React from 'react';
import { ShoppingCart, User, Menu } from 'lucide-react';
import LogoPlants from "@/Components/Logo";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/Components/ui/navigation-menu';
import { cn } from '@/lib/utils';

interface HeaderProps {
  auth?: {
    user?: {
      name: string;
      email: string;
    };
  };
}


const indoorPlants = [
  { name: 'Succulent', path: '/Category/Indoor/Succulent' },
  { name: 'Monstera', path: '/Category/Indoor/Monstera' },
  { name: 'Cactus', path: '/Category/Indoor/Cactus' },
  { name: 'Calathea', path: '/Category/Indoor/Calathea' },
  { name: 'Spathithyllum', path: '/Category/Indoor/Spathithyllum' },
];

const outdoorPlants = [
  { name: 'Palm', path: '/Category/Outdoor/Palm' },
  { name: 'Aglaonema', path: '/Category/Outdoor/Aglaonema' },
  { name: 'Anthurium', path: '/Category/Outdoor/Anthurium'},
  { name: 'Alocasia', path: '/Category/Outdoor/Aocasia' },
  { name: 'Caladium', path: '/Category/Outdoor/Cladium' },
];

export default function Header({ auth }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <LogoPlants className="h-12 w-12 text-[#50AE4E]" />
              <span className="text-xl font-bold text-gray-900">Yestera</span>
            </a>
          </div>

          <div className="flex-1 flex justify-center">
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[800px] p-4 md:w-[800px] md:grid-cols-3 lg:w-[900px]">
                      <ul className="row-span-3">
                        <li className="h-full">
                          <NavigationMenuLink asChild>
                            <a
                              style={{ backgroundImage: "url('/images/halo.jpg')" }}

                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-600 p-6 no-underline outline-none focus:shadow-md"
                              href="/shop"
                            >                     
                              <div className="mb-2 mt-4 text-lg font-medium text-white">
                                All Products
                              </div>
                              <p className="text-sm leading-tight text-white">
                                Explore our entire collection of indoor and outdoor plants.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>

                      <ul className="flex flex-col space-y-1 p-2">
                        <li className="mb-2">
                          <h3 className="text-lg font-medium text-gray-900 px-3">
                            Indoor Plants
                          </h3>
                          <p className="text-sm text-gray-500 px-3">
                            Plants for your interior.
                          </p>
                        </li>
                        {indoorPlants.map((plant) => (
                         <ListItem
                            key={plant.name}
                            href={plant.path}
                            title={plant.name}
                          />
                        ))}
                      </ul>

                      <ul className="flex flex-col space-y-1 p-2">
                        <li className="mb-2">
                          <h3 className="text-lg font-medium text-gray-900 px-3">
                            Outdoor Plants
                          </h3>
                          <p className="text-sm text-gray-500 px-3">
                            Plants for your garden.
                          </p>
                        </li>
                          {outdoorPlants.map((plant) => (
                            <ListItem
                              key={plant.name}
                              href={plant.path}
                              title={plant.name}
                            />
                          ))}
                      </ul>
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
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center space-x-4">
            <a
              className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 hover:bg-gray-100"
              aria-label="Profile"
              href="/login"
            >
              <User className="h-5 w-5" />
            </a>
            <button
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
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';