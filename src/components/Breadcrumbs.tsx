import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];
    
    let currentPath = '';
    pathnames.forEach((pathname) => {
      currentPath += `/${pathname}`;
      
      // Map pathnames to readable labels
      const label = pathname
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
      
      // Don't add href for the current page (last item)
      items.push({
        label,
        href: currentPath === location.pathname ? undefined : currentPath
      });
    });
    
    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="py-4 px-4 bg-cream/30">
      <div className="container mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-warmBrown/50 mx-2" />
              )}
              {item.href ? (
                <Link
                  to={item.href}
                  className="text-warmBrown/70 hover:text-saffron transition-colors flex items-center"
                >
                  {index === 0 && <Home className="h-4 w-4 mr-1" />}
                  {item.label}
                </Link>
              ) : (
                <span className="text-warmBrown font-medium flex items-center">
                  {index === 0 && <Home className="h-4 w-4 mr-1" />}
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;