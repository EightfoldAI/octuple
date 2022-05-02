import React, { useState } from 'react';
import { Modal, ModalSize } from './';
import { DefaultButton, PrimaryButton } from '../Button';

export default {
    title: 'Modal',
    component: Modal,
};

export const Default = () => {
    const [visible, setVisible] = useState<Record<string, boolean>>({});
    return (
        <>
            <h1>Modal (large)</h1>
            <PrimaryButton
                text={'Open modal'}
                onClick={() =>
                    setVisible({
                        large: true,
                    })
                }
            />
            <Modal
                visible={visible.large}
                size={ModalSize.large}
                onClose={() => setVisible({})}
                header={'Header 4 used in this modal'}
                body={
                    'Body 2 which is at 16px font size is used here in the body section of the modal. The modal body text can wrap to multiple lines.'
                }
            />
            <h1>Modal (medium)</h1>
            <PrimaryButton
                text={'Open modal'}
                onClick={() =>
                    setVisible({
                        medium: true,
                    })
                }
            />
            <Modal
                visible={visible.medium}
                onClose={() => setVisible({})}
                header={'Header 4 used in this modal'}
                body={
                    'Body 2 which is at 16px font size is used here in the body section of the modal. The modal body text can wrap to multiple lines.'
                }
            />
            <h1>Modal (small)</h1>
            <PrimaryButton
                text={'Open modal'}
                onClick={() =>
                    setVisible({
                        small: true,
                    })
                }
            />
            <Modal
                visible={visible.small}
                onClose={() => setVisible({})}
                header={'Header 4 used in this modal'}
                size={ModalSize.small}
                body={
                    'Body 2 which is at 16px font size is used here in the body section of the modal. The modal body text can wrap to multiple lines.'
                }
            />
            <h1>Modal (fullscreen)</h1>
            <PrimaryButton
                text={'Open modal'}
                onClick={() =>
                    setVisible({
                        fullscreen: true,
                    })
                }
            />
            <Modal
                visible={visible.fullscreen}
                size={ModalSize.fullscreen}
                onClose={() => setVisible({})}
                header={'Header 4 used in this modal'}
                body={
                    'Body 2 which is at 16px font size is used here in the body section of the modal. The modal body text can wrap to multiple lines.'
                }
            />
            <h1>Modal (scrollable)</h1>
            <PrimaryButton
                text={'Open modal'}
                onClick={() =>
                    setVisible({
                        scrollable: true,
                    })
                }
            />
            <Modal
                visible={visible.scrollable}
                size={ModalSize.medium}
                onClose={() => setVisible({})}
                header={'Header 4 used in this modal'}
                body={
                    <>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vestibulum finibus, magna eu dignissim
                            posuere, elit metus eleifend diam, accumsan bibendum
                            turpis erat in velit. Nulla vel purus sit amet massa
                            malesuada molestie id eget ex. Donec in dictum nibh.
                            Quisque in felis maximus, facilisis est vel,
                            porttitor lectus. Morbi in vulputate augue, eu
                            finibus augue. Morbi ut eros a arcu accumsan
                            volutpat. Mauris at sem sit amet massa lobortis
                            rutrum ac hendrerit erat. Pellentesque diam leo,
                            bibendum at risus id, molestie condimentum odio.
                            Duis ultrices leo nulla, ac ullamcorper urna
                            pulvinar sit amet. Integer porta finibus odio,
                            pretium interdum nunc ullamcorper id. Vestibulum
                            quis urna sit amet nisi rhoncus dapibus a sed nibh.
                            Sed vitae faucibus mi, at rutrum dui. Pellentesque
                            consectetur neque vel magna consectetur porttitor.
                            Quisque ultrices elit et elementum luctus.
                            Suspendisse tristique elit maximus sodales
                            ullamcorper. Duis ut orci nec augue auctor pharetra
                            quis vel velit. Sed nulla nisl, tincidunt id nunc
                            sed, hendrerit mollis quam. Maecenas rhoncus nisl in
                            nisl faucibus finibus. Vestibulum quis blandit diam.
                            Integer justo ipsum, tempus nec rutrum euismod,
                            rutrum at magna. In hac habitasse platea dictumst.
                            Maecenas quis leo commodo, eleifend ex eu, euismod
                            magna. Nulla fermentum pulvinar blandit. Proin
                            elementum neque at interdum varius. Maecenas vel
                            augue lacus. Aenean id diam cursus, pellentesque
                            tellus vel, eleifend nisl. Nullam lorem lorem,
                            ultricies eu euismod id, consectetur et est. Mauris
                            lobortis est nec magna gravida, ac pellentesque
                            mauris tincidunt. Nunc ac arcu eu odio cursus
                            molestie. Vivamus luctus sollicitudin interdum.
                            Quisque non lacinia tortor. In erat neque, faucibus
                            nec velit sed, tristique vehicula quam. Duis sit
                            amet varius erat, vel convallis mi. Nullam congue at
                            lorem ut tristique. Pellentesque tincidunt dignissim
                            felis tincidunt varius. Maecenas molestie tincidunt
                            tellus, in cursus urna efficitur sed. Sed volutpat
                            tellus eget elit iaculis placerat. Sed tristique
                            arcu id dolor volutpat aliquam. Aliquam pretium
                            convallis ex, ut lacinia libero. Curabitur bibendum
                            sed ante sit amet aliquet. Sed pulvinar libero quis
                            nulla tempor dapibus. Nullam tristique iaculis
                            fermentum. Aenean rutrum eleifend massa fringilla
                            semper. Nunc suscipit varius leo, id rutrum justo
                            fermentum vel. Quisque sed ipsum velit. Mauris magna
                            sapien, pretium non ligula vel, finibus lobortis
                            urna. Cras pretium laoreet eleifend. Morbi ut
                            interdum tellus. Ut imperdiet tellus ut quam
                            consectetur consectetur. Quisque at dictum turpis.
                            Nulla ut dapibus diam. Mauris eget fringilla ligula.
                            Nunc in tortor quis urna finibus ornare. Etiam
                            posuere laoreet mollis. Nam accumsan, diam sit amet
                            placerat pharetra, sapien velit congue leo, a varius
                            nulla neque vitae arcu. Sed laoreet quam at
                            facilisis volutpat. Interdum et malesuada fames ac
                            ante ipsum primis in faucibus. Phasellus euismod leo
                            ligula, eu finibus purus rhoncus in. Suspendisse in
                            ligula elementum, congue est eu, feugiat massa. Duis
                            sem arcu, vulputate id sodales at, accumsan eget
                            nibh. Curabitur eu fermentum tellus. Donec ut
                            consequat tellus. Nullam ullamcorper volutpat mi, eu
                            dignissim augue convallis sed. Praesent id rhoncus
                            felis. Vestibulum placerat sapien vel vestibulum
                            vestibulum. Curabitur ultrices orci ut rutrum porta.
                            Aliquam erat volutpat. Phasellus vel viverra turpis.
                            Donec consectetur ullamcorper erat eget maximus.
                            Maecenas augue massa, sodales vitae iaculis eget,
                            consectetur in velit. Sed molestie iaculis sem, nec
                            scelerisque tortor sollicitudin id. Quisque lobortis
                            varius ipsum, eget scelerisque est mollis a.
                            Pellentesque sodales erat orci, in euismod ante
                            vestibulum in. Integer luctus laoreet aliquet.
                            Suspendisse non neque velit. Integer rutrum egestas
                            erat, a fermentum nisi consectetur sit amet. Nulla
                            placerat pulvinar mi sed gravida. Proin cursus nisl
                            ac libero sagittis, tempor tincidunt arcu tempus.
                        </span>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vestibulum finibus, magna eu dignissim
                            posuere, elit metus eleifend diam, accumsan bibendum
                            turpis erat in velit. Nulla vel purus sit amet massa
                            malesuada molestie id eget ex. Donec in dictum nibh.
                            Quisque in felis maximus, facilisis est vel,
                            porttitor lectus. Morbi in vulputate augue, eu
                            finibus augue. Morbi ut eros a arcu accumsan
                            volutpat. Mauris at sem sit amet massa lobortis
                            rutrum ac hendrerit erat. Pellentesque diam leo,
                            bibendum at risus id, molestie condimentum odio.
                            Duis ultrices leo nulla, ac ullamcorper urna
                            pulvinar sit amet. Integer porta finibus odio,
                            pretium interdum nunc ullamcorper id. Vestibulum
                            quis urna sit amet nisi rhoncus dapibus a sed nibh.
                            Sed vitae faucibus mi, at rutrum dui. Pellentesque
                            consectetur neque vel magna consectetur porttitor.
                            Quisque ultrices elit et elementum luctus.
                            Suspendisse tristique elit maximus sodales
                            ullamcorper. Duis ut orci nec augue auctor pharetra
                            quis vel velit. Sed nulla nisl, tincidunt id nunc
                            sed, hendrerit mollis quam. Maecenas rhoncus nisl in
                            nisl faucibus finibus. Vestibulum quis blandit diam.
                            Integer justo ipsum, tempus nec rutrum euismod,
                            rutrum at magna. In hac habitasse platea dictumst.
                            Maecenas quis leo commodo, eleifend ex eu, euismod
                            magna. Nulla fermentum pulvinar blandit. Proin
                            elementum neque at interdum varius. Maecenas vel
                            augue lacus. Aenean id diam cursus, pellentesque
                            tellus vel, eleifend nisl. Nullam lorem lorem,
                            ultricies eu euismod id, consectetur et est. Mauris
                            lobortis est nec magna gravida, ac pellentesque
                            mauris tincidunt. Nunc ac arcu eu odio cursus
                            molestie. Vivamus luctus sollicitudin interdum.
                            Quisque non lacinia tortor. In erat neque, faucibus
                            nec velit sed, tristique vehicula quam. Duis sit
                            amet varius erat, vel convallis mi. Nullam congue at
                            lorem ut tristique. Pellentesque tincidunt dignissim
                            felis tincidunt varius. Maecenas molestie tincidunt
                            tellus, in cursus urna efficitur sed. Sed volutpat
                            tellus eget elit iaculis placerat. Sed tristique
                            arcu id dolor volutpat aliquam. Aliquam pretium
                            convallis ex, ut lacinia libero. Curabitur bibendum
                            sed ante sit amet aliquet. Sed pulvinar libero quis
                            nulla tempor dapibus. Nullam tristique iaculis
                            fermentum. Aenean rutrum eleifend massa fringilla
                            semper. Nunc suscipit varius leo, id rutrum justo
                            fermentum vel. Quisque sed ipsum velit. Mauris magna
                            sapien, pretium non ligula vel, finibus lobortis
                            urna. Cras pretium laoreet eleifend. Morbi ut
                            interdum tellus. Ut imperdiet tellus ut quam
                            consectetur consectetur. Quisque at dictum turpis.
                            Nulla ut dapibus diam. Mauris eget fringilla ligula.
                            Nunc in tortor quis urna finibus ornare. Etiam
                            posuere laoreet mollis. Nam accumsan, diam sit amet
                            placerat pharetra, sapien velit congue leo, a varius
                            nulla neque vitae arcu. Sed laoreet quam at
                            facilisis volutpat. Interdum et malesuada fames ac
                            ante ipsum primis in faucibus. Phasellus euismod leo
                            ligula, eu finibus purus rhoncus in. Suspendisse in
                            ligula elementum, congue est eu, feugiat massa. Duis
                            sem arcu, vulputate id sodales at, accumsan eget
                            nibh. Curabitur eu fermentum tellus. Donec ut
                            consequat tellus. Nullam ullamcorper volutpat mi, eu
                            dignissim augue convallis sed. Praesent id rhoncus
                            felis. Vestibulum placerat sapien vel vestibulum
                            vestibulum. Curabitur ultrices orci ut rutrum porta.
                            Aliquam erat volutpat. Phasellus vel viverra turpis.
                            Donec consectetur ullamcorper erat eget maximus.
                            Maecenas augue massa, sodales vitae iaculis eget,
                            consectetur in velit. Sed molestie iaculis sem, nec
                            scelerisque tortor sollicitudin id. Quisque lobortis
                            varius ipsum, eget scelerisque est mollis a.
                            Pellentesque sodales erat orci, in euismod ante
                            vestibulum in. Integer luctus laoreet aliquet.
                            Suspendisse non neque velit. Integer rutrum egestas
                            erat, a fermentum nisi consectetur sit amet. Nulla
                            placerat pulvinar mi sed gravida. Proin cursus nisl
                            ac libero sagittis, tempor tincidunt arcu tempus.
                        </p>
                    </>
                }
                actions={
                    <>
                        <DefaultButton
                            text={'Close'}
                            onClick={() => setVisible({})}
                        />
                        <PrimaryButton
                            text={'ok'}
                            onClick={() => setVisible({})}
                        />
                    </>
                }
            />
        </>
    );
};
