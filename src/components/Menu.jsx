import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Fade } from "react-awesome-reveal";

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 200px;
  margin: 20px;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  &.active {
    background-color: black;
    color: white;
  }
`;

const DropdownContent = styled.div`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`;

const DropdownItem = styled.a`
  color: ${props => props.$isSelected ? 'white' : 'black'};
  background-color: ${props => props.$isSelected ? 'black' : 'transparent'};
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: ${props => props.$isSelected ? 'black' : '#f1f1f1'};
  }
`;

const AnimatedText = styled.p`
  animation: ${fadeOut} 2s ease-out;
  animation-fill-mode: forwards;
`;

const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showText, setShowText] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    setShowText(true);
    setTimeout(() => setShowText(false), 2000);
  };

  return (
    <div>
      <DropdownContainer>
        <DropdownButton onClick={toggleDropdown} className={selectedItem ? 'active' : ''}>
          {
            selectedItem ? <Fade cascade damping={1e-1}>
              {selectedItem}
            </Fade> : "Select an item"
          }
        </DropdownButton>
        <DropdownContent $isOpen={isOpen}>
          {items.map((item, index) => (
            <DropdownItem
              key={index}
              href="#"
              onClick={() => handleItemClick(item)}
              $isSelected={item === selectedItem}
            >
              <Fade cascade damping={1e-1}>{item}</Fade>
            </DropdownItem>
          ))}
        </DropdownContent>
      </DropdownContainer>
      {showText && selectedItem && (
        <AnimatedText>You selected: {selectedItem}</AnimatedText>
      )}
    </div>
  );
};

export default Menu;
