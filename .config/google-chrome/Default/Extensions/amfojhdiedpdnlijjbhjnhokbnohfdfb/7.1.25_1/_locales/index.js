
export default message => {
    try {
        return message ? chrome.i18n.getMessage(message) : '';
    } catch (error) {
        
    }
    return ''
}
