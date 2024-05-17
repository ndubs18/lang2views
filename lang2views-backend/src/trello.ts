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

export async function createTrelloCard(cardData: CreateCardRequest): Promise<CreateCardResponse> {
    try {
        const response: AxiosResponse<CreateCardResponse> = await axios.post(
            `https://api.trello.com/1/cards`,
            null,
            {
                params: {
                key: cardData.key,
                token: cardData.token,
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
