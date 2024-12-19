'use client';

import React from 'react';
import type { HTMLAttributes } from 'react';
import ReactDOM from 'react-dom';
import {
  addEventListenerWrapper,
  canUseDom,
  contains,
  findDOMNode,
  requestAnimationFrameWrapper,
} from '../../shared/utilities';
import { composeRef } from '../../shared/utilities/ref';
import { Portal } from '../Portal';
import { mergeClasses } from '../../shared/utilities';
import {
  getAlignFromPlacement,
  getAlignPopupClassName,
} from './Utils/alignUtil';
import Popup from './Popup/Popup';
import type { PopupInnerRef } from './Popup/Popup.types';
import TriggerContext from './context';
import type { CommonEventHandler, Point } from './Trigger.types';
import { BuildInPlacements, TriggerProps } from './Trigger.types';
import type { AlignType } from '../Align/Align.types';

function noop() {}

function returnEmptyString() {
  return '';
}

function returnDocument(element?: HTMLElement): Document | null {
  if (element) {
    return element.ownerDocument;
  }
  if (canUseDom()) {
    return window.document;
  }
  return null;
}

const ALL_HANDLERS = [
  'onClick',
  'onMouseDown',
  'onTouchStart',
  'onMouseEnter',
  'onMouseLeave',
  'onFocus',
  'onBlur',
  'onContextMenu',
];

interface TriggerState {
  prevPopupVisible: boolean;
  popupVisible: boolean;
  point?: Point;
}

/** TODO: Refactor to FN component (see more info on line 511)  **/
export function generateTrigger(
  PortalComponent: any
): React.ComponentClass<TriggerProps> {
  class Trigger extends React.Component<TriggerProps, TriggerState> {
    static contextType = TriggerContext;

    static defaultProps = {
      getPopupClassNameFromAlign: returnEmptyString,
      getDocument: returnDocument,
      onPopupVisibleChange: noop,
      afterPopupVisibleChange: noop,
      onPopupAlign: noop,
      popupClassNames: '',
      mouseEnterDelay: 0,
      mouseLeaveDelay: 0.1,
      focusDelay: 0,
      blurDelay: 0.15,
      popupStyle: {},
      destroyPopupOnHide: false,
      popupAlign: {},
      defaultPopupVisible: false,
      mask: false,
      maskClosable: true,
      action: [''],
      showAction: [''],
      hideAction: [''],
      autoDestroy: false,
    };

    popupRef = React.createRef<PopupInnerRef>();

    triggerRef = React.createRef<React.ReactInstance>();

    // ensure `getContainer` will be called only once
    portalContainer?: HTMLElement;

    attachId?: number;

    clickOutsideHandler: CommonEventHandler;

    touchOutsideHandler: CommonEventHandler;

    contextMenuOutsideHandler1: CommonEventHandler;

    contextMenuOutsideHandler2: CommonEventHandler;

    mouseDownTimeout: number;

    focusTime: number;

    preClickTime: number;

    preTouchTime: number;

    delayTimer: number;

    hasPopupMouseDown: boolean;

    constructor(props: TriggerProps) {
      super(props);

      let popupVisible: boolean;
      if ('popupVisible' in props) {
        popupVisible = !!props.popupVisible;
      } else {
        popupVisible = !!props.defaultPopupVisible;
      }

      this.state = {
        prevPopupVisible: popupVisible,
        popupVisible,
      };

      ALL_HANDLERS.forEach((h) => {
        (this as any)[`fire${h}`] = (e: Event) => {
          this.fireEvents(h, e);
        };
      });
    }

    componentDidMount() {
      this.componentDidUpdate();
    }

    componentDidUpdate() {
      const { props } = this;
      const { state } = this;

      // We must listen to `mousedown` or `touchstart`
      if (state.popupVisible) {
        let currentDocument;
        if (
          !this.clickOutsideHandler &&
          (this.isClickToHide() || this.isContextMenuToShow())
        ) {
          currentDocument = props.getDocument(this.getRootDomNode());
          this.clickOutsideHandler = addEventListenerWrapper(
            currentDocument,
            'mousedown',
            this.onDocumentClick
          );
        }

        // always hide on mobile
        if (!this.touchOutsideHandler) {
          currentDocument =
            currentDocument || props.getDocument(this.getRootDomNode());
          this.touchOutsideHandler = addEventListenerWrapper(
            currentDocument,
            'touchstart',
            this.onDocumentClick
          );
        }

        // close popup when trigger type contains 'onContextMenu' and document is scrolling.
        if (!this.contextMenuOutsideHandler1 && this.isContextMenuToShow()) {
          currentDocument =
            currentDocument || props.getDocument(this.getRootDomNode());
          this.contextMenuOutsideHandler1 = addEventListenerWrapper(
            currentDocument,
            'scroll',
            this.onContextMenuClose
          );
        }
        // close popup when trigger type contains 'onContextMenu' and window is blur.
        if (!this.contextMenuOutsideHandler2 && this.isContextMenuToShow()) {
          if (canUseDom()) {
            this.contextMenuOutsideHandler2 = addEventListenerWrapper(
              window,
              'blur',
              this.onContextMenuClose
            );
          }
        }
        return;
      }

      this.clearOutsideHandler();
    }

    componentWillUnmount() {
      this.clearDelayTimer();
      this.clearOutsideHandler();
      clearTimeout(this.mouseDownTimeout);
      requestAnimationFrameWrapper.cancel(this.attachId);
    }

    onMouseEnter = (e: any) => {
      const { mouseEnterDelay } = this.props;
      this.fireEvents('onMouseEnter', e);
      this.delaySetPopupVisible(
        true,
        mouseEnterDelay,
        mouseEnterDelay ? null : e
      );
    };

    onMouseMove = (e: any) => {
      this.fireEvents('onMouseMove', e);
      this.setPoint(e);
    };

    onMouseLeave = (e: any) => {
      this.fireEvents('onMouseLeave', e);
      this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
    };

    onPopupMouseEnter = () => {
      this.clearDelayTimer();
    };

    onPopupMouseLeave = (e: any) => {
      if (
        e.relatedTarget &&
        !e.relatedTarget.setTimeout &&
        contains(this.popupRef.current?.getElement(), e.relatedTarget)
      ) {
        return;
      }
      this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
    };

    onFocus = (e: any) => {
      this.fireEvents('onFocus', e);

      // in case focusin and focusout
      this.clearDelayTimer();
      if (this.isFocusToShow()) {
        this.focusTime = Date.now();
        this.delaySetPopupVisible(true, this.props.focusDelay);
      }
    };

    onMouseDown = (e: any) => {
      this.fireEvents('onMouseDown', e);
      this.preClickTime = Date.now();
    };

    onTouchStart = (e: any) => {
      this.fireEvents('onTouchStart', e);
      this.preTouchTime = Date.now();
    };

    onBlur = (e: any) => {
      this.fireEvents('onBlur', e);
      this.clearDelayTimer();
      if (this.isBlurToHide()) {
        this.delaySetPopupVisible(false, this.props.blurDelay);
      }
    };

    onContextMenu = (e: any) => {
      e.preventDefault();
      this.fireEvents('onContextMenu', e);
      this.setPopupVisible(true, e);
    };

    onContextMenuClose = () => {
      if (this.isContextMenuToShow()) {
        this.close();
      }
    };

    onClick = (event: any) => {
      this.fireEvents('onClick', event);
      // focus will trigger click
      if (this.focusTime) {
        let preTime;
        if (this.preClickTime && this.preTouchTime) {
          preTime = Math.min(this.preClickTime, this.preTouchTime);
        } else if (this.preClickTime) {
          preTime = this.preClickTime;
        } else if (this.preTouchTime) {
          preTime = this.preTouchTime;
        }
        if (Math.abs(preTime - this.focusTime) < 20) {
          return;
        }
        this.focusTime = 0;
      }
      this.preClickTime = 0;
      this.preTouchTime = 0;

      // Only prevent default when all the actions are click.
      if (
        this.isClickToShow() &&
        (this.isClickToHide() || this.isBlurToHide()) &&
        event &&
        event.preventDefault
      ) {
        event.preventDefault();
      }
      const nextVisible = !this.state.popupVisible;
      if (
        (this.isClickToHide() && !nextVisible) ||
        (nextVisible && this.isClickToShow())
      ) {
        this.setPopupVisible(!this.state.popupVisible, event);
      }
    };

    onPopupMouseDown = (...args: any[]) => {
      this.hasPopupMouseDown = true;

      if (canUseDom()) {
        clearTimeout(this.mouseDownTimeout);
        this.mouseDownTimeout = window.setTimeout(() => {
          this.hasPopupMouseDown = false;
        }, 0);
      }

      if (this.context) {
        this.context.onPopupMouseDown(...args);
      }
    };

    onDocumentClick = (event: any) => {
      if (this.props.mask && !this.props.maskClosable) {
        return;
      }

      const { target } = event;
      const root = this.getRootDomNode();
      const popupNode = this.getPopupDomNode();
      if (
        // mousedown on the target should also close popup when action is contextMenu.
        (!contains(root, target) || this.isContextMenuOnly()) &&
        !contains(popupNode, target) &&
        !this.hasPopupMouseDown
      ) {
        this.close();
      }
    };

    static getDerivedStateFromProps(
      { popupVisible }: TriggerProps,
      prevState: TriggerState
    ) {
      const newState: Partial<TriggerState> = {};

      if (
        popupVisible !== undefined &&
        prevState.popupVisible !== popupVisible
      ) {
        newState.popupVisible = popupVisible;
        newState.prevPopupVisible = prevState.popupVisible;
      }

      return newState;
    }

    getPopupDomNode() {
      // for test
      return this.popupRef.current?.getElement() || null;
    }

    getRootDomNode = (): HTMLElement => {
      const { getTriggerDOMNode } = this.props;
      if (getTriggerDOMNode) {
        return getTriggerDOMNode(this.triggerRef.current);
      }

      try {
        const domNode = findDOMNode<HTMLElement>(this.triggerRef.current);
        if (domNode) {
          return domNode;
        }
      } catch (err) {
        // Do nothing
      }

      return ReactDOM.findDOMNode(this) as HTMLElement;
    };

    getPopupClassNameFromAlign = (align: AlignType) => {
      const classNames = [];
      const {
        popupPlacement,
        builtinPlacements,
        alignPoint,
        getPopupClassNameFromAlign,
      } = this.props;
      if (popupPlacement && builtinPlacements) {
        classNames.push(
          getAlignPopupClassName(builtinPlacements, align, alignPoint)
        );
      }
      if (getPopupClassNameFromAlign) {
        classNames.push(getPopupClassNameFromAlign(align));
      }
      return classNames.join(' ');
    };

    getPopupAlign() {
      const { props } = this;
      const { popupPlacement, popupAlign, builtinPlacements } = props;
      if (popupPlacement && builtinPlacements) {
        return getAlignFromPlacement(
          builtinPlacements,
          popupPlacement,
          popupAlign
        );
      }
      return popupAlign;
    }

    getComponent = () => {
      const {
        destroyPopupOnHide,
        popupClassNames,
        onPopupAlign,
        popupMotion,
        popupStyle,
        mask,
        maskMotion,
        zIndex,
        popup,
        stretch,
        alignPoint,
        mobile,
        forceRender,
        onPopupClick,
      } = this.props;
      const { popupVisible, point } = this.state;

      const align = this.getPopupAlign();

      const mouseProps: HTMLAttributes<HTMLElement> = {};
      if (this.isMouseEnterToShow()) {
        mouseProps.onMouseEnter = this.onPopupMouseEnter;
      }
      if (this.isMouseLeaveToHide()) {
        mouseProps.onMouseLeave = this.onPopupMouseLeave;
      }

      mouseProps.onMouseDown = this.onPopupMouseDown;
      mouseProps.onTouchStart = this.onPopupMouseDown;

      return (
        <Popup
          destroyPopupOnHide={destroyPopupOnHide}
          visible={popupVisible}
          point={alignPoint && point}
          classNames={popupClassNames}
          align={align}
          onAlign={onPopupAlign}
          getClassNameFromAlign={this.getPopupClassNameFromAlign}
          {...mouseProps}
          stretch={stretch}
          getRootDomNode={this.getRootDomNode}
          style={popupStyle}
          mask={mask}
          zIndex={zIndex}
          maskMotion={maskMotion}
          ref={this.popupRef}
          motion={popupMotion}
          mobile={mobile}
          forceRender={forceRender}
          onClick={onPopupClick}
        >
          {typeof popup === 'function' ? popup() : popup}
        </Popup>
      );
    };

    attachParent = (popupContainer: HTMLElement) => {
      requestAnimationFrameWrapper.cancel(this.attachId);

      const { getPopupContainer, getDocument } = this.props;
      const domNode = this.getRootDomNode();

      let mountNode: HTMLElement;
      if (!getPopupContainer) {
        mountNode = getDocument(this.getRootDomNode()).body;
      } else if (domNode || getPopupContainer.length === 0) {
        mountNode = getPopupContainer(domNode);
      }

      if (mountNode) {
        mountNode.appendChild(popupContainer);
      } else {
        // Retry after frame render in case parent not ready
        this.attachId = requestAnimationFrameWrapper(() => {
          this.attachParent(popupContainer);
        });
      }
    };

    getContainer = () => {
      if (!this.portalContainer) {
        // In React.StrictMode component will call render multiple time in first mount.
        // When you want to refactor with FC, useRef will also init multiple times and
        // point to different useRef instance which will create multiple element
        // (This multiple render will not trigger effect so you can not clean up this
        // in effect). But this is safe with class component since it always point to same class instance.
        const { getDocument } = this.props;
        const popupContainer = getDocument(this.getRootDomNode()).createElement(
          'div'
        );
        // Make sure default popup container will never cause scrollbar appearing
        popupContainer.style.position = 'absolute';
        popupContainer.style.top = '0';
        popupContainer.style.left = '0';
        popupContainer.style.width = '100%';

        this.portalContainer = popupContainer;
      }

      this.attachParent(this.portalContainer);
      return this.portalContainer;
    };

    /**
     * @param popupVisible    Show or not the popup element
     * @param event           SyntheticEvent, used for `pointAlign`
     */
    setPopupVisible(
      popupVisible: boolean,
      event?: { pageX: number; pageY: number }
    ) {
      const { alignPoint } = this.props;
      const { popupVisible: prevPopupVisible } = this.state;

      this.clearDelayTimer();

      if (prevPopupVisible !== popupVisible) {
        if (!('popupVisible' in this.props)) {
          this.setState({ popupVisible, prevPopupVisible });
        }
        this.props.onPopupVisibleChange(popupVisible);
      }

      // Always record the point position since mouseEnterDelay will delay the show
      if (alignPoint && event && popupVisible) {
        this.setPoint(event);
      }
    }

    setPoint = (point: any) => {
      const { alignPoint } = this.props;
      if (!alignPoint || !point) return;

      this.setState({
        point: {
          pageX: point.pageX,
          pageY: point.pageY,
        },
      });
    };

    handlePortalUpdate = () => {
      if (this.state.prevPopupVisible !== this.state.popupVisible) {
        this.props.afterPopupVisibleChange(this.state.popupVisible);
      }
    };

    delaySetPopupVisible(visible: boolean, delayS: number, event?: MouseEvent) {
      const delay: number = delayS * 1000;
      this.clearDelayTimer();
      if (delay) {
        const point = event ? { pageX: event.pageX, pageY: event.pageY } : null;
        if (canUseDom()) {
          this.delayTimer = window.setTimeout(() => {
            this.setPopupVisible(visible, point);
            this.clearDelayTimer();
          }, delay);
        }
      } else {
        this.setPopupVisible(visible, event);
      }
    }

    clearDelayTimer() {
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
    }

    clearOutsideHandler() {
      if (this.clickOutsideHandler) {
        this.clickOutsideHandler.remove();
        this.clickOutsideHandler = null;
      }

      if (this.contextMenuOutsideHandler1) {
        this.contextMenuOutsideHandler1.remove();
        this.contextMenuOutsideHandler1 = null;
      }

      if (this.contextMenuOutsideHandler2) {
        this.contextMenuOutsideHandler2.remove();
        this.contextMenuOutsideHandler2 = null;
      }

      if (this.touchOutsideHandler) {
        this.touchOutsideHandler.remove();
        this.touchOutsideHandler = null;
      }
    }

    createTwoChains(event: string) {
      const childPros = this.props.children.props;
      const { props } = this;
      if (childPros[event] && (props as any)[event]) {
        return (this as any)[`fire${event}`];
      }
      return childPros[event] || (props as any)[event];
    }

    isClickToShow() {
      const { action, showAction } = this.props;
      return (
        action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1
      );
    }

    isContextMenuOnly() {
      const { action } = this.props;
      return (
        action === 'contextMenu' ||
        (action.length === 1 && action[0] === 'contextMenu')
      );
    }

    isContextMenuToShow() {
      const { action, showAction } = this.props;
      return (
        action.indexOf('contextMenu') !== -1 ||
        showAction.indexOf('contextMenu') !== -1
      );
    }

    isClickToHide() {
      const { action, hideAction } = this.props;
      return (
        action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1
      );
    }

    isMouseEnterToShow() {
      const { action, showAction } = this.props;
      return (
        action.indexOf('hover') !== -1 ||
        showAction.indexOf('mouseEnter') !== -1
      );
    }

    isMouseLeaveToHide() {
      const { action, hideAction } = this.props;
      return (
        action.indexOf('hover') !== -1 ||
        hideAction.indexOf('mouseLeave') !== -1
      );
    }

    isFocusToShow() {
      const { action, showAction } = this.props;
      return (
        action.indexOf('focus') !== -1 || showAction.indexOf('focus') !== -1
      );
    }

    isBlurToHide() {
      const { action, hideAction } = this.props;
      return (
        action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1
      );
    }

    forcePopupAlign() {
      if (this.state.popupVisible) {
        this.popupRef.current?.forceAlign();
      }
    }

    fireEvents(type: string, e: Event) {
      const childCallback = (this.props.children as React.ReactElement).props[
        type
      ];
      if (childCallback) {
        childCallback(e);
      }
      const callback = (this.props as any)[type];
      if (callback) {
        callback(e);
      }
    }

    close() {
      this.setPopupVisible(false);
    }

    triggerContextValue = { onPopupMouseDown: this.onPopupMouseDown };

    render() {
      const { popupVisible } = this.state;
      const { children, forceRender, alignPoint, classNames, autoDestroy } =
        this.props;
      const child = React.Children.only(children) as React.ReactElement;
      const newChildProps: HTMLAttributes<HTMLElement> & { key: string } = {
        key: 'trigger',
      };

      // ============================== Visible Handlers ==============================
      // >>> ContextMenu
      if (this.isContextMenuToShow()) {
        newChildProps.onContextMenu = this.onContextMenu;
      } else {
        newChildProps.onContextMenu = this.createTwoChains('onContextMenu');
      }

      // >>> Click
      if (this.isClickToHide() || this.isClickToShow()) {
        newChildProps.onClick = this.onClick;
        newChildProps.onMouseDown = this.onMouseDown;
        newChildProps.onTouchStart = this.onTouchStart;
      } else {
        newChildProps.onClick = this.createTwoChains('onClick');
        newChildProps.onMouseDown = this.createTwoChains('onMouseDown');
        newChildProps.onTouchStart = this.createTwoChains('onTouchStart');
      }

      // >>> Hover(enter)
      if (this.isMouseEnterToShow()) {
        newChildProps.onMouseEnter = this.onMouseEnter;

        // Point align
        if (alignPoint) {
          newChildProps.onMouseMove = this.onMouseMove;
        }
      } else {
        newChildProps.onMouseEnter = this.createTwoChains('onMouseEnter');
      }

      // >>> Hover(leave)
      if (this.isMouseLeaveToHide()) {
        newChildProps.onMouseLeave = this.onMouseLeave;
      } else {
        newChildProps.onMouseLeave = this.createTwoChains('onMouseLeave');
      }

      // >>> Focus
      if (this.isFocusToShow() || this.isBlurToHide()) {
        newChildProps.onFocus = this.onFocus;
        newChildProps.onBlur = this.onBlur;
      } else {
        newChildProps.onFocus = this.createTwoChains('onFocus');
        newChildProps.onBlur = this.createTwoChains('onBlur');
      }

      // =================================== Render ===================================
      const childrenClassName = mergeClasses([
        child && child.props && child.props.className,
        classNames,
      ]);
      if (childrenClassName) {
        newChildProps.className = childrenClassName;
      }

      const cloneProps: any = {
        ...newChildProps,
      };

      cloneProps.ref = composeRef(this.triggerRef, (child as any).ref);
      const trigger = React.cloneElement(child, cloneProps);

      let portal: React.ReactElement;
      // prevent unmounting after it's rendered
      if (popupVisible || this.popupRef.current || forceRender) {
        portal = (
          <PortalComponent
            key="portal"
            getContainer={this.getContainer}
            didUpdate={this.handlePortalUpdate}
          >
            {this.getComponent()}
          </PortalComponent>
        );
      }

      if (!popupVisible && autoDestroy) {
        portal = null;
      }

      return (
        <TriggerContext.Provider value={this.triggerContextValue}>
          {trigger}
          {portal}
        </TriggerContext.Provider>
      );
    }
  }

  return Trigger;
}

export { BuildInPlacements };

export default generateTrigger(Portal);
