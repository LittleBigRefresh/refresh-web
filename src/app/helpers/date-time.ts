export function getFormattedDateTime(date: Date) {
    return `${date.toLocaleDateString()} @ ${date.toLocaleTimeString()}`;
}

export function getShortDateTime(date: Date) {
    const recentText = "just now";
    const now = new Date();
    const totalSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (totalSeconds < 20)
        return recentText;

    for (const interval in timeIntervals) {
        const time = Math.floor(totalSeconds / timeIntervals[interval]);
        if (time > 1) {
            return `${time} ${interval}s ago`;
        } else if (time == 1) {
            return `a${interval == "hour" ? 'n' : ''} ${interval} ago`;
        }
    }

    return recentText;
}

export const timeIntervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
};

export function getDifferenceFromNowAsTotalSeconds(date: Date) {
    
}