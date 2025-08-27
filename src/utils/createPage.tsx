import React, { ReactNode } from "react";
import Layout from "../components/Layout";

type ProviderWrapper = (children: ReactNode) => ReactNode;

/**
 * Factory de page générique
 */
export function createPage(
  prefix: string,
  wrappers: ProviderWrapper[] = []
) {
  // Importe tous les modules de façon statique
  const modules = import.meta.glob("../pages/**/[A-Z]*.{tsx,ts}", {
    eager: true,
  }) as Record<string, { default: React.ComponentType<any> }>;

  const Top = modules[`../pages/${prefix}/${prefix}Top.tsx`]?.default ?? null;
  const Left = modules[`../pages/${prefix}/${prefix}Left.tsx`]?.default ?? null;
  const Center = modules[`../pages/${prefix}/${prefix}Center.tsx`]?.default ?? null;
  const Right = modules[`../pages/${prefix}/${prefix}Right.tsx`]?.default ?? null;

  return function Page() {
    let content: ReactNode = (
      <Layout
        top={Top ? <Top /> : null}
        left={Left ? <Left /> : null}
        center={Center ? <Center /> : null}
        right={Right ? <Right /> : null}
      />
    );

    // appliquer les wrappers
    wrappers.forEach((wrap) => {
      content = wrap(content);
    });

    return <>{content}</>;
  };
}
