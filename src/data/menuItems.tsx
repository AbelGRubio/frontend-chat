import { House } from 'lucide-react';
import React, { ReactNode } from 'react';

export interface MenuItem {
  name: string;        // usa 'string' (tipo primitivo), no 'String' (objeto)
  path: string;
  logo: ReactNode;     // aquí ReactNode está perfecto para JSX
}

const menuItems: MenuItem[] = [
  { name: "Home", path: "/", logo: <House className="w-5 h-5 -ml-1" /> },
];

export default menuItems;
