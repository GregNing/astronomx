import styled from 'styled-components'
import { animated } from '@react-spring/web'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  width: 100px;
  height: 100px;
`

export const Deck = styled(animated.div)`
  position: absolute;
  width: 300px;
  height: 200px;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
  > div {
    cursor: pointer;
    background-size: auto 85%;
    background-repeat: no-repeat;
    background-position: center center;
    width: 45vh;
    max-width: 150px;
    height: 85vh;
    max-height: 285px;
    will-change: transform;
    border-radius: 10px;
    box-shadow: 0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3);
  }
`
