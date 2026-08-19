// url=https://www.figma.com/design/JOGosTfupXEfUbaMeWTSKW/Figma-livestream--Designer--%3E-Builder--Community-?node-id=5-224
// source=src/components/accordion/accordion.html
// component=Accordion
import figma from 'figma'

const instance = figma.selectedInstance
const slot = instance.getSlot('Slot') ? figma.code`<!-- Slot -->` : ''

export default {
  example: figma.code`<div class="accordion">${slot}</div>`,
  id: 'accordion',
  metadata: {
    nestable: true
  }
}
