
function formatCost(rawCost : string): string {
    const goldValue = 100;
    const silverValue = 10;
    const copperValue = 1;

    const numberCost = Number(rawCost) * goldValue;

    const goldCost = Math.floor(numberCost / goldValue);
    const silverCost = Math.floor((numberCost % goldValue) / silverValue);
    const copperCost = Math.floor((numberCost % silverValue) / copperValue);

    let convertedCost = ``;

    if (goldCost > 0) convertedCost += `${goldCost} Gold `;
    if (silverCost > 0) convertedCost += `${silverCost} Silver `;
    if (copperCost > 0) convertedCost += `${copperCost} Copper `;

    return convertedCost;
}

function formatWeight(rawWeight : string): string {



}