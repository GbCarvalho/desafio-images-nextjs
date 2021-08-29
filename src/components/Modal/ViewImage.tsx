import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Flex,
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
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="scale" isCentered>
      <ModalOverlay />
      <ModalContent bgColor="pGray.800" padding="0" maxH="900px" maxW="600px">
        <Image src={imgUrl} />
        <Flex p={4}>
          <Link href={imgUrl} isExternal>
            Abrir original
          </Link>
        </Flex>
      </ModalContent>
    </Modal>
  );
}
