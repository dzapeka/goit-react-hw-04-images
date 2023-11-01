import styles from './Button.module.css';

const Button = ({ name, onClickHandler }) => {
  return (
    <button type="button" className={styles.Button} onClick={onClickHandler}>
      {name}
    </button>
  );
};

export default Button;
