import translate from 'bing-translate-api';

export class Bing {
    async translateText(words:string,lang:string){
        return new Promise((resolve,reject) => {
                translate.translate(words,null,lang).then((res) => {
                    console.log(res)
                    resolve(res.translation);
                }).catch((err) => {
                    console.log(err);
                    reject(err);
                })
        })
    }
}