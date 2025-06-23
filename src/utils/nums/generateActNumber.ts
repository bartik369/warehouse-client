export const generateActNumber = () => {
    const date = new Date();
    const timestamp = date.getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 900 + 100);
    const year = date.getFullYear();

    return `ACT-${year}-${timestamp}-${random}`;
}