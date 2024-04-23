export function readAchievementsPage(
    stream: NodeJS.ReadableStream,
    onPage: (achievements: string[]) => void,
    onDone: () => void,
    onError: (error: Error) => void,
): void {
    let achievementsBuffer: string[] = [];
    let residualData = '';

    stream.setEncoding('utf8');

    stream.on('data', (chunk: string) => {
        const achievements = (residualData + chunk).split(';');
        residualData = achievements.pop() || '';
        achievementsBuffer = achievementsBuffer.concat(achievements);
        while (achievementsBuffer.length >= 10) {
            onPage(achievementsBuffer.splice(0, 10));
        }
    });

    stream.on('end', () => {
        if (residualData.length > 0) {
            achievementsBuffer.push(residualData);
        }
        if (achievementsBuffer.length > 0) {
            onPage(achievementsBuffer);
        }
        onDone();
    });

    stream.on('error', (error: Error) => {
        onError(error);
    });
}