import React, { forwardRef } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

interface ChatBubbleProps {
  isButton: boolean;
  children: React.ReactNode;
  tabIndex: number;
}

// forwardRef를 사용하여 ref를 전달
const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ isButton, children, tabIndex }, ref) => {
    return (
      <BubbleContainer isButton={isButton} ref={ref} tabIndex={tabIndex}>
        {children}
      </BubbleContainer>
    );
  }
);

const BubbleContainer = styled.div<{ isButton: boolean }>`
  padding: 10px;
  border-radius: 2px 14px 14px 14px;
  background-color: ${({ isButton }) =>
    isButton ? `${theme.color.pointColor}` : '#f1f1f1ce'};
  color: ${({ isButton }) => (isButton ? '#000' : '#000')};
  align-self: ${({ isButton }) => (isButton ? 'flex-end' : 'flex-start')};
  width: fit-content;
  max-width: 240px;
  display: flex;
  white-space: pre-wrap;
  float: ${({ isButton }) => (isButton ? 'right' : 'left')};
  font-weight: 400;
  font-size: 14px;
  line-height: 1.2;
`;

export default ChatBubble;
