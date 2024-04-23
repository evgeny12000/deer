type RoomConfig = unknown;
// declare function readConfigFromDb(roomId: number): Promise<RoomConfig>;

const cachedConfigMap = new Map<number, RoomConfig>();

async function fetchRoomConfig(roomId: number): Promise<RoomConfig> {
    if (!cachedConfigMap.has(roomId)) {
        const configPromise = readConfigFromDb(roomId);
        cachedConfigMap.set(roomId, configPromise);
        return await configPromise;
    }
    return await cachedConfigMap.get(roomId);
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function readConfigFromDb(roomId: number): Promise<RoomConfig> {
    await sleep(2000);
    const currentTime = new Date().toISOString();
    return { id: roomId, time: currentTime };
}


fetchRoomConfig(111).then(result => console.log(`Call 1 - ${JSON.stringify(result)}`));
fetchRoomConfig(111).then(result => console.log(`Call 2 - ${JSON.stringify(result)}`));
fetchRoomConfig(111).then(result => console.log(`Call 3 - ${JSON.stringify(result)}`));

fetchRoomConfig(222).then(result => console.log(`Call 4 - ${JSON.stringify(result)}`));
fetchRoomConfig(222).then(result => console.log(`Call 5 - ${JSON.stringify(result)}`));
fetchRoomConfig(222).then(result => console.log(`Call 6 - ${JSON.stringify(result)}`));

