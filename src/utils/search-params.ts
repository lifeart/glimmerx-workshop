let defaultSearchParams: Record<string, unknown> = {};

function _getSearchValues(str: string) {
    const values: Record<string, string> = str.split('&').reduce((acc, el) => {
        const [key, val] = el.split('=');
        if (key.trim().length) {
            acc[key]= decodeURIComponent(decodeURIComponent(val || ''));
        }
        return acc;
    }, {} as Record<string, string>);
    return values;
}

export function createSearchParams(url: string) {
    const str = url.includes('?') ? url.split('?')[1] || '' : url;
    defaultSearchParams = _getSearchValues(str);
}

export function getSearchValues(): Record<string, unknown> {
    if (!('window' in globalThis)) {
        return defaultSearchParams;
    }
   return _getSearchValues(window.location.search.replace('?', ''));
}

export function getSearchValue(key: string, defaultValue: string | undefined = undefined): unknown {
    const values = getSearchValues();
    if (key in values) {
        return values[key];
    } else {
        if (typeof defaultValue === 'string') {
            setSearchValue(key, defaultValue);
        }
        return defaultValue;
    }
}

export function setSearchValue(key: string, value: string) {
    if (!('window' in globalThis)) {
        defaultSearchParams[key] = value;
        return;
    }
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

