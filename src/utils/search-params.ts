export function getSearchValues() {
    const values: Record<string, string> = window.location.search.replace('?', '').split('&').reduce((acc, el) => {
        const [key, val] = el.split('=');
        if (key.trim().length) {
            acc[key]= decodeURIComponent(decodeURIComponent(val || ''));
        }
        return acc;
    }, {} as Record<string, string>);
    return values;
}

export function setSearchValue(key: string, value: string) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, encodeURIComponent(value));
    window.history.pushState({}, '', url.toString());
}

export function getActivePath() {
    return window.location.pathname;
}

export function setPath(name: string) {
    const url = new URL(window.location.href);
    url.pathname = name;
    window.history.pushState({}, '', url.toString());
}

