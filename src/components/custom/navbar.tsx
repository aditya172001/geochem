"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/src/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/src/components/ui/navigation-menu";
import { Button } from "../ui/button";

export function NavBar() {
  return (
    <NavigationMenu className="max-w-full justify-between">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-customBlue2 ">
            Orders
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/orders?stage=preEntry" title="Pre Entry">
                Enter the package details in system
              </ListItem>
              <ListItem
                href="/orders?stage=processSample"
                title="Process Sample"
              >
                Fill all the details needed for a sample to get processed
              </ListItem>
              <ListItem
                href="/orders?stage=updateTestResult"
                title="Test Sample"
              >
                Enter the test result
              </ListItem>
              <ListItem href="/orders?stage=getReport" title="Get Results">
                Get the documents for result of sample who&apos;s test are
                completed
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Masters</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/masters?item=sample" title="Sample" />
              <ListItem href="/masters?item=test" title="Test" />
              <ListItem
                href="/masters?item=specification"
                title="Specification"
              />
              <ListItem
                href="/masters?item=specificationLimit"
                title="Specification Limit"
              />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/employees" legacyBehavior passHref>
            <NavigationMenuLink
              className={`bg-customBlue2 ${navigationMenuTriggerStyle()}`}
            >
              Employees
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/parties" legacyBehavior passHref>
            <NavigationMenuLink
              className={`bg-customBlue2 ${navigationMenuTriggerStyle()}`}
            >
              Parties
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/on-hold-packages" legacyBehavior passHref>
            <NavigationMenuLink
              className={`bg-customBlue2 ${navigationMenuTriggerStyle()}`}
            >
              On Hold Packages
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <Button variant="secondary">Profile</Button>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
