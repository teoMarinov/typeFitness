/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, set } from "firebase/database";
import db from "../config/firebase.config.ts";

const editData = (path: string, val: any) => {
    set(ref(db, path), val)
}

export default editData