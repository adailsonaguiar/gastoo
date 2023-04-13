import React from 'react';
import ReactNativeModal from 'react-native-modal';
import styled from 'styled-components/native';

export const ModalContent = styled.View`
  padding: 12px 24px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: auto;
  background-color: #fff;
`;

const Head = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const BarIcon = styled.View`
  width: 40px;
  height: 5px;
  background-color: #bbb;
  border-radius: 3px;
`;

type BottomSheetModalProps = {
  visible: boolean;
  toggleVisible: () => void;
  children: React.ReactNode;
};

export const BottomSheetModal = ({toggleVisible, visible, children}: BottomSheetModalProps) => {
  return (
    <ReactNativeModal
      isVisible={visible}
      hasBackdrop
      swipeDirection="down"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{justifyContent: 'flex-end', margin: 0}}
      onSwipeComplete={toggleVisible}
      onBackdropPress={() => toggleVisible()}>
      <ModalContent>
        <Head>
          <BarIcon />
        </Head>
        {children}
      </ModalContent>
    </ReactNativeModal>
  );
};
