export function applyShims() {
    // @ts-ignore
    global['localStorage'] = {
        getItem(key: string): string | null {
            return null;
        }
    }
}