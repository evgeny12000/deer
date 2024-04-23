import { Readable } from 'stream';
import { readAchievementsPage } from './readAchievementsPage';

const testStream = new Readable({
    read() {}
});

const onPage = (achievements: string[]): void => {
    console.log("Achievements batch received:", achievements);
};

const onDone = (): void => {
    console.log("No more data.");
};

const onError = (error: Error): void => {
    console.error("Error:", error);
};

testStream.push('Achievement1;Achievement2;Achievement3;Achievement4;Achievement5;');
testStream.push('Achievement6;Achievement7;Achievement8;Achievement9;Achievement10;');
testStream.push('Achievement11;Achievement12');
testStream.push(';Achievement13;Achievement14;Achievement15;Achievement16;Achievement17;Achievement18;Achievement19;Achievement20;Achievement21;Achievement22;Achievement23;Achievement24;Achievement25;');
testStream.push(null);

readAchievementsPage(testStream, onPage, onDone, onError);
