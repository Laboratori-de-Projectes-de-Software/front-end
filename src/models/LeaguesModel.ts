export const getLeaguesByUser = async (userId: string) => {
    const response = await fetch(`http://localhost:8080/api/v0/league?owner=${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(await response.text());
    return response.json();
};