class FileUtil {
    static async convertToBase64(file: Blob | File) {
        if (!file) return;
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = error => {
                reject(error);
            };
        });
    }
}

export default FileUtil;
