import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useModal } from '~/hooks';
import { StyledBackdrop, StyledModals, ModalContainer } from './Modal.styled';
import { Box } from '~/components/Box';
import { BaseModal } from '~/components';

interface BackdropProps {
  setOpen?: (val: boolean) => void;
}

export const Backdrop = ({ setOpen }: BackdropProps) => {
  return <Box onClick={() => setOpen && setOpen(false)}></Box>;
};

export const Modals = () => {
  const modalTimeout = 200;
  const { open, setOpen } = useModal();
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  return (
    <StyledModals>
      {/* //////////////////////////// BACKDROP ///////////////////////////// */}
      {open && (
        <CSSTransition nodeRef={backdropRef} timeout={modalTimeout} classNames='opacity'>
          <StyledBackdrop ref={backdropRef}>
            <Backdrop setOpen={setOpen} />
          </StyledBackdrop>
        </CSSTransition>
      )}

      {/* //////////////////////////// MODALS ///////////////////////////// */}
      {open && (
        <CSSTransition nodeRef={modalRef} in={open} timeout={modalTimeout} classNames='slideBottom'>
          <ModalContainer ref={modalRef}>
            <BaseModal setOpen={setOpen} />
          </ModalContainer>
        </CSSTransition>
      )}
    </StyledModals>
  );
};
