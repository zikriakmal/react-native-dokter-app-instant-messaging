import headers from "./headers.service";
import indexService from "./index.service";


const postAskQuestion = async (question, isPublished = 0) =>
{
    let askQuestion = await indexService.post('member/ask-doctors',
        {
            question: question,
            is_published: isPublished
        }, headers())
        .catch((error) => console.log(error));
    return askQuestion
}

const getSelfQuestion = async () =>
{
    return await indexService.get('member/ask-doctors/my-questions', headers()).catch((error) => console.log(error));
}

const getAllQuestion = async () =>
{
    return await indexService.get() 
}

export { postAskQuestion, getSelfQuestion };
