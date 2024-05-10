
import { useEffect } from "react"
import {AtomEffect, atom, selector, useSetRecoilState} from "recoil"

 const checkAtom = atom({
    key:"todosAtom",
    default:false
})

 const infoAtom = atom({
    key:"infoAtom",
    default:{
    }
})

export{ checkAtom}