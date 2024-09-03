import axios from 'axios';
import { parse} from 'node-html-parser';
interface Player {
    name: string;
}
interface ServerInfo {
    address: string;
    name: string;
    players: string;
    map: string;
    onlinePlayers: Player[];
    tags: string[];
}

export class Server {
    private apiUrl: string;
    constructor(id: string) {
        this.apiUrl = `https://rust-servers.net/server/${id}/`;
    }

    public async getPlayerCount(): Promise<number> {
        const response = await axios.get(this.apiUrl);
        const root = parse(response.data);
        const pdata = root.querySelector('td:contains("Players") + td')?.innerText.trim() || '';
        return parseInt(pdata.split('/')[0].replace(/\s+/g, ''), 10);
    }

    public async getMaxPlayers(): Promise<number> {
        const response = await axios.get(this.apiUrl);
        const root = parse(response.data);
        const pdata = root.querySelector('td:contains("Players") + td')?.innerText.trim() || '';
        return parseInt(pdata.split('/')[1].replace(/\s+/g, ''), 10);
    }

    public async getPlayersList(): Promise<Player[]> {
        const response = await axios.get(this.apiUrl);
        const root = parse(response.data);
        return root.querySelector('.row:contains("Online Players") + .row div')?.innerText.split('\n').filter(Boolean).map(n => ({ name: n.trim()})) || [];
    }

    public async getServerAddress(): Promise<string> {
        const response = await axios.get(this.apiUrl);
        const root = parse(response.data);
        return root.querySelector('td:contains("Address") + td')?.innerText.trim() || '';
    }

    public async getServerName(): Promise<string> {
        const response = await axios.get(this.apiUrl);
        const root = parse(response.data);
        return root.querySelector('td:contains("Hostname") + td')?.innerText.trim() || '';
    }

    public async getServerStatus(): Promise<string> {
        const response = await axios.get(this.apiUrl);
        const root = parse(response.data);
        return root.querySelector('td:contains("Status") + td button')?.innerText.trim() || 'Offline';
    }

    public async GetTags(): Promise<string[]> {
        const response = await axios.get(this.apiUrl);
        const root = parse(response.data);
        return root.querySelector('td:contains("Tag(s)") + td')?.childNodes.map(t => t.text.trim()).filter(Boolean) || [];
    }

    public async getServerMap(): Promise<string> {
        const response = await axios.get(this.apiUrl);
        const root = parse(response.data);
        return root.querySelector('td:contains("Map") + td')?.innerText.trim() || '';
    }

    public async getServerSpace(): Promise<number> {
        const response = await axios.get(this.apiUrl);
        const root = parse(response.data);
        const pdata = root.querySelector('td:contains("Players") + td')?.innerText.trim() || '';
        const [count, max] = pdata.split('/').map(n => parseInt(n.replace(/\s+/g, ''), 10));
        return (count / max) * 100;
    }
}

export class RustApi {
    public static newServer(id: string): Server {
        return new Server(id);
    }
}