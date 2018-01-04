import ImageEntry from './types/ImageEntry';
// import ServerError from './types/ServerError';
namespace API {
    const HOST = 'backend.repls.io';
    export function startImage(image: string): WebSocket {
        const ws = new WebSocket(`ws://${HOST}/ws?image=${image}`);
        return ws;
    }

    export async function getImages(): Promise<ImageEntry[]> {
        const res = await fetch(`http://${HOST}/images`);
        return await res.json();
    }
    
}



export default API;
