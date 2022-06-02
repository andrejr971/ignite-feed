import { ChangeEvent, FormEvent, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { v4 as uuid } from 'uuid';

import { Avatar } from '../Avatar';
import { Comment, IComment } from '../Comment';
import { IUser } from '../../App';

import styles from './Post.module.css';

export type IContent = {
  type: 'link' | 'paragraph' | string;
  content: string;
}

export type IPost = {
  id: string;
  author: Omit<IUser, 'id' | 'cover'>;
  content: IContent[];
  publishedAt: Date,
}

interface IPostProps {
  post: IPost;
  user: IUser;
}

const commentsPosts: IComment[] = [
  {
    id: uuid(),
    author: {
      id: '1',
      avatarUrl: 'https://avatars.githubusercontent.com/u/49952031?v=4',
      name: 'André Junior',
    },
    publishedAt: new Date('2022-06-02 12:16:00'),
    content: 'Muito bom Devon, parabéns!! 👏👏',
    like: 0
  },
  {
    id: uuid(),
    author: {
      id: '2', 
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
    },
    publishedAt: new Date('2022-06-02 12:16:00'),
    content: 'Muito bom Devon, parabéns!! 👏👏',
    like: 2
  },
];

export function Post({ post, user }: IPostProps) {
  const { author, content, publishedAt } = post;

  const [comments, setComments] = useState(commentsPosts);
  const [value, setValue] = useState('');

  const publishedDateFormatted = format(publishedAt, 
    "dd 'de' LLLL 'às' HH'h'mm", 
    {
      locale: ptBR
    }
  )

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    if (value.length === 0) {
      return;
    }

    const newComment = {
      id: uuid(),
      author: {
        id: user.id,
        avatarUrl: user.avatarUrl,
        name: user.name,
      },
      publishedAt: new Date(),
      content: value,
      like: 0
    }

    setComments([...comments, newComment])
    setValue('');
    
  }

  function handleNewcommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setValue(event.target.value)
  }

  function handleDeleteComment(id: string) {
    const newArrayComments = comments.filter(comment => comment.id !== id);

    setComments(newArrayComments);
  }

  function handleNewCommentInvalid(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            src={author.avatarUrl}          
          />

          <div>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {`Publicado ${publishedDateRelativeToNow}`}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((text, index) => {
          if (text.type === 'paragraph') {
            return <p key={`index-${index}`}>{text.content}</p>
          } else if (text.type === 'link') {
            return <p key={`index-${index}`}><a href="#">{text.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea  
          placeholder='Deixe o seu comentário'
          value={value}
          onChange={handleNewcommentChange}
          name="comment"
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button 
            type='submit'
            disabled={value.length === 0}
          >
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            onDeleteComment={handleDeleteComment}
            user_id={user.id} 
          />
        ))}
      </div>
    </article>
  )
}