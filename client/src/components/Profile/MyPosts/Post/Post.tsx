import React from 'react';
import s from './Post.module.css';
type PostPropsT={
  message:string,
  likesCount:number
}
const Post:React.FC<PostPropsT> = (props) => {
  return (
    <div className={s.item}>
      <img src='https://zamanilka.ru/wp-content/uploads/2022/05/dlya-patsanov-260921-1-edited.jpg' />
        { props.message }
          <div>
        <span>like</span> { props.likesCount }
      </div>
    </div>
  )
}

export default Post;