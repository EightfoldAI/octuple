'use client';

import React, {
  cloneElement,
  FC,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  autoUpdate,
  ElementProps,
  flip,
  FloatingFocusManager,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  FloatingTreeType,
  offset,
  ReferenceType,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useRole,
} from '@floating-ui/react';
import { DropdownMenuProps, MenuItemTypes, MenuSize } from './Menu.types';
import { MenuItemType } from './MenuItem/MenuItem.types';
import { MenuItem } from './MenuItem/MenuItem';
import { Button, ButtonSize, ButtonVariant } from '../Button';
import { List } from '../List';
import { Stack } from '../Stack';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import {
  canUseDom,
  eventKeys,
  mergeClasses,
  RenderProps,
} from '../../shared/utilities';

import dropdownStyles from '../Dropdown/dropdown.module.scss';
import menuStyles from './menu.module.scss';

export const MenuComponent: FC<DropdownMenuProps> = forwardRef<
  HTMLDivElement,
  DropdownMenuProps
>(({ children, ...props }, ref: React.ForwardedRef<HTMLDivElement>) => {
  const htmlDir: string = useCanvasDirection();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [allowHover, setAllowHover] = useState<boolean>(false);
  const tree: FloatingTreeType<ReferenceType> = useFloatingTree();
  const nodeId: string = useFloatingNodeId();
  const parentId: string = useFloatingParentNodeId();
  const isNested: boolean = parentId != null;

  const { x, y, strategy, refs, context } = useFloating<ReferenceType>({
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: isNested ? 'right-start' : 'bottom-start',
    middleware: [
      offset({
        mainAxis: isNested ? 8 : 0,
        alignmentAxis: isNested ? -8 : 0,
      }),
      flip(),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const listRef: React.MutableRefObject<any[]> = useRef([]);

  const listNavigation: ElementProps = useListNavigation(context, {
    listRef,
    activeIndex: activeIndex,
    nested: isNested,
    onNavigate: setActiveIndex,
    scrollItemIntoView: true,
  });

  const hover: ElementProps = useHover<ReferenceType>(context, {
    enabled: isNested && allowHover,
    delay: { open: 75 },
    handleClose: safePolygon({
      restMs: 25,
      blockPointerEvents: true,
    }),
  });

  const click: ElementProps = useClick<ReferenceType>(context, {
    event: 'mousedown',
    toggle: !isNested || !allowHover,
    ignoreMouse: isNested,
  });

  const role: ElementProps = useRole<ReferenceType>(context, {
    role: 'menu',
  });

  const dismiss: ElementProps = useDismiss<ReferenceType>(context);

  // TODO: ENG-46500 Implement `typeahead` in `useInteractions` via
  // `useTypeahead` floating-ui helper.
  // See floating-ui API reference implementation at:
  // https://codesandbox.io/s/bold-panna-9tf226?file=/src/DropdownMenu.tsx
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [hover, click, role, dismiss, listNavigation]
  );

  // Event emitter allows you to communicate across tree components.
  // This effect closes all menus when an item gets clicked anywhere
  // in the tree.
  useEffect(() => {
    if (!tree) return null;

    const handleTreeClick = (): void => {
      setIsOpen(false);
    };

    const onSubMenuOpen = (event: {
      nodeId: string;
      parentId: string;
    }): void => {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        setIsOpen(false);
      }
    };

    tree.events.on('click', handleTreeClick);
    tree.events.on('menuopen', onSubMenuOpen);

    return () => {
      tree.events.off('click', handleTreeClick);
      tree.events.off('menuopen', onSubMenuOpen);
    };
  }, [tree, nodeId, parentId]);

  useEffect(() => {
    if (isOpen && tree) {
      tree.events.emit('menuopen', { parentId, nodeId });
    }
  }, [tree, isOpen, nodeId, parentId]);

  // Determine if "hover" logic can run based on the modality of input. This
  // prevents unwanted focus synchronization as menus open and close with
  // keyboard navigation and the cursor is resting on the menu.
  useEffect(() => {
    const onPointerMove = ({ pointerType }: PointerEvent): void => {
      if (pointerType !== 'touch') {
        setAllowHover(true);
      }
    };

    const onKeyDown = (): void => {
      setAllowHover(false);
    };

    if (canUseDom()) {
      window.addEventListener('pointermove', onPointerMove, {
        once: true,
        capture: true,
      });

      window.addEventListener('keydown', onKeyDown, true);
    }

    return () => {
      if (canUseDom()) {
        window.removeEventListener('pointermove', onPointerMove, {
          capture: true,
        });
        window.removeEventListener('keydown', onKeyDown, true);
      }
    };
  }, [allowHover]);

  const reference: (instance: ReferenceType) => void =
    useMergeRefs<ReferenceType>([refs.setReference, ref]);

  const handleReferenceKeyDown = (event: React.KeyboardEvent): void => {
    event?.stopPropagation();
    if (props.disabled) {
      return;
    }
    if (!isNested) {
      props.referenceOnKeydown?.(event);
    }
    if (
      event?.key === eventKeys.ARROWDOWN &&
      document.activeElement === event.target &&
      !isNested &&
      !isOpen
    ) {
      event?.preventDefault();
      setIsOpen(true);
    }
    if (
      event?.key === eventKeys.ARROWUP &&
      document.activeElement === event.target &&
      !isNested &&
      isOpen
    ) {
      event?.preventDefault();
      setIsOpen(false);
    }
    if (
      event?.key === eventKeys.ESCAPE ||
      (event?.key === eventKeys.TAB &&
        event.shiftKey &&
        !(event.target as HTMLElement).matches(':focus-within'))
    ) {
      setIsOpen(false);
    }
  };

  const getReference = (): JSX.Element | React.ReactNode => {
    if (React.isValidElement(children)) {
      const child = React.Children.only(children) as React.ReactElement<any>;
      const referenceClassNames: string = mergeClasses([
        // Add any classnames added to the reference element
        { [child.props.className]: !!child.props.className },
        { [child.props.classNames]: !!child.props.classNames },
      ]);

      const clonedElementProps: RenderProps = {
        ref: reference,
        role: 'button',
        'data-open': isOpen ? '' : undefined,
        ...getReferenceProps({
          className: referenceClassNames,
          onClick(event) {
            event.stopPropagation();
            if (!isNested) {
              props.referenceOnClick?.(event);
            }
          },
          onKeyDown: handleReferenceKeyDown,
          ...(isNested && {
            role: 'menuitem',
          }),
        }),
      };

      // Compares for octuple react prop vs native react html classes.
      if (child.props?.className) {
        clonedElementProps['className'] = referenceClassNames;
      } else if (child.props.classNames) {
        clonedElementProps['classNames'] = referenceClassNames;
      }

      return cloneElement(child, clonedElementProps);
    }
    return children;
  };

  const footerClassNames: string = mergeClasses([
    menuStyles.menuFooterContainer,
    {
      [menuStyles.large]: props.size === MenuSize.large,
      [menuStyles.medium]: props.size === MenuSize.medium,
      [menuStyles.small]: props.size === MenuSize.small,
    },
  ]);

  const headerClassNames: string = mergeClasses([
    menuStyles.menuHeaderContainer,
    {
      [menuStyles.large]: props.size === MenuSize.large,
      [menuStyles.medium]: props.size === MenuSize.medium,
      [menuStyles.small]: props.size === MenuSize.small,
    },
  ]);

  const menuClassNames: string = mergeClasses([
    props.classNames,
    menuStyles.menuContainer,
    {
      [menuStyles.large]: props.size === MenuSize.large,
      [menuStyles.medium]: props.size === MenuSize.medium,
      [menuStyles.small]: props.size === MenuSize.small,
    },
  ]);

  const menuSizeToButtonSizeMap: Map<MenuSize, ButtonSize> = new Map<
    MenuSize,
    ButtonSize
  >([
    [MenuSize.large, ButtonSize.Large],
    [MenuSize.medium, ButtonSize.Medium],
    [MenuSize.small, ButtonSize.Small],
  ]);

  const getListItem = (item: MenuItemTypes, index: number): JSX.Element => (
    <MenuItem
      classNames={props.itemClassNames}
      direction={htmlDir}
      key={`oc-menu-item-${index}`}
      onChange={props.onChange}
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        props.onClick?.(event);
        tree?.events.emit('click');
        props.onChange?.(item.value);
      }}
      onMouseEnter={() => {
        if (allowHover && isOpen) {
          setActiveIndex(index);
        }
      }}
      ref={(item: HTMLElement) => {
        listRef.current[index] = item;
      }}
      size={props.size}
      tabIndex={activeIndex === index && 0}
      type={item.type ?? MenuItemType.button}
      variant={props.variant}
      {...item}
      {...getItemProps()}
    />
  );

  const getHeader = (): JSX.Element =>
    props.header && (
      <div className={headerClassNames}>
        <div className={menuStyles.heading}>{props.header}</div>
      </div>
    );

  const getFooter = (): JSX.Element =>
    (props.cancelButtonProps || props.okButtonProps) && (
      <Stack
        flexGap="s"
        justify="flex-end"
        fullWidth
        classNames={footerClassNames}
      >
        {props.cancelButtonProps && (
          <Button
            variant={ButtonVariant.Neutral}
            {...props.cancelButtonProps}
            size={menuSizeToButtonSizeMap.get(props.size)}
            onClick={props.onCancel}
          />
        )}
        {props.okButtonProps && (
          <Button
            variant={ButtonVariant.Primary}
            {...props.okButtonProps}
            size={menuSizeToButtonSizeMap.get(props.size)}
            onClick={props.onOk}
          />
        )}
      </Stack>
    );

  return (
    <FloatingNode id={nodeId}>
      {getReference()}
      <FloatingPortal>
        {isOpen && (
          <FloatingFocusManager
            context={context}
            // Prevent outside content interference.
            modal={false}
            initialFocus={0}
            // Only return focus to the root menu's reference when menus close.
            returnFocus={!isNested}
          >
            <div
              ref={refs.setFloating}
              className={mergeClasses([
                dropdownStyles.dropdownWrapper,
                dropdownStyles.noPadding,
                { [dropdownStyles.open]: isOpen },
                { [dropdownStyles.close]: !isOpen },
              ])}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
              }}
              {...getFloatingProps()}
            >
              <List<MenuItemTypes>
                {...props}
                classNames={menuClassNames}
                footer={getFooter()}
                getItem={getListItem}
                header={getHeader()}
                items={props.items}
                listType={props.listType}
                role="menu"
                style={props.style}
              />
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </FloatingNode>
  );
});

export const CascadingMenu: FC<DropdownMenuProps> = forwardRef<
  HTMLDivElement,
  DropdownMenuProps
>(
  (
    props: React.PropsWithChildren<DropdownMenuProps>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const parentId: string = useFloatingParentNodeId();

    if (parentId === null) {
      return (
        <FloatingTree>
          <MenuComponent {...props} ref={ref} />
        </FloatingTree>
      );
    }

    return <MenuComponent {...props} ref={ref} />;
  }
);
