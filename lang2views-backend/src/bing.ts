import translate from 'bing-translate-api';

export class Bing {
    async translateText(words:string){
        return new Promise((resolve,reject) => {
                translate.translate(words,null,'en').then((res) => {
                    console.log(res)
                    resolve(res.translation);
                }).catch((err) => {
                    console.log(err);
                    reject(err);
                })
        })
    }
}