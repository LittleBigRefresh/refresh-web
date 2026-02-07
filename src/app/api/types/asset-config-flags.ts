export interface AssetConfigFlags {
    // For some reason these are serialized as capitalized
    Dangerous: boolean;
    Media: boolean;
    Modded: boolean;
}

export function blockedFlagsAsString(flags: AssetConfigFlags): String {
    let flagList: String[] = [];
    if (flags.Media == true) flagList.push("Media");
    if (flags.Modded == true) flagList.push("Modded");
    if (flags.Dangerous == true) flagList.push("Dangerous");

    let flagStr: String = flagList.join(", ");
    if (flagStr.length === 0) flagStr = "None";
    return flagStr;
}