"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
var readAchievementsPage_1 = require("./readAchievementsPage");
var testStream = new stream_1.Readable({
    read: function () { }
});
var onPage = function (achievements) {
    console.log("Achievements batch received:", achievements);
};
var onDone = function () {
    console.log("No more data.");
};
var onError = function (error) {
    console.error("Error:", error);
};
testStream.push('Achievement1;Achievement2;Achievement3;Achievement4;Achievement5;');
testStream.push('Achievement6;Achievement7;Achievement8;Achievement9;Achievement10;');
testStream.push('Achievement11;Achievement12');
testStream.push(';Achievement13;Achievement14;Achievement15;Achievement16;Achievement17;Achievement18;Achievement19;Achievement20;Achievement21;Achievement22;Achievement23;Achievement24;Achievement25;');
testStream.push(null);
(0, readAchievementsPage_1.readAchievementsPage)(testStream, onPage, onDone, onError);
