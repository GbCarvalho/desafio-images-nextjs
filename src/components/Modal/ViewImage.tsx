import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent bgColor="pGray.800" padding="0">
        <ModalBody maxH="900px" maxW="600px">
          <Image src={imgUrl} />
        </ModalBody>
        <ModalFooter>
          <Link to={imgUrl}>Abrir Original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
