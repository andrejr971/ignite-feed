import { PencilLine } from "phosphor-react";
import { IUser } from "../../App";

import { Avatar } from "../Avatar";

import styles from './Sidebar.module.css';

interface ISidebar {
  user: IUser;
}

export function Sidebar({ user }: ISidebar) {
  const { name, avatarUrl, cover, role } = user;
  
  return (
    <div className={styles.sidebar}>

      <img src={cover} alt="Background" className={styles.cover} />


      <div className={styles.profile}>
        <Avatar
          src={avatarUrl}        
        />

        <strong>{name}</strong>
        <span>{role}</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </div>
  )
}