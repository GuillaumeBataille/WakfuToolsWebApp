import Layout from "../components/Layout";
import React, { ReactNode } from "react";

type ProviderWrapper = (children: ReactNode) => ReactNode;

export function createPage(
  prefix: string,
  wrappers: ProviderWrapper[] = [] // tableau de wrappers optionnel
) {
  const modules: Record<string, { default: React.ComponentType<any> }> =
    import.meta.glob("../pages/**/[A-Z]*.{tsx,ts}", { eager: true }) as any;

  const Top = modules[`../pages/${prefix}/${prefix}Top.tsx`]?.default ?? null;
  const Left = modules[`../pages/${prefix}/${prefix}Left.tsx`]?.default ?? null;
  const Center = modules[`../pages/${prefix}/${prefix}Center.tsx`]?.default ?? null;
  const Right = modules[`../pages/${prefix}/${prefix}Right.tsx`]?.default ?? null;

  return function Page() {
    let content: ReactNode = (
      <Layout
        top={Top && <Top />}
        left={Left && <Left />}
        center={Center && <Center />}
        right={Right && <Right />}
      />
    );

    // appliquer tous les wrappers en ordre
    wrappers.forEach((wrap) => {
      content = wrap(content);
    });

    return <>{content}</>;
  };
}
