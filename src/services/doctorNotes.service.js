
import headers from './headers.service';
import indexService from './index.service';

const getQuestion = async () =>
{
    let notesQuestion = await indexService.get('notes-question',headers()).catch((error)=>console.log(error))
    return notesQuestion;
}

const postQuestion = async(data)=>{
    let QuestionPostNotes = await indexService.post('notes-store',
    {
        question: data
    } 
    ,headers()).catch((error)=>console.log(error))
    return  QuestionPostNotes
}

const getPostedQuestionNotes = async(data)=>{
    let postedQuestion = await indexService.get('notes',headers()).catch((error)=>console.log(error));
    return postedQuestion
} 

export {getQuestion,postQuestion,getPostedQuestionNotes};