import React, { useState } from "react";
import { Link } from "react-router-dom";
import { version } from "../constants";
import { MenuItem } from "../data/menuItems";

interface SidebarProps {
  items: MenuItem[];
  onLogout: () => void;
}

export default function Sidebar({ items, onLogout }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={`relative flex flex-col bg-gray-800 text-white h-screen transition-all duration-300 ${
        isOpen ? "w-48" : "w-12"
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        // Opcional: cerrar menú al salir, si quieres
        // setIsOpen(false);
      }}
    >
      {/* Botón para abrir/cerrar menú (aparece solo si hover o abierto) */}
      {(isHovering || isOpen) && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-2 right-[-14px] w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-white shadow-lg"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          title={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          )}
        </button>
      )}

      {/* Menú */}
      <nav className="flex flex-col flex-grow pt-12 px-3">
        {items.map(({ name, path, logo }) => (
          <Link
            key={path}
            to={path}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors"
          >
            <div className="w-6 h-6 flex-shrink-0">{logo}</div>
            {isOpen && <span className="select-none">{name}</span>}
          </Link>
        ))}
        <div className="flex-grow" />
        <div className="mb-4 text-center">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 rounded hover:bg-red-600 transition-colors text-red-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
              />
            </svg>
            {isOpen && <span>Logout</span>}
          </button>

          {/* Versión del software */}
          <div className="text-xs text-gray-500 mt-2">
            {version}
          </div>
        </div>
      </nav>
    </div>
  );
}
