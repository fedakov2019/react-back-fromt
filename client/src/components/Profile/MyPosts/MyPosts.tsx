import React from 'react';
import s from './MyPosts.module.css';
import {required,maxLengthCreator} from '../../../utils/validators/validators'
import Post from './Post/Post';
import { InjectedFormProps,reduxForm } from 'redux-form';
import { TGetStringKey, Textarea, createField } from '../../common/FormControls/FormsControls';
import { PostType } from '../../../types/types';
type TMyPropsR={
    posts:Array<PostType>
    addPost:(newPostText:string)=>void
}
const MyPostsR:React.FC<TMyPropsR> = (props) => {
    
    let postsElements =
        props.posts.map( p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    

    
    
    const onAddPost=(values:TMyPost)=>{
        props.addPost(values.newPostText); 
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
               <AddPostFormRedux onSubmit={onAddPost}/>
            </div>
            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    )
};
type TMyPost={
    newPostText:string
}
type newPropsType={}
type TnewPostFormKey= TGetStringKey<TMyPost>
const maxLenght10 = maxLengthCreator(10);
const AddNewPostForm:React.FC<InjectedFormProps<TMyPost,newPropsType>&newPropsType>=(props)=>{
    
    return (
        <form onSubmit={props.handleSubmit}>
             <div>
             {createField<TnewPostFormKey>("Yur post","newPostText",[required,maxLenght10],Textarea)}
                    
                </div>
                <div>
                    <button>Add post</button>
                </div>
        </form>
    )

}
const AddPostFormRedux =reduxForm<TMyPost,newPropsType>({
    form:'ProfileAddNewPostForm'
})(AddNewPostForm)
const MyPosts=React.memo(MyPostsR);
export default MyPosts;