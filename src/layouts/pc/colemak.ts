import keyboard from '../keyboards/tenkeyless'
import mapping from '../mapping/colemak'
import {Layout} from '../layout'

const layout = new Layout('colemak', keyboard, mapping)

export default layout
