import db from "../config/firebase.config.js"
import { ref, push } from "firebase/database"

const addData = (path:string, newData:object) => {
    push(ref(db, path), newData);
}

export default addData
