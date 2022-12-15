import React from 'react';
import { render, fireEvent, act, createEvent } from '@testing-library/react';
import { spyElementPrototypes } from '../../../../tests/domHook';
import Tree, { TreeNode } from '..';

const delay = (timeout: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

describe('Tree Draggable', () => {
  function createTree(props?: any) {
    return (
      <Tree draggable defaultExpandAll {...props}>
        <TreeNode title="parent 1" key="0-0">
          <TreeNode classNames="drag-target" title="leaf" key="0-0-0-0" />
          <TreeNode classNames="drop-target" title="leaf" key="0-0-0-1" />
        </TreeNode>
      </Tree>
    );
  }

  function fireDragEvent(
    ele: HTMLElement,
    eventName: string,
    data: object = {}
  ) {
    const event = (createEvent as any)[eventName](ele);
    Object.keys(data).forEach((key) => {
      event[key] = (data as any)[key];
    });
    fireEvent(ele, event);
  }

  it('fires dragStart event', () => {
    const onDragStart = jest.fn();
    const { container } = render(createTree({ onDragStart }));
    const treeNode = container.querySelector(
      '.drag-target > .tree-node-content-wrapper'
    );
    fireEvent.dragStart(treeNode);
    const event = onDragStart.mock.calls[0][0];
    expect(event.node).toEqual(
      expect.objectContaining({
        key: '0-0-0-0',
      })
    );
  });

  it('fires dragEnter event', async () => {
    const onDragEnter = jest.fn();
    const { container } = render(createTree({ onDragEnter }));

    fireEvent.dragStart(
      container.querySelector('.drag-target > .tree-node-content-wrapper')
    );

    // Not trigger self
    fireEvent.dragEnter(
      container.querySelector('.drag-target > .tree-node-content-wrapper')
    );

    await act(async () => {
      await delay(900);
    });
    expect(onDragEnter).not.toHaveBeenCalled();

    fireEvent.dragEnter(container.querySelector('.drop-target'));
    expect(onDragEnter).toHaveBeenCalled();

    await act(async () => {
      await delay(900);
    });
    const event = onDragEnter.mock.calls[0][0];
    expect(event.node.key).toEqual('0-0-0-1');
    expect(event.expandedKeys).toEqual(['0-0', '0-0-0-1']);
    expect(onDragEnter).toHaveBeenCalledTimes(1);
  });

  it('fires dragOver event', () => {
    const onDragOver = jest.fn();
    const { container } = render(createTree({ onDragOver }));
    fireEvent.dragStart(
      container.querySelector('.drag-target > .tree-node-content-wrapper')
    );
    fireEvent.dragOver(container.querySelector('.drop-target'));
    const event = onDragOver.mock.calls[0][0];
    expect(event.node).toEqual(
      expect.objectContaining({
        key: '0-0-0-1',
      })
    );
  });

  it('fires dragLeave event', () => {
    const onDragLeave = jest.fn();
    const { container } = render(createTree({ onDragLeave }));
    fireEvent.dragLeave(container.querySelector('.drop-target'));
    const event = onDragLeave.mock.calls[0][0];
    expect(event.node).toEqual(
      expect.objectContaining({
        key: '0-0-0-1',
      })
    );
  });

  it('fires drop event', () => {
    const onDrop = jest.fn();
    const { container } = render(createTree({ onDrop }));
    fireEvent.dragStart(
      container.querySelector('.drag-target > .tree-node-content-wrapper')
    );
    fireEvent.dragEnter(container.querySelector('.drop-target'));
    fireEvent.dragOver(container.querySelector('.drop-target'));
    fireEvent.drop(container.querySelector('.drop-target'));
    const event = onDrop.mock.calls[0][0];
    expect(event.node).toEqual(expect.objectContaining({ key: '0-0-0-1' }));
    expect(event.dragNode).toEqual(expect.objectContaining({ key: '0-0-0-0' }));
    expect(event.dragNodesKeys).toEqual(['0-0-0-0']);
  });

  it('fires dropEnd event', () => {
    const onDragEnd = jest.fn();
    const { container } = render(createTree({ onDragEnd }));
    fireEvent.dragEnd(
      container.querySelector('.drag-target > .tree-node-content-wrapper')
    );
    const event = onDragEnd.mock.calls[0][0];
    expect(event.node).toEqual(
      expect.objectContaining({
        key: '0-0-0-0',
      })
    );
  });

  it('do not throw error when drag into another non-drag-able tree', () => {
    const { container } = render(
      <>
        <div className="tree1">{createTree()}</div>
        <div className="tree2">{createTree({ draggable: false })}</div>
      </>
    );

    const dragTree = container.querySelector('.tree1');
    const normalTree = container.querySelector('.tree2');

    fireEvent.dragStart(
      dragTree.querySelector('.drag-target > .tree-node-content-wrapper')
    );
    fireEvent.dragEnter(normalTree.querySelector('.drop-target'));
    fireEvent.dragOver(normalTree.querySelector('.drop-target'));
    fireEvent.drop(normalTree.querySelector('.drop-target'));
  });

  describe('full steps', () => {
    function dropTarget(targetSelector: string) {
      return new Promise<void>((resolve) => {
        const { container } = render(
          <Tree draggable={() => true} defaultExpandAll onExpand={() => {}}>
            <TreeNode key="0-0" classNames="drag-target">
              <TreeNode key="0-0-0" classNames="drag-target-child" />
            </TreeNode>
            <TreeNode key="0-1">
              <TreeNode key="0-1-0" />
            </TreeNode>
            <TreeNode key="0-2" classNames="drop-target">
              <TreeNode key="0-2-0" />
            </TreeNode>
          </Tree>
        );

        fireEvent.dragStart(
          container.querySelector('.drag-target > .tree-node-content-wrapper')
        );

        // 1. Move into target (first in the middle of the node)
        fireEvent.dragEnter(container.querySelector(targetSelector), {
          clientY: 10,
        });
        setTimeout(() => {
          fireEvent.dragOver(container.querySelector(targetSelector), {
            clientY: 999,
          });

          // 2. Move out of target
          fireEvent.dragLeave(container.querySelector(targetSelector));

          // 3. Move in again
          fireEvent.dragEnter(container.querySelector(targetSelector), {
            clientY: 0,
          });

          setTimeout(() => {
            fireEvent.dragOver(container.querySelector(targetSelector), {
              clientY: 999,
            });

            // 4. Drop
            fireEvent.drop(container.querySelector(targetSelector));
            fireEvent.dragEnd(container.querySelector('.drag-target'));

            resolve();
          }, 1000);
        }, 10);
      });
    }

    let domSpy: { mockRestore: () => void };
    beforeEach(() => {
      domSpy = spyElementPrototypes(HTMLElement, {
        offsetWidth: {
          get() {
            return 24;
          },
        },
        getBoundingClientRect: jest.fn(() => ({
          width: 100,
          height: 20,
          top: 0,
          left: 0,
          bottom: 20,
          right: 100,
        })),
      });
    });

    afterEach(() => {
      domSpy.mockRestore();
    });

    it('self', () => {
      act(() => {
        dropTarget('div.drag-target');
      });
    });

    it('target', () => {
      act(() => {
        dropTarget('div.drop-target');
      });
    });
  });

  describe('new drop logic', () => {
    let domSpy: { mockRestore: () => void };
    beforeEach(() => {
      domSpy = spyElementPrototypes(HTMLElement, {
        getBoundingClientRect: () => ({
          width: 100,
          height: 20,
          top: 0,
          left: 0,
          bottom: 20,
          right: 100,
        }),
        offsetWidth: {
          get() {
            return 24;
          },
        },
      });
    });

    afterEach(() => {
      domSpy.mockRestore();
    });

    (['ltr', 'rtl'] as const).forEach((dir) => {
      const base = dir === 'ltr' ? 1 : -1;

      it('not allow cross level dnd on expanded nodes', () => {
        const onDrop = jest.fn();
        const { container } = render(
          <Tree
            draggable
            onDrop={onDrop}
            direction={dir}
            expandedKeys={['0-0', '0-1', '0-1-0']}
          >
            <TreeNode key="0-0">
              <TreeNode key="0-0-0" classNames="drop-target-1">
                <TreeNode key="0-0-0-0" />
              </TreeNode>
            </TreeNode>
            <TreeNode key="0-1">
              <TreeNode key="0-1-0" classNames="drop-target-2">
                <TreeNode key="0-1-0-0" />
              </TreeNode>
            </TreeNode>
            <TreeNode key="0-2" classNames="drag-target" />
          </Tree>
        );

        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );

        fireDragEvent(
          container.querySelector(
            '.drop-target-1 > .tree-node-content-wrapper'
          ),
          'dragEnter',
          {
            clientX: base * 400,
            clientY: 600,
          }
        );

        fireDragEvent(
          container.querySelector(
            '.drop-target-1 > .tree-node-content-wrapper'
          ),
          'dragOver',
          {
            clientX: base * 400,
            clientY: 600,
          }
        );

        fireEvent.drop(
          container.querySelector('.drop-target-1 > .tree-node-content-wrapper')
        );

        // insert after 0-0, since 0-0-0 is not expanded
        expect(onDrop.mock.calls[0][0].node.key).toEqual('0-0');
        expect(onDrop.mock.calls[0][0].dropPosition).toEqual(1);

        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );

        fireDragEvent(
          container.querySelector(
            '.drop-target-2 > .tree-node-content-wrapper'
          ),
          'dragEnter',
          {
            clientX: base * 400,
            clientY: 600,
          }
        );

        fireDragEvent(
          container.querySelector(
            '.drop-target-2 > .tree-node-content-wrapper'
          ),
          'dragOver',
          {
            clientX: base * 400,
            clientY: 600,
          }
        );

        fireEvent.drop(
          container.querySelector('.drop-target-2 > .tree-node-content-wrapper')
        );

        // insert into 0-1-0, since it is expanded, do not allow cross level dnd
        expect(onDrop.mock.calls[1][0].node.key).toEqual('0-1-0');
        expect(onDrop.mock.calls[1][0].dropPosition).toEqual(0);
      });

      it('allowDrop all nodes', () => {
        const onDrop = jest.fn();
        const { container } = render(
          <Tree draggable defaultExpandAll onDrop={onDrop} direction={dir}>
            <TreeNode key="0-0" classNames="drag-target-parent">
              <TreeNode key="0-0-0" classNames="drag-target">
                <TreeNode key="0-0-0-0" classNames="drag-target-child" />
              </TreeNode>
            </TreeNode>
            <TreeNode key="0-1">
              <TreeNode key="0-1-0">
                <TreeNode key="0-1-0-0" classNames="drop-target" />
              </TreeNode>
            </TreeNode>
            <TreeNode key="0-2" />
          </Tree>
        );
        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );

        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragEnter',
          {
            clientX: base * 400,
            clientY: 600,
          }
        );

        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragOver',
          {
            clientX: base * 400,
            clientY: 600,
          }
        );

        fireEvent.drop(
          container.querySelector('.drop-target > .tree-node-content-wrapper')
        );

        expect(onDrop.mock.calls[0][0].node.key).toEqual('0-1-0-0');
        // (in ltr) drag from right to left, should be insert after, so drop position is 1
        expect(onDrop.mock.calls[0][0].dropPosition).toEqual(1);

        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );

        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragEnter',
          {
            clientX: base * 500,
            clientY: 600,
          }
        );

        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragOver',
          {
            clientX: base * 500,
            clientY: 600,
          }
        );

        fireEvent.drop(
          container.querySelector('.drop-target > .tree-node-content-wrapper')
        );

        expect(onDrop.mock.calls[1][0].node.key).toEqual('0-1-0-0');
        expect(onDrop.mock.calls[1][0].dropPosition).toEqual(1);

        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragEnter',
          {
            clientX: base * 550,
            clientY: 600,
          }
        );

        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragOver',
          {
            clientX: base * 550,
            clientY: 600,
          }
        );

        fireEvent.drop(
          container.querySelector('.drop-target > .tree-node-content-wrapper')
        );
        expect(onDrop.mock.calls[2][0].node.key).toEqual('0-1-0-0');
        expect(onDrop.mock.calls[2][0].dropPosition).toEqual(0);

        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragEnter',
          {
            clientX: base * 600,
            clientY: 600,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragOver',
          {
            clientX: base * 600,
            clientY: 600,
          }
        );
        fireEvent.drop(
          container.querySelector('.drop-target > .tree-node-content-wrapper')
        );
        expect(onDrop.mock.calls[2][0].node.key).toEqual('0-1-0-0');
        expect(onDrop.mock.calls[2][0].dropPosition).toEqual(0);
      });

      it('allowDrop no node', () => {
        const onDrop = jest.fn();
        const { container } = render(
          <Tree
            draggable
            defaultExpandAll
            onDrop={onDrop}
            allowDrop={() => false}
            direction={dir}
          >
            <TreeNode key="0-0" classNames="drag-target-parent">
              <TreeNode key="0-0-0" classNames="drag-target">
                <TreeNode key="0-0-0-0" classNames="drag-target-child" />
              </TreeNode>
            </TreeNode>
            <TreeNode key="0-1">
              <TreeNode key="0-1-0" classNames="drop-target-parent">
                <TreeNode key="0-1-0-0" classNames="drop-target" />
              </TreeNode>
            </TreeNode>
            <TreeNode key="0-2" />
          </Tree>
        );
        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector(
            '.drop-target-parent > .tree-node-content-wrapper'
          ),
          'dragEnter',
          {
            clientX: base * 400,
            clientY: 600,
          }
        );
        fireDragEvent(
          container.querySelector(
            '.drop-target-parent > .tree-node-content-wrapper'
          ),
          'dragOver',
          {
            clientX: base * 400,
            clientY: 600,
          }
        );
        fireEvent.drop(
          container.querySelector(
            '.drop-target-parent > .tree-node-content-wrapper'
          )
        );
        // not allow any dropPosition except 0 on expanded node
        expect(onDrop).not.toHaveBeenCalled();

        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragEnter',
          {
            clientX: base * 400,
            clientY: 600,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragOver',
          {
            clientX: base * 400,
            clientY: 600,
          }
        );
        fireEvent.drop(
          container.querySelector('.drop-target > .tree-node-content-wrapper')
        );
        expect(onDrop).not.toHaveBeenCalled();

        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragEnter',
          {
            clientX: base * 500,
            clientY: 600,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragOver',
          {
            clientX: base * 500,
            clientY: 600,
          }
        );
        fireEvent.drop(
          container.querySelector('.drop-target > .tree-node-content-wrapper')
        );
        expect(onDrop).not.toHaveBeenCalled();

        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragEnter',
          {
            clientX: base * 550,
            clientY: 600,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragOver',
          {
            clientX: base * 550,
            clientY: 600,
          }
        );
        fireEvent.drop(
          container.querySelector('.drop-target > .tree-node-content-wrapper')
        );
        expect(onDrop).not.toHaveBeenCalled();

        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragEnter',
          {
            clientX: base * 600,
            clientY: 600,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragOver',
          {
            clientX: base * 600,
            clientY: 600,
          }
        );
        fireEvent.drop(
          container.querySelector('.drop-target > .tree-node-content-wrapper')
        );
        expect(onDrop).not.toHaveBeenCalled();
      });

      it('drop to top half of first node', () => {
        const onDrop = jest.fn();
        const { container } = render(
          <Tree draggable defaultExpandAll onDrop={onDrop} direction={dir}>
            <TreeNode key="0-1" classNames="drop-target">
              <TreeNode key="0-1-0">
                <TreeNode key="0-1-0-0" />
              </TreeNode>
            </TreeNode>
            <TreeNode key="0-0" classNames="drag-target-parent">
              <TreeNode key="0-0-0" classNames="drag-target">
                <TreeNode key="0-0-0-0" classNames="drag-target-child" />
              </TreeNode>
            </TreeNode>
          </Tree>
        );
        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragEnter',
          {
            clientX: base * 400,
            clientY: 0,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragOver',
          {
            clientX: base * 400,
            clientY: -1000,
          }
        );
        fireEvent.drop(
          container.querySelector('.drop-target > .tree-node-content-wrapper')
        );
        expect(onDrop.mock.calls[0][0].node.key).toEqual('0-1');
        expect(onDrop.mock.calls[0][0].dropPosition).toEqual(-1);
      });

      it('can drop on its direct parent', () => {
        const onDrop = jest.fn();
        const { container } = render(
          <Tree draggable defaultExpandAll onDrop={onDrop} direction={dir}>
            <TreeNode key="0-1" classNames="drop-target">
              <TreeNode key="0-1-0">
                <TreeNode key="0-1-0-0" />
              </TreeNode>
            </TreeNode>
            <TreeNode key="0-0" classNames="drag-target-parent">
              <TreeNode key="0-0-0" classNames="drag-target">
                <TreeNode key="0-0-0-0" classNames="drag-target-child" />
              </TreeNode>
            </TreeNode>
          </Tree>
        );
        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector(
            '.drag-target-parent > .tree-node-content-wrapper'
          ),
          'dragEnter',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector(
            '.drag-target-parent > .tree-node-content-wrapper'
          ),
          'dragOver',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );
        fireEvent.drop(
          container.querySelector(
            '.drag-target-parent > .tree-node-content-wrapper'
          )
        );
        expect(onDrop).toHaveBeenCalled();
      });

      it('cover window dragend & componentWillUnmount', () => {
        const { container, unmount } = render(
          <Tree draggable defaultExpandAll direction={dir}>
            <TreeNode key="0-1" classNames="drop-target">
              <TreeNode key="0-1-0">
                <TreeNode key="0-1-0-0" />
              </TreeNode>
            </TreeNode>
            <TreeNode key="0-0" classNames="drag-target-parent">
              <TreeNode key="0-0-0" classNames="drag-target">
                <TreeNode key="0-0-0-0" classNames="drag-target-child" />
              </TreeNode>
            </TreeNode>
          </Tree>
        );
        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );
        window.dispatchEvent(new Event('dragend'));
        unmount();
      });

      it('dragover self', () => {
        const onDrop = jest.fn();
        const { container } = render(
          <Tree draggable defaultExpandAll onDrop={onDrop} direction={dir}>
            <TreeNode key="0-1" classNames="drop-target">
              <TreeNode key="0-1-0">
                <TreeNode key="0-1-0-0" />
              </TreeNode>
            </TreeNode>
            <TreeNode key="0-0" classNames="drag-target-parent">
              <TreeNode key="0-0-0" classNames="drag-target">
                <TreeNode key="0-0-0-0" classNames="drag-target-child" />
              </TreeNode>
            </TreeNode>
          </Tree>
        );
        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragEnter',
          {
            clientX: base * 400,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragOver',
          {
            clientX: base * 600,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragOver',
          {
            clientX: base * 600,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragOver',
          {
            clientX: base * 600,
            clientY: 500,
          }
        );
        fireEvent.drop(
          container.querySelector('.drag-target > .tree-node-content-wrapper')
        );
        expect(onDrop).not.toHaveBeenCalled();
      });

      it('not allowDrop on node which has children', () => {
        const onDrop = jest.fn();
        const allowDrop = (props: { dropNode: any; dropPosition: any }) => {
          if (!props.dropNode.children) {
            if (props.dropPosition === 0) return false;
          }
          return true;
        };
        const { container } = render(
          <Tree
            draggable
            defaultExpandAll
            allowDrop={allowDrop}
            onDrop={onDrop}
            direction={dir}
          >
            <TreeNode key="0-0" classNames="drag-target">
              <TreeNode key="0-0-0" classNames="drag-target-child" />
            </TreeNode>
            <TreeNode key="0-1">
              <TreeNode key="0-1-0">
                <TreeNode key="0-1-0-0" classNames="drop-target" />
              </TreeNode>
            </TreeNode>
            <TreeNode key="0-2" />
          </Tree>
        );
        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragEnter',
          {
            clientX: base * 400,
            clientY: 600,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragOver',
          {
            clientX: base * 400,
            clientY: 600,
          }
        );
        fireEvent.drop(
          container.querySelector('.drop-target > .tree-node-content-wrapper')
        );
        expect(onDrop.mock.calls[0][0].node.key).toEqual('0-1-0-0');
        // (in ltr) drag from right to left, should be insert after, so drop position is 1
        expect(onDrop.mock.calls[0][0].dropPosition).toEqual(1);
        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragEnter',
          {
            clientX: base * 500,
            clientY: 600,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragOver',
          {
            clientX: base * 500,
            clientY: 600,
          }
        );
        fireEvent.drop(
          container.querySelector('.drop-target > .tree-node-content-wrapper')
        );
        expect(onDrop.mock.calls[1][0].node.key).toEqual('0-1-0-0');
        expect(onDrop.mock.calls[1][0].dropPosition).toEqual(1);
        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragEnter',
          {
            clientX: base * 550,
            clientY: 600,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragOver',
          {
            clientX: base * 550,
            clientY: 600,
          }
        );
        fireEvent.drop(
          container.querySelector('.drop-target > .tree-node-content-wrapper')
        );
        expect(onDrop.mock.calls[2][0].node.key).toEqual('0-1-0-0');
        expect(onDrop.mock.calls[2][0].dropPosition).toEqual(1);
        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragEnter',
          {
            clientX: base * 600,
            clientY: 600,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragOver',
          {
            clientX: base * 600,
            clientY: 600,
          }
        );
        fireEvent.drop(
          container.querySelector('.drop-target > .tree-node-content-wrapper')
        );
        expect(onDrop.mock.calls[2][0].node.key).toEqual('0-1-0-0');
        expect(onDrop.mock.calls[2][0].dropPosition).toEqual(1);
      });

      it('allowDrop should pass dragNode and dropNode', () => {
        const onDrop = jest.fn();
        const allowDrop = jest.fn();
        const { container } = render(
          <Tree
            draggable
            defaultExpandAll
            allowDrop={allowDrop}
            onDrop={onDrop}
            direction={dir}
          >
            <TreeNode key="0-0" classNames="drag-target">
              <TreeNode key="0-0-0" classNames="drag-target-child" />
            </TreeNode>
            <TreeNode key="0-1">
              <TreeNode key="0-1-0">
                <TreeNode key="0-1-0-0" classNames="drop-target" />
              </TreeNode>
            </TreeNode>
            <TreeNode key="0-2" />
          </Tree>
        );
        fireDragEvent(
          container.querySelector('.drag-target > .tree-node-content-wrapper'),
          'dragStart',
          {
            clientX: base * 500,
            clientY: 500,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragEnter',
          {
            clientX: base * 400,
            clientY: 600,
          }
        );
        fireDragEvent(
          container.querySelector('.drop-target > .tree-node-content-wrapper'),
          'dragOver',
          {
            clientX: base * 400,
            clientY: 600,
          }
        );
        fireEvent.drop(
          container.querySelector('.drop-target > .tree-node-content-wrapper')
        );
        expect(allowDrop.mock.calls[0][0].dragNode.key).toEqual('0-0');
        expect(allowDrop.mock.calls[0][0].dropNode.key).toEqual('0-1-0-0');
      });

      it('not allow dragging elements outside into tree', () => {
        const onDrop = jest.fn();
        const { container } = render(
          <div>
            <Tree draggable defaultExpandAll onDrop={onDrop} direction={dir}>
              <TreeNode key="0-0">
                <TreeNode key="0-0-0" classNames="drop-target" />
              </TreeNode>
            </Tree>
            <div className="drag-target">Element outside</div>
          </div>
        );
        fireEvent.dragStart(container.querySelector('.drag-target'));
        fireEvent.dragEnter(
          container.querySelector('.drop-target > .tree-node-content-wrapper')
        );
        fireEvent.dragOver(
          container.querySelector('.drop-target > .tree-node-content-wrapper')
        );
        fireEvent.drop(
          container.querySelector('.drop-target > .tree-node-content-wrapper')
        );
        expect(onDrop).not.toHaveBeenCalled();
      });
    });
  });

  it('render handler', () => {
    const { container } = render(
      <Tree
        draggable={{
          icon: <span className="handler" />,
        }}
        defaultExpandAll
        treeData={[
          {
            title: 'Parent',
            key: 'parent',
            children: [
              {
                title: 'Child',
                key: 'child',
              },
            ],
          },
        ]}
      />
    );

    expect(container.querySelectorAll('.handler')).toHaveLength(2);
  });
});
