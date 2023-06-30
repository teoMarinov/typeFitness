import db from "../config/firebase.config.ts";
import { ref, get } from "firebase/database";

const readData = async (postPath:string) => {
    const snapshot = await get(ref(db, postPath));
    console.log(typeof(snapshot))
    const data = snapshot.val();
    return data;
}
export default readData

