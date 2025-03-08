export function areGameVersionsCompatible(levelGameVersion: number, userGameVersion: number) {
    // if level is from lbp1 and user is on lbp2 or 3
    if (levelGameVersion == 0 && userGameVersion == 1 || userGameVersion == 2) return true;

    // if level is from lbp2 and user is on lbp3
    if (levelGameVersion == 1 && userGameVersion == 2) return true;

    // if level game version is the same as users game version
    if (levelGameVersion == userGameVersion) return true;

    // else
    return false;
}