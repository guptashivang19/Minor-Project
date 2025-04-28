import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Moon, Sun, Activity } from "lucide-react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, show the theme toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center">
            <Activity className="text-primary h-6 w-6 mr-2" />
            <h1 className="text-xl font-bold text-primary">MediCheck</h1>
          </a>
        </Link>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </Button>
          <div className="hidden md:block">
            <Button className="bg-primary hover:bg-primary/90">Sign In</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
