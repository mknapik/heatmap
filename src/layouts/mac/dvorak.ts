import keyboard from '../keyboards/mac'
import mapping from '../mapping/dvorak'
import {Layout} from '../layout'

const layout = new Layout('dvorak', keyboard, mapping)

export default layout
