import { apiKey } from "../common/constants.ts";

export default async function exerciseFetcher(name: string) {
    const reponse = await fetch(
        `https://api.api-ninjas.com/v1/exercises?name=${name}`,
        {
            method: "GET",
            headers: {
                "X-Api-Key": apiKey
            }
        }
    );
    const data = await reponse.json()
    return data
}
