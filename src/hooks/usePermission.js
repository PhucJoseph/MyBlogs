
export default function usePermission() {
    const token = localStorage.getItem("token");
    if (token === null) {
        return false;
    }
    return true;
}