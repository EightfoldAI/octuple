import type { OcFile } from './OcUpload.types';

interface InternalDataTransferItem extends DataTransferItem {
    isFile: boolean;
    file: (
        cd: (file: OcFile & { webkitRelativePath?: string }) => void
    ) => void;
    createReader: () => any;
    fullPath: string;
    isDirectory: boolean;
    name: string;
    path: string;
}

function loopFiles(
    item: InternalDataTransferItem,
    callback: {
        (entries: InternalDataTransferItem[]): void;
        (arg0: any[]): void;
    }
) {
    const dirReader = item.createReader();
    let fileList: any[] = [];

    function sequence() {
        dirReader.readEntries((entries: InternalDataTransferItem[]) => {
            const entryList = Array.prototype.slice.apply(entries);
            fileList = fileList.concat(entryList);

            // Check if all files have been viewed.
            const isFinished = !entryList.length;

            if (isFinished) {
                callback(fileList);
            } else {
                sequence();
            }
        });
    }

    sequence();
}

const traverseFileTree = (
    files: InternalDataTransferItem[],
    callback: {
        (files: File[]): void;
        (arg0: (OcFile & { webkitRelativePath?: string })[]): void;
    },
    isAccepted: {
        (_file: OcFile): boolean;
        (arg0: OcFile & { webkitRelativePath?: string }): any;
    }
) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const _traverseFileTree = (
        item: InternalDataTransferItem,
        path?: string
    ) => {
        // eslint-disable-next-line no-param-reassign
        item.path = path || '';
        if (item.isFile) {
            item.file((file) => {
                if (isAccepted(file)) {
                    if (item.fullPath && !file.webkitRelativePath) {
                        Object.defineProperties(file, {
                            webkitRelativePath: {
                                writable: true,
                            },
                        });
                        // eslint-disable-next-line no-param-reassign
                        (file as any).webkitRelativePath =
                            item.fullPath.replace(/^\//, '');
                        Object.defineProperties(file, {
                            webkitRelativePath: {
                                writable: false,
                            },
                        });
                    }
                    callback([file]);
                }
            });
        } else if (item.isDirectory) {
            loopFiles(item, (entries: InternalDataTransferItem[]) => {
                entries.forEach((entryItem) => {
                    _traverseFileTree(entryItem, `${path}${item.name}/`);
                });
            });
        }
    };
    files.forEach((file) => {
        _traverseFileTree(file.webkitGetAsEntry() as any);
    });
};

export default traverseFileTree;
