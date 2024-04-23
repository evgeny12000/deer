export async function* readAchievementsPageGenerator(
    stream: NodeJS.ReadableStream
): AsyncGenerator<string[], void, unknown> {

    stream.setEncoding('utf8');

    let achievementsBuffer: string[] = [];
    let residualData = '';

    for await (const chunk of stream) {
        const achievements = (residualData + chunk).split(';');
        residualData = achievements.pop() || '';

        achievementsBuffer.push(...achievements);

        while (achievementsBuffer.length >= 10) {
            yield achievementsBuffer.splice(0, 10);
        }
    }

    if (residualData) {
        achievementsBuffer.push(residualData);
    }
    if (achievementsBuffer.length > 0) {
        yield achievementsBuffer;
    }
}