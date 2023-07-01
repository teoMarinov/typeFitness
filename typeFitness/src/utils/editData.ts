import { ref, update } from "firebase/database";
import db from "../config/firebase.config.ts";

const editData = (path: string, target: string, val: any) => {
    update(ref(db, path), { [target]: val })
}

export default editData