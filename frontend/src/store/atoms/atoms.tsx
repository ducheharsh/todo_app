
import { useEffect } from "react"
import {AtomEffect, atom, selector, useSetRecoilState} from "recoil"

 const todosAtom = atom({
    key:"todosAtom",
    default:[]
})

 const infoAtom = atom({
    key:"infoAtom",
    default:{
    }
})

export{ todosAtom, infoAtom}