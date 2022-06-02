import { useState } from 'react';
import { ThumbsUp, Trash } from 'phosphor-react';
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { IUser } from '../../App';

import { Avatar } from '../Avatar';
import styles from './Comment.module.css';

export type IComment = {
  id: string
  author: Omit<IUser, 'role' | 'cover'>;
  publishedAt: Date;
  content: string;
  like: number;
}

interface ICommentProps {
  comment: IComment;
  user_id: string;
  onDeleteComment: (id: string) => void;
}


export function Comment({
  comment,
  user_id,
  onDeleteComment 
}: ICommentProps) {
  const { author, content, id, like, publishedAt } = comment;

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  const [likeCount, setLikeCount] = useState(like);

  function handleLikeComment() {
    setLikeCount(likeCount + 1);
  }

  return (
    <div className={styles.comment}>
      <Avatar
        src={author.avatarUrl}         
        hasBorder={false}
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>
                {author.name} 
                {user_id === author.id && (
                  <span>{` `}(Você)</span>
                )}
              </strong> 
              <time 
                title='02 de Junho às 10:55' 
                dateTime="2022-06-02 08:13:30"
              >
                {publishedDateRelativeToNow}
              </time>
            </div>

            {user_id === author.id && (
              <button 
                title='Deletar Comentário' 
                onClick={() => onDeleteComment(id)}
              >
                <Trash size={20} />
              </button>
            )}
          </header>

          <p>
            {content}
          </p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} />
            Aplaudir
            {likeCount > 0 ? <span>{likeCount}</span> : ''}
          </button>
        </footer>
      </div>
    </div>
  )
}