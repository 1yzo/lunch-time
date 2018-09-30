export const shuffleArray = (arr) => {
    const available = [...arr];
    const shuffled = [];
    while (available.length) {
        const randomIndex = Math.floor((Math.random() * available.length));
        shuffled.push(...available.splice(randomIndex, 1));
    }
    return shuffled;
};