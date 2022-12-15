import React, { Ref, useMemo } from 'react';
import {
  BasicProps,
  BasicPropsWithTagName,
  GeneratorProps,
  LayoutContext,
} from './Layout.types';
import { mergeClasses } from '../../shared/utilities';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

import styles from './layout.module.scss';

const generator = ({ cssModifier, tagName }: GeneratorProps) => {
  return (BasicComponent: any) => {
    const Adapter = React.forwardRef<HTMLElement, BasicProps>((props, ref) => {
      return (
        <BasicComponent
          ref={ref}
          classNames={cssModifier}
          tagName={tagName}
          {...props}
        />
      );
    });

    return Adapter;
  };
};

const Basic = React.forwardRef<HTMLElement, BasicPropsWithTagName>(
  (
    { children, classNames, tagName, style, octupleStyles, ...rest },
    ref: Ref<HTMLElement>
  ) => {
    const htmlDir: string = useCanvasDirection();

    const tagClassNames: string = mergeClasses([
      { [styles.octuple]: octupleStyles },
      { [styles.layoutRtl]: htmlDir === 'rtl' },
      classNames,
    ]);

    return React.createElement(
      tagName,
      { className: tagClassNames, style: style, ...rest, ref },
      children
    );
  }
);

const BasicLayout = React.forwardRef<HTMLDivElement, BasicPropsWithTagName>(
  (
    {
      children,
      classNames,
      hasAside,
      style,
      tagName: Tag,
      octupleStyles,
      ...rest
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const htmlDir: string = useCanvasDirection();
    const [asides, setAsides] = React.useState<string[]>([]);

    const tagClassNames: string = mergeClasses([
      { [styles.octuple]: octupleStyles },
      {
        [styles.layoutHasAside]:
          typeof hasAside === 'boolean' ? hasAside : asides.length > 0,
      },
      { [styles.layoutRtl]: htmlDir === 'rtl' },
      classNames,
    ]);

    const contextValue = useMemo(
      () => ({
        asideHook: {
          addAside: (id: string) => {
            setAsides((prev) => [...prev, id]);
          },
          removeAside: (id: string) => {
            setAsides((prev) => prev.filter((currentId) => currentId !== id));
          },
        },
      }),
      []
    );

    return (
      <LayoutContext.Provider value={contextValue}>
        <Tag ref={ref} className={tagClassNames} style={style} {...rest}>
          {children}
        </Tag>
      </LayoutContext.Provider>
    );
  }
);

const Layout: React.ForwardRefExoticComponent<
  BasicProps & React.RefAttributes<HTMLElement>
> = generator({
  cssModifier: styles.layout,
  tagName: 'div',
})(BasicLayout);

const Nav: React.ForwardRefExoticComponent<
  BasicProps & React.RefAttributes<HTMLElement>
> = generator({
  cssModifier: styles.layoutNav,
  tagName: 'nav',
})(Basic);

const Header: React.ForwardRefExoticComponent<
  BasicProps & React.RefAttributes<HTMLElement>
> = generator({
  cssModifier: styles.layoutHeader,
  tagName: 'header',
})(Basic);

const Footer: React.ForwardRefExoticComponent<
  BasicProps & React.RefAttributes<HTMLElement>
> = generator({
  cssModifier: styles.layoutFooter,
  tagName: 'footer',
})(Basic);

const Content: React.ForwardRefExoticComponent<
  BasicProps & React.RefAttributes<HTMLElement>
> = generator({
  cssModifier: styles.layoutContent,
  tagName: 'main',
})(Basic);

const Section: React.ForwardRefExoticComponent<
  BasicProps & React.RefAttributes<HTMLElement>
> = generator({
  cssModifier: styles.layoutSection,
  tagName: 'section',
})(Basic);

const Article: React.ForwardRefExoticComponent<
  BasicProps & React.RefAttributes<HTMLElement>
> = generator({
  cssModifier: styles.layoutArticle,
  tagName: 'article',
})(Basic);

/** Developers may add whatever semantic elements required to meet A11y specs here using the above as a template.
 *  The above represent the most common regions of any web application.
 *  Some examples of semantic elements may be found at https://www.w3schools.com/html/html5_semantic_elements.asp
 */

export { Article, Content, Footer, Header, Nav, Section };

export default Layout;
