'use client';

import { separatorString } from './Carousel.types';
import type {
  IntersectionObserverItem,
  Item,
  visibleElements,
} from './Carousel.types';
import { filterSeparators } from './Utilities';

class ItemsMap extends Map<Item[0], Item[1]> {
  public toArr(): Item[] {
    return this.sort([...this]);
  }

  public toItems(): visibleElements {
    return this.toArr().map(([key]) => key);
  }

  public toItemsWithoutSeparators(): visibleElements {
    return filterSeparators(this.toItems());
  }

  public sort(arr: Item[]): Item[] {
    return arr.sort(
      ([, IntersectionObserverItemA], [, IntersectionObserverItemB]) =>
        +IntersectionObserverItemA.index - +IntersectionObserverItemB.index
    );
  }

  set(key: Array<Item> | string, val?: IntersectionObserverItem): this {
    if (Array.isArray(key)) {
      this.sort(key).forEach(([itemId, ioitem]) => {
        super.set(String(itemId), ioitem);
      });
    } else {
      super.set(String(key), val!);
    }
    return this;
  }

  public first(): IntersectionObserverItem | undefined {
    return this.toArr()[0]?.[1];
  }
  public last(): IntersectionObserverItem | undefined {
    return this.toArr().slice(-1)?.[0]?.[1];
  }

  public filter(
    predicate: (value: Item, index: number, array: Item[]) => boolean
  ): Item[] {
    return this.toArr().filter(predicate);
  }
  public find(
    predicate: (value: Item, index: number, obj: Item[]) => boolean
  ): Item | undefined {
    return this.toArr().find(predicate);
  }

  public findIndex(
    predicate: (value: Item, index: number, obj: Item[]) => unknown
  ): number {
    return this.toArr().findIndex(predicate);
  }

  public getCurrentPos(
    item: string | IntersectionObserverItem,
    onlyItems: boolean
  ): [Item[], number] {
    const arr: Item[] = this.toArr().filter((el: Item) =>
      onlyItems ? !el?.[0]?.includes(separatorString) : el
    );
    const current: number = arr.findIndex(
      ([itemId, ioitem]) => itemId === item || ioitem === item
    );
    return [arr, current];
  }

  public prevGroup(
    item: string | IntersectionObserverItem,
    onlyItems?: boolean
  ): IntersectionObserverItem | undefined {
    const [arr, current] = this.getCurrentPos(item, !!onlyItems);

    // We scroll to the previous plus two so the next button
    // doesn't occlude the last occluded item of the initial group.
    // ---------------------       ---------------------      ----------------------
    // <4 | {5} | 6 | 7 | 8>  -->  <1 | 2 | 3 | {4} | 5> -->  | {1} | 2 | 3 | 4 | 5>
    // ---------------------       ---------------------      ----------------------
    return current !== -1 ? arr[current + 2]?.[1] : undefined;
  }

  public nextGroup(
    item: IntersectionObserverItem | string,
    onlyItems?: boolean
  ): IntersectionObserverItem | undefined {
    const [arr, current] = this.getCurrentPos(item, !!onlyItems);

    // We scroll to the next minus one so the previous button
    // doesn't occlude the last occluded item of the initial group.
    // ----------------------       ---------------------       -----------------------
    // | {1} | 2 | 3 | 4 | 5>  -->  <4 | {5} | 6 | 7 | 8>  -->  <7 | {8} | 9 | 10 | 11>
    // ----------------------       ---------------------       -----------------------
    return current !== -1 ? arr[current - 1]?.[1] : undefined;
  }

  public prev(
    item: string | IntersectionObserverItem,
    onlyItems?: boolean
  ): IntersectionObserverItem | undefined {
    const [arr, current] = this.getCurrentPos(item, !!onlyItems);

    // When single scroll, only ever decrement by 1, don't adjust for occlusion.
    return current !== -1 ? arr[current - 1]?.[1] : undefined;
  }

  public next(
    item: IntersectionObserverItem | string,
    onlyItems?: boolean
  ): IntersectionObserverItem | undefined {
    const [arr, current] = this.getCurrentPos(item, !!onlyItems);

    // When single scroll, only ever increment by 1, don't adjust for occlusion.
    return current !== -1 ? arr[current + 1]?.[1] : undefined;
  }

  public getVisible(): Item[] {
    return this.filter((value: Item) => value[1].visible);
  }

  public getVisibleElements(): Item[] {
    return this.filter(
      (value: Item) => !value[0].includes(separatorString) && value[1].visible
    );
  }
}

export default ItemsMap;
