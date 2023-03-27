export const fetchTimeZons = async () => {
    const res = await fetch("http://worldtimeapi.org/api/timezone");
    return await res.json();
};
