
function formatCost(rawCost : string): string {
    const goldValue = 100;
    const silverValue = 10;

    const numberCost = Number(rawCost) * 100;

    const goldCost = Math.floor(numberCost / goldValue);
    const silverCost = Math.floor((numberCost % goldValue) / silverValue);
    const copperCost = Math.floor(numberCost % silverValue);

    let convertedCost = ``;

    if (goldCost > 0) convertedCost += `${goldCost} Gold `;
    if (silverCost > 0) convertedCost += `${silverCost} Silver `;
    if (copperCost > 0) convertedCost += `${copperCost} Copper `;

    return convertedCost;
}

function formatWeight(rawWeight : string): string {
    const numberWeight = Number(rawWeight) * 100;

    const wholePounds = Math.floor(numberWeight / 100);
    const halfPounds = Math.floor((numberWeight % 100) / 50);
    const quarterPounds = Math.floor((numberWeight % 50) / 25);

    let convertedWeight = ``;

    //There is absolutely a cleaner way of doing this
    //This also assumes that you never have anything weighing in 3/4 lbs

    if (wholePounds > 0) convertedWeight += `${wholePounds} lbs `;
    if (halfPounds > 0) convertedWeight += `1/2 lbs `;
    if (quarterPounds > 0) convertedWeight += `1/4 lbs `;

    return convertedWeight;
}

export { formatCost, formatWeight }