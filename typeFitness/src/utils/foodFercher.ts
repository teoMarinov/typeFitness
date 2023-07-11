import { apiKey } from "../common/constants.ts";

export default async function getFood(name: string) {
    const reponse = await fetch(
        `https://api.api-ninjas.com/v1/nutrition?query=${name}`,
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
