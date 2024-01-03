import { useEffect, useRef } from 'react';
import { requestAnimationFrameWrapper } from '../../../shared/utilities/raf';
import { useSafeState } from '../../../hooks/useState';
import { canUseDom } from '../../../shared/utilities';

/**
 * Popup should follow the steps for each component work correctly:
 * measure - check for the current stretch size
 * align - let component align the position
 * aligned - re-align again in case additional className changed the size
 * afterAlign - choice next step is trigger motion or finished
 * beforeMotion - should reset motion to invisible so that CSSMotion can do normal motion
 * motion - play the motion
 * stable - everything is done
 */
type PopupStatus =
  | null
  | 'measure'
  | 'alignPre'
  | 'align'
  | 'aligned'
  | 'motion'
  | 'stable';

type Func = () => void;

const StatusQueue: PopupStatus[] = [
  'measure',
  'alignPre',
  'align',
  null,
  'motion',
];

export default (
  visible: boolean,
  doMeasure: Func
): [PopupStatus, (callback?: () => void) => void] => {
  const [status, setInternalStatus] = useSafeState<PopupStatus>(null);
  const rafRef: React.MutableRefObject<number> = useRef<number>();

  function setStatus(
    nextStatus: PopupStatus | ((prevStatus: PopupStatus) => PopupStatus)
  ) {
    setInternalStatus(nextStatus, true);
  }

  function cancelRaf() {
    if (canUseDom()) {
      requestAnimationFrameWrapper.cancel(rafRef.current);
    }
  }

  function goNextStatus(callback?: () => void) {
    cancelRaf();
    if (canUseDom()) {
      rafRef.current = requestAnimationFrameWrapper(() => {
        // Only align should be manually trigger
        setStatus((prev) => {
          switch (status) {
            case 'align':
              return 'motion';
            case 'motion':
              return 'stable';
            default:
          }

          return prev;
        });

        callback?.();
      });
    }
  }

  // Init status
  useEffect(() => {
    setStatus('measure');
  }, [visible]);

  // Go next status
  useEffect(() => {
    switch (status) {
      case 'measure':
        doMeasure();
        break;
      default:
    }

    if (status && canUseDom()) {
      rafRef.current = requestAnimationFrameWrapper(async () => {
        const index = StatusQueue.indexOf(status);
        const nextStatus = StatusQueue[index + 1];
        if (nextStatus && index !== -1) {
          setStatus(nextStatus);
        }
      });
    }
  }, [status]);

  useEffect(
    () => () => {
      cancelRaf();
    },
    []
  );

  return [status, goNextStatus];
};
