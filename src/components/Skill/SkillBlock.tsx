import React, {
  FC,
  Ref,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useMeasure from 'react-use-measure';
import { a, useSpring } from '@react-spring/web';
import {
  SkillBlockProps,
  SkillStatus,
  skillStatusToIconNameMap,
} from './Skill.types';
import {
  Button,
  ButtonShape,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
  ButtonWidth,
} from '../Button';
import { Dropdown } from '../Dropdown';
import { Icon, IconName, IconSize } from '../Icon';
import { Menu, MenuItemType, MenuItemTypes, MenuSize } from '../Menu';
import { ResizeObserver } from '../../shared/ResizeObserver/ResizeObserver';
import { useMergedRefs } from '../../hooks/useMergedRefs';
import { usePreviousState } from '../../hooks/usePreviousState';
import { eventKeys, generateId, mergeClasses } from '../../shared/utilities';

import styles from './skill.module.scss';

const SKILLBLOCK_CONTENT_FLEX_GAP: number = +styles.skillBlockContentFlexGap;
const FLEX_GAP_PER_COL: number = SKILLBLOCK_CONTENT_FLEX_GAP * 2;

const SKILLBLOCK_CONTENT_PADDING: number = +styles.skillBlockContentPadding;
const CONTENT_SIDE_PADDING: number = SKILLBLOCK_CONTENT_PADDING * 2;

const SKILLBLOCK_CONTENT_COLS: number = 3;

const SKILLBLOCK_REFLOW_OFFSET: number =
  SKILLBLOCK_CONTENT_COLS + FLEX_GAP_PER_COL + CONTENT_SIDE_PADDING;

const SKILLBLOCK_OVERFLOWMENUONLY_THRESHOLD: number = 400;

export const SkillBlock: FC<SkillBlockProps> = React.forwardRef(
  (props: SkillBlockProps, ref: Ref<HTMLDivElement>) => {
    const {
      allowDisabledFocus = false,
      animate = true,
      background,
      bordered = true,
      classNames,
      clickable = false,
      color,
      content,
      contentClassNames,
      customButtonProps,
      disabled = false,
      endorseButtonProps,
      endorsement = false,
      expandable = false,
      expanded = false,
      expandedContent,
      expandedContentClassNames,
      extraContent,
      extraContentClassNames,
      footer,
      footerClassNames,
      highlightButtonProps,
      hoverable = false,
      iconProps,
      id,
      itemMenuAriaLabel,
      itemMenuButtonProps,
      itemMenuDropdownProps,
      itemMenuOnly,
      key,
      label,
      labelWidth,
      lineClamp,
      menuItems,
      maxWidth,
      minWidth = 'fit-content',
      onBlur,
      onClick,
      onKeyDown,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      readonly = false,
      reflow,
      role,
      status = SkillStatus.Default,
      style,
      tabIndex = 0,
      theme = 'white',
      title,
      updateDimension,
      width,
      ...rest
    } = props;
    const [dropdownVisible, setDropdownVisibility] = useState<boolean>(false);
    const [_reflow, setReflow] = useState<boolean>(false);
    const [skillExpanded, setSkillExpanded] = useState<boolean>(false);
    const [skillExtraContent, setSkillExtraContent] = useState<boolean>(false);
    const [mergedMenuItems, setMergedMenuItems] =
      useState<MenuItemTypes[]>(menuItems);
    const [_itemMenuOnly, setItemMenuOnly] = useState<boolean>(false);

    const skillId: React.MutableRefObject<string> = useRef<string>(
      id || generateId()
    );

    const blockEndRef: React.MutableRefObject<HTMLDivElement> = useRef(null);
    const blockStartRef: React.MutableRefObject<HTMLDivElement> = useRef(null);
    const blockMiddleRef: React.MutableRefObject<HTMLDivElement> = useRef(null);
    const contentRef: React.MutableRefObject<HTMLDivElement> = useRef(null);

    const expandedSkillRef: React.MutableRefObject<HTMLDivElement> =
      useRef(null);
    const [expandedContentContainerRef, expandedContentContainerBounds] =
      useMeasure();
    const expandingSpringProps = useSpring({
      height: skillExpanded ? expandedContentContainerBounds.height : 0,
      immediate: !animate,
      opacity: skillExpanded ? 1 : 0,
    });

    const extraContentRef: React.MutableRefObject<HTMLDivElement> =
      useRef(null);
    const [extraContentContainerRef, extraContentContainerBounds] =
      useMeasure();
    const extraSpringProps = useSpring({
      height: skillExtraContent ? extraContentContainerBounds.height : 0,
      immediate: !animate,
      opacity: skillExtraContent ? 1 : 0,
    });

    const blockLabelClassNames: string = mergeClasses([
      styles.label,
      styles.medium,
      { [styles.labelWidth]: !!labelWidth },
      { [styles.lineClamp]: lineClamp },
    ]);

    const skillClassNames: string = mergeClasses([
      styles.skill,
      styles.block,
      { [styles.bordered]: !!bordered },
      { [styles.animate]: !!animate },
      { [styles.clickable]: !!clickable },
      { [styles.hoverable]: !!hoverable },
      classNames,
      {
        [(styles as any)[theme]]:
          status !== SkillStatus.Highlight && status !== SkillStatus.Match,
      },
      { [styles.match]: status === SkillStatus.Match },
      { [styles.highlight]: status === SkillStatus.Highlight },
      { [styles.disabled]: !!disabled },
      { [styles.readonly]: !!readonly },
    ]);

    const [skillWrapperRef, skillWrapperBounds] = useMeasure();
    const mergedRef: (node: HTMLDivElement) => void = useMergedRefs(
      skillWrapperRef,
      ref
    );
    const previousSkillWrapperBounds: DOMRectReadOnly =
      usePreviousState(skillWrapperBounds);

    useEffect((): void => {
      updateDimension?.(
        previousSkillWrapperBounds &&
          skillWrapperBounds.height === previousSkillWrapperBounds?.height
      );
    }, [skillWrapperBounds?.height, previousSkillWrapperBounds?.height]);

    useEffect((): void => {
      if (itemMenuOnly !== null && typeof itemMenuOnly === 'boolean') {
        setItemMenuOnly(itemMenuOnly);
      }
    }, [itemMenuOnly]);

    useEffect((): void => {
      if (reflow !== null && typeof reflow === 'boolean') {
        setReflow(reflow);
        if (!reflow) {
          blockMiddleRef.current.style.order = '2';
          blockEndRef.current.style.order = '3';
        } else if (reflow) {
          blockMiddleRef.current.style.order = '3';
          blockEndRef.current.style.order = '2';
        }
      }
    }, [reflow]);

    useEffect((): void => {
      if (expandable) {
        setSkillExpanded(expanded);
      } else {
        setSkillExpanded(false);
      }
    }, [expandable, expanded]);

    useEffect((): void => {
      if (extraContent) {
        setSkillExtraContent(true);
      } else {
        setSkillExtraContent(false);
      }
    }, [extraContent]);

    useEffect((): void => {
      const skillElement: HTMLElement = document.getElementById(
        `${skillId?.current}`
      );
      if (expandable) {
        skillElement?.setAttribute('aria-expanded', `${skillExpanded}`);
      } else if (skillElement.hasAttribute('aria-expanded')) {
        skillElement?.removeAttribute('aria-expanded');
      }
    }, [expandable, skillExpanded]);

    const endorsementMenuButton = (): JSX.Element => (
      <Button
        checked={endorsement}
        alignText={ButtonTextAlign.Left}
        buttonWidth={ButtonWidth.fill}
        disabled={disabled}
        iconProps={{
          path: endorsement ? IconName.mdiThumbUp : IconName.mdiThumbUpOutline,
        }}
        shape={ButtonShape.Pill}
        size={ButtonSize.Small}
        text={endorseButtonProps.ariaLabel}
        toggle
        variant={ButtonVariant.SystemUI}
        {...endorseButtonProps}
        classNames={styles.button}
        onClick={
          !disabled
            ? (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                endorseButtonProps?.onClick(e);
              }
            : null
        }
      />
    );

    const highlightMenuButton = (): JSX.Element => (
      <Button
        alignText={ButtonTextAlign.Left}
        buttonWidth={ButtonWidth.fill}
        checked={status === SkillStatus.Highlight}
        disabled={disabled}
        iconProps={{
          path:
            status === SkillStatus.Highlight
              ? IconName.mdiStar
              : IconName.mdiStarOutline,
        }}
        shape={ButtonShape.Pill}
        size={ButtonSize.Small}
        text={highlightButtonProps.ariaLabel}
        toggle
        variant={ButtonVariant.SystemUI}
        {...highlightButtonProps}
        classNames={styles.button}
        onClick={
          !disabled
            ? (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                highlightButtonProps?.onClick(e);
              }
            : null
        }
      />
    );

    const customMenuButton = (): JSX.Element => (
      <Button
        alignText={ButtonTextAlign.Left}
        buttonWidth={ButtonWidth.fill}
        disabled={disabled}
        shape={ButtonShape.Pill}
        size={ButtonSize.Small}
        text={customButtonProps.ariaLabel}
        variant={ButtonVariant.SystemUI}
        {...customButtonProps}
        classNames={styles.button}
        onClick={
          !disabled
            ? (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                customButtonProps?.onClick(e);
              }
            : null
        }
      />
    );

    useMemo((): void => {
      let mergedItems: MenuItemTypes[] = [];
      if (
        menuItems &&
        (customButtonProps || endorseButtonProps || highlightButtonProps)
      ) {
        mergedItems?.unshift(
          ...(endorseButtonProps
            ? [
                {
                  render: (): JSX.Element => endorsementMenuButton(),
                  type: MenuItemType.custom,
                },
              ]
            : []),
          ...(highlightButtonProps
            ? [
                {
                  render: (): JSX.Element => highlightMenuButton(),
                  type: MenuItemType.custom,
                },
              ]
            : []),
          ...(customButtonProps
            ? [
                {
                  render: (): JSX.Element => customMenuButton(),
                  type: MenuItemType.custom,
                },
              ]
            : []),
          ...menuItems
        );
      } else if (
        !menuItems &&
        (customButtonProps || endorseButtonProps || highlightButtonProps)
      ) {
        mergedItems.push(
          ...(endorseButtonProps
            ? [
                {
                  render: () => endorsementMenuButton(),
                  type: MenuItemType.custom,
                },
              ]
            : []),
          ...(highlightButtonProps
            ? [
                {
                  render: () => highlightMenuButton(),
                  type: MenuItemType.custom,
                },
              ]
            : []),
          ...(customButtonProps
            ? [
                {
                  render: () => customMenuButton(),
                  type: MenuItemType.custom,
                },
              ]
            : [])
        );
      }
      setMergedMenuItems(mergedItems);
    }, [
      customButtonProps,
      endorseButtonProps,
      endorsement,
      highlightButtonProps,
      menuItems,
      status,
    ]);

    const getItemMenu = (): JSX.Element => {
      const getItems = (): MenuItemTypes[] => {
        if (_itemMenuOnly) {
          return mergedMenuItems?.map((item?: MenuItemTypes, idx?: number) => ({
            key: 'menuItem-' + idx,
            classNames:
              idx === 0 && item.type === MenuItemType.custom
                ? styles.customMenuTopInset
                : null,
            size: MenuSize.small,
            value: `menu ${idx}`,
            ...item,
          }));
        }

        return menuItems?.map((item?: MenuItemTypes, idx?: number) => ({
          key: 'menuItem-' + idx,
          classNames:
            idx === 0 && item.type === MenuItemType.custom
              ? styles.customMenuTopInset
              : null,
          size: MenuSize.small,
          value: `menu ${idx}`,
          ...item,
        }));
      };

      return (
        <li key="button-menu">
          <Dropdown
            disabled={disabled}
            overlay={<Menu items={getItems()} size={MenuSize.small} />}
            portal
            onVisibleChange={(isVisible) => setDropdownVisibility(isVisible)}
            visible={dropdownVisible}
            {...itemMenuDropdownProps}
          >
            <Button
              ariaLabel={itemMenuAriaLabel}
              iconProps={{ path: IconName.mdiDotsVertical }}
              {...itemMenuButtonProps}
              classNames={styles.button}
              shape={ButtonShape.Round}
              size={ButtonSize.Small}
              variant={ButtonVariant.Neutral}
            />
          </Dropdown>
        </li>
      );
    };

    const updateLayout = (): void => {
      if (content) {
        if (dropdownVisible) {
          setDropdownVisibility(false);
        }

        if (itemMenuOnly === null || reflow === null) {
          const skillElement: HTMLElement = document.getElementById(
            `${skillId?.current}`
          );
          const blockEndWidth: number =
            Math.floor(blockEndRef.current?.offsetWidth) || 0;
          const blockMiddleWidth: number =
            Math.floor(blockMiddleRef.current?.offsetWidth) || 0;
          const blockStartWidth: number =
            Math.floor(blockStartRef.current?.offsetWidth) || 0;
          const skillWidth: number = Math.floor(skillElement?.offsetWidth) || 0;

          if (reflow === null) {
            if (
              !_reflow &&
              skillWidth -
                (blockStartWidth + blockEndWidth + SKILLBLOCK_REFLOW_OFFSET) <
                blockMiddleWidth
            ) {
              setReflow(true);
              blockMiddleRef.current.style.order = '3';
              blockEndRef.current.style.order = '2';
            } else if (
              _reflow &&
              skillWidth -
                (blockStartWidth + blockEndWidth + SKILLBLOCK_REFLOW_OFFSET) >=
                blockMiddleWidth
            ) {
              setReflow(false);
              blockMiddleRef.current.style.order = '2';
              blockEndRef.current.style.order = '3';
            }
          }

          if (itemMenuOnly === null) {
            if (
              _reflow &&
              !_itemMenuOnly &&
              skillWidth < SKILLBLOCK_OVERFLOWMENUONLY_THRESHOLD
            ) {
              setItemMenuOnly(true);
            } else if (
              _reflow &&
              _itemMenuOnly &&
              skillWidth >= SKILLBLOCK_OVERFLOWMENUONLY_THRESHOLD
            ) {
              setItemMenuOnly(false);
            }
          }
        }
      }
    };

    useLayoutEffect(() => {
      updateLayout();
    }, [content, label]);

    return (
      <ResizeObserver onResize={updateLayout}>
        <div
          {...rest}
          aria-disabled={disabled}
          className={skillClassNames}
          id={skillId.current}
          key={key || `${skillId.current}-key`}
          onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
            if (disabled || readonly) {
              return;
            }
            onBlur?.(e);
            if (hoverable && !e.currentTarget.contains(e.relatedTarget)) {
              setSkillExpanded(false);
            }
          }}
          onFocus={(e: React.FocusEvent<HTMLDivElement>) => {
            if (disabled || readonly) {
              return;
            }
            onFocus?.(e);
            if (hoverable) {
              setSkillExpanded(true);
            }
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (disabled || readonly) {
              return;
            }
            onKeyDown?.(e);
            if (
              clickable &&
              expandable &&
              (e.key === eventKeys.ENTER || e.key === eventKeys.SPACE)
            ) {
              if (e.key === eventKeys.SPACE) {
                e.preventDefault(); // Prevents page scroll
              }
              setSkillExpanded((value) => !value);
            }
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
            if (disabled || readonly) {
              return;
            }
            onMouseEnter?.(e);
            if (hoverable) {
              setSkillExpanded(true);
            }
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
            if (disabled || readonly) {
              return;
            }
            onMouseLeave?.(e);
            if (hoverable) {
              setSkillExpanded(false);
            }
          }}
          style={{ ...style, color, maxWidth, minWidth, width }}
          tabIndex={!allowDisabledFocus && disabled ? null : tabIndex}
          title={title}
          ref={mergedRef}
          role={clickable || hoverable ? 'button' : role}
        >
          <div
            className={styles.background}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              if (
                readonly ||
                disabled ||
                !clickable ||
                e.target !== e.currentTarget
              ) {
                return;
              }
              onClick?.(e);
              if (expandable) {
                setSkillExpanded((value) => !value);
              }
            }}
            style={{ background }}
          ></div>
          <div className={styles.content} ref={contentRef}>
            <div
              className={styles.blockStart}
              ref={blockStartRef}
              style={{ width: labelWidth }}
            >
              {!!iconProps && status === SkillStatus.Default && (
                <Icon
                  style={{ color }}
                  {...iconProps}
                  classNames={styles.icon}
                  size={IconSize.Small}
                />
              )}
              {status !== SkillStatus.Default && (
                <Icon
                  classNames={styles.icon}
                  path={skillStatusToIconNameMap.get(status)}
                  size={IconSize.Small}
                  style={{ color }}
                />
              )}
              <span
                className={blockLabelClassNames}
                style={
                  lineClamp ? { WebkitLineClamp: lineClamp, color } : { color }
                }
              >
                {label}
              </span>
            </div>
            {!!content && (
              <div className={contentClassNames} ref={blockMiddleRef}>
                {content}
              </div>
            )}
            {(!!customButtonProps ||
              !!endorseButtonProps ||
              !!highlightButtonProps ||
              !!menuItems) && (
              <div className={styles.blockEnd} ref={blockEndRef}>
                <ul className={styles.buttonList}>
                  {!!endorseButtonProps && !_itemMenuOnly && (
                    <li key="endorsement-inline-button">
                      <Button
                        checked={endorsement}
                        iconProps={{
                          path: endorsement
                            ? IconName.mdiThumbUp
                            : IconName.mdiThumbUpOutline,
                        }}
                        onKeyDown={(
                          e: React.KeyboardEvent<HTMLButtonElement>
                        ) => {
                          e.stopPropagation();
                        }}
                        shape={
                          parseInt(endorseButtonProps?.counter, 10) > 0
                            ? ButtonShape.Pill
                            : ButtonShape.Round
                        }
                        toggle
                        {...endorseButtonProps}
                        classNames={styles.button}
                        onClick={
                          !disabled
                            ? (
                                e: React.MouseEvent<
                                  HTMLButtonElement,
                                  MouseEvent
                                >
                              ) => {
                                e.stopPropagation();
                                endorseButtonProps?.onClick(e);
                              }
                            : null
                        }
                        size={ButtonSize.Small}
                        variant={ButtonVariant.Neutral}
                      />
                    </li>
                  )}
                  {!!highlightButtonProps && !_itemMenuOnly && (
                    <li key="highlight-inline-button">
                      <Button
                        checked={status === SkillStatus.Highlight}
                        iconProps={{
                          path:
                            status === SkillStatus.Highlight
                              ? IconName.mdiStar
                              : IconName.mdiStarOutline,
                        }}
                        onKeyDown={(
                          e: React.KeyboardEvent<HTMLButtonElement>
                        ) => {
                          e.stopPropagation();
                        }}
                        shape={ButtonShape.Round}
                        toggle
                        {...highlightButtonProps}
                        classNames={styles.button}
                        onClick={
                          !disabled
                            ? (
                                e: React.MouseEvent<
                                  HTMLButtonElement,
                                  MouseEvent
                                >
                              ) => {
                                e.stopPropagation();
                                highlightButtonProps?.onClick(e);
                              }
                            : null
                        }
                        size={ButtonSize.Small}
                        variant={ButtonVariant.Neutral}
                      />
                    </li>
                  )}
                  {!!customButtonProps && !_itemMenuOnly && (
                    <li key="custom-inline-button">
                      <Button
                        onKeyDown={(
                          e: React.KeyboardEvent<HTMLButtonElement>
                        ) => {
                          e.stopPropagation();
                        }}
                        shape={ButtonShape.Round}
                        variant={ButtonVariant.Neutral}
                        {...customButtonProps}
                        classNames={styles.button}
                        onClick={
                          !disabled
                            ? (
                                e: React.MouseEvent<
                                  HTMLButtonElement,
                                  MouseEvent
                                >
                              ) => {
                                e.stopPropagation();
                                customButtonProps?.onClick(e);
                              }
                            : null
                        }
                        size={ButtonSize.Small}
                      />
                    </li>
                  )}
                  {(menuItems ||
                    (menuItems && _itemMenuOnly) ||
                    (!menuItems &&
                      (customButtonProps ||
                        endorseButtonProps ||
                        highlightButtonProps) &&
                      _itemMenuOnly)) &&
                    getItemMenu()}
                </ul>
              </div>
            )}
          </div>
          {skillExtraContent && <div className={styles.divider} />}
          {/* Extra content - May be transient and animates */}
          {!!extraContent && (
            <a.div style={extraSpringProps}>
              <div
                ref={extraContentContainerRef}
                className={mergeClasses([
                  styles.extraContent,
                  extraContentClassNames,
                  {
                    [styles.extra]: skillExtraContent,
                  },
                ])}
              >
                <div ref={extraContentRef}>
                  {!!extraContent && extraContent}
                </div>
              </div>
            </a.div>
          )}
          {footer && <div className={styles.divider} />}
          {/* Footer - May not be transient and never animates */}
          {!!footer && (
            <div className={mergeClasses([styles.footer, footerClassNames])}>
              {footer}
            </div>
          )}
          {skillExpanded && <div className={styles.divider} />}
          {/* Expanding Skill - May be transient and animates */}
          {(hoverable || expandable) && (
            <a.div style={expandingSpringProps}>
              <div
                ref={expandedContentContainerRef}
                className={mergeClasses([
                  styles.expandedContent,
                  expandedContentClassNames,
                  {
                    [styles.expanded]: skillExpanded,
                  },
                ])}
              >
                <div ref={expandedSkillRef}>
                  {!!expandedContent && expandedContent}
                </div>
              </div>
            </a.div>
          )}
        </div>
      </ResizeObserver>
    );
  }
);
