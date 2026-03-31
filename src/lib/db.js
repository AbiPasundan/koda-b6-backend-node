
import { Pool } from "pg";

const pool = new Pool()
export const db = async () => {
    return pool
}