import axios, { AxiosResponse } from 'axios';

export interface CreateCardRequest {
    key: string;
    token: string;
    idList: string;
    name: string;
    desc?: string;
    pos?: string;
    due?: string;
    labels?: string;
}

export interface CreateCardResponse {
    id: string;
    name: string;
    desc: string;
}

export interface UpdateCardRequest {
    key: string;
    token: string;
    id: string;
    name?: string;
    desc?: string;
    pos?: string;
    due?: string;
    closed?: boolean;
    idList?: string;
    labels?: string;
}

export class Trello {
    private key: string;
    private token: string;

    constructor(key: string, token: string) {
        this.key = key;
        this.token = token;
    }

    public async createCard(cardData: Omit<CreateCardRequest, 'key' | 'token'>): Promise<CreateCardResponse> {
        try {
            const response: AxiosResponse<CreateCardResponse> = await axios.post(
                `https://api.trello.com/1/cards`,
                null,
                {
                    params: {
                        key: this.key,
                        token: this.token,
                        idList: cardData.idList,
                        name: cardData.name,
                        desc: cardData.desc,
                        pos: cardData.pos,
                        due: cardData.due,
                        labels: cardData.labels
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error creating Trello card:', error);
            throw error;
        }
    }

    public async updateCard(cardData: Omit<UpdateCardRequest, 'key' | 'token'>): Promise<CreateCardResponse> {
        try {
            const response: AxiosResponse<CreateCardResponse> = await axios.put(
                `https://api.trello.com/1/cards/${cardData.id}`,
                null,
                {
                    params: {
                        key: this.key,
                        token: this.token,
                        name: cardData.name,
                        desc: cardData.desc,
                        pos: cardData.pos,
                        due: cardData.due,
                        closed: cardData.closed,
                        idList: cardData.idList,
                        labels: cardData.labels
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error updating Trello card:', error);
            throw error;
        }
    }
}
