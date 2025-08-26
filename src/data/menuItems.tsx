import { House } from 'lucide-react';
import React, { ReactNode } from 'react';

/**
 * Represents a single menu item to be displayed in the sidebar or navigation.
 */
export interface MenuItem {
  /**
   * The display name of the menu item.
   */
  name: string;

  /**
   * The URL path the menu item links to.
   */
  path: string;

  /**
   * The icon or visual representation shown next to the menu item.
   */
  logo: ReactNode;
}

/**
 * List of predefined menu items for the application's navigation.
 *
 * @example
 * ```tsx
 * <Sidebar items={menuItems} />
 * ```
 */
const menuItems: MenuItem[] = [
  {
    name: "Home",
    path: "",
    logo: <House className="w-5 h-5 -ml-1" />, // Using Lucide icon for Home
  },
];

export default menuItems;
