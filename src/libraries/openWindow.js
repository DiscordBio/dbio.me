export default function OpenWindow(window, url, width, height) {
    const hasWindow = typeof window !== 'undefined';

    if (hasWindow) {
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        const options = `width=${width},height=${height},left=${left},top=${top}`;
        const newWindow = window.open(url, url, options);
        if (newWindow) {
            newWindow.focus();
        }
    } else {
        return null;
    }
};