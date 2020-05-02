import keyboard from '../keyboards/mac'
import {Layout} from '../layout'
import mapping from '../mapping/dvorak'

const layout = new Layout('dvorak', keyboard, mapping)

export default layout
