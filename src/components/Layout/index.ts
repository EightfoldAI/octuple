'use client';

import InternalLayout, {
  Article,
  Content,
  Footer,
  Header,
  Nav,
  Section,
} from './Layout';
import { Aside } from './Aside';

export { AsideProps, BasicProps as LayoutProps } from './Layout.types';

type InternalLayoutType = typeof InternalLayout;

export interface LayoutType extends InternalLayoutType {
  Article: typeof Article;
  Aside: typeof Aside;
  Content: typeof Content;
  Footer: typeof Footer;
  Header: typeof Header;
  Nav: typeof Nav;
  Section: typeof Section;
}

const Layout = InternalLayout as LayoutType;

Layout.Article = Article;
Layout.Aside = Aside;
Layout.Content = Content;
Layout.Footer = Footer;
Layout.Header = Header;
Layout.Nav = Nav;
Layout.Section = Section;

export default Layout;
