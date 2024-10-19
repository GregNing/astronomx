import React, { useState, useRef } from "react";
import { useSprings, animated, to as interpolate, easings } from '@react-spring/web'
import { Container, Deck } from '../styles'
import { AnimatedCanvas } from './Deck/AnimatedDrawing'
import { drawCloakedFigure, drawSymbols, drawPlanets, drawSpiral } from '../utils/common'

const DeckFunc = {
  0: drawCloakedFigure,
  1: drawSymbols,
  2: drawPlanets,
  3: drawSpiral,
}

const cards = [
  'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
]
const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
})
const from = (_i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
const trans = (r, s) =>
  `perspective(1500px) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`


const Card = () => {
  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [cardNumber, setCardNumber] = useState(99)
  const [selected, setSelected] = useState(false)
  const firstAction = useRef(false)
  const [springs, api] = useSprings(4, i => ({
    ...to(i),
    from: from(i),
    easing: easings.easeInBack,
  }))

  const onPress = () => {
    if (selected) {
      return
    }
    api.start(i => {
      let params = {}
      switch (i) {
        case 0:
          params = { x: -150, y: 150 }
          break;
        case 1:
          params = { x: -150, y: -150 }
          break;
        case 2:
          params = { x: 150, y: 150 }
          break;
        case 3:
          params = { x: 150, y: -150 }
          break;
        default:
          break;
      }
      return {
        ...params,
        scale: 1,
        rot: -10 + Math.random() * 20,
        delay: i * 100
      }
    })
    setSelected(true)
  }
  const selectCard = (index) => {
    if (!selected) return
    setCardNumber(index)
    api.start(i => {
      if (index !== i) {
        return {
          rot: 0,
          scale: 0,
          delay: 40,
          config: { friction: 50, tension: 800 },
        }
      }
      return {
        x: 0,
        y: 0,
        rot: 0,
        scale: 1.1,
        delay: 10,
        config: { friction: 50, tension: 800 },
      }
    })
  }
  const colorFunc = (frame) => {
    if (selected & cardNumber == 99) return 'rgba(255, 255, 255, 0.8)'
    const hue = (frame % 360) / 360;
    return `hsla(${hue * 360}, 100%, 50%, 0.8)`;
  }

  return (
    <Container>
      {springs.map(({ x, y, rot, scale }, i) => <Deck key={i} style={{ x, y }} onClick={onPress}>
        <animated.div
          onClick={() => selectCard(i)}
          style={{
            transform: interpolate([rot, scale], trans),
            backgroundImage: `url(${process.env.PUBLIC_URL}/img/DALL·E${i}.webp)`,
          }}
        >
          {selected && <AnimatedCanvas drawFunction={DeckFunc[i]} width={150} height={285} colorFunc={colorFunc} />}
        </animated.div>
      </Deck>)}
    </Container>
  )
}

export default Card
