import React from "react";

interface IBreadcrumbsProps {
  urlPath: string;
  path: string;
}

const Breadcrumbs = ({ urlPath, path }: IBreadcrumbsProps) => {
  const breadcrumbs = React.useMemo(() => {
    const idSegments = urlPath.split("/").filter(Boolean);
    const nameSegments = path.split("/").filter(Boolean);

    return idSegments.map((id, index) => {
      const name = nameSegments[index] ?? "Unknown";
      const href = "/" + nameSegments.slice(0, index + 1).join("/");

      return {
        id,
        name,
        href,
        isLast: index === idSegments.length - 1,
      };
    });
  }, [urlPath, path]);

  return (
    <div>
      {breadcrumbs.map((crumb, index) => (
        <span key={crumb.id}>
          {crumb.isLast ? (
            <span className="current-folder">{crumb.name}</span>
          ) : (
            <a href={crumb.href}>{crumb.name}</a>
          )}
          {index < breadcrumbs.length - 1 && " > "}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
