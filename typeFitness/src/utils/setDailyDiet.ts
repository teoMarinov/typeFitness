import db from "../config/firebase.config.js"
import { ref, set } from "firebase/database"

const setDailyDiet = (path: string, dietList: object) => {
    set(ref(db, path), dietList);
}

export default setDailyDiet
