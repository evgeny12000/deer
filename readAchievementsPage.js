"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAchievementsPage = void 0;
function readAchievementsPage(stream, onPage, onDone, onError) {
    var achievementsBuffer = [];
    var residualData = '';
    stream.setEncoding('utf8');
    stream.on('data', function (chunk) {
        var achievements = (residualData + chunk).split(';');
        residualData = achievements.pop() || '';
        achievementsBuffer = achievementsBuffer.concat(achievements);
        while (achievementsBuffer.length >= 10) {
            onPage(achievementsBuffer.splice(0, 10));
        }
    });
    stream.on('end', function () {
        if (residualData.length > 0) {
            achievementsBuffer.push(residualData);
        }
        if (achievementsBuffer.length > 0) {
            onPage(achievementsBuffer);
        }
        onDone();
    });
    stream.on('error', function (error) {
        onError(error);
    });
}
exports.readAchievementsPage = readAchievementsPage;
