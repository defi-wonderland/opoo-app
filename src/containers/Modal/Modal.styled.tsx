import { TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

import { Box } from '~/components';
import { MOBILE_MAX_WIDTH } from '~/utils';

export const StyledModals = styled(TransitionGroup)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;

  .slideBottom-enter {
    opacity: 0;
    transform: translate3d(0, 100vh, 0);
    transition: all 200ms ease;
  }
  .slideBottom-enter-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  .slideBottom-exit-active {
    opacity: 0;
    transform: translate3d(0, 100vh, 0);
    transition: all 200ms cubic-bezier(1, 0.5, 0.8, 1);
  }

  .opacity-enter {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }
  .opacity-enter-active {
    opacity: 1;
  }
  .opacity-exit-active {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    .slideBottom-enter {
      opacity: 0;
      transform: unset;
      transition: unset;
    }
    .slideBottom-enter-active {
      opacity: 1;
      transform: unset;
      transition: unset;
    }
    .slideBottom-exit-active {
      opacity: 0;
      transform: unset;
      transition: unset;
    }
  }
`;

export const StyledBackdrop = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: all;
  background-color: rgba(0, 0, 0, 0.699);
  cursor: pointer;
`;

export const ModalContainer = styled.div`
  z-index: 10;
`;
