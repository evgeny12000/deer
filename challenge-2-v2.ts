import { Readable } from 'stream';
import { readAchievementsPageGenerator } from './readAchievementsPageGenerator';
async function runTest() {

    const testStream = new Readable({
        read() {}
    });

    testStream.push('Achievement1;Achievement2;Achievement3;Achievement4;Achievement5;');
    testStream.push('Achievement6;Achievement7;Achievement8;Achievement9;Achievement10;');
    testStream.push('Achievement11;Achievement12');
    testStream.push(';Achievement13;Achievement14;Achievement15;Achievement16;Achievement17;Achievement18;Achievement19;Achievement20;Achievement21;Achievement22;Achievement23;Achievement24;Achievement25;');
    testStream.push(null);

    const generator = readAchievementsPageGenerator(testStream);

    for await (const achievementsBatch of generator) {
        console.log("Achievements batch received:", achievementsBatch);
    }
}

runTest().catch(err => console.error("Error during test:", err));
