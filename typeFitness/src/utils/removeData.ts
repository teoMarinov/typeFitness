import { ref, update } from "firebase/database";
import db from "../config/firebase.config.ts";

const removeData = (path: string, target: string, val: 0 | null) => {
    update(ref(db, path), { [target]: val })
}

export default removeData